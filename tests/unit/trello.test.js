const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const trello = require("../../src/services/trello");

const mock = new MockAdapter(axios);

describe("Trello service", () => {
    it("Returns the status of the Trello service", async () => {
        const testData = require("../fixtures/trello/status.json");

        mock.onGet(trello.url).reply(200, testData);

        const test = await trello.getStatus();

        expect(test).toBe("Trello incident status: All Systems Operational");
    });
});
