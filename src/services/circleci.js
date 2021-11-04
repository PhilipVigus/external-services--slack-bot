const axios = require("axios").default;

const URL = "https://status.circleci.com/api/v2/status.json";

const getStatus = async () => {
    let status;

    await axios
        .get(URL)
        .then((response) => {
            status = `Circle CI incident status: ${response.data.status.description}`;
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
