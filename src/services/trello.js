const axios = require("axios").default;
const statuses = require("./statuses");

const TITLE = "Trello";
const URL = "https://trello.status.atlassian.com/api/v2/status.json";

const getStatus = async () => {
    let status;

    await axios
        .get(URL)
        .then((response) => {
            status =
                response.data.status.indicator === "none"
                    ? statuses.AVAILABLE
                    : statuses.UNAVAILABLE;
        })
        .catch(() => {
            status = statuses.ERROR;
        });

    return status;
};

module.exports = {
    getStatus,
    url: URL,
    title: TITLE,
};
