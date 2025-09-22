// middleware/authMiddleware.js - Updated to match your existing system
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("./errorHandler");
const { responseHandler } = require("../utils/responseHandler");

/**
 * Protect routes - authenticate user
 */
const protect = asyncHandler(async (req, res, next) => {
  // List of public routes that don't require authentication
  const publicRoutes = [
    "/api/v1/submissions/public",
    "/api/v1/submissions/top",
    "/api/v1/submissions/search",
    "/api/v1/categories",
    "/api/v1/categories/slug",
  ];

  // Check if the current route is public
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }

  // Check for token in different locations (in order of preference)
  let finalToken = null;

  // 1. Check cookies first (both regular token and Google auth token)
  if (req.cookies && (req.cookies.token || req.cookies.authToken)) {
    finalToken = req.cookies.token || req.cookies.authToken;
  }

  // 2. Check Authorization header as fallback
  if (!finalToken) {
    const authHeader = req.headers.authorization;
    finalToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
  }

  // 3. Check session if enabled and available
  if (!finalToken && req.session && req.session.token) {
    finalToken = req.session.token;
  }

  if (!finalToken) {
    return responseHandler.error(res, "Access denied. No token provided.", 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET);

    // Find the user and attach it to req.user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return responseHandler.error(res, "User not found", 401);
    }

    if (user.status === "banned") {
      return responseHandler.error(res, "Account has been suspended", 401);
    }

    req.user = user; // Attach user object to request
    next(); // Proceed to the next middleware
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return responseHandler.error(
        res,
        "Session expired. Please log in again.",
        401
      );
    }
    return responseHandler.error(res, "Invalid token", 401);
  }
});

/**
 * Admin only access
 */
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return responseHandler.error(res, "Access denied. Admins only.", 403);
  }
  next();
};

/**
 * Require email verification
 */
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return responseHandler.error(
      res,
      "Access denied. Authentication required.",
      401
    );
  }

  if (!req.user.emailVerified) {
    return responseHandler.error(
      res,
      "Email verification required. Please check your email and verify your account.",
      403,
      { requiresEmailVerification: true }
    );
  }

  next();
};

/**
 * Check submission limits for users
 */
const checkSubmissionLimit = async (req, res, next) => {
  try {
    if (!req.user) {
      return responseHandler.error(
        res,
        "Access denied. Authentication required.",
        401
      );
    }

    // Admins have no limits
    if (req.user.role === "admin") {
      return next();
    }

    const maxSubmissions = parseInt(process.env.MAX_SUBMISSIONS_PER_USER) || 5;

    // Get user's current submission count
    const submissionRepository = require("../repositories/submissionRepository");
    const userSubmissions = await submissionRepository.findWithFilters(
      { submittedBy: req.user.id },
      { page: 1, limit: 1 }
    );

    if (userSubmissions.total >= maxSubmissions) {
      return responseHandler.error(
        res,
        `Maximum number of submissions (${maxSubmissions}) reached.`,
        403,
        { maxSubmissions, currentCount: userSubmissions.total }
      );
    }

    next();
  } catch (error) {
    console.error("Submission limit check error:", error);
    return responseHandler.error(
      res,
      "Failed to check submission limits.",
      500
    );
  }

  /**
   * Require terms agreement
   */
  const requireTermsAgreement = (req, res, next) => {
    if (!req.user) {
      return responseHandler.error(
        res,
        "Access denied. Authentication required.",
        401
      );
    }

    // Check if user has agreed to terms (you may need to add this field to User model)
    // For now, we'll skip this check and just proceed
    next();
  };
};

module.exports = {
  protect,
  adminOnly,
  requireEmailVerification,
  checkSubmissionLimit,
  requireTermsAgreement,
};
