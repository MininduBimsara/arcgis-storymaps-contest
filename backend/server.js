const Application = require("./app");
const logger = require("./utils/logger");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception! Shutting down...", {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection! Shutting down...", {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Create and start application
const app = new Application();
app.start();

module.exports = app;
