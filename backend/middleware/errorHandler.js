// middleware/errorHandler.js
const logger = require("../utils/logger");

/**
 * Async handler wrapper to catch async errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error("Error handler:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Default error response
  const sendErrorResponse = (message, statusCode) => {
    return res.status(statusCode).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    });
  };

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    return sendErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    return sendErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    return sendErrorResponse(message, 400);
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    return sendErrorResponse(message, 401);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    return sendErrorResponse(message, 401);
  }

  // Default error
  return sendErrorResponse(
    error.message || "Server Error",
    error.statusCode || 500
  );
};

/**
 * Not found handler
 */
const notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  asyncHandler,
  errorHandler,
  notFoundHandler,
};
