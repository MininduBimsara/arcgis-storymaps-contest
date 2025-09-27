// services/authService.js - FIXED VERSION
const userRepository = require("../repositories/userRepository");
const emailService = require("./emailService");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
/**
 * Authentication Service - Business Logic Layer
 * Handles authentication-related business operations
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Create user
    const user = await userRepository.create({
      ...userData,
      emailVerificationToken: this.generateEmailVerificationToken(),
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}`;
    await emailService.sendEmailVerification(user, verificationUrl);

    // Generate token for user
    const token = user.generateAuthToken();

    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();
    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Login user
   */
  async login(email, password) {
    // Find user with password
    const user = await userRepository.findByEmail(email, true);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if account is locked
    if (user.isLocked) {
      throw new Error(
        "Account is temporarily locked due to too many failed login attempts"
      );
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      // Increment login attempts
      await userRepository.incrementLoginAttempts(user._id);
      throw new Error("Invalid email or password");
    }

    // Check if email is verified - FIXED: Use emailVerified instead of isEmailVerified
    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in");
    }

    // Update last login and reset login attempts
    await userRepository.updateLastLogin(user._id);

    // Generate JWT token
    const token = user.generateAuthToken();

    // Return user without password and token
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Verify email - FIXED VERSION
   */
  async verifyEmail(token) {
    const user = await userRepository.findByVerificationToken(token);
    if (!user) {
      throw new Error("Invalid or expired verification token");
    }

    // Update user as verified - FIXED: Use emailVerified instead of isEmailVerified
    const updatedUser = await userRepository.updateById(user._id, {
      emailVerified: true, // FIXED: Correct field name
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
    });

    return updatedUser;
  }

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists or not
      return {
        message: "If your email exists, you will receive a password reset link",
      };
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await emailService.sendPasswordReset(user, resetUrl);

    return { message: "Password reset email sent" };
  }

  /**
   * Reset password
   */
  async resetPassword(token, newPassword) {
    const user = await userRepository.findByResetToken(token);
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }

    // Hash new password before updating
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    const updatedUser = await userRepository.updateById(user._id, {
      password: hashedPassword,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
      loginAttempts: undefined,
      lockUntil: undefined,
    });

    return updatedUser;
  }

  /**
   * Refresh token
   */
  async refreshToken(userId) {
    const user = await userRepository.findById(userId);
    if (!user || user.status !== "active") {
      // FIXED: Check status instead of isActive
      throw new Error("Invalid user");
    }

    const token = user.generateAuthToken();
    return { token };
  }

  /**
   * Change password
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findById(userId, "+password");
    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      throw new Error("Current password is incorrect");
    }

    // Update password
    const updatedUser = await userRepository.updateById(userId, {
      password: newPassword,
    });

    return updatedUser;
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // FIXED: Check emailVerified instead of isEmailVerified
    if (user.emailVerified) {
      throw new Error("Email is already verified");
    }

    // Generate new verification token
    const updatedUser = await userRepository.updateById(user._id, {
      emailVerificationToken: this.generateEmailVerificationToken(),
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${updatedUser.emailVerificationToken}`;
    await emailService.sendEmailVerification(updatedUser, verificationUrl);

    return { message: "Verification email sent" };
  }

  /**
   * Generate email verification token
   */
  generateEmailVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
  }
}

module.exports = new AuthService();
