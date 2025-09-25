// repositories/storyMetaRepository.js
const StoryMeta = require("../models/StoryMeta");

const storyMetaRepository = {
  async upsertByItemId(itemId, payload) {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return StoryMeta.findOneAndUpdate({ itemId }, { $set: payload }, options);
  },

  async findAll() {
    return StoryMeta.find({}).sort({ createdAt: -1 });
  },
};

module.exports = storyMetaRepository;
