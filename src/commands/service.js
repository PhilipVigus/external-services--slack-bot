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

        const status = await services[command.text].getStatus();

        const response = `${services[command.text].title} - ${status}`;

        await say(response);
    });
};

module.exports = {
    initialise,
    register,
};
