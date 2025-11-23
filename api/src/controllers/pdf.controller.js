const pdfService = require('../services/pdf.service');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Generate PDF for workbook
 */
const generatePDF = async (req, res, next) => {
  try {
    const { workbookId } = req.params;
    const job = await pdfService.generatePDF(workbookId, req.user.id);
    
    return successResponse(
      res,
      { jobId: job.id, status: job.status },
      'PDF generation started',
      202
    );
  } catch (error) {
    logger.error('Generate PDF error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get PDF generation status
 */
const getPDFStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const status = await pdfService.getPDFStatus(jobId);
    
    return successResponse(res, status, 'PDF status retrieved successfully');
  } catch (error) {
    logger.error('Get PDF status error:', error);
    return errorResponse(res, error.message, 404);
  }
};

module.exports = {
  generatePDF,
  getPDFStatus,
};
