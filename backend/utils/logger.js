// utils/logger.js - Winston-based logger with file transports
const { createLogger, format, transports } = require("winston");
const path = require("path");
const fs = require("fs");

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  try {
    fs.mkdirSync(logsDir, { recursive: true });
  } catch (_) {
    // ignore directory create failure; console transport still works
  }
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "arcgis-storymaps-backend" },
  transports: [
    new transports.File({
      filename: path.join(logsDir, "app.log"),
      level: "info",
    }),
    new transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(logsDir, "exceptions.log") }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(logsDir, "rejections.log") }),
  ],
  exitOnError: false,
});

// Console transport in development for readability
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: process.env.LOG_LEVEL || "debug",
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, ...meta }) => {
          const rest = Object.keys(meta).length
            ? ` ${JSON.stringify(meta)}`
            : "";
          return `${timestamp} ${level}: ${message}${rest}`;
        })
      ),
    })
  );
}

module.exports = logger;
