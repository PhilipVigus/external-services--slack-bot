const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const circleCi = require("../../src/services/circleci");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Circle CI service", () => {
    it("Returns the available status if the service is available", async () => {
        const testData = require("../fixtures/circleci/available.json");

        mock.onGet(circleCi.url).reply(200, testData);

        const status = await circleCi.getStatus();

        expect(status).toBe(statuses.AVAILABLE);
    });

    it("Returns the unavailable status if the service is unavailable", async () => {
        const testData = require("../fixtures/circleci/unavailable.json");

        mock.onGet(circleCi.url).reply(200, testData);

        const status = await circleCi.getStatus();

        expect(status).toBe(statuses.UNAVAILABLE);
    });

    it("Returns the error status if the status was not returned", async () => {
        const testData = require("../fixtures/circleci/unavailable.json");

        mock.onGet(circleCi.url).reply(500, testData);

        const status = await circleCi.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
