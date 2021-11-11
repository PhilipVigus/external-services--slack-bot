const glob = require("glob");

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

        if (!(command.text in services) && command.text !== "all") {
            await say("Unrecognised service name");
            return;
        }

        if (command.text === "all") {
            const serviceStatuses = await Promise.all(
                Object.keys(services).map(async (serviceName) => {
                    const service = services[serviceName];
                    const status = await service.getStatus();

                    return {
                        markdownResponse: `${service.title} - <${service.statusPage}|${status}>`,
                        plainResponse: `${service.title} - ${status}`,
                    };
                })
            );

            const plainResponse = serviceStatuses
                .map((serviceStatus) => serviceStatus.plainResponse)
                .join("\n");

            const markdownResponse = serviceStatuses
                .map((serviceStatus) => serviceStatus.markdownResponse)
                .join("\n");

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
