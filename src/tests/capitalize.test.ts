import { capitalize } from "../utils/capitalize";

describe("capitalize tests", () => {
  test("it should capitalize the first letter of any word", () => {
    const word = "test";

    expect(capitalize(word)).toBe("Test");
  });

  test("it should return empty string for undefined input", () => {
    expect(capitalize(undefined)).toBe("");
  });

  test("it should capitalize the first letter and trim leading spaces", () => {
    const word = "   example";

    expect(capitalize(word)).toBe("Example");
  });
});
