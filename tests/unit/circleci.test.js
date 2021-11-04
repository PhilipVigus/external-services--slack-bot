const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const circleCi = require("../../src/services/circleci");

const mock = new MockAdapter(axios);

describe("Circle CI service", () => {
    it("Returns the status of the Circle CI service", async () => {
        const testData = require("../fixtures/circleci/status.json");

        mock.onGet(circleCi.url).reply(200, testData);

        const test = await circleCi.getStatus();

        expect(test).toBe("Circle CI incident status: All Systems Operational");
    });
});
