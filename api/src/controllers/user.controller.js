const userService = require('../services/user.service');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Get user profile
 */
const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user.id;
    const user = await userService.getUserById(userId);
    
    return successResponse(res, user, 'User profile retrieved successfully');
  } catch (error) {
    logger.error('Get profile error:', error);
    return errorResponse(res, error.message, 404);
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.user.id, req.body);
    
    return successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    logger.error('Update profile error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Delete user account
 */
const deleteAccount = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user.id);
    
    return successResponse(res, null, 'Account deleted successfully');
  } catch (error) {
    logger.error('Delete account error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get user's workbooks
 */
const getUserWorkbooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await userService.getUserWorkbooks(req.user.id, parseInt(page), parseInt(limit));
    
    return paginatedResponse(
      res,
      result.workbooks,
      page,
      limit,
      result.total,
      'Workbooks retrieved successfully'
    );
  } catch (error) {
    logger.error('Get user workbooks error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get user's purchases
 */
const getUserPurchases = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await userService.getUserPurchases(req.user.id, parseInt(page), parseInt(limit));
    
    return paginatedResponse(
      res,
      result.purchases,
      page,
      limit,
      result.total,
      'Purchases retrieved successfully'
    );
  } catch (error) {
    logger.error('Get user purchases error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Upload avatar
 */
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const user = await userService.uploadAvatar(req.user.id, req.file);
    
    return successResponse(res, user, 'Avatar uploaded successfully');
  } catch (error) {
    logger.error('Upload avatar error:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserWorkbooks,
  getUserPurchases,
  uploadAvatar,
};
