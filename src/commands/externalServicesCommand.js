const glob = require("glob");

const services = {};

const initialise = () => {
    glob.sync("./src/services/*.js").forEach((file) => {
        const match = file.match(/\/([A-Za-z0-9\-_]+)\.js$/);
        services[match[1]] = require(`../services/${match[1]}.js`);
    });
};

const fetchServiceStatus = async (serviceName) => {
    const service = services[serviceName];
    const status = await service.getStatus();

    return {
        name: serviceName,
        status,
    };
};

const fetchAllServiceStatuses = async () => {
    const serviceStatuses = Object.keys(services).map(async (serviceName) =>
        fetchServiceStatus(serviceName)
    );

    return Promise.all(serviceStatuses);
};

const formatStatuses = (serviceStatuses) => {
    const responses = serviceStatuses.map((status) => {
        const service = services[status.name];

        return {
            markdown: `${service.title} - <${service.statusPage}|${status.status}>`,
            text: `${service.title} - ${status.status}`,
        };
    });

    const responsesAsText = responses
        .map((response) => response.text)
        .join("\n");

    const responsesAsMarkdown = responses
        .map((response) => response.markdown)
        .join("\n");

    return {
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: responsesAsMarkdown,
                },
            },
        ],
        text: responsesAsText,
    };
};

const register = (app) => {
    app.command("/external-services", async ({ ack, say }) => {
        await ack();

        const serviceStatuses = await fetchAllServiceStatuses();
        const formattedResponse = formatStatuses(serviceStatuses);

        await say(formattedResponse);
    });
};

module.exports = {
    initialise,
    register,
};
