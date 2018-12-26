const { initValue, validateFactory, gt0, isNumber } = require("../lib/index");
const { compose } = require("ramda");

test("Validation Factory", () => {
  let mockValidationFun = val => false;
  const MOCK_ERROR_MSG = "MOCK: ALWAYS FAIL";

  const vf = validateFactory(mockValidationFun, MOCK_ERROR_MSG);

  const value = 0;
  let valueObj = initValue(value); // { value: val, pass: true, errors: [] }
  let result = vf(valueObj);
  expect(result.value).toBe(value);
  expect(result.pass).toBe(false);
  expect(result.errors).toEqual(expect.arrayContaining([MOCK_ERROR_MSG]));
});

test("Greater than zero Validation", () => {
  const gt0Validation = validateFactory(gt0, "Not greater than zero");

  const value = 0;
  let valueObj = initValue(value); // { value: val, pass: true, errors: [] }

  let expectedValueObj = {
    value: value,
    pass: false,
    errors: ["Not greater than zero"]
  };
  let result = gt0Validation(valueObj);
  expect(result).toEqual(expectedValueObj);
});

// test("Initial tests TODO: add proper test", () => {
//   const gt0Validation = validateFactory(gt0, "Not greater than zero");
//   const isNumberValidation = validateFactory(isNumber, "Not a Number");

//   const isNumberGreaterThanZero = compose(
//     isNumberValidation,
//     gt0Validation
//   );

//   // isNumberGreaterThanZero(initValue(0));

//   const value = 0;
//   let valueObj = initValue(value); // { value: val, pass: true, errors: [] }

//   let expectedValueObj = {
//     value: value,
//     pass: false,
//     errors: ["Not greater than zero"]
//   };
//   expect(isNumberGreaterThanZero(valueObj)).toEqual(expectedValueObj);
//   ``;
// });
