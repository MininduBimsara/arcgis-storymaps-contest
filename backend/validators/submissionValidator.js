// validators/submissionValidator.js - Fixed version
const Joi = require("joi");
const { responseHandler } = require("../utils/responseHandler");

/**
 * Submission validation middleware
 */
class SubmissionValidator {
  create = (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required().min(5).max(100).trim(),
      description: Joi.string().required().min(50).max(1000).trim(),
      storyMapUrl: Joi.string()
        .required()
        .pattern(/^https:\/\/storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+$/)
        .message("Please provide a valid ArcGIS StoryMaps URL"),
      category: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid category ID"),
      region: Joi.string()
        .required()
        .valid(
          "North America",
          "South America",
          "Europe",
          "Africa",
          "Asia",
          "Oceania",
          "Global"
        ),
      specificLocation: Joi.string().optional().max(100).trim().allow(""),
      tags: Joi.array()
        .items(Joi.string().max(30).trim().lowercase())
        .max(10)
        .optional()
        .default([]),
      teamMembers: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required().max(100).trim(),
            email: Joi.string().email().required(),
            role: Joi.string().optional().max(50).trim().allow(""),
          })
        )
        .max(10)
        .optional()
        .default([]),
      dataSourcesUsed: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required().trim(),
            url: Joi.string().uri().optional().allow(""),
            type: Joi.string()
              .required()
              .valid(
                "REST Service",
                "Feature Service",
                "CSV",
                "Shapefile",
                "GeoJSON",
                "Other"
              ),
          })
        )
        .max(20)
        .optional()
        .default([]),
      copyrightCompliant: Joi.boolean()
        .required()
        .valid(true)
        .message("You must confirm copyright compliance"),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  update = (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(100).trim().optional(),
      description: Joi.string().min(50).max(1000).trim().optional(),
      storyMapUrl: Joi.string()
        .pattern(/^https:\/\/storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+$/)
        .message("Please provide a valid ArcGIS StoryMaps URL")
        .optional(),
      category: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message("Invalid category ID")
        .optional(),
      region: Joi.string()
        .valid(
          "North America",
          "South America",
          "Europe",
          "Africa",
          "Asia",
          "Oceania",
          "Global"
        )
        .optional(),
      specificLocation: Joi.string().max(100).trim().allow("").optional(),
      tags: Joi.array()
        .items(Joi.string().max(30).trim().lowercase())
        .max(10)
        .optional(),
      teamMembers: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required().max(100).trim(),
            email: Joi.string().email().required(),
            role: Joi.string().optional().max(50).trim().allow(""),
          })
        )
        .max(10)
        .optional(),
      dataSourcesUsed: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required().trim(),
            url: Joi.string().uri().optional().allow(""),
            type: Joi.string()
              .required()
              .valid(
                "REST Service",
                "Feature Service",
                "CSV",
                "Shapefile",
                "GeoJSON",
                "Other"
              ),
          })
        )
        .max(20)
        .optional(),
      isPublic: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  updateStatus = (req, res, next) => {
    const schema = Joi.object({
      status: Joi.string()
        .required()
        .valid(
          "draft",
          "submitted",
          "under_review",
          "approved",
          "rejected",
          "winner"
        ),
      adminNotes: Joi.string().optional().max(1000).trim().allow(""),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };

  bulkApprove = (req, res, next) => {
    const schema = Joi.object({
      submissionIds: Joi.array()
        .items(
          Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .message("Invalid submission ID")
        )
        .min(1)
        .max(50)
        .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return responseHandler.error(res, error.details[0].message, 400);
    }
    next();
  };
}

module.exports = { submissionValidator: new SubmissionValidator() };
