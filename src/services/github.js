const axios = require("axios").default;

const getStatus = async () => {
    let status;

    await axios
        .get("https://www.githubstatus.com/api/v2/status.json")
        .then((response) => {
            status = `Github incident status: ${response.data.status.description}`;
        })
        .catch((error) => {
            status = `Error - ${error}`;
        });

    return status;
};

exports = {};
exports.getStatus = getStatus;

module.exports = { getStatus };
