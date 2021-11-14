const axios = require("axios").default;
const statuses = require("./support/statuses");

const TITLE = "Google";
const URL = "https://www.google.com/appsstatus/dashboard/incidents.json";
const STATUS_PAGE = "https://www.google.com/appsstatus/dashboard/";
const SUB_SERVICES = [
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
            incident.most_recent_update.status !== "AVAILABLE" &&
            SUB_SERVICES.includes(incident.service_name)
        ) {
            return statuses.UNAVAILABLE;
        }
    }

    return statuses.AVAILABLE;
};

const getStatus = async () => {
    let status = statuses.AVAILABLE;

    await axios
        .get(URL)
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
    url: URL,
    title: TITLE,
    statusPage: STATUS_PAGE,
};
