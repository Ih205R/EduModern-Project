const logger = require('../utils/logger');
const { errorResponse, notFoundResponse, internalServerErrorResponse } = require('../utils/response');
const env = require('../config/env');

/**
 * Handle 404 errors
 */
function notFound(req, res, next) {
  return notFoundResponse(res, `Route ${req.originalUrl} not found`);
}

/**
 * Global error handler
 */
function errorHandler(err, req, res, next) {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      return errorResponse(res, 'A record with this value already exists', 409);
    }
    if (err.code === 'P2025') {
      return notFoundResponse(res, 'Record not found');
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation failed', 422, err.details);
  }

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'File too large', 400);
    }
    return errorResponse(res, 'File upload error', 400);
  }

  // Stripe errors
  if (err.type && err.type.startsWith('Stripe')) {
    return errorResponse(res, 'Payment processing error', 400);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  return errorResponse(res, message, statusCode);
}

/**
 * Async handler wrapper
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  notFound,
  errorHandler,
  asyncHandler,
};
