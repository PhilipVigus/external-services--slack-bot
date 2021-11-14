const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const circleCi = require("../../src/services/circleci");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Circle CI service", () => {
    it("Returns the healthy status if the service is healthy", async () => {
        const testData = require("../fixtures/circleci/healthy.json");

        mock.onGet(circleCi.url).reply(200, testData);

        const status = await circleCi.getStatus();

        expect(status).toBe(statuses.HEALTHY);
    });

    it("Returns the unhealthy status if the service is unhealthy", async () => {
        const testData = require("../fixtures/circleci/unhealthy.json");

        mock.onGet(circleCi.url).reply(200, testData);

        const status = await circleCi.getStatus();

        expect(status).toBe(statuses.UNHEALTHY);
    });

    it("Returns the error status if there was an error fetching the status", async () => {
        const testData = require("../fixtures/circleci/healthy.json");

        mock.onGet(circleCi.url).reply(500, testData);

        const status = await circleCi.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
