require("dotenv").config();
const { App } = require("@slack/bolt");
const service = require("./commands/service");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    service.initialise();
    service.register(app);

    console.log("⚡️ Bolt app is running!");
})();
