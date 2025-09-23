// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { userValidator } = require("../validators/userValidator");

/**
 * User Routes
 * All routes require authentication
 */

// @desc    Get current user profile
// @route   GET /api/v1/users/profile
// @access  Private
router.get("/profile", protect, userController.getProfile);

// @desc    Update current user profile
// @route   PUT /api/v1/users/profile
// @access  Private
router.put(
  "/profile",
  protect,
  uploadConfigs.avatar,
  userValidator.updateProfile,
  userController.updateProfile
);

// @desc    Get user submissions
// @route   GET /api/v1/users/my-submissions
// @access  Private
router.get("/my-submissions", protect, userController.getMySubmissions);

// Admin only routes
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
router.get("/", protect, adminOnly, userController.getUsersList);

// @desc    Get user statistics
// @route   GET /api/v1/users/stats
// @access  Private/Admin
router.get("/stats", protect, adminOnly, userController.getUserStats);

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
router.get("/:id", protect, adminOnly, userController.getUserById);

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  adminOnly,
  userValidator.updateUser,
  userController.updateUser
);

// @desc    Deactivate user
// @route   POST /api/v1/users/:id/deactivate
// @access  Private/Admin
router.post(
  "/:id/deactivate",
  protect,
  adminOnly,
  userController.deactivateUser
);

// @desc    Activate user
// @route   POST /api/v1/users/:id/activate
// @access  Private/Admin
router.post("/:id/activate", protect, adminOnly, userController.activateUser);

// @desc    Change user role
// @route   POST /api/v1/users/:id/change-role
// @access  Private/Admin
router.post(
  "/:id/change-role",
  protect,
  adminOnly,
  userValidator.changeRole,
  userController.changeUserRole
);

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
router.delete("/:id", protect, adminOnly, userController.deleteUser);

// @desc    Search users
// @route   GET /api/v1/users/search
// @access  Private/Admin
router.get("/search", protect, adminOnly, userController.searchUsers);

module.exports = router;
