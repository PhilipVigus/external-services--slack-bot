require("dotenv").config();
const { App } = require("@slack/bolt");
const externalServices = require("./commands/external-services");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

(async () => {
    await app.start(process.env.PORT || 3000);

    externalServices.initialise();
    externalServices.register(app);
})();
