// Enter the port that you want the website to be on.
// Default port is 4777, if you want to change it, you can change it here.
// If the hosting provider doesn't allow you to use the port 4777, you can change it to what the hosting provider allows you to use.
const port = 3000;

// Enter the domain that you will use for the website.
const domain = 'https://98e65843-29da-4495-b8c0-404950e4f8ff-00-25fc7m1zo7kyp.sisko.replit.dev';

// Are you going to localhost the website or host it on a server?
// Set to "true" if you are localhosting.
// Set to "false" if you are hosting it on a server.
const localhosting = true;

module.exports = {
    // Client will be the bot that you will use for the main purpose of the website and commands.
    client: {
        id: '1298730870256963675', // Bot ID
        token: 'MTI5ODczMDg3MDI1Njk2MzY3NQ.G6AEM2.n4Gv0-DuLExZD_u1pucibT_PZizs64VqlusXks', // Bot token
        secret: 'hruJqr-BRx5okh_ia_o12yZ91jmpu1UF', // Bot secret
        prefix: 'a!', // Bot prefix
        owners: ["743887896481628190", "743887896481628190"], // Bot owner(s) ID, can be multiple owners separated by comma 
    },

    // ServerClient will be the bot that will be used for the server list/server commands 
    // and the bot that will be public to everyone so they can invite it to their server.
    serverClient: {
        id: '1258044651890413618', // Server Bot ID
        prefix: 's!', // Server Bot prefix
        token: 'MTI1ODA0NDY1MTg5MDQxMzYxOA.G3RoSe.ojeOueUDk35eGvqw3R5yCUaQjDK1Tta-l93fV0', // Server Bot token

        // Replace the REPLACEME with your client ID
        invite: 'https://discord.com/oauth2/authorize?client_id=1258044651890413618&scope=bot%20identify&permissions=19473'
    },

    database: {
        url: 'mongodb+srv://dendar:dendar@cluster0.li3mi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Mongo url (eg. mongodb+srv://<username>:<password>@<host>/<database>)
    },

    website: {
        port: port, // Website port

        // DO NOT CHANGE "localhosting"
        localhosting: localhosting,

        url: 'https://98e65843-29da-4495-b8c0-404950e4f8ff-00-25fc7m1zo7kyp.sisko.replit.dev', // Website url
        callback:  'https://98e65843-29da-4495-b8c0-404950e4f8ff-00-25fc7m1zo7kyp.sisko.replit.dev/callback', // Website callback url

        // For login issues about the callback url, please join the support server and check the #support channel pinned messages.
        // If you still can't fix it, feel free to open a ticket in the support server.

        support: 'https://discord.gg/sQQFSnQhdt', // discord support server
        roles: {
            administrator: ["857177733398265876"] // administrator role id(s)
        },
        botTags: [ // Botlist tags
            "Fun",
            "NSFW",
            "Game",
            "24/7",
            "OSU!",
            "Guard",
            "Anime",
            "Music",
            "Memes",
            "Invite",
            "Reddit",
            "Twitch",
            "Crypto",
            "Economy",
            "Logging",
            "Youtube",
            "Utility",
            "General",
            "Leveling",
            "Roleplay",
            "Fortnite",
            "Welcomer",
            "Chat bot",
            "Minecraft",
            "Community",
            "Minigames",
            "Moderation",
            "Protection",
            "Web Dashboard",
            "Reaction Roles",
            "Auto Moderation",
        ],
        serverTags: [
            "Fun",
            "Game",
            "NSFW",
            "Meme",
            "Shop",
            "Media",
            "Emoji",
            "Sound",
            "Stream",
            "Social",
            "Design",
            "Company",
            "Turkish",
            "Protest",
            "E-Sport",
            "Bot List",
            "Chatting",
            "Roleplay",
            "Challange",
            "Community",
            "Technology",
            "Server List",
            "Development",
        ]
    },

    server: {
        id: '739408333362036746', // Server ID

        emojis: {
            "approve": "",
            "decline": "",
            "success": "✅",
            "error": "❌",
        },

        // Channel IDs
        channels: {
            errors: '1346109673354559520', // Sends errors to this channel
            login: '1346109673354559520', // Sends login logs to this channel (member login)
            botlogs: '1346109673354559520', // Bot Add, Remove, Approve, Deny, Edit
            votes: '1346109673354559520', // Bot votes channel
            serverlogs: '1346109673354559520', // Server Add, Remove, Approve, Deny, Edit

            // Greetings
            welcome: '1346109673354559520', // welcome logs channel Member/Bot joins the server
            leave: '1346109673354559520', // Leave logs channel Member/Bot leaves the server

            schedules: '1346109673354559520', // New schedule logs channel when you want to schedule a promotion

            // Mongo Logs
            database: {
                logs: '1346109673354559520', // Channel ID to store database changes
            },

            voiceChannelStatistics: '1346109570795175956', // Voice channel statistics channel "Website Visitors: 1365"
        },

        // Role IDs
        roles: {
            botReviewer: '1346109550482423818', // Bot reviewer role
            botDeveloper: '1346109550482423818', // Bot developer role

            verifiedBot: '1346109550482423818', // Verified bot role
            unverifiedBot: '1346109550482423818', // Unverified bot role
        }
    },

    languages: [{
        flag: 'gr',
        code: 'el',
        name: 'Greek'
    }, {
        flag: 'gb',
        code: 'en',
        name: 'English'
    }, {
        flag: 'kurd',
        code: 'ckb',
        name: 'Kurdish'
    }, {
        flag: 'de',
        code: 'de',
        name: 'Deutsch'
    }, {
        flag: 'ru',
        code: 'ru',
        name: 'Russian'
    }, {
        flag: 'fr',
        code: 'fr',
        name: 'French'
    }, {
        flag: 'es',
        code: 'es',
        name: 'Spanish'
    }],
} 