const app = require("express").Router();
const channels = global.config.server.channels,
  roles = global.config.server.roles;
const path = require("path");
console.log("[kurdish.io]: Admin/Partner router loaded.");
const client = global.client;
const partnerdb = require(`../../database/models/streamer.js`);

// Helper function to create random ID
function createID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// List all partners
app.get("/admin/streamer", async (req, res) => {
  if (!config.client.owners.includes(req.user.id)) return res.redirect("../admin");
  let x = await partnerdb.find(); 
  res.render("admin/streamer.ejs", {
    bot: global.client,
    path: req.path,
    config: global.config,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    roles: global.config.server.roles,
    channels: global.config.server.channels,
    partners: x,
  });
});

// Add new partner
app.post("/admin/streamer", async (req, res) => {
  try {
    if (!config.client.owners.includes(req.user.id)) return res.redirect("../admin");
    await new partnerdb({
      code: createID(36),
      icon: req.body.icon || null,
      ownerID: req.body.ownerID || req.user.id,
      serverName: req.body.serverName || null,
      website: req.body.Website || null,
      description: req.body.partnerDesc || null,
    }).save();

    let x = global.client.guilds.cache
      .get(config.server.id)
      .members.cache.get(req.body.ownerID || req.user.id);

    if (x) {
      x.roles.add(global.config.server.roles.profile.partnerRole);
    }

    return res.redirect("/admin/streamer?success=true&message=Partner added successfully.");
  } catch (e) {
    console.log(e);
    return res.redirect("/admin/streamer?error=true&message=An unknown error occurred.");
  }
});

// Edit partner form
app.get("/admin/streamer/edit/:code", async (req, res) => {
  if (!config.client.owners.includes(req.user.id)) return res.redirect("../../admin");

  try {
    const partner = await partnerdb.findOne({ code: req.params.code });

    if (!partner) {
      return res.redirect("/admin/streamer?error=true&message=Partner not found.");
    }

    res.render("admin/streamer-edit.ejs", {
      bot: global.client,
      path: req.path,
      config: global.config,
      user: req.isAuthenticated() ? req.user : null,
      req: req,
      roles: global.config.server.roles,
      channels: global.config.server.channels,
      partner: partner
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/admin/streamer?error=true&message=An unknown error occurred.");
  }
});

// Update partner
app.post("/admin/streamer/edit/:code", async (req, res) => {
  if (!config.client.owners.includes(req.user.id)) return res.redirect("../../admin");

  try {
    const partner = await partnerdb.findOne({ code: req.params.code });

    if (!partner) {
      return res.redirect("/admin/streamer?error=true&message=Partner not found.");
    }

    // Update partner details
    partner.icon = req.body.icon || partner.icon;
    partner.ownerID = req.body.ownerID || partner.ownerID;
    partner.serverName = req.body.serverName || partner.serverName;
    partner.website = req.body.Website || partner.website;
    partner.description = req.body.partnerDesc || partner.description;

    await partner.save();

    return res.redirect("/admin/streamer?success=true&message=Partner updated successfully.");
  } catch (e) {
    console.log(e);
    return res.redirect("/admin/streamer?error=true&message=An unknown error occurred.");
  }
});

// Delete partner
app.get("/admin/streamer/delete/:code", async (req, res) => {
  if (!config.client.owners.includes(req.user.id)) return res.redirect("../../admin");

  try {
    const partner = await partnerdb.findOne({ code: req.params.code });

    if (!partner) {
      return res.redirect("/admin/streamer?error=true&message=Partner not found.");
    }

    // Remove partner role from user if they're in the server
    let member = global.client.guilds.cache
      .get(config.server.id)
      .members.cache.get(partner.ownerID);

    if (member) {
      member.roles.remove(global.config.server.roles.profile.partnerRole);
    }

    // Delete the partner
    await partnerdb.deleteOne({ code: req.params.code });

    return res.redirect("/admin/streamer?success=true&message=Partner deleted successfully.");
  } catch (e) {
    console.log(e);
    return res.redirect("/admin/streamer?error=true&message=An unknown error occurred.");
  }
});

module.exports = app;

function createID(length) {
  var result = "";
  var characters = "123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}