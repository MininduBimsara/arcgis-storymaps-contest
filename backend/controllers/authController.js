// controllers/authController.js
const authService = require("../services/authService");
const { responseHandler } = require("../utils/responseHandler");
const { asyncHandler } = require("../middleware/errorHandler");

/**
 * Authentication Controller - HTTP Request Handlers
 */
class AuthController {
  /**
   * Register a new user
   * POST /api/v1/auth/register
   */
  register = asyncHandler(async (req, res) => {
    const userData = req.body;

    const result = await authService.register(userData);

    return responseHandler.created(
      res,
      "User registered successfully. Please check your email to verify your account.",
      { user: result }
    );
  });

  /**
   * Login user
   * POST /api/v1/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    // Set HTTP-only cookie with JWT token (optional, for additional security)
    if (process.env.NODE_ENV === "production") {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    return responseHandler.success(res, "Login successful", result);
  });

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  logout = asyncHandler(async (req, res) => {
    // Clear cookie if using HTTP-only cookies
    if (process.env.NODE_ENV === "production") {
      res.clearCookie("token");
    }

    return responseHandler.success(res, "Logout successful");
  });

  /**
   * Verify email
   * POST /api/v1/auth/verify-email
   */
  verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const user = await authService.verifyEmail(token);

    return responseHandler.success(res, "Email verified successfully", {
      user,
    });
  });

  /**
   * Request password reset
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const result = await authService.forgotPassword(email);

    return responseHandler.success(res, result.message);
  });

  /**
   * Reset password
   * POST /api/v1/auth/reset-password
   */
  resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    await authService.resetPassword(token, password);

    return responseHandler.success(res, "Password reset successfully");
  });

  /**
   * Change password
   * POST /api/v1/auth/change-password
   */
  changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    await authService.changePassword(userId, currentPassword, newPassword);

    return responseHandler.success(res, "Password changed successfully");
  });

  /**
   * Refresh token
   * POST /api/v1/auth/refresh
   */
  refreshToken = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const result = await authService.refreshToken(userId);

    return responseHandler.success(res, "Token refreshed successfully", result);
  });

  /**
   * Resend verification email
   * POST /api/v1/auth/resend-verification
   */
  resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const result = await authService.resendVerificationEmail(email);

    return responseHandler.success(res, result.message);
  });

  /**
   * Get current user
   * GET /api/v1/auth/me
   */
  getMe = asyncHandler(async (req, res) => {
    return responseHandler.success(res, "User data retrieved successfully", {
      user: req.user,
    });
  });
}

module.exports = new AuthController();
