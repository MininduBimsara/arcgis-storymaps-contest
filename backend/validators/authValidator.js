// validators/authValidator.js
const Joi = require("joi");
const { responseHandler } = require("../utils/responseHandler");

/**
 * Auth validation middleware
 */
class AuthValidator {
  register = (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().required().min(2).max(50),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8).max(100),
      role: Joi.string().valid("user", "admin").default("user"),
      phone: Joi.string().optional().allow(""),
      address: Joi.string().optional().allow(""),
      city: Joi.string().optional().allow(""),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  login = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  verifyEmail = (req, res, next) => {
    const schema = Joi.object({
      token: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  forgotPassword = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  resetPassword = (req, res, next) => {
    const schema = Joi.object({
      token: Joi.string().required(),
      password: Joi.string().required().min(8).max(100),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  changePassword = (req, res, next) => {
    const schema = Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required().min(8).max(100),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  resendVerification = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };
}

module.exports = { authValidator: new AuthValidator() };
