const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const google = require("../../src/services/google");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Google service", () => {
    it("Returns the healthy status if all subservices are healthy", async () => {
        const testData = require("../fixtures/google/all-healthy.json");

        mock.onGet(google.url).reply(200, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.HEALTHY);
    });

    it("Returns the healthy status if all subservices you are interested in are healthy", async () => {
        const testData = require("../fixtures/google/all-interested-healthy.json");

        mock.onGet(google.url).reply(200, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.HEALTHY);
    });

    it("Returns the unhealthy status if one of the services you are interested in is unhealthy", async () => {
        const testData = require("../fixtures/google/interested-unhealthy.json");

        mock.onGet(google.url).reply(200, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.UNHEALTHY);
    });

    it("Returns the error status if there was an error fetching the status", async () => {
        const testData = require("../fixtures/google/all-healthy.json");

        mock.onGet(google.url).reply(500, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
