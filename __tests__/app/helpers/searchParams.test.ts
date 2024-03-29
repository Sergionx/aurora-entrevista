import { getNumberFromString } from "@/lib/utils/searchParams";

describe("getNumberFromString", () => {
  it("should return the number when a valid number string is passed", () => {
    expect(getNumberFromString("10")).toBe(10);
  });

  it("should return 1 when a negative number string is passed", () => {
    expect(getNumberFromString("-5")).toBe(1);
  });

  it("should return 1 when a non-numeric string is passed", () => {
    expect(getNumberFromString("abc")).toBe(1);
  });

  it("should return 1 when an empty string is passed", () => {
    expect(getNumberFromString("")).toBe(1);
  });

  it("should return 1 when a string with spaces is passed", () => {
    expect(getNumberFromString("  ")).toBe(1);
  });

  it("should return 1 when a string with special characters is passed", () => {
    expect(getNumberFromString("!@#")).toBe(1);
  });
});
