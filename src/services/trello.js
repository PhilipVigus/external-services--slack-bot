const axios = require("axios").default;
const statuses = require("./support/statuses");

const TITLE = "Trello";
const URL = "https://trello.status.atlassian.com/api/v2/status.json";
const STATUS_PAGE = "https://trello.status.atlassian.com/";

const getStatus = async () => {
    let status;

    await axios
        .get(URL)
        .then((response) => {
            status =
                response.data.status.indicator === "none"
                    ? statuses.HEALTHY
                    : statuses.UNHEALTHY;
        })
        .catch(() => {
            status = statuses.ERROR;
        });

    return status;
};

module.exports = {
    getStatus,
    title: TITLE,
    statusPage: STATUS_PAGE,
};
