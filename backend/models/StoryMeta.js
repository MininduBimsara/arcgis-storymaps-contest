// models/StoryMeta.js
const mongoose = require("mongoose");

const StoryMetaSchema = new mongoose.Schema(
  {
    storyUrl: {
      type: String,
      required: true,
      trim: true,
    },
    itemId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    author: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure combination uniqueness to avoid duplicates if desired
StoryMetaSchema.index({ itemId: 1 }, { unique: true });

module.exports = mongoose.model("StoryMeta", StoryMetaSchema);
