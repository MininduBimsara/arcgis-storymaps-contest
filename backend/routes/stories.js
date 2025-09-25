// routes/stories.js
const express = require("express");
const router = express.Router();
const storyMetaController = require("../controllers/storyMetaController");

// Public: list all enriched stories
router.get("/", storyMetaController.list);

// Public: enrich and save story by URL (optional helper)
// Note: This does not modify existing submission flow
router.post("/enrich", storyMetaController.enrich);

module.exports = router;
