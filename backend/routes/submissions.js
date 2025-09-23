// routes/submissions.js - Clean version with no file upload imports
const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { submissionValidator } = require("../validators/submissionValidator");
const { submissionLimiter } = require("../middleware/security");
const {
  requireEmailVerification,
  checkSubmissionLimit,
} = require("../middleware/authMiddleware");

/**
 * Submission Routes
 */

// Public routes - NO authentication required (order matters - specific routes first)
// @desc    Get top submissions
// @route   GET /api/v1/submissions/top
// @access  Public
router.get("/top", submissionController.getTopSubmissions);

// @desc    Get approved submissions
// @route   GET /api/v1/submissions/public
// @access  Public
router.get("/public", submissionController.getPublicSubmissions);

// @desc    Search submissions
// @route   GET /api/v1/submissions/search
// @access  Public
router.get("/search", submissionController.searchSubmissions);

// @desc    Get submissions by category
// @route   GET /api/v1/submissions/category/:categoryId
// @access  Public
router.get(
  "/category/:categoryId",
  submissionController.getSubmissionsByCategory
);

// Authenticated routes (specific routes first)
// @desc    Get current user's submissions
// @route   GET /api/v1/submissions/my-submissions
// @access  Private
router.get("/my-submissions", protect, submissionController.getMySubmissions);

// @desc    Get submission statistics (Admin only)
// @route   GET /api/v1/submissions/stats
// @access  Private/Admin
router.get(
  "/stats",
  protect,
  adminOnly,
  submissionController.getSubmissionStats
);

// @desc    Bulk approve submissions (Admin only)
// @route   POST /api/v1/submissions/bulk-approve
// @access  Private/Admin
router.post(
  "/bulk-approve",
  protect,
  adminOnly,
  submissionValidator.bulkApprove,
  submissionController.bulkApproveSubmissions
);

// @desc    Create new submission
// @route   POST /api/v1/submissions
// @access  Private
router.post(
  "/",
  protect,
  requireEmailVerification,
  checkSubmissionLimit,
  submissionLimiter,
  submissionValidator.create,
  submissionController.createSubmission
);

// @desc    Get all submissions (with role-based filtering)
// @route   GET /api/v1/submissions
// @access  Private
router.get("/", protect, submissionController.getSubmissions);

// @desc    Get ArcGIS StoryMap embed data
// @route   GET /api/v1/submissions/:id/storymap
// @access  Public (if submission is approved)
router.get("/:id/storymap", submissionController.getStoryMapEmbed);

// @desc    Update submission status (Admin only)
// @route   POST /api/v1/submissions/:id/status
// @access  Private/Admin
router.post(
  "/:id/status",
  protect,
  adminOnly,
  submissionValidator.updateStatus,
  submissionController.updateSubmissionStatus
);

// @desc    Update submission
// @route   PUT /api/v1/submissions/:id
// @access  Private
router.put(
  "/:id",
  protect,
  submissionValidator.update,
  submissionController.updateSubmission
);

// @desc    Delete submission
// @route   DELETE /api/v1/submissions/:id
// @access  Private
router.delete("/:id", protect, submissionController.deleteSubmission);

// @desc    Get single submission (public if approved) - MUST BE LAST
// @route   GET /api/v1/submissions/:id
// @access  Public/Private
router.get("/:id", submissionController.getSubmissionById);

module.exports = router;
