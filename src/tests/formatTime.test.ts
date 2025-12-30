import { formatTime } from "../utils/formatTime";
describe("formatTime util tests", () => {
  test("it should return empty string if no value is provided", () => {
    expect(formatTime("")).toBe("");
  });

  const date = "2025-12-25T14:30:00Z";
  test("it should format the date with default format", () => {
    expect(formatTime(date)).toBe("25/12/2025 14:30");
  });

  test("it should format the date with custom format", () => {
    const customFormat = "YYYY-MM-DD";
    expect(formatTime(date, customFormat)).toBe("2025-12-25");
  });
});
