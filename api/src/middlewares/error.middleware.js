const logger = require('../utils/logger');
const env = require('../config/env');

/**
 * Not found middleware
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Prisma error handling
  if (err.code) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'A record with this unique field already exists',
        error: env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
        error: env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
  }

  // JWT error handling
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
      error: env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // Validation error handling
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.details || err.message,
    });
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: err.message,
    });
  }

  // Stripe errors
  if (err.type && err.type.includes('Stripe')) {
    return res.status(402).json({
      success: false,
      message: 'Payment processing error',
      error: env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // Default error response
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    error: env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
