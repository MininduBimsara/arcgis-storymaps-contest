// models/Category.js - Fixed with proper export and slug generation
const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxLength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    submissionCount: {
      type: Number,
      default: 0,
    },
    maxSubmissions: {
      type: Number,
      default: null, // null means unlimited
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      match: [
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        "Color must be a valid hex code",
      ],
      default: "#007ac2",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes (slug already has unique: true, so no duplicate needed)
categorySchema.index({ isActive: 1, order: 1 });
categorySchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug
categorySchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
