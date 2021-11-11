const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const trello = require("../../src/services/trello");
const statuses = require("../../src/services/support/statuses");

const mock = new MockAdapter(axios);

describe("Trello service", () => {
    it("Returns the available status if the service is available", async () => {
        const testData = require("../fixtures/trello/available.json");

        mock.onGet(trello.url).reply(200, testData);

        const status = await trello.getStatus();

        expect(status).toBe(statuses.AVAILABLE);
    });

    it("Returns the unavailable status if the service is unavailable", async () => {
        const testData = require("../fixtures/trello/unavailable.json");

        mock.onGet(trello.url).reply(200, testData);

        const status = await trello.getStatus();

        expect(status).toBe(statuses.UNAVAILABLE);
    });

    it("Returns the error status if the status was not returned", async () => {
        const testData = require("../fixtures/trello/unavailable.json");

        mock.onGet(trello.url).reply(500, testData);

        const status = await trello.getStatus();

        expect(status).toBe(statuses.ERROR);
    });
});
