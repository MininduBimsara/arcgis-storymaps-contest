// services/emailService.js - Fixed nodemailer method name
const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

/**
 * Email Service - Business Logic Layer
 * Handles all email-related operations
 */
class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    const config = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // For development, use Ethereal Email if no SMTP configured
    if (process.env.NODE_ENV === "development" && !process.env.SMTP_HOST) {
      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "ethereal.user@ethereal.email",
          pass: "ethereal.pass",
        },
      });
    }

    return nodemailer.createTransport(config);
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(user, verificationUrl) {
    const mailOptions = {
      from: `"ArcGIS StoryMaps Competition" <${
        process.env.FROM_EMAIL || "noreply@storymapscompetition.com"
      }>`,
      to: user.email,
      subject: "Verify Your Email Address",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Welcome to the 2025 ArcGIS StoryMaps Competition!</h2>
          <p>Hello ${user.username || user.firstName || "User"},</p>
          <p>Thank you for registering for the 2025 ArcGIS StoryMaps Competition. To complete your registration, please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #007ac2; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>This verification link will expire in 24 hours.</p>
          <p>If you didn't create an account with us, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            Best regards,<br>
            The ArcGIS StoryMaps Competition Team
          </p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info("Email verification sent", {
        to: user.email,
        messageId: info.messageId,
      });
      return info;
    } catch (error) {
      logger.error("Failed to send email verification", {
        error: error.message,
        to: user.email,
      });
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(user, resetUrl) {
    const mailOptions = {
      from: `"ArcGIS StoryMaps Competition" <${
        process.env.FROM_EMAIL || "noreply@storymapscompetition.com"
      }>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.username || user.firstName || "User"},</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>This reset link will expire in 10 minutes for security reasons.</p>
          <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            Best regards,<br>
            The ArcGIS StoryMaps Competition Team
          </p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info("Password reset email sent", {
        to: user.email,
        messageId: info.messageId,
      });
      return info;
    } catch (error) {
      logger.error("Failed to send password reset email", {
        error: error.message,
        to: user.email,
      });
      throw error;
    }
  }

  /**
   * Send submission confirmation
   */
  async sendSubmissionConfirmation(user, submission) {
    const mailOptions = {
      from: `"ArcGIS StoryMaps Competition" <${
        process.env.FROM_EMAIL || "noreply@storymapscompetition.com"
      }>`,
      to: user.email,
      subject: "Submission Received - ArcGIS StoryMaps Competition",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Submission Received Successfully!</h2>
          <p>Hello ${user.username || user.firstName || "User"},</p>
          <p>Your StoryMap submission has been received and is now under review.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Submission Details:</h3>
            <p><strong>Title:</strong> ${submission.title}</p>
            <p><strong>Category:</strong> ${
              submission.category?.name || "N/A"
            }</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>
          <p>You will receive an email notification once the review process is complete.</p>
          <p>Thank you for participating in the 2025 ArcGIS StoryMaps Competition!</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            Best regards,<br>
            The ArcGIS StoryMaps Competition Team
          </p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info("Submission confirmation sent", {
        to: user.email,
        submissionId: submission._id,
        messageId: info.messageId,
      });
      return info;
    } catch (error) {
      logger.error("Failed to send submission confirmation", {
        error: error.message,
        to: user.email,
        submissionId: submission._id,
      });
      throw error;
    }
  }
}

module.exports = new EmailService();
