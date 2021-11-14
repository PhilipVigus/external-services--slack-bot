const axios = require("axios").default;
const statuses = require("./support/statuses");

const TITLE = "Google";
const SERVICE_ENDPOINT =
    "https://www.google.com/appsstatus/dashboard/incidents.json";

const STATUS_PAGE = "https://www.google.com/appsstatus/dashboard/";
const HEALTHY_STATUS_INDICATOR = "AVAILABLE";

const INTERESTING_SUB_SERVICES = [
    "Gmail",
    "Google Meet",
    "Google Calendar",
    "Google Docs",
    "Google Drive",
    "Google Slides",
    "Google Sheets",
];

const summariseStatusFromIncidents = (incidents) => {
    for (const incident of incidents) {
        if (
            incident.most_recent_update.status !== HEALTHY_STATUS_INDICATOR &&
            INTERESTING_SUB_SERVICES.includes(incident.service_name)
        ) {
            return statuses.UNHEALTHY;
        }
    }

    return statuses.HEALTHY;
};

const getStatus = async () => {
    let status;

    await axios
        .get(SERVICE_ENDPOINT)
        .then((response) => {
            status = summariseStatusFromIncidents(response.data);
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
