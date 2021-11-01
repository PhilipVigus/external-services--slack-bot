const axios = require("axios").default;

const getStatus = async () => {
    let status;

    await axios
        .get("https://status.circleci.com/api/v2/summary.json")
        .then((response) => {
            status = `Circle CI incident status: ${response.data.status.description}`;
        })
        .catch((error) => {
            status = `Error - ${error}`;
        });

    return status;
};

exports = {};
exports.getStatus = getStatus;

module.exports = { getStatus };
