// services/categoryService.js
const categoryRepository = require("../repositories/categoryRepository");

/**
 * Category Service - Business Logic Layer
 */
class CategoryService {
  /**
   * Get all active categories
   */
  async getActiveCategories() {
    return await categoryRepository.findActive();
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  /**
   * Get category statistics
   */
  async getCategoryStats(categoryId) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    // Get submission count for this category
    const submissionRepository = require("../repositories/submissionRepository");
    const submissionStats = await submissionRepository.findWithFilters(
      { category: categoryId },
      { page: 1, limit: 1 }
    );

    return {
      category,
      totalSubmissions: submissionStats.total,
      approvedSubmissions: await submissionRepository
        .findWithFilters(
          { category: categoryId, status: "approved" },
          { page: 1, limit: 1 }
        )
        .then((result) => result.total),
    };
  }

  /**
   * Get all categories (Admin only)
   */
  async getAllCategories(page = 1, limit = 10) {
    return await categoryRepository.findWithPagination({}, page, limit);
  }

  /**
   * Create category (Admin only)
   */
  async createCategory(categoryData) {
    // Check if name already exists
    const existingCategory = await categoryRepository.nameExists(
      categoryData.name
    );
    if (existingCategory) {
      throw new Error("Category name already exists");
    }

    return await categoryRepository.create(categoryData);
  }

  /**
   * Update category (Admin only)
   */
  async updateCategory(categoryId, updateData) {
    // Check if name already exists (excluding current category)
    if (updateData.name) {
      const existingCategory = await categoryRepository.nameExists(
        updateData.name,
        categoryId
      );
      if (existingCategory) {
        throw new Error("Category name already exists");
      }
    }

    const updatedCategory = await categoryRepository.updateById(
      categoryId,
      updateData
    );
    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return updatedCategory;
  }

  /**
   * Delete category (Admin only)
   */
  async deleteCategory(categoryId) {
    // Check if category has submissions
    const submissionRepository = require("../repositories/submissionRepository");
    const categorySubmissions = await submissionRepository.findWithFilters(
      { category: categoryId },
      { page: 1, limit: 1 }
    );

    if (categorySubmissions.total > 0) {
      throw new Error("Cannot delete category with existing submissions");
    }

    const deletedCategory = await categoryRepository.deleteById(categoryId);
    if (!deletedCategory) {
      throw new Error("Category not found");
    }

    return deletedCategory;
  }

  /**
   * Toggle category status (Admin only)
   */
  async toggleCategoryStatus(categoryId) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    return await categoryRepository.updateById(categoryId, {
      isActive: !category.isActive,
    });
  }
}

module.exports = new CategoryService();
