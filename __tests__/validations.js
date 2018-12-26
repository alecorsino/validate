const { gt0, isNumber } = require("../lib/index");

test("Greater than Zero Validatation", () => {
  expect(gt0(1)).toBe(true);
  expect(gt0(0)).toBe(false);
  expect(gt0("1")).toBe(false);
});

test("Is a Number Validatation", () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber("0")).toBe(false);
});
