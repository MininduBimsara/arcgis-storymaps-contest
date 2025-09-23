// app.js
const express = require("express");
const cors = require("cors");
const compression = require("compression");

// Import configurations
const envConfig = require("./config/env");
const connectDB = require("./config/database");

// Import middleware
const {
  securityMiddleware,
  sanitizeInput,
  requestLogger,
  apiLimiter,
} = require("./middleware/security");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// Import routes
const routes = require("./routes");

// Import utilities
const logger = require("./utils/logger");

/**
 * Express application configuration
 */
class Application {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    this.app.use(compression());
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    this.app.use(cors(envConfig.corsConfig));

    this.app.use(securityMiddleware);
    this.app.use(sanitizeInput);

    if (envConfig.isDevelopment) {
      this.app.use(requestLogger);
    }

    this.app.use("/api", apiLimiter);
    this.app.use("/uploads", express.static("uploads"));

    this.app.get("/health", (req, res) => {
      res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || "1.0.0",
      });
    });
  }

  setupRoutes() {
    this.app.use(`/api/${process.env.API_VERSION}`, routes);

    this.app.get("/", (req, res) => {
      res.json({
        message: "ArcGIS StoryMaps Competition API",
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      });
    });
  }

  setupErrorHandling() {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  async start() {
    try {
      // Connect to database
      await connectDB();

      // Start server
      const port = envConfig.port;
      this.server = this.app.listen(port, () => {
        logger.info(`🚀 Server running on port ${port}`, {
          environment: process.env.NODE_ENV,
          port,
        });
      });

      this.setupGracefulShutdown();
    } catch (error) {
      logger.error("Failed to start application", { error: error.message });
      process.exit(1);
    }
  }

  setupGracefulShutdown() {
    const gracefulShutdown = (signal) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);

      this.server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });

      setTimeout(() => {
        logger.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  }
}

module.exports = Application;
