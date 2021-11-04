const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const github = require("../../src/services/github");

const mock = new MockAdapter(axios);

describe("Github service", () => {
    it("Returns the status of the Github service", async () => {
        const testData = require("../fixtures/github/status.json");

        mock.onGet("https://www.githubstatus.com/api/v2/status.json").reply(
            200,
            testData
        );

        const test = await github.getStatus();

        expect(test).toBe("Github incident status: All Systems Operational");
    });
});
