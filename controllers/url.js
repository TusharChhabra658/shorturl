const url = require("../models/url");
const { nanoid } = require("nanoid");

async function showAllEntries(req, res) {
  const result = await url.find({});
  const html = `
  <ol>
    ${result
      .map((entry) => `<li><a href=${entry.redirectUrl}>${entry.redirectUrl.substring(8)}</a>  :  ${entry.shortId}</li>`)
      .join("")}
  </ol>
  `;
  return res.send(html);
}

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortid = nanoid(7);

  await url.create({
    shortId: shortid,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortid });
}

async function redirectToUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await url.findOneAndUpdate({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function deleteEntry(req, res) {
  const id = req.params.id;
  await url.findByIdAndDelete(id);
  return res.json({ msg: "deleted successfully" });
}

module.exports = {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
  showAllEntries,
  deleteEntry,
};
