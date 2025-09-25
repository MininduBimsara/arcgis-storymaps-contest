// services/storyMetaService.js
const axios = require("axios");
const storyMetaRepository = require("../repositories/storyMetaRepository");

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

async function resolveStoryUrl(storyUrl) {
  // Try to resolve short links by preventing redirects first
  try {
    const head = await axios.head(storyUrl, {
      maxRedirects: 0,
      validateStatus: (s) => s >= 200 && s < 400,
    });
    // If we get a 3xx, axios won't follow due to maxRedirects:0, capture Location
    if (head.status >= 300 && head.status < 400 && head.headers?.location) {
      return new URL(head.headers.location, storyUrl).toString();
    }
  } catch (err) {
    // If error is due to 3xx + maxRedirects 0, capture location
    const location = err?.response?.headers?.location;
    if (location) {
      return new URL(location, storyUrl).toString();
    }
    // Fall through to GET approach
  }

  // Fallback: allow redirects and read the final URL
  const resp = await axios.get(storyUrl, {
    maxRedirects: 5,
    // fetch minimal
    headers: { "User-Agent": "StoryMaps-Meta-Fetcher/1.0" },
  });
  const finalUrl = resp?.request?.res?.responseUrl || storyUrl;
  return finalUrl;
}

function extractItemIdFromUrl(fullUrl) {
  // Expected format: https://storymaps.arcgis.com/stories/<itemId>
  const match = /\/stories\/([a-f0-9\-]{10,})/i.exec(fullUrl);
  return match ? match[1] : null;
}

async function fetchArcgisItem(itemId) {
  const url = `https://www.arcgis.com/sharing/rest/content/items/${itemId}?f=json`;
  const { data } = await axios.get(url, { timeout: 10000 });
  if (!data || data.error) {
    const message = data?.error?.message || "Invalid ArcGIS response";
    const code = data?.error?.code || 400;
    const error = new Error(message);
    error.statusCode = code;
    throw error;
  }
  return data;
}

function buildThumbnailUrl(itemId, thumbnailFileName) {
  if (!thumbnailFileName) return "";
  return `https://www.arcgis.com/sharing/rest/content/items/${itemId}/info/${thumbnailFileName}`;
}

async function enrichAndSaveStoryMeta(storyUrl) {
  if (!storyUrl || !isValidHttpUrl(storyUrl)) {
    const err = new Error("Invalid or missing storyUrl");
    err.statusCode = 400;
    throw err;
  }

  const resolvedUrl = await resolveStoryUrl(storyUrl);
  const itemId = extractItemIdFromUrl(resolvedUrl);
  if (!itemId) {
    const err = new Error("Unable to extract itemId from URL");
    err.statusCode = 400;
    throw err;
  }

  const arcgis = await fetchArcgisItem(itemId);

  const title = arcgis.title || "";
  const author = arcgis.owner || "";
  const description = arcgis.snippet || arcgis.description || "";
  const thumbnailUrl = buildThumbnailUrl(itemId, arcgis.thumbnail);

  const payload = {
    storyUrl,
    itemId,
    title,
    author,
    description,
    thumbnailUrl,
    submittedAt: new Date(),
  };

  const saved = await storyMetaRepository.upsertByItemId(itemId, payload);
  return saved;
}

async function listStoryMeta() {
  const list = await storyMetaRepository.findAll();
  return list.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    author: doc.author,
    description: doc.description,
    thumbnailUrl: doc.thumbnailUrl,
    storyUrl: doc.storyUrl,
  }));
}

module.exports = {
  enrichAndSaveStoryMeta,
  listStoryMeta,
};
