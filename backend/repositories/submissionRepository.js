// repositories/submissionRepository.js
const Submission = require("../models/Submission");

/**
 * Submission Repository - Data Access Layer
 */
class SubmissionRepository {
  /**
   * Create a new submission
   */
  async create(submissionData) {
    const submission = new Submission(submissionData);
    return await submission.save();
  }

  /**
   * Find submission by ID with population
   */
  async findById(id, populate = []) {
    let query = Submission.findById(id);

    if (populate.length > 0) {
      populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return await query;
  }

  /**
   * Find submissions with filters and pagination
   */
  async findWithFilters(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = { createdAt: -1 },
      populate = [],
    } = options;

    const skip = (page - 1) * limit;

    let query = Submission.find(filters);

    // Apply population
    populate.forEach((field) => {
      query = query.populate(field);
    });

    const [submissions, total] = await Promise.all([
      query.sort(sort).skip(skip).limit(limit),
      Submission.countDocuments(filters),
    ]);

    return {
      submissions,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Find submissions by user
   */
  async findByUser(userId, page = 1, limit = 10) {
    return await this.findWithFilters(
      { submittedBy: userId },
      {
        page,
        limit,
        populate: ["category"],
      }
    );
  }

  /**
   * Find submissions by category
   */
  async findByCategory(categoryId, page = 1, limit = 10) {
    return await this.findWithFilters(
      { category: categoryId, status: "approved" },
      {
        page,
        limit,
        populate: ["submittedBy", "category"],
        sort: { averageScore: -1 },
      }
    );
  }

  /**
   * Update submission by ID
   */
  async updateById(id, updateData) {
    return await Submission.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete submission by ID
   */
  async deleteById(id) {
    return await Submission.findByIdAndDelete(id);
  }

  /**
   * Check if StoryMap URL exists
   */
  async storyMapExists(storyMapUrl, excludeId = null) {
    const filters = { storyMapUrl };
    if (excludeId) {
      filters._id = { $ne: excludeId };
    }

    const submission = await Submission.findOne(filters);
    return !!submission;
  }

  /**
   * Get top submissions
   */
  async getTopSubmissions(limit = 10, categoryId = null) {
    const filters = {
      status: "approved",
      averageScore: { $exists: true },
    };

    if (categoryId) {
      filters.category = categoryId;
    }

    return await Submission.find(filters)
      .populate("submittedBy", "firstName lastName organization country")
      .populate("category", "name")
      .sort({ averageScore: -1 })
      .limit(limit);
  }

  /**
   * Get submission statistics
   */
  async getStats() {
    try {
      return await Submission.getSubmissionStats();
    } catch (error) {
      console.error("Repository error getting submission stats:", error);
      // Return default stats if database query fails
      return {
        total: 0,
        draft: 0,
        submitted: 0,
        under_review: 0,
        approved: 0,
        rejected: 0,
        winner: 0,
        byCategory: [],
      };
    }
  }

  /**
   * Assign judge to submission
   */
  async assignJudge(submissionId, judgeId) {
    return await Submission.findByIdAndUpdate(
      submissionId,
      {
        $push: {
          judgeAssignments: {
            judge: judgeId,
            assignedAt: new Date(),
            status: "assigned",
          },
        },
      },
      { new: true }
    );
  }

  /**
   * Add score to submission
   */
  async addScore(submissionId, scoreData) {
    return await Submission.findByIdAndUpdate(
      submissionId,
      { $push: { scores: scoreData } },
      { new: true }
    );
  }

  /**
   * Search submissions
   */
  async search(searchTerm, filters = {}, page = 1, limit = 10) {
    const searchFilters = {
      ...filters,
      $text: { $search: searchTerm },
    };

    return await this.findWithFilters(searchFilters, {
      page,
      limit,
      populate: ["submittedBy", "category"],
      sort: { score: { $meta: "textScore" } },
    });
  }
}

module.exports = new SubmissionRepository();
