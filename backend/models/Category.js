const mongoose = require("mongoose");

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
    judgeCount: {
      type: Number,
      default: 0,
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

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ isActive: 1, order: 1 });

const Category = mongoose.model("Category", categorySchema);
