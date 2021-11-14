// The title is printed as part of the message in Slack
const TITLE = "Service Title";

// A link to the service's public webpage showing its status
const STATUS_PAGE = "https://status-page.com/";

const getStatus = async () => {
    // must return one of the available statuses defined in ./support/statuses
};

module.exports = {
    getStatus,
    title: TITLE,
    statusPage: STATUS_PAGE,
};
