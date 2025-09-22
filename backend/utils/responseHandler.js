/**
 * Standardized response handler for consistent API responses
 */
class ResponseHandler {
  /**
   * Send success response
   * @param {Object} res - Express response object
   * @param {string} message - Success message
   * @param {*} data - Response data
   * @param {number} statusCode - HTTP status code
   */
  static success(res, message = "Success", data = null, statusCode = 200) {
    const response = {
      success: true,
      message,
      ...(data && { data }),
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {*} data - Additional error data
   */
  static error(
    res,
    message = "Internal Server Error",
    statusCode = 500,
    data = null
  ) {
    const response = {
      success: false,
      error: message,
      ...(data && { data }),
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send paginated response
   * @param {Object} res - Express response object
   * @param {Array} data - Response data array
   * @param {Object} pagination - Pagination info
   * @param {string} message - Success message
   */
  static paginated(
    res,
    data,
    pagination,
    message = "Data retrieved successfully"
  ) {
    const response = {
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        pages: Math.ceil(pagination.total / pagination.limit),
        hasNext:
          pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1,
      },
      timestamp: new Date().toISOString(),
    };

    return res.status(200).json(response);
  }

  /**
   * Send created response
   * @param {Object} res - Express response object
   * @param {string} message - Success message
   * @param {*} data - Created resource data
   */
  static created(res, message = "Resource created successfully", data = null) {
    return this.success(res, message, data, 201);
  }

  /**
   * Send no content response
   * @param {Object} res - Express response object
   */
  static noContent(res) {
    return res.status(204).send();
  }
}

module.exports = { responseHandler: ResponseHandler };
