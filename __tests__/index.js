const { initValue, isNumberGreaterThanZero } = require("../lib/index");

test("Initial tests TODO: add proper test", () => {
  const value = 1;
  let valueObj = initValue(value); // { value: val, pass: true, errors: [] }

  let expectedValueObj = { value: value, pass: true, errors: [] };
  expect(isNumberGreaterThanZero(valueObj)).toEqual(expectedValueObj);
});
