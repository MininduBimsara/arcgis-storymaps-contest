// app.js - Simplified version that works with your database.js
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const connectDB = require("./config/database");

// Import middleware
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// Import routes
const routes = require("./routes");

/**
 * Express application setup
 */
const app = express();

// Basic middleware
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Serve static files
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: "1.0.0",
  });
});

// API routes
app.use(`/api/${process.env.API_VERSION}`, routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "ArcGIS StoryMaps Competition API",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server function
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 API Base URL: http://localhost:${port}/api/v1`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

module.exports = { app, startServer };
