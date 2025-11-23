const { validationResult } = require('express-validator');
const { validationErrorResponse } = require('../utils/response');

/**
 * Validate request using express-validator
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const formattedErrors = errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
      value: error.value,
    }));

    return validationErrorResponse(res, formattedErrors);
  };
};

module.exports = {
  validate,
};
