// routes/submissions.js
const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { submissionValidator } = require("../validators/submissionValidator");
const { uploadConfigs } = require("../utils/fileUpload");
const { submissionLimiter } = require("../middleware/security");
const {
  requireEmailVerification,
  requireTermsAgreement,
  checkSubmissionLimit,
} = require("../middleware/authMiddleware");

/**
 * Submission Routes
 */

// Public routes
// @desc    Get approved submissions
// @route   GET /api/v1/submissions/public
// @access  Public
router.get("/public", submissionController.getPublicSubmissions);

// @desc    Get top submissions
// @route   GET /api/v1/submissions/top
// @access  Public
router.get("/top", submissionController.getTopSubmissions);

// @desc    Get submissions by category
// @route   GET /api/v1/submissions/category/:categoryId
// @access  Public
router.get(
  "/category/:categoryId",
  submissionController.getSubmissionsByCategory
);

// @desc    Search submissions
// @route   GET /api/v1/submissions/search
// @access  Public
router.get("/search", submissionController.searchSubmissions);

// @desc    Get single submission (public if approved)
// @route   GET /api/v1/submissions/:id
// @access  Public
router.get("/:id", submissionController.getSubmissionById);

// Authenticated routes
// @desc    Get all submissions (with role-based filtering)
// @route   GET /api/v1/submissions
// @access  Private
router.get("/", protect, submissionController.getSubmissions);

// @desc    Create new submission
// @route   POST /api/v1/submissions
// @access  Private
router.post(
  "/",
  protect,
  requireEmailVerification,
  requireTermsAgreement,
  checkSubmissionLimit,
  submissionLimiter,
  uploadConfigs.submission,
  submissionValidator.create,
  submissionController.createSubmission
);

// @desc    Get current user's submissions
// @route   GET /api/v1/submissions/my-submissions
// @access  Private
router.get("/my-submissions", protect, submissionController.getMySubmissions);

// @desc    Update submission
// @route   PUT /api/v1/submissions/:id
// @access  Private
router.put(
  "/:id",
  protect,
  uploadConfigs.submission,
  submissionValidator.update,
  submissionController.updateSubmission
);

// @desc    Delete submission
// @route   DELETE /api/v1/submissions/:id
// @access  Private
router.delete("/:id", protect, submissionController.deleteSubmission);

// @desc    Get ArcGIS StoryMap embed data
// @route   GET /api/v1/submissions/:id/storymap
// @access  Public (if submission is approved)
router.get("/:id/storymap", submissionController.getStoryMapEmbed);

// Admin only routes
// @desc    Get submission statistics
// @route   GET /api/v1/submissions/stats
// @access  Private/Admin
router.get(
  "/stats",
  protect,
  adminOnly,
  submissionController.getSubmissionStats
);

// @desc    Update submission status
// @route   POST /api/v1/submissions/:id/status
// @access  Private/Admin
router.post(
  "/:id/status",
  protect,
  adminOnly,
  submissionValidator.updateStatus,
  submissionController.updateSubmissionStatus
);

// @desc    Bulk approve submissions
// @route   POST /api/v1/submissions/bulk-approve
// @access  Private/Admin
router.post(
  "/bulk-approve",
  protect,
  adminOnly,
  submissionValidator.bulkApprove,
  submissionController.bulkApproveSubmissions
);

module.exports = router;
