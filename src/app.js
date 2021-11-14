require("dotenv").config();
const { App } = require("@slack/bolt");
const externalServicesCommand = require("./commands/externalServicesCommand");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

(async () => {
    await app.start(process.env.PORT || 3000);

    externalServicesCommand.initialise();
    externalServicesCommand.register(app);
})();
