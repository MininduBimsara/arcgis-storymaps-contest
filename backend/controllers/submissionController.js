// controllers/submissionController.js - Final version with no pagination import
const submissionService = require("../services/submissionService");
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
 * Submission Controller - HTTP Request Handlers
 */
class SubmissionController {
  /**
   * Create a new submission
   * POST /api/v1/submissions
   */
  createSubmission = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const submissionData = req.body;

    const submission = await submissionService.createSubmission(
      userId,
      submissionData
    );

    return responseHandler.created(res, "Submission created successfully", {
      submission,
    });
  });

  /**
   * Get submissions list
   * GET /api/v1/submissions
   */
  getSubmissions = asyncHandler(async (req, res) => {
    const pagination = PaginationHelper.getParams(req);
    const filters = {};

    // Apply filters based on user role
    if (req.user.role === "user") {
      // Users can only see approved/public submissions and their own
      filters.$or = [
        { status: "approved", isPublic: true },
        { submittedBy: req.user.id },
      ];
    }
    // Admins can see all submissions (no additional filters)

    // Additional filters from query params
    if (req.query.category) filters.category = req.query.category;
    if (req.query.status && req.user.role === "admin")
      filters.status = req.query.status;
    if (req.query.region) filters.region = req.query.region;
    if (req.query.submissionYear)
      filters.submissionYear = parseInt(req.query.submissionYear);

    const options = {
      page: pagination.page,
      limit: pagination.limit,
      sort: req.query.sortBy
        ? { [req.query.sortBy]: req.query.order === "asc" ? 1 : -1 }
        : { createdAt: -1 },
      populate: ["submittedBy", "category"],
    };

    const result = await submissionService.getSubmissions(filters, options);

    return responseHandler.paginated(
      res,
      result.submissions,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Submissions retrieved successfully"
    );
  });

  /**
   * Get submission by ID
   * GET /api/v1/submissions/:id
   */
  getSubmissionById = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;

    const submission = await submissionService.getSubmissionById(submissionId);

    // Check access permissions
    let hasAccess = false;

    // Public access for approved submissions
    if (submission.status === "approved" && submission.isPublic) {
      hasAccess = true;
    }

    // Owner access
    if (req.user && submission.submittedBy._id.toString() === req.user.id) {
      hasAccess = true;
    }

    // Admin access
    if (req.user && req.user.role === "admin") {
      hasAccess = true;
    }

    if (!hasAccess) {
      return responseHandler.error(res, "Access denied", 403);
    }

    return responseHandler.success(res, "Submission retrieved successfully", {
      submission,
    });
  });

  /**
   * Update submission
   * PUT /api/v1/submissions/:id
   */
  updateSubmission = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    const updateData = req.body;

    const updatedSubmission = await submissionService.updateSubmission(
      submissionId,
      userId,
      updateData,
      userRole
    );

    return responseHandler.success(res, "Submission updated successfully", {
      submission: updatedSubmission,
    });
  });

  /**
   * Delete submission
   * DELETE /api/v1/submissions/:id
   */
  deleteSubmission = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    await submissionService.deleteSubmission(submissionId, userId, userRole);

    return responseHandler.success(res, "Submission deleted successfully");
  });

  /**
   * Get user's submissions
   * GET /api/v1/submissions/my-submissions
   */
  getMySubmissions = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const pagination = PaginationHelper.getParams(req);

    const result = await submissionService.getUserSubmissions(
      userId,
      pagination.page,
      pagination.limit
    );

    return responseHandler.paginated(
      res,
      result.submissions,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Your submissions retrieved successfully"
    );
  });

  /**
   * Get submissions by category
   * GET /api/v1/submissions/category/:categoryId
   */
  getSubmissionsByCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const pagination = PaginationHelper.getParams(req);

    const result = await submissionService.getSubmissionsByCategory(
      categoryId,
      pagination.page,
      pagination.limit
    );

    return responseHandler.paginated(
      res,
      result.submissions,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Category submissions retrieved successfully"
    );
  });

  /**
   * Get top submissions
   * GET /api/v1/submissions/top
   */
  getTopSubmissions = asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const categoryId = req.query.category || null;

    const submissions = await submissionService.getTopSubmissions(
      limit,
      categoryId
    );

    return responseHandler.success(
      res,
      "Top submissions retrieved successfully",
      { submissions }
    );
  });

  /**
   * Search submissions
   * GET /api/v1/submissions/search
   */
  searchSubmissions = asyncHandler(async (req, res) => {
    const { q: searchTerm } = req.query;
    const pagination = PaginationHelper.getParams(req);

    if (!searchTerm) {
      return responseHandler.error(res, "Search term is required", 400);
    }

    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.region) filters.region = req.query.region;

    // Apply role-based filters
    if (!req.user || req.user.role === "user") {
      filters.status = "approved";
      filters.isPublic = true;
    }

    const result = await submissionService.searchSubmissions(
      searchTerm,
      filters,
      pagination.page,
      pagination.limit
    );

    return responseHandler.paginated(
      res,
      result.submissions,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Submissions search completed"
    );
  });

  /**
   * Get submission statistics (Admin only)
   * GET /api/v1/submissions/stats
   */
  getSubmissionStats = asyncHandler(async (req, res) => {
    const stats = await submissionService.getSubmissionStats();

    return responseHandler.success(
      res,
      "Submission statistics retrieved successfully",
      { stats }
    );
  });

  /**
   * Update submission status (Admin only)
   * POST /api/v1/submissions/:id/status
   */
  updateSubmissionStatus = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;
    const { status, adminNotes } = req.body;

    const updatedSubmission = await submissionService.updateSubmissionStatus(
      submissionId,
      status,
      adminNotes
    );

    return responseHandler.success(
      res,
      "Submission status updated successfully",
      { submission: updatedSubmission }
    );
  });

  /**
   * Get public submissions (approved and public)
   * GET /api/v1/submissions/public
   */
  getPublicSubmissions = asyncHandler(async (req, res) => {
    const pagination = PaginationHelper.getParams(req);

    const filters = {
      status: "approved",
      isPublic: true,
    };

    // Additional filters from query params
    if (req.query.category) filters.category = req.query.category;
    if (req.query.region) filters.region = req.query.region;
    if (req.query.submissionYear)
      filters.submissionYear = parseInt(req.query.submissionYear);

    const options = {
      page: pagination.page,
      limit: pagination.limit,
      sort: req.query.sortBy
        ? { [req.query.sortBy]: req.query.order === "asc" ? 1 : -1 }
        : { createdAt: -1 },
      populate: ["submittedBy", "category"],
    };

    const result = await submissionService.getSubmissions(filters, options);

    return responseHandler.paginated(
      res,
      result.submissions,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "Public submissions retrieved successfully"
    );
  });

  /**
   * Get ArcGIS StoryMap embed data
   * GET /api/v1/submissions/:id/storymap
   */
  getStoryMapEmbed = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;

    const submission = await submissionService.getSubmissionById(submissionId);

    // Check if submission is public or user has access
    const hasAccess =
      (submission.status === "approved" && submission.isPublic) ||
      (req.user &&
        (submission.submittedBy._id.toString() === req.user.id ||
          req.user.role === "admin"));

    if (!hasAccess) {
      return responseHandler.error(res, "Access denied", 403);
    }

    // Ensure StoryMap ID is available; derive from URL if not stored
    let storyMapId = submission.storyMapId;
    if (!storyMapId && submission.storyMapUrl) {
      try {
        const parsed = new URL(submission.storyMapUrl);
        const host = parsed.hostname;
        const pathname = parsed.pathname.replace(/\/$/, "");
        if (host === "arcg.is") {
          const parts = pathname.split("/").filter(Boolean);
          if (parts[0]) storyMapId = parts[0];
        } else if (host === "storymaps.arcgis.com") {
          const parts = pathname.split("/").filter(Boolean);
          const idx = parts.indexOf("stories");
          if (idx !== -1 && parts[idx + 1]) storyMapId = parts[idx + 1];
        }
      } catch (_) {}
    }

    // Return embed data
    const embedData = {
      storyMapId,
      storyMapUrl: submission.storyMapUrl,
      embedUrl: `https://storymaps.arcgis.com/stories/${storyMapId}/embed`,
      iframeHtml: `<iframe src="https://storymaps.arcgis.com/stories/${storyMapId}/embed" width="100%" height="600" frameborder="0" scrolling="no"></iframe>`,
      title: submission.title,
      description: submission.description,
    };

    return responseHandler.success(
      res,
      "StoryMap embed data retrieved successfully",
      embedData
    );
  });

  /**
   * Bulk approve submissions (Admin only)
   * POST /api/v1/submissions/bulk-approve
   */
  bulkApproveSubmissions = asyncHandler(async (req, res) => {
    const { submissionIds } = req.body;

    const results = await submissionService.bulkApproveSubmissions(
      submissionIds
    );

    return responseHandler.success(
      res,
      `Bulk approval completed. ${results.approved} submissions approved, ${results.failed.length} failed.`,
      results
    );
  });
}

module.exports = new SubmissionController();
