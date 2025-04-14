const express = require("express");
const {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
  showAllEntries,
  deleteEntry
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateShortUrl)
router.get("/",showAllEntries);
router.get("/:shortId", redirectToUrl)
router.delete("/:id",deleteEntry);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
