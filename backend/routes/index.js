// routes/index.js
const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth");
const userRoutes = require("./users");
const submissionRoutes = require("./submissions");
const categoryRoutes = require("./categories");

// API version
const API_VERSION = process.env.API_VERSION || "v1";

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/submissions", submissionRoutes);
router.use("/categories", categoryRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: API_VERSION,
    service: "ArcGIS StoryMaps Competition API",
  });
});

module.exports = router;
