// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authValidator } = require("../validators/authValidator");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter, passwordResetLimiter } = require("../middleware/security");

/**
 * Authentication Routes
 * All routes are public except where noted
 */

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
router.post(
  "/register",
  authLimiter,
  authValidator.register,
  authController.register
);

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
router.post("/login", authLimiter, authValidator.login, authController.login);

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
router.post("/logout", authController.logout);

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
router.get("/me", protect, authController.getMe);

// @desc    Verify email
// @route   POST /api/v1/auth/verify-email
// @access  Public
router.post(
  "/verify-email",
  authValidator.verifyEmail,
  authController.verifyEmail
);

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
router.post(
  "/forgot-password",
  passwordResetLimiter,
  authValidator.forgotPassword,
  authController.forgotPassword
);

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password
// @access  Public
router.post(
  "/reset-password",
  passwordResetLimiter,
  authValidator.resetPassword,
  authController.resetPassword
);

// @desc    Change password
// @route   POST /api/v1/auth/change-password
// @access  Private
router.post(
  "/change-password",
  protect,
  authValidator.changePassword,
  authController.changePassword
);

// @desc    Refresh token
// @route   POST /api/v1/auth/refresh
// @access  Private
router.post("/refresh", protect, authController.refreshToken);

// @desc    Resend verification email
// @route   POST /api/v1/auth/resend-verification
// @access  Public
router.post(
  "/resend-verification",
  authLimiter,
  authValidator.resendVerification,
  authController.resendVerificationEmail
);

module.exports = router;
