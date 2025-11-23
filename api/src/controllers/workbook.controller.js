const workbookService = require('../services/workbook.service');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Get all workbooks (public)
 */
const getAllWorkbooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, search, featured } = req.query;
    
    const filters = {
      category,
      search,
      featured: featured === 'true',
    };

    const result = await workbookService.getAllWorkbooks(
      parseInt(page),
      parseInt(limit),
      filters
    );
    
    return paginatedResponse(
      res,
      result.workbooks,
      page,
      limit,
      result.total,
      'Workbooks retrieved successfully'
    );
  } catch (error) {
    logger.error('Get all workbooks error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get workbook by slug
 */
const getWorkbookBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const workbook = await workbookService.getWorkbookBySlug(slug);
    
    return successResponse(res, workbook, 'Workbook retrieved successfully');
  } catch (error) {
    logger.error('Get workbook error:', error);
    return errorResponse(res, error.message, 404);
  }
};

/**
 * Create workbook
 */
const createWorkbook = async (req, res, next) => {
  try {
    const workbook = await workbookService.createWorkbook(req.user.id, req.body);
    
    return successResponse(res, workbook, 'Workbook created successfully', 201);
  } catch (error) {
    logger.error('Create workbook error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Update workbook
 */
const updateWorkbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workbook = await workbookService.updateWorkbook(id, req.user.id, req.body);
    
    return successResponse(res, workbook, 'Workbook updated successfully');
  } catch (error) {
    logger.error('Update workbook error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Delete workbook
 */
const deleteWorkbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    await workbookService.deleteWorkbook(id, req.user.id);
    
    return successResponse(res, null, 'Workbook deleted successfully');
  } catch (error) {
    logger.error('Delete workbook error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Publish workbook
 */
const publishWorkbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workbook = await workbookService.publishWorkbook(id, req.user.id);
    
    return successResponse(res, workbook, 'Workbook published successfully');
  } catch (error) {
    logger.error('Publish workbook error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Upload cover image
 */
const uploadCoverImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const { id } = req.params;
    const workbook = await workbookService.uploadCoverImage(id, req.user.id, req.file);
    
    return successResponse(res, workbook, 'Cover image uploaded successfully');
  } catch (error) {
    logger.error('Upload cover image error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Generate AI content
 */
const generateAIContent = async (req, res, next) => {
  try {
    const { prompt, type } = req.body;
    const content = await workbookService.generateAIContent(prompt, type);
    
    return successResponse(res, { content }, 'Content generated successfully');
  } catch (error) {
    logger.error('Generate AI content error:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getAllWorkbooks,
  getWorkbookBySlug,
  createWorkbook,
  updateWorkbook,
  deleteWorkbook,
  publishWorkbook,
  uploadCoverImage,
  generateAIContent,
};
