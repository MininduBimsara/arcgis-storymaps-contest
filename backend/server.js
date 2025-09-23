// server.js - Fixed version
require("dotenv").config();
const { startServer } = require("./app");

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception! Shutting down...", {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection! Shutting down...", {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Start the server
startServer();
