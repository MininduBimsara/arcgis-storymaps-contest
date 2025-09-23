// services/userService.js
const userRepository = require("../repositories/userRepository");
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

    // If user is a judge, get judge profile too
    let judgeProfile = null;
    if (user.role === "judge") {
      judgeProfile = await judgeRepository.findByUserId(userId);
    }

    return {
      user,
      judgeProfile,
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updateData) {
    // Remove sensitive fields that shouldn't be updated this way
    const { password, role, isEmailVerified, ...allowedUpdates } = updateData;

    // Check if email is being changed
    if (allowedUpdates.email) {
      const existingUser = await userRepository.findByEmail(
        allowedUpdates.email
      );
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error("Email is already in use");
      }

      // If email is changed, require re-verification
      if (
        allowedUpdates.email !== (await userRepository.findById(userId)).email
      ) {
        allowedUpdates.isEmailVerified = false;
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
      isActive: false,
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
      isActive: true,
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
    const validRoles = ["participant", "judge", "admin"];
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
    // Check if user has submissions
    const submissionRepository = require("../repositories/submissionRepository");
    const userSubmissions = await submissionRepository.findByUser(userId, 1, 1);

    if (userSubmissions.total > 0) {
      throw new Error("Cannot delete user with existing submissions");
    }

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
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { organization: { $regex: searchTerm, $options: "i" } },
      ],
    };

    return await userRepository.findWithPagination(searchFilters, page, limit);
  }
}

module.exports = new UserService();
