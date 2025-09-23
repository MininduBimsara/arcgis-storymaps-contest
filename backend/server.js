// server.js
const Application = require("./app");
const logger = require("./utils/logger");

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception! Shutting down...", {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

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
