// controllers/userController.js - Fixed version with inline pagination helper
const userService = require("../services/userService");
const { responseHandler } = require("../utils/responseHandler");
const { asyncHandler } = require("../middleware/errorHandler");

/**
 * Pagination Helper Class - Inline to avoid import issues
 */
class PaginationHelper {
  static getParams(req) {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    return { page, limit };
  }
}

/**
 * User Controller - HTTP Request Handlers
 */
class UserController {
  /**
   * Get user profile
   * GET /api/v1/users/profile
   */
  getProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const result = await userService.getProfile(userId);

    return responseHandler.success(
      res,
      "Profile retrieved successfully",
      result
    );
  });

  /**
   * Update user profile
   * PUT /api/v1/users/profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const updateData = req.body;

    const updatedUser = await userService.updateProfile(userId, updateData);

    return responseHandler.success(res, "Profile updated successfully", {
      user: updatedUser,
    });
  });

  /**
   * Get users list (Admin only)
   * GET /api/v1/users
   */
  getUsersList = asyncHandler(async (req, res) => {
    const pagination = PaginationHelper.getParams(req);
    const filters = {};

    // Apply filters
    if (req.query.role) filters.role = req.query.role;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.emailVerified !== undefined)
      filters.emailVerified = req.query.emailVerified === "true";

    const result = await userService.getUsersList(
      filters,
      pagination.page,
      pagination.limit
    );

    return responseHandler.paginated(
      res,
      result.users,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Users retrieved successfully"
    );
  });

  /**
   * Get user statistics (Admin only)
   * GET /api/v1/users/stats
   */
  getUserStats = asyncHandler(async (req, res) => {
    const stats = await userService.getUserStats();

    return responseHandler.success(
      res,
      "User statistics retrieved successfully",
      { stats }
    );
  });

  /**
   * Get user by ID (Admin only)
   * GET /api/v1/users/:id
   */
  getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const result = await userService.getProfile(userId);

    return responseHandler.success(res, "User retrieved successfully", result);
  });

  /**
   * Update user (Admin only)
   * PUT /api/v1/users/:id
   */
  updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await userService.updateProfile(userId, updateData);

    return responseHandler.success(res, "User updated successfully", {
      user: updatedUser,
    });
  });

  /**
   * Deactivate user (Admin only)
   * POST /api/v1/users/:id/deactivate
   */
  deactivateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const updatedUser = await userService.deactivateUser(userId);

    return responseHandler.success(res, "User deactivated successfully", {
      user: updatedUser,
    });
  });

  /**
   * Activate user (Admin only)
   * POST /api/v1/users/:id/activate
   */
  activateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const updatedUser = await userService.activateUser(userId);

    return responseHandler.success(res, "User activated successfully", {
      user: updatedUser,
    });
  });

  /**
   * Change user role (Admin only)
   * POST /api/v1/users/:id/change-role
   */
  changeUserRole = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    const updatedUser = await userService.changeUserRole(userId, role);

    return responseHandler.success(res, "User role changed successfully", {
      user: updatedUser,
    });
  });

  /**
   * Delete user (Admin only)
   * DELETE /api/v1/users/:id
   */
  deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    return responseHandler.success(res, "User deleted successfully");
  });

  /**
   * Search users
   * GET /api/v1/users/search
   */
  searchUsers = asyncHandler(async (req, res) => {
    const { q: searchTerm } = req.query;
    const pagination = PaginationHelper.getParams(req);

    if (!searchTerm) {
      return responseHandler.error(res, "Search term is required", 400);
    }

    const filters = {};
    if (req.query.role) filters.role = req.query.role;
    if (req.query.status) filters.status = req.query.status;

    const result = await userService.searchUsers(
      searchTerm,
      filters,
      pagination.page,
      pagination.limit
    );

    return responseHandler.paginated(
      res,
      result.users,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Users search completed"
    );
  });
}

module.exports = new UserController();
