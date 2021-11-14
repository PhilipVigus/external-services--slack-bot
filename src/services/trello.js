const axios = require("axios").default;
const statuses = require("./support/statuses");

const TITLE = "Trello";
const SERVICE_ENDPOINT =
    "https://trello.status.atlassian.com/api/v2/status.json";

const STATUS_PAGE = "https://trello.status.atlassian.com/";
const HEALTHY_STATUS_INDICATOR = "none";

const getStatus = async () => {
    let status;

    await axios
        .get(SERVICE_ENDPOINT)
        .then((response) => {
            status =
                response.data.status.indicator === HEALTHY_STATUS_INDICATOR
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
