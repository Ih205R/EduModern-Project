/**
 * Standardized API response helpers
 */

/**
 * Success response
 */
function successResponse(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Error response
 */
function errorResponse(res, message = 'Error', statusCode = 500, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

/**
 * Created response (201)
 */
function createdResponse(res, data = null, message = 'Created successfully') {
  return successResponse(res, data, message, 201);
}

/**
 * No content response (204)
 */
function noContentResponse(res) {
  return res.status(204).send();
}

/**
 * Bad request response (400)
 */
function badRequestResponse(res, message = 'Bad request', errors = null) {
  return errorResponse(res, message, 400, errors);
}

/**
 * Unauthorized response (401)
 */
function unauthorizedResponse(res, message = 'Unauthorized') {
  return errorResponse(res, message, 401);
}

/**
 * Forbidden response (403)
 */
function forbiddenResponse(res, message = 'Forbidden') {
  return errorResponse(res, message, 403);
}

/**
 * Not found response (404)
 */
function notFoundResponse(res, message = 'Resource not found') {
  return errorResponse(res, message, 404);
}

/**
 * Conflict response (409)
 */
function conflictResponse(res, message = 'Resource already exists') {
  return errorResponse(res, message, 409);
}

/**
 * Validation error response (422)
 */
function validationErrorResponse(res, errors) {
  return errorResponse(res, 'Validation failed', 422, errors);
}

/**
 * Internal server error response (500)
 */
function internalServerErrorResponse(res, message = 'Internal server error') {
  return errorResponse(res, message, 500);
}

module.exports = {
  successResponse,
  errorResponse,
  createdResponse,
  noContentResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
  validationErrorResponse,
  internalServerErrorResponse,
};
