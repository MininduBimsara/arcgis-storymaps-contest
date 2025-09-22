// controllers/categoryController.js
const categoryService = require("../services/categoryService");
const { responseHandler } = require("../utils/responseHandler");
const { asyncHandler } = require("../middleware/errorHandler");
const PaginationHelper = require("../utils/pagination");

/**
 * Category Controller - HTTP Request Handlers
 */
class CategoryController {
  /**
   * Get all active categories
   * GET /api/v1/categories
   */
  getActiveCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getActiveCategories();

    return responseHandler.success(
      res,
      "Active categories retrieved successfully",
      { categories }
    );
  });

  /**
   * Get category by slug
   * GET /api/v1/categories/slug/:slug
   */
  getCategoryBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const category = await categoryService.getCategoryBySlug(slug);

    return responseHandler.success(res, "Category retrieved successfully", {
      category,
    });
  });

  /**
   * Get category statistics
   * GET /api/v1/categories/:id/stats
   */
  getCategoryStats = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    const stats = await categoryService.getCategoryStats(categoryId);

    return responseHandler.success(
      res,
      "Category statistics retrieved successfully",
      { stats }
    );
  });

  /**
   * Get all categories including inactive (Admin only)
   * GET /api/v1/categories/admin/all
   */
  getAllCategories = asyncHandler(async (req, res) => {
    const pagination = PaginationHelper.getParams(req);

    const result = await categoryService.getAllCategories(
      pagination.page,
      pagination.limit
    );

    return responseHandler.paginated(
      res,
      result.categories,
      {
        page: result.page,
        limit: pagination.limit,
        total: result.total,
      },
      "All categories retrieved successfully"
    );
  });

  /**
   * Create category (Admin only)
   * POST /api/v1/categories
   */
  createCategory = asyncHandler(async (req, res) => {
    const categoryData = req.body;

    const category = await categoryService.createCategory(categoryData);

    return responseHandler.created(res, "Category created successfully", {
      category,
    });
  });

  /**
   * Update category (Admin only)
   * PUT /api/v1/categories/:id
   */
  updateCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const updateData = req.body;

    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      updateData
    );

    return responseHandler.success(res, "Category updated successfully", {
      category: updatedCategory,
    });
  });

  /**
   * Delete category (Admin only)
   * DELETE /api/v1/categories/:id
   */
  deleteCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    await categoryService.deleteCategory(categoryId);

    return responseHandler.success(res, "Category deleted successfully");
  });

  /**
   * Toggle category status (Admin only)
   * POST /api/v1/categories/:id/toggle
   */
  toggleCategoryStatus = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    const updatedCategory = await categoryService.toggleCategoryStatus(
      categoryId
    );

    return responseHandler.success(
      res,
      "Category status toggled successfully",
      { category: updatedCategory }
    );
  });
}

module.exports = new CategoryController();
