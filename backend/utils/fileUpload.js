// src/utils/fileUpload.js
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

/**
 * File upload utility using Multer
 * Configured for image uploads with size and type restrictions
 */

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    switch (file.fieldname) {
      case "thumbnail":
        uploadPath += "thumbnails/";
        break;
      case "preview":
        uploadPath += "previews/";
        break;
      case "avatar":
        uploadPath += "avatars/";
        break;
      default:
        uploadPath += "misc/";
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const extension = path.extname(file.originalname);
    const filename = `${
      file.fieldname
    }-${Date.now()}-${uniqueSuffix}${extension}`;

    cb(null, filename);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, GIF, WebP) are allowed"), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10, // Maximum 10 files per request
  },
});

/**
 * Upload configurations for different scenarios
 */
const uploadConfigs = {
  // Single thumbnail upload
  thumbnail: upload.single("thumbnail"),

  // Multiple preview images
  previews: upload.array("previews", 5),

  // User avatar
  avatar: upload.single("avatar"),

  // Mixed uploads for submissions
  submission: upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "previews", maxCount: 5 },
  ]),
};

/**
 * Cloudinary configuration (for production cloud storage)
 */
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file to Cloudinary
 * @param {string} filePath - Local file path
 * @param {Object} options - Upload options
 */
const uploadToCloudinary = async (filePath, options = {}) => {
  try {
    const defaultOptions = {
      folder: "storymaps-competition",
      use_filename: true,
      unique_filename: true,
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(filePath, {
      ...defaultOptions,
      ...options,
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${error.message}`);
  }
};

module.exports = {
  upload,
  uploadConfigs,
  uploadToCloudinary,
  deleteFromCloudinary,
};
