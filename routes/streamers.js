const app = require("express").Router();
const partnerdb = require(`../database/models/streamer.js`);

console.log("[kurdish.io]: Streamer List router loaded.");

app.get("/streamers", async (req, res) => {
  let x = await partnerdb.find({});
  res.render("streamers.ejs", {
    bot: global.client,
    path: req.path,
    config: global.config,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    partners: x,
    roles: global.config.server.roles,
  });
});

module.exports = app;