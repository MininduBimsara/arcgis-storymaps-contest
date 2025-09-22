// repositories/judgeRepository.js
const Judge = require("../models/Judge");
const User = require("../models/User");

/**
 * Judge Repository - Data Access Layer
 */
class JudgeRepository {
  /**
   * Create a new judge
   */
  async create(judgeData) {
    const judge = new Judge(judgeData);
    return await judge.save();
  }

  /**
   * Find judge by user ID
   */
  async findByUserId(userId) {
    return await Judge.findOne({ user: userId })
      .populate("user", "firstName lastName email")
      .populate("categories", "name");
  }

  /**
   * Find judge by ID
   */
  async findById(id) {
    return await Judge.findById(id)
      .populate("user", "firstName lastName email")
      .populate("categories", "name");
  }

  /**
   * Find available judges for category
   */
  async findAvailableForCategory(categoryId, limit = null) {
    return await Judge.findAvailableForCategory(categoryId, limit);
  }

  /**
   * Get all judges with pagination
   */
  async findWithPagination(filters = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [judges, total] = await Promise.all([
      Judge.find(filters)
        .populate("user", "firstName lastName email")
        .populate("categories", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Judge.countDocuments(filters),
    ]);

    return {
      judges,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Update judge by ID
   */
  async updateById(id, updateData) {
    return await Judge.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("user", "firstName lastName email");
  }

  /**
   * Assign submission to judge
   */
  async assignSubmission(judgeId) {
    return await Judge.findByIdAndUpdate(
      judgeId,
      { $inc: { currentAssignments: 1 } },
      { new: true }
    );
  }

  /**
   * Complete assignment for judge
   */
  async completeAssignment(judgeId) {
    const judge = await Judge.findById(judgeId);
    if (judge && judge.currentAssignments > 0) {
      judge.currentAssignments -= 1;
      judge.totalSubmissionsJudged += 1;
      return await judge.save();
    }
    return judge;
  }

  /**
   * Get judge statistics
   */
  async getStats() {
    return await Judge.getJudgeStats();
  }

  /**
   * Update availability
   */
  async updateAvailability(judgeId, isAvailable) {
    return await Judge.findByIdAndUpdate(
      judgeId,
      { isAvailable },
      { new: true }
    );
  }
}

module.exports = new JudgeRepository();
