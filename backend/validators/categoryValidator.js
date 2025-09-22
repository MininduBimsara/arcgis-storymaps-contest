// validators/categoryValidator.js
const Joi = require("joi");
const { responseHandler } = require("../utils/responseHandler");

/**
 * Category validation middleware
 */
class CategoryValidator {
  create = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required().min(2).max(50).trim(),
      description: Joi.string().required().min(10).max(500).trim(),
      icon: Joi.string().optional().trim().allow(""),
      color: Joi.string()
        .optional()
        .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .message("Color must be a valid hex code")
        .default("#007ac2"),
      order: Joi.number().integer().min(0).optional().default(0),
      maxSubmissions: Joi.number().integer().min(1).optional().allow(null),
      isActive: Joi.boolean().optional().default(true),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  update = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).trim().optional(),
      description: Joi.string().min(10).max(500).trim().optional(),
      icon: Joi.string().trim().allow("").optional(),
      color: Joi.string()
        .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .message("Color must be a valid hex code")
        .optional(),
      order: Joi.number().integer().min(0).optional(),
      maxSubmissions: Joi.number().integer().min(1).optional().allow(null),
      isActive: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };
}

module.exports = { categoryValidator: new CategoryValidator() };
