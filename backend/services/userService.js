// services/userService.js - FIXED VERSION
const userRepository = require("../repositories/userRepository");
const crypto = require("crypto");

/**
 * User Service - Business Logic Layer
 */
class UserService {
  /**
   * Get user profile
   */
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      user,
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updateData) {
    // Remove sensitive fields that shouldn't be updated this way
    const { password, role, emailVerified, ...allowedUpdates } = updateData;

    // Check if email is being changed
    if (allowedUpdates.email) {
      const existingUser = await userRepository.findByEmail(
        allowedUpdates.email
      );
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error("Email is already in use");
      }

      // If email is changed, require re-verification
      const currentUser = await userRepository.findById(userId);
      if (allowedUpdates.email !== currentUser.email) {
        allowedUpdates.emailVerified = false; // FIXED: Use emailVerified instead of isEmailVerified
        allowedUpdates.emailVerificationToken = crypto
          .randomBytes(32)
          .toString("hex");
        allowedUpdates.emailVerificationExpires =
          Date.now() + 24 * 60 * 60 * 1000;
      }
    }

    const updatedUser = await userRepository.updateById(userId, allowedUpdates);
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  /**
   * Get users list (Admin only)
   */
  async getUsersList(filters = {}, page = 1, limit = 10) {
    const result = await userRepository.findWithPagination(
      filters,
      page,
      limit
    );
    return result;
  }

  /**
   * Get user statistics (Admin only)
   */
  async getUserStats() {
    return await userRepository.getStats();
  }

  /**
   * Deactivate user (Admin only)
   */
  async deactivateUser(userId) {
    const updatedUser = await userRepository.updateById(userId, {
      status: "banned", // FIXED: Use status instead of isActive
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  /**
   * Activate user (Admin only)
   */
  async activateUser(userId) {
    const updatedUser = await userRepository.updateById(userId, {
      status: "active", // FIXED: Use status instead of isActive
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  /**
   * Change user role (Admin only)
   */
  async changeUserRole(userId, newRole) {
    const validRoles = ["user", "admin"]; // FIXED: Match your actual User model roles
    if (!validRoles.includes(newRole)) {
      throw new Error("Invalid role");
    }

    const updatedUser = await userRepository.updateById(userId, {
      role: newRole,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  /**
   * Delete user (Admin only)
   */
  async deleteUser(userId) {
    // Check if user has submissions (if you have submissions)
    // const submissionRepository = require("../repositories/submissionRepository");
    // const userSubmissions = await submissionRepository.findByUser(userId, 1, 1);
    // if (userSubmissions.total > 0) {
    //   throw new Error("Cannot delete user with existing submissions");
    // }

    const deletedUser = await userRepository.deleteById(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;
  }

  /**
   * Search users
   */
  async searchUsers(searchTerm, filters = {}, page = 1, limit = 10) {
    const searchFilters = {
      ...filters,
      $or: [
        { username: { $regex: searchTerm, $options: "i" } }, // FIXED: Use username instead of firstName/lastName
        { email: { $regex: searchTerm, $options: "i" } },
        { city: { $regex: searchTerm, $options: "i" } },
      ],
    };

    return await userRepository.findWithPagination(searchFilters, page, limit);
  }
}

module.exports = new UserService();
