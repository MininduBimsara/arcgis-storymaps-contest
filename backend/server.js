// server.js - Fixed version
require("dotenv").config();
const { startServer } = require("./app");
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

// Start the server
startServer();
