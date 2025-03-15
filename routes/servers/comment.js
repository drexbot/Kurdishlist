const express = require('express');
const router = express.Router();
const crypto = require('crypto');

console.success("[Servers] /servers/comment.js router loaded.".brightYellow);

router.post("/servers/comment", async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user) {
            return res.render("404.ejs", {
                bot: global.client || null,
                path: req.path,
                user: req.isAuthenticated() ? req.user : null,
                req: req,
                message: "You must be logged in to comment on a server."
            });
        }

        // Rate limiting based on IP
        const ip = req.cf_ip;
        const ratelimit = ratelimitMap.get(ip);
        if (ratelimit && ((ratelimit + 5000) > Date.now())) {
            return error(res, 'You have reached your rate limit! Please try again in a few seconds.');
        }
        ratelimitMap.set(ip, Date.now());

        // Destructure and validate request body
        let { serverID, comment, stars } = req.body;
        console.log(req.body);

        if (typeof comment !== "string" || comment.trim().length === 0) {
            return error(res, "Please provide a valid comment.");
        }
        if (typeof stars !== "string" || !/^[1-5]$/.test(stars)) {
            return error(res, "Please provide a valid star rating (1-5).");
        }
        if (comment.length > 100) {
            return error(res, "Your comment is too long. Please make sure it is less than 100 characters.");
        }

        // Fetch server data
        const serverdata = await serversdata.findOne({ serverID });
        if (!serverdata) {
            return res.render("404.ejs", {
                bot: global.client || null,
                path: req.path,
                user: req.isAuthenticated() ? req.user : null,
                req: req,
                message: "The server you are looking for does not exist."
            });
        }

        // Prevent self-commenting
        if (serverdata.ownerID === req.user.id) {
            return error(res, "You cannot comment on your own server.");
        }

        // Check if user has already rated the server
        if (serverdata.rates?.some(rate => rate.author === req.user.id)) {
            return error(res, "You have already rated this server.");
        }

        // Add new comment
        const comment_id = crypto.randomBytes(16).toString("hex");
        await serversdata.updateOne(
            { serverID },
            {
                $push: {
                    rates: {
                        author: req.user.id,
                        star_rate: stars,
                        message: comment.trim(),
                        id: comment_id,
                        date: Date.now()
                    }
                }
            },
            { upsert: true }
        );

        // Respond with success
        return res.json({
            error: false,
            author: req.user.id,
            star_rate: stars,
            id: comment_id,
            stars: [1, 2, 3, 4, 5],
            message: "Comment added successfully."
        });

    } catch (error) {
        console.error(error.stack);
        return error(res, "An error has occurred. Please try again later. The administrators have been notified.");
    }
});

module.exports = router;
