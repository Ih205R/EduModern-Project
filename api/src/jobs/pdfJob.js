const PDFDocument = require('pdfkit');
const { pdfQueue } = require('../services/pdf.service');
const { prisma } = require('../config/db');
const { uploadFile } = require('../config/s3');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// Process PDF generation jobs
pdfQueue.process(async (job) => {
  const { workbookId } = job.data;

  try {
    logger.info(`Starting PDF generation for workbook ${workbookId}`);

    // Get workbook
    const workbook = await prisma.workbook.findUnique({
      where: { id: workbookId },
    });

    if (!workbook || !workbook.pages) {
      throw new Error('Workbook not found or has no content');
    }

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {});

    // Add title page
    doc
      .fontSize(28)
      .font('Helvetica-Bold')
      .text(workbook.title, { align: 'center' });

    doc.moveDown(2);

    if (workbook.description) {
      doc.fontSize(14).font('Helvetica').text(workbook.description, { align: 'center' });
    }

    // Add content pages
    const pages = workbook.pages;
    if (Array.isArray(pages.pages)) {
      for (let i = 0; i < pages.pages.length; i++) {
        const page = pages.pages[i];
        doc.addPage();

        doc.fontSize(20).font('Helvetica-Bold').text(page.title || `Page ${i + 1}`);
        doc.moveDown();

        if (page.content) {
          doc.fontSize(12).font('Helvetica').text(page.content);
        }

        job.progress(((i + 1) / pages.pages.length) * 100);
      }
    }

    doc.end();

    // Wait for PDF to finish
    await new Promise((resolve) => {
      doc.on('end', resolve);
    });

    const pdfBuffer = Buffer.concat(chunks);

    // Upload to S3
    const key = `workbooks/${workbookId}/${uuidv4()}.pdf`;
    const url = await uploadFile(key, pdfBuffer, 'application/pdf');

    // Update workbook
    await prisma.workbook.update({
      where: { id: workbookId },
      data: {
        pdfUrl: url,
        s3Key: key,
      },
    });

    logger.info(`PDF generated successfully for workbook ${workbookId}`);

    return { url, key };
  } catch (error) {
    logger.error(`PDF generation failed for workbook ${workbookId}:`, error);
    throw error;
  }
});

logger.info('PDF job processor started');

module.exports = pdfQueue;