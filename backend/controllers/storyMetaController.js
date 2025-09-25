// controllers/storyMetaController.js
const { responseHandler } = require("../utils/responseHandler");
const { asyncHandler } = require("../middleware/errorHandler");
const storyMetaService = require("../services/storyMetaService");

class StoryMetaController {
  enrich = asyncHandler(async (req, res) => {
    const { storyUrl } = req.body || {};
    const saved = await storyMetaService.enrichAndSaveStoryMeta(storyUrl);
    return responseHandler.created(res, "Story metadata saved", {
      id: saved._id.toString(),
      itemId: saved.itemId,
      title: saved.title,
      author: saved.author,
      description: saved.description,
      thumbnailUrl: saved.thumbnailUrl,
      storyUrl: saved.storyUrl,
    });
  });

  list = asyncHandler(async (req, res) => {
    const list = await storyMetaService.listStoryMeta();
    return responseHandler.success(res, "Stories fetched", list);
  });
}

module.exports = new StoryMetaController();
