// src/utils/pagination.js
/**
 * Pagination utility for consistent pagination across endpoints
 */
class PaginationHelper {
  /**
   * Get pagination parameters from request
   * @param {Object} req - Express request object
   * @param {Object} defaults - Default pagination values
   */
  static getParams(req, defaults = {}) {
    const page = Math.max(1, parseInt(req.query.page) || defaults.page || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit) || defaults.limit || 10)
    );
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  /**
   * Apply pagination to Mongoose query
   * @param {Object} query - Mongoose query object
   * @param {Object} pagination - Pagination parameters
   */
  static apply(query, pagination) {
    return query.skip(pagination.skip).limit(pagination.limit);
  }

  /**
   * Get pagination metadata
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @param {number} total - Total items count
   */
  static getMeta(page, limit, total) {
    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
      nextPage: page < pages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }
}

module.exports = PaginationHelper;
