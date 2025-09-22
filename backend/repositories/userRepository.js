// repositories/userRepository.js
const User = require("../models/User");

/**
 * User Repository - Data Access Layer
 * Handles all database operations for User model
 */
class UserRepository {
  /**
   * Create a new user
   */
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Find user by ID
   */
  async findById(id, selectFields = "") {
    if (selectFields) {
      return await User.findById(id).select(selectFields);
    }
    return await User.findById(id);
  }

  /**
   * Find user by email
   */
  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    return includePassword ? query.select("+password") : query;
  }

  /**
   * Find user by verification token
   */
  async findByVerificationToken(token) {
    return await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });
  }

  /**
   * Find user by password reset token
   */
  async findByResetToken(token) {
    const crypto = require("crypto");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    return await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  /**
   * Update user by ID
   */
  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete user by ID
   */
  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }

  /**
   * Get users with pagination
   */
  async findWithPagination(
    filters = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  ) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filters).select("-password").sort(sort).skip(skip).limit(limit),
      User.countDocuments(filters),
    ]);

    return {
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Get user statistics
   */
  async getStats() {
    return await User.getUserStats();
  }

  /**
   * Check if email exists
   */
  async emailExists(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    return !!user;
  }

  /**
   * Increment submission count
   */
  async incrementSubmissionCount(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { submissionCount: 1 } },
      { new: true }
    );
  }

  /**
   * Decrement submission count
   */
  async decrementSubmissionCount(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { submissionCount: -1 } },
      { new: true }
    );
  }

  /**
   * Update last login
   */
  async updateLastLogin(userId) {
    return await User.findByIdAndUpdate(
      userId,
      {
        lastLogin: new Date(),
        $unset: { loginAttempts: 1, lockUntil: 1 },
      },
      { new: true }
    );
  }

  /**
   * Increment login attempts
   */
  async incrementLoginAttempts(userId) {
    const maxAttempts = 5;
    const lockTime = 2 * 60 * 60 * 1000; // 2 hours

    const user = await User.findById(userId);

    if (user.loginAttempts + 1 >= maxAttempts && !user.isLocked) {
      return await User.findByIdAndUpdate(userId, {
        $inc: { loginAttempts: 1 },
        lockUntil: Date.now() + lockTime,
      });
    } else {
      return await User.findByIdAndUpdate(userId, {
        $inc: { loginAttempts: 1 },
      });
    }
  }
}

module.exports = new UserRepository();
