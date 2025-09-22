// middleware/validation.js - Generic validation middleware
const { responseHandler } = require("../utils/responseHandler");

/**
 * Generic validation middleware factory
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return responseHandler.error(res, "Validation failed", 400, { errors });
    }
    next();
  };
};

/**
 * Validate MongoDB ObjectId parameters
 */
const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!objectIdPattern.test(id)) {
      return responseHandler.error(res, `Invalid ${paramName} format`, 400);
    }

    next();
  };
};

/**
 * Validate query parameters
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };
};

module.exports = {
  validate,
  validateObjectId,
  validateQuery,
};
