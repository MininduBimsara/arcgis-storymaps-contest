// models/Submission.js - Cleaned version with redundant methods removed
const mongoose = require("mongoose");
const slugify = require("slugify");

const submissionSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, "Submission title is required"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"],
      minLength: [5, "Title must be at least 5 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [1000, "Description cannot exceed 1000 characters"],
      minLength: [50, "Description must be at least 50 characters"],
    },

    // StoryMap Details
    storyMapUrl: {
      type: String,
      required: [true, "StoryMap URL is required"],
      validate: {
        validator: function (url) {
          // Validate both ArcGIS StoryMaps URL formats (allow trailing slashes or query params)
          const shortUrlPattern =
            /^https:\/\/arcg\.is\/[a-zA-Z0-9]+(\/?|\?.*)?$/;
          const longUrlPattern =
            /^https:\/\/storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+(\/?|\?.*)?$/;
          return shortUrlPattern.test(url) || longUrlPattern.test(url);
        },
        message:
          "Please provide a valid ArcGIS StoryMaps URL (short or long format)",
      },
    },
    storyMapId: {
      type: String,
      // Optional: we can persist it when extractable, otherwise omit
    },

    // Media and Assets
    thumbnailUrl: {
      type: String,
      validate: {
        validator: function (url) {
          if (!url) return true; // Optional field
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        },
        message: "Thumbnail must be a valid image URL",
      },
    },
    previewImages: [
      {
        type: String,
        validate: {
          validator: function (url) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
          },
          message: "Preview images must be valid image URLs",
        },
      },
    ],

    // Categorization
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: [30, "Tag cannot exceed 30 characters"],
      },
    ],

    // Geographic Information
    region: {
      type: String,
      required: [true, "Region is required"],
      enum: [
        "North America",
        "South America",
        "Europe",
        "Africa",
        "Asia",
        "Oceania",
        "Global",
      ],
    },
    specificLocation: {
      type: String,
      trim: true,
      maxLength: [100, "Specific location cannot exceed 100 characters"],
    },

    // Submission Metadata
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamMembers: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          maxLength: [100, "Team member name cannot exceed 100 characters"],
        },
        email: {
          type: String,
          required: true,
          match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Invalid email format",
          ],
        },
        role: {
          type: String,
          trim: true,
          maxLength: [50, "Role cannot exceed 50 characters"],
        },
      },
    ],

    // Competition Status
    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "winner",
      ],
      default: "draft",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    submissionDate: {
      type: Date,
    },

    // Technical Details
    dataSourcesUsed: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        url: {
          type: String,
          validate: {
            validator: function (url) {
              if (!url) return true; // Optional field
              return /^https?:\/\/.+/.test(url);
            },
            message: "Data source URL must be valid",
          },
        },
        type: {
          type: String,
          enum: [
            "REST Service",
            "Feature Service",
            "CSV",
            "Shapefile",
            "GeoJSON",
            "Other",
          ],
          required: true,
        },
      },
    ],

    // Contest Specific
    submissionYear: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear(),
    },
    copyrightCompliant: {
      type: Boolean,
      required: [true, "Copyright compliance confirmation required"],
    },

    // Admin Notes
    adminNotes: [
      {
        note: String,
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
submissionSchema.virtual("formattedSubmissionDate").get(function () {
  return this.submissionDate ? this.submissionDate.toLocaleDateString() : null;
});

submissionSchema.virtual("teamSize").get(function () {
  return this.teamMembers.length + 1; // +1 for submitter
});

// Indexes for performance (unique fields already have indexes)
submissionSchema.index({ submittedBy: 1 });
submissionSchema.index({ category: 1 });
submissionSchema.index({ status: 1 });
submissionSchema.index({ submissionYear: 1 });
submissionSchema.index({ createdAt: -1 });

// Text index for search functionality
submissionSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

// Pre-save middleware to generate slug
submissionSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

// Pre-save middleware to extract StoryMap ID from URL (robust to trailing slash/query)
submissionSchema.pre("save", function (next) {
  if (this.isModified("storyMapUrl")) {
    let storyMapId = null;
    try {
      const parsed = new URL(this.storyMapUrl);
      const host = parsed.hostname;
      const pathname = parsed.pathname.replace(/\/$/, ""); // trim trailing slash

      if (host === "arcg.is") {
        // e.g., /abc123
        const parts = pathname.split("/").filter(Boolean);
        if (parts.length >= 1) {
          storyMapId = parts[0];
        }
      } else if (host === "storymaps.arcgis.com") {
        // e.g., /stories/abc123 or /stories/abc123/... (keep first segment after stories)
        const parts = pathname.split("/").filter(Boolean);
        const storiesIdx = parts.indexOf("stories");
        if (storiesIdx !== -1 && parts[storiesIdx + 1]) {
          storyMapId = parts[storiesIdx + 1];
        }
      }
    } catch (_) {
      // Ignore URL parse errors; validation handles invalid URLs
    }

    if (storyMapId) {
      this.storyMapId = storyMapId;
    }
  }
  next();
});

module.exports = mongoose.model("Submission", submissionSchema);
