const dotenv = require("dotenv");
const path = require("path");

/**
 * Environment configuration
 * Loads and validates environment variables
 */
class EnvironmentConfig {
  constructor() {
    this.loadEnvironment();
    this.validateRequired();
  }

  loadEnvironment() {
    // Load environment file based on NODE_ENV
    const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
    const envPath = path.join(process.cwd(), envFile);

    dotenv.config({ path: envPath });

    // Set default values
    this.setDefaults();
  }

  setDefaults() {
    const defaults = {
      NODE_ENV: "development",
      PORT: "5000",
      JWT_EXPIRES_IN: "7d",
      BCRYPT_ROUNDS: "12",
      LOG_LEVEL: "info",
      CORS_ORIGIN: "http://localhost:3000",
      MONGODB_HOST: "localhost",
      MONGODB_PORT: "27017",
      MONGODB_NAME: "storymaps_competition",
      API_VERSION: "v1",
      MAX_FILE_SIZE: "5242880", // 5MB
      MAX_SUBMISSIONS_PER_USER: "5",
    };

    Object.entries(defaults).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
  }

  validateRequired() {
    const required = ["JWT_SECRET", "MONGODB_URI"];

    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      console.error(
        "Missing required environment variables:",
        missing.join(", ")
      );
      console.error("Please check your .env file");
      process.exit(1);
    }
  }

  // Getter methods for typed environment variables
  get port() {
    return parseInt(process.env.PORT);
  }

  get isDevelopment() {
    return process.env.NODE_ENV === "development";
  }

  get isProduction() {
    return process.env.NODE_ENV === "production";
  }

  get isTest() {
    return process.env.NODE_ENV === "test";
  }

  get jwtConfig() {
    return {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }

  get corsConfig() {
    return {
      origin: process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
      credentials: true,
      optionsSuccessStatus: 200,
    };
  }

  get emailConfig() {
    return {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.FROM_EMAIL,
    };
  }

  get cloudinaryConfig() {
    return {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    };
  }
}

module.exports = new EnvironmentConfig();
