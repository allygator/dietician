const schedule = require("./schedule");
const callback = jest.fn();

describe("Schedule Lambda Function", () => {
  test("scheduler returns no possible schedule due to no free time", () => {
    const event = {
      body: JSON.stringify([[390, 1320]]),
    };
    const output = schedule.handler(event, {}, callback).possibleSchedule[0];
    expect(output).toHaveLength(0);
  });

  test("scheduler returns one possible schedule due insufficient free time", () => {
    const event = {
      body: JSON.stringify([[540, 720, 785, 975, 1045, 1320]]),
    };
    const output = schedule.handler(event, {}, callback).possibleSchedule[0];
    expect(output).toHaveLength(1);
    expect(output[0].meals).toHaveLength(3);
    expect(output[0].exercise).toHaveLength(1);
  });

  test("scheduler returns two possible schedules as normal", () => {
    const event = {
      body: JSON.stringify([[]]),
    };
    const output = schedule.handler(event, {}, callback).possibleSchedule[0];
    expect(output).toHaveLength(2);
    expect(output[0].meals).toHaveLength(3);
    expect(output[0].exercise).toHaveLength(1);
    expect(output[1].meals).toHaveLength(3);
    expect(output[1].exercise).toHaveLength(1);
  });
});
