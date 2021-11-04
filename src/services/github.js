const axios = require("axios").default;

const URL = "https://www.githubstatus.com/api/v2/status.json";

const getStatus = async () => {
    let status;

    await axios
        .get(URL)
        .then((response) => {
            status = `Github incident status: ${response.data.status.description}`;
        })
        .catch((error) => {
            status = `Error - ${error}`;
        });

    return status;
};

module.exports = {
    getStatus,
    url: URL,
};
