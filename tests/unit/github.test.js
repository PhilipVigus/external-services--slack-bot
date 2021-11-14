const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const github = require("../../src/services/github");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Github service", () => {
    it("Returns the healthy status if the service is healthy", async () => {
        const testData = require("../fixtures/github/healthy.json");

        mock.onGet(github.url).reply(200, testData);

        const status = await github.getStatus();

        expect(status).toBe(statuses.HEALTHY);
    });

    it("Returns the unhealthy status if the service is unhealthy", async () => {
        const testData = require("../fixtures/github/unhealthy.json");

        mock.onGet(github.url).reply(200, testData);

        const status = await github.getStatus();

        expect(status).toBe(statuses.UNHEALTHY);
    });

    it("Returns the error status if there was an error fetching the status", async () => {
        const testData = require("../fixtures/github/healthy.json");

        mock.onGet(github.url).reply(500, testData);

        const status = await github.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
