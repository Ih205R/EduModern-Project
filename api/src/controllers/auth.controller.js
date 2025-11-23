const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Register new user
 */
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    
    return successResponse(
      res,
      result,
      'Registration successful. Please check your email to verify your account.',
      201
    );
  } catch (error) {
    logger.error('Registration error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    return successResponse(res, result, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    return errorResponse(res, error.message, 401);
  }
};

/**
 * Refresh access token
 */
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return errorResponse(res, 'Refresh token is required', 400);
    }

    const tokens = await authService.refreshAccessToken(refreshToken);
    
    return successResponse(res, tokens, 'Token refreshed successfully');
  } catch (error) {
    logger.error('Token refresh error:', error);
    return errorResponse(res, error.message, 401);
  }
};

/**
 * Logout user
 */
const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    
    return successResponse(res, null, 'Logout successful');
  } catch (error) {
    logger.error('Logout error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Verify email
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return errorResponse(res, 'Verification token is required', 400);
    }

    await authService.verifyEmail(token);
    
    return successResponse(res, null, 'Email verified successfully');
  } catch (error) {
    logger.error('Email verification error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Request password reset
 */
const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);
    
    return successResponse(
      res,
      null,
      'If an account exists with this email, a password reset link has been sent'
    );
  } catch (error) {
    logger.error('Password reset request error:', error);
    return errorResponse(res, 'Failed to process password reset request', 400);
  }
};

/**
 * Reset password
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return errorResponse(res, 'Token and new password are required', 400);
    }

    await authService.resetPassword(token, password);
    
    return successResponse(res, null, 'Password reset successfully');
  } catch (error) {
    logger.error('Password reset error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Change password (authenticated)
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    
    return successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    logger.error('Change password error:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get current user
 */
const getCurrentUser = async (req, res, next) => {
  try {
    return successResponse(res, req.user, 'User retrieved successfully');
  } catch (error) {
    logger.error('Get current user error:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword,
  getCurrentUser,
};
