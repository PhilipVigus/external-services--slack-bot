const glob = require("glob");
const statuses = require("../services/statuses");

const services = {};

const initialise = () => {
    glob.sync("./src/services/*.js").forEach((file) => {
        const match = file.match(/\/([A-Za-z0-9\-_]+)\.js$/);
        services[match[1]] = require(`../services/${match[1]}.js`);
    });
};

const register = (app) => {
    app.command("/service", async ({ command, ack, say }) => {
        await ack();

        if (command.text === "") {
            await say("You must provide a service name");
            return;
        }

        if (!(command.text in services)) {
            await say("Unrecognised service name");
            return;
        }

        const service = services[command.text];

        const status = await service.getStatus();

        const markdownResponse = `${service.title} - <${service.statusPage}|${status}>`;

        const plainResponse = `${service.title} - ${status}`;

        await say({
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: markdownResponse,
                    },
                },
            ],
            text: plainResponse,
        });
    });
};

module.exports = {
    initialise,
    register,
};
