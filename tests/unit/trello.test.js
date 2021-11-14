const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const trello = require("../../src/services/trello");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Trello service", () => {
    it("Returns the healthy status if the service is healthy", async () => {
        const testData = require("../fixtures/trello/healthy.json");

        mock.onGet(trello.url).reply(200, testData);

        const status = await trello.getStatus();

        expect(status).toBe(statuses.HEALTHY);
    });

    it("Returns the unhealthy status if the service is unhealthy", async () => {
        const testData = require("../fixtures/trello/unhealthy.json");

        mock.onGet(trello.url).reply(200, testData);

        const status = await trello.getStatus();

        expect(status).toBe(statuses.UNHEALTHY);
    });

    it("Returns the error status if there was an error fetching the status", async () => {
        const testData = require("../fixtures/trello/healthy.json");

        mock.onGet(trello.url).reply(500, testData);

        const status = await trello.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
