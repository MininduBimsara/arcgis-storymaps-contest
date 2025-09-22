// controllers/submissionController.js - Updated with ArcGIS Integration
const submissionService = require("../services/submissionService");
const { responseHandler } = require("../utils/responseHandler");
const { asyncHandler } = require("../middleware/errorHandler");
const PaginationHelper = require("../utils/pagination");

/**
 * Submission Controller - HTTP Request Handlers with ArcGIS Integration
 */
class SubmissionController {
  /**
   * Create a new submission
   * POST /api/v1/submissions
   */
  createSubmission = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const submissionData = req.body;

    // Handle uploaded files if any
    if (req.files) {
      if (req.files.thumbnail) {
        submissionData.thumbnailUrl = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
      }
      if (req.files.previews) {
        submissionData.previewImages = req.files.previews.map(
          (file) => `/uploads/previews/${file.filename}`
        );
      }
    }

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

    // Apply role-based filters
    if (req.user.role === "user") {
      // Regular users can see approved/public submissions and their own
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
   * Get public submissions (for non-authenticated users)
   * GET /api/v1/submissions/public
   */
  getPublicSubmissions = asyncHandler(async (req, res) => {
    const pagination = PaginationHelper.getParams(req);
    const filters = {
      status: "approved",
      isPublic: true,
    };

    if (req.query.category) filters.category = req.query.category;
    if (req.query.region) filters.region = req.query.region;

    const options = {
      page: pagination.page,
      limit: pagination.limit,
      sort: { averageScore: -1, createdAt: -1 },
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
   * Get submission by ID
   * GET /api/v1/submissions/:id
   */
  getSubmissionById = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;

    const submission = await submissionService.getSubmissionById(submissionId);

    // Check access permissions
    const isOwner =
      req.user && submission.submittedBy._id.toString() === req.user.id;
    const isAdmin = req.user && req.user.role === "admin";
    const isPublic = submission.status === "approved" && submission.isPublic;

    if (!isOwner && !isAdmin && !isPublic) {
      return responseHandler.error(res, "Access denied", 403);
    }

    return responseHandler.success(res, "Submission retrieved successfully", {
      submission,
    });
  });

  /**
   * Get ArcGIS StoryMap embed data
   * GET /api/v1/submissions/:id/storymap
   */
  getStoryMapEmbed = asyncHandler(async (req, res) => {
    const submissionId = req.params.id;

    const submission = await submissionService.getSubmissionById(submissionId);

    // Check if submission is public or user has access
    const isOwner =
      req.user && submission.submittedBy._id.toString() === req.user.id;
    const isAdmin = req.user && req.user.role === "admin";
    const isPublic = submission.status === "approved" && submission.isPublic;

    if (!isOwner && !isAdmin && !isPublic) {
      return responseHandler.error(res, "Access denied", 403);
    }

    // Extract StoryMap ID from URL for embedding
    const storyMapId = submission.storyMapId;
    const embedUrl = `https://storymaps.arcgis.com/stories/${storyMapId}`;

    // Return embed configuration
    const embedConfig = {
      storyMapId,
      embedUrl,
      embedHtml: `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" allowfullscreen allow="geolocation"></iframe>`,
      title: submission.title,
      description: submission.description,
      thumbnail: submission.thumbnailUrl,
    };

    return responseHandler.success(
      res,
      "StoryMap embed data retrieved successfully",
      { embed: embedConfig }
    );
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

    // Handle uploaded files if any
    if (req.files) {
      if (req.files.thumbnail) {
        updateData.thumbnailUrl = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
      }
      if (req.files.previews) {
        updateData.previewImages = req.files.previews.map(
          (file) => `/uploads/previews/${file.filename}`
        );
      }
    }

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
   * Bulk approve submissions (Admin only)
   * POST /api/v1/submissions/bulk-approve
   */
  bulkApproveSubmissions = asyncHandler(async (req, res) => {
    const { submissionIds } = req.body;

    const result = await submissionService.bulkApproveSubmissions(
      submissionIds
    );

    return responseHandler.success(
      res,
      "Submissions bulk approved successfully",
      result
    );
  });
}

module.exports = new SubmissionController();
