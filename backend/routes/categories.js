// routes/categories.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { categoryValidator } = require("../validators/categoryValidator");

/**
 * Category Routes
 */

// Public routes
// @desc    Get all active categories
// @route   GET /api/v1/categories
// @access  Public
router.get("/", categoryController.getActiveCategories);

// @desc    Get category by slug
// @route   GET /api/v1/categories/slug/:slug
// @access  Public
router.get("/slug/:slug", categoryController.getCategoryBySlug);

// @desc    Get category statistics
// @route   GET /api/v1/categories/:id/stats
// @access  Public
router.get("/:id/stats", categoryController.getCategoryStats);

// Admin only routes
// @desc    Get all categories (including inactive)
// @route   GET /api/v1/categories/admin/all
// @access  Private/Admin
router.get(
  "/admin/all",
  protect,
  adminOnly,
  categoryController.getAllCategories
);

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private/Admin
router.post(
  "/",
  protect,
  adminOnly,
  categoryValidator.create,
  categoryController.createCategory
);

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  adminOnly,
  categoryValidator.update,
  categoryController.updateCategory
);

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
router.delete("/:id", protect, adminOnly, categoryController.deleteCategory);

// @desc    Toggle category status
// @route   POST /api/v1/categories/:id/toggle
// @access  Private/Admin
router.post(
  "/:id/toggle",
  protect,
  adminOnly,
  categoryController.toggleCategoryStatus
);

module.exports = router;
