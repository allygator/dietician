const schedule = require("./schedule");

describe("Schedule Lambda Function", () => {
  test("scheduler returns shit", () => {
    const event = {
      body: JSON.stringify([[390, 1320], [500, 600]]),
    };
    const callback = (lul, output) => output;
    expect(schedule.handler(event, {}, callback)).toBeDefined();
  });
});
