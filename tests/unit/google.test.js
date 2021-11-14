const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const google = require("../../src/services/google");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Google service", () => {
    it("Returns the available status if all subservices available", async () => {
        const testData = require("../fixtures/google/available.json");

        mock.onGet(google.url).reply(200, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.AVAILABLE);
    });

    it("Returns the available status if all subservices you are interested in are available", async () => {
        const testData = require("../fixtures/google/interestedAvailable.json");

        mock.onGet(google.url).reply(200, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.AVAILABLE);
    });

    it("Returns the unavailable status if one of the services you are interested in is unavailable", async () => {
        const testData = require("../fixtures/google/unavailable.json");

        mock.onGet(google.url).reply(200, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.UNAVAILABLE);
    });

    it("Returns the error status if the status was not returned", async () => {
        const testData = require("../fixtures/google/unavailable.json");

        mock.onGet(google.url).reply(500, testData);

        const status = await google.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
