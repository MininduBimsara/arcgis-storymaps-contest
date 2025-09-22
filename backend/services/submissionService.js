// services/submissionService.js
const submissionRepository = require("../repositories/submissionRepository");
const userRepository = require("../repositories/userRepository");
const categoryRepository = require("../repositories/categoryRepository");
const emailService = require("./emailService");

/**
 * Submission Service - Business Logic Layer
 */
class SubmissionService {
  /**
   * Create a new submission
   */
  async createSubmission(userId, submissionData) {
    // Check user submission limit
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const maxSubmissions = parseInt(process.env.MAX_SUBMISSIONS_PER_USER) || 5;
    if (user.submissionCount >= maxSubmissions) {
      throw new Error(`Maximum ${maxSubmissions} submissions allowed per user`);
    }

    // Check if StoryMap URL already exists
    const existingSubmission = await submissionRepository.storyMapExists(
      submissionData.storyMapUrl
    );
    if (existingSubmission) {
      throw new Error("This StoryMap URL has already been submitted");
    }

    // Verify category exists
    const category = await categoryRepository.findById(submissionData.category);
    if (!category || !category.isActive) {
      throw new Error("Invalid or inactive category");
    }

    // Create submission
    const submission = await submissionRepository.create({
      ...submissionData,
      submittedBy: userId,
      submissionDate: new Date(),
      status: "submitted",
    });

    // Update user submission count and category submission count
    await Promise.all([
      userRepository.incrementSubmissionCount(userId),
      categoryRepository.incrementSubmissionCount(category._id),
    ]);

    // Populate submission data
    const populatedSubmission = await submissionRepository.findById(
      submission._id,
      ["submittedBy", "category"]
    );

    // Send confirmation email
    try {
      await emailService.sendSubmissionConfirmation(user, populatedSubmission);
    } catch (emailError) {
      console.error(
        "Failed to send submission confirmation email:",
        emailError
      );
      // Don't fail the submission if email fails
    }

    return populatedSubmission;
  }

  /**
   * Get submissions list
   */
  async getSubmissions(filters = {}, options = {}) {
    const defaultOptions = {
      page: 1,
      limit: 10,
      sort: { createdAt: -1 },
      populate: ["submittedBy", "category"],
    };

    const mergedOptions = { ...defaultOptions, ...options };

    return await submissionRepository.findWithFilters(filters, mergedOptions);
  }

  /**
   * Get submission by ID
   */
  async getSubmissionById(id) {
    const submission = await submissionRepository.findById(id, [
      "submittedBy",
      "category",
      "judgeAssignments.judge",
      "scores.judge",
    ]);

    if (!submission) {
      throw new Error("Submission not found");
    }

    return submission;
  }

  /**
   * Update submission
   */
  async updateSubmission(id, userId, updateData, userRole) {
    const submission = await submissionRepository.findById(id);
    if (!submission) {
      throw new Error("Submission not found");
    }

    // Check permissions
    const isOwner = submission.submittedBy.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new Error("Not authorized to update this submission");
    }

    // Owners can only edit if status is draft or submitted
    if (isOwner && !["draft", "submitted"].includes(submission.status)) {
      throw new Error("Cannot edit submission after it has been reviewed");
    }

    // Check StoryMap URL if being changed
    if (
      updateData.storyMapUrl &&
      updateData.storyMapUrl !== submission.storyMapUrl
    ) {
      const existingSubmission = await submissionRepository.storyMapExists(
        updateData.storyMapUrl,
        id
      );
      if (existingSubmission) {
        throw new Error("This StoryMap URL has already been submitted");
      }
    }

    // Verify category if being changed
    if (
      updateData.category &&
      updateData.category !== submission.category.toString()
    ) {
      const category = await categoryRepository.findById(updateData.category);
      if (!category || !category.isActive) {
        throw new Error("Invalid or inactive category");
      }
    }

    const updatedSubmission = await submissionRepository.updateById(
      id,
      updateData
    );

    return await submissionRepository.findById(updatedSubmission._id, [
      "submittedBy",
      "category",
    ]);
  }

  /**
   * Delete submission
   */
  async deleteSubmission(id, userId, userRole) {
    const submission = await submissionRepository.findById(id);
    if (!submission) {
      throw new Error("Submission not found");
    }

    // Check permissions
    const isOwner = submission.submittedBy.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new Error("Not authorized to delete this submission");
    }

    // Delete submission
    await submissionRepository.deleteById(id);

    // Update counters
    await Promise.all([
      userRepository.decrementSubmissionCount(submission.submittedBy),
      categoryRepository.decrementSubmissionCount(submission.category),
    ]);

    return { message: "Submission deleted successfully" };
  }

  /**
   * Get user's submissions
   */
  async getUserSubmissions(userId, page = 1, limit = 10) {
    return await submissionRepository.findByUser(userId, page, limit);
  }

  /**
   * Get submissions by category
   */
  async getSubmissionsByCategory(categoryId, page = 1, limit = 10) {
    return await submissionRepository.findByCategory(categoryId, page, limit);
  }

  /**
   * Get top submissions
   */
  async getTopSubmissions(limit = 10, categoryId = null) {
    return await submissionRepository.getTopSubmissions(limit, categoryId);
  }

  /**
   * Search submissions
   */
  async searchSubmissions(searchTerm, filters = {}, page = 1, limit = 10) {
    return await submissionRepository.search(searchTerm, filters, page, limit);
  }

  /**
   * Get submission statistics
   */
  async getSubmissionStats() {
    return await submissionRepository.getStats();
  }

  /**
   * Update submission status (Admin only)
   */
  async updateSubmissionStatus(id, status, adminNotes = null) {
    const validStatuses = [
      "draft",
      "submitted",
      "under_review",
      "approved",
      "rejected",
      "winner",
    ];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const updateData = { status };

    if (adminNotes) {
      updateData.$push = {
        adminNotes: {
          note: adminNotes,
          addedAt: new Date(),
        },
      };
    }

    const updatedSubmission = await submissionRepository.updateById(
      id,
      updateData
    );
    if (!updatedSubmission) {
      throw new Error("Submission not found");
    }

    return updatedSubmission;
  }
}

module.exports = new SubmissionService();
