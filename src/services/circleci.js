const axios = require("axios").default;
const statuses = require("./support/statuses");

const TITLE = "Circle CI";
const URL = "https://status.circleci.com/api/v2/status.json";
const STATUS_PAGE = "https://status.circleci.com/";

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
    url: URL,
    title: TITLE,
    statusPage: STATUS_PAGE,
};
