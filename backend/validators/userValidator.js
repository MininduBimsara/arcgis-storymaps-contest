// validators/userValidator.js
const Joi = require("joi");
const { responseHandler } = require("../utils/responseHandler");

/**
 * User validation middleware
 */
class UserValidator {
  updateProfile = (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(50).trim().optional(),
      email: Joi.string().email().optional(),
      profileImage: Joi.string().uri().optional().allow(""),
      phone: Joi.string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .optional()
        .allow(""),
      address: Joi.string().max(200).trim().optional().allow(""),
      city: Joi.string().max(100).trim().optional().allow(""),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  updateUser = (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(50).trim().optional(),
      email: Joi.string().email().optional(),
      role: Joi.string().valid("user", "admin").optional(),
      status: Joi.string().valid("active", "banned").optional(),
      profileImage: Joi.string().uri().optional().allow(""),
      phone: Joi.string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .optional()
        .allow(""),
      address: Joi.string().max(200).trim().optional().allow(""),
      city: Joi.string().max(100).trim().optional().allow(""),
      emailVerified: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  changeRole = (req, res, next) => {
    const schema = Joi.object({
      role: Joi.string().valid("user", "admin").required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };
}

module.exports = { userValidator: new UserValidator() };
