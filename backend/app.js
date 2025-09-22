const express = require("express");
const cors = require("cors");
const compression = require("compression");

// Import configurations
const envConfig = require("./config/env");
const databaseConfig = require("./config/database");

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
    // Basic middleware
    this.app.use(compression()); // Compress responses
    this.app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies

    // CORS configuration
    this.app.use(cors(envConfig.corsConfig));

    // Security middleware
    this.app.use(securityMiddleware);
    this.app.use(sanitizeInput);

    // Request logging (only in development)
    if (envConfig.isDevelopment) {
      this.app.use(requestLogger);
    }

    // Rate limiting
    this.app.use("/api", apiLimiter);

    // Serve static files
    this.app.use("/uploads", express.static("uploads"));

    // Health check endpoint
    this.app.get("/health", (req, res) => {
      res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: databaseConfig.isConnected() ? "connected" : "disconnected",
        version: process.env.npm_package_version || "1.0.0",
      });
    });
  }

  setupRoutes() {
    // API routes
    this.app.use(`/api/${process.env.API_VERSION}`, routes);

    // Root endpoint
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
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler (must be last)
    this.app.use(errorHandler);
  }

  async start() {
    try {
      // Connect to database
      await databaseConfig.connect();

      // Start server
      const port = envConfig.port;
      this.server = this.app.listen(port, () => {
        logger.info(`Server running on port ${port}`, {
          environment: process.env.NODE_ENV,
          port,
        });
      });

      // Graceful shutdown handling
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

      // Force close after 10 seconds
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
