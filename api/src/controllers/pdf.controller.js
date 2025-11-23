const { prisma } = require('../config/db');
const { queuePdfGeneration } = require('../jobs/pdfJob');
const {
  successResponse,
  notFoundResponse,
  forbiddenResponse,
  badRequestResponse,
} = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Request PDF generation for a workbook
 */
async function generatePdf(req, res) {
  try {
    const { workbookId } = req.body;

    // Get workbook
    const workbook = await prisma.workbook.findUnique({
      where: { id: workbookId },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    // Check if user is the author
    if (workbook.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return forbiddenResponse(res, 'You do not have permission to generate PDF for this workbook');
    }

    if (!workbook.content) {
      return badRequestResponse(res, 'Workbook has no content');
    }

    // Queue PDF generation
    const job = await queuePdfGeneration(workbook.id);

    logger.info(`PDF generation queued for workbook: ${workbook.title} (Job ID: ${job.id})`);

    return successResponse(res, { 
      jobId: job.id,
      workbookId: workbook.id,
    }, 'PDF generation started');
  } catch (error) {
    logger.error('Generate PDF error:', error);
    throw error;
  }
}

/**
 * Check PDF generation status
 */
async function getPdfStatus(req, res) {
  try {
    const { workbookId } = req.params;

    // Get workbook
    const workbook = await prisma.workbook.findUnique({
      where: { id: workbookId },
    });

    if (!workbook) {
      return notFoundResponse(res, 'Workbook not found');
    }

    // Check if user is the author or has purchased
    if (workbook.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      const order = await prisma.order.findFirst({
        where: {
          userId: req.user.id,
          workbookId: workbook.id,
          status: 'COMPLETED',
        },
      });

      if (!order) {
        return forbiddenResponse(res, 'You do not have permission to check PDF status for this workbook');
      }
    }

    return successResponse(res, {
      isPdfGenerated: workbook.isPdfGenerated,
      pdfUrl: workbook.pdfUrl,
    });
  } catch (error) {
    logger.error('Get PDF status error:', error);
    throw error;
  }
}

module.exports = {
  generatePdf,
  getPdfStatus,
};
