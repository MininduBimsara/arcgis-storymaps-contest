// repositories/categoryRepository.js - Fixed version
const Category = require("../models/Category");
const slugify = require("slugify");

/**
 * Category Repository - Data Access Layer
 */
class CategoryRepository {
  /**
   * Create a new category
   */
  async create(categoryData) {
    // Generate slug if not provided
    if (!categoryData.slug && categoryData.name) {
      categoryData.slug = slugify(categoryData.name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });
    }

    const category = new Category(categoryData);
    return await category.save();
  }

  /**
   * Find category by ID
   */
  async findById(id) {
    return await Category.findById(id);
  }

  /**
   * Find category by slug
   */
  async findBySlug(slug) {
    return await Category.findOne({ slug });
  }

  /**
   * Find all active categories
   */
  async findActive() {
    return await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
  }

  /**
   * Find with pagination
   */
  async findWithPagination(filters = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Category.find(filters)
        .sort({ order: 1, name: 1 })
        .skip(skip)
        .limit(limit),
      Category.countDocuments(filters),
    ]);

    return {
      categories,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Update category by ID
   */
  async updateById(id, updateData) {
    // Generate slug if name is being updated
    if (updateData.name && !updateData.slug) {
      updateData.slug = slugify(updateData.name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });
    }

    return await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete category by ID
   */
  async deleteById(id) {
    return await Category.findByIdAndDelete(id);
  }

  /**
   * Check if category name exists
   */
  async nameExists(name, excludeId = null) {
    const filters = { name: new RegExp(`^${name}$`, "i") };
    if (excludeId) {
      filters._id = { $ne: excludeId };
    }

    const category = await Category.findOne(filters);
    return !!category;
  }

  /**
   * Find all categories sorted by order (for admin panel)
   * This method returns all categories without pagination
   */
  async findAllSorted() {
    return await Category.find({}).sort({ order: 1, name: 1 });
  }

  /**
   * Get category statistics
   */
  async getStats() {
    const [totalCategories, activeCategories, totalSubmissions] =
      await Promise.all([
        Category.countDocuments(),
        Category.countDocuments({ isActive: true }),
        Category.aggregate([
          { $group: { _id: null, total: { $sum: "$submissionCount" } } },
        ]),
      ]);

    return {
      totalCategories,
      findAllSorted,
      activeCategories,
      totalSubmissions: totalSubmissions[0]?.total || 0,
    };
  }
}

module.exports = new CategoryRepository();
