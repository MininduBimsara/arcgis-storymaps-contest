const mongoose = require("mongoose");
const logger = require("../utils/logger");

/**
 * Database connection configuration
 * Handles MongoDB connection with proper error handling and reconnection logic
 */
class DatabaseConfig {
  constructor() {
    this.connectionString = this.buildConnectionString();
    this.options = this.getConnectionOptions();
  }

  buildConnectionString() {
    const {
      MONGODB_URI,
      MONGODB_HOST = "localhost",
      MONGODB_PORT = "27017",
      MONGODB_NAME = "storymaps_competition",
      MONGODB_USER,
      MONGODB_PASS,
    } = process.env;

    // If full URI is provided, use it directly
    if (MONGODB_URI) {
      return MONGODB_URI;
    }

    // Build URI from components
    let uri = "mongodb://";

    if (MONGODB_USER && MONGODB_PASS) {
      uri += `${MONGODB_USER}:${MONGODB_PASS}@`;
    }

    uri += `${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;

    return uri;
  }

  getConnectionOptions() {
    return {
      // Connection options
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6

      // Deprecated options that are now defaults in newer versions
      // useNewUrlParser: true,
      // useUnifiedTopology: true,

      // Buffer options
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    };
  }

  async connect() {
    try {
      logger.info("Connecting to MongoDB...", {
        host: process.env.MONGODB_HOST || "localhost",
        database: process.env.MONGODB_NAME || "storymaps_competition",
      });

      await mongoose.connect(this.connectionString, this.options);

      logger.info("MongoDB connected successfully");

      // Set up event listeners
      this.setupEventListeners();
    } catch (error) {
      logger.error("MongoDB connection failed", { error: error.message });
      process.exit(1);
    }
  }

  setupEventListeners() {
    // Connection events
    mongoose.connection.on("connected", () => {
      logger.info("Mongoose connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("Mongoose connection error", { error: err.message });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("Mongoose disconnected from MongoDB");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("Mongoose reconnected to MongoDB");
    });

    // Application termination events
    process.on("SIGINT", this.gracefulClose);
    process.on("SIGTERM", this.gracefulClose);
  }

  async gracefulClose() {
    try {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (error) {
      logger.error("Error during MongoDB disconnection", {
        error: error.message,
      });
      process.exit(1);
    }
  }

  // Health check method
  isConnected() {
    return mongoose.connection.readyState === 1;
  }
}

module.exports = new DatabaseConfig();
