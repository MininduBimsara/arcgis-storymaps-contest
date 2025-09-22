// src/utils/logger.js
const winston = require("winston");
const path = require("path");

/**
 * Winston logger configuration
 * Provides structured logging with different levels
 */
const createLogger = () => {
  const logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  );

  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let log = `${timestamp} [${level}]: ${message}`;

      // Add metadata if present
      if (Object.keys(meta).length > 0) {
        log += ` ${JSON.stringify(meta)}`;
      }

      return log;
    })
  );

  const transports = [
    // Console transport for development
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
    }),
  ];

  // File transports for production
  if (process.env.NODE_ENV === "production") {
    transports.push(
      // Error logs
      new winston.transports.File({
        filename: path.join(__dirname, "../../logs/error.log"),
        level: "error",
        format: logFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      }),

      // Combined logs
      new winston.transports.File({
        filename: path.join(__dirname, "../../logs/combined.log"),
        format: logFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 10,
      })
    );
  }

  return winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: logFormat,
    transports,
    exceptionHandlers: [
      new winston.transports.File({
        filename: path.join(__dirname, "../../logs/exceptions.log"),
      }),
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: path.join(__dirname, "../../logs/rejections.log"),
      }),
    ],
  });
};

const logger = createLogger();

module.exports = logger;
