const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const github = require("../../src/services/github");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Github service", () => {
    it("Returns the available status if the service is available", async () => {
        const testData = require("../fixtures/github/available.json");

        mock.onGet(github.url).reply(200, testData);

        const status = await github.getStatus();

        expect(status).toBe(statuses.AVAILABLE);
    });

    it("Returns the unavailable status if the service is unavailable", async () => {
        const testData = require("../fixtures/github/unavailable.json");

        mock.onGet(github.url).reply(200, testData);

        const status = await github.getStatus();

        expect(status).toBe(statuses.UNAVAILABLE);
    });

    it("Returns the error status if the status was not returned", async () => {
        const testData = require("../fixtures/github/unavailable.json");

        mock.onGet(github.url).reply(500, testData);

        const status = await github.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
