const { gt0, isNumber, initValue, validateFactory } = require('../lib/index');

test('Greater than Zero function', () => {
  expect(gt0(1)).toBe(true);
  expect(gt0(0)).toBe(false);
  expect(gt0('1')).toBe(false);
});

test('Greater than zero Validation', () => {
  const gt0Validation = validateFactory(gt0, 'Not greater than zero');

  const value = 0;
  let valueObj = initValue(value); // { value: val, pass: true, errors: [] }

  let expectedValueObj = {
    value: value,
    pass: false,
    errors: ['Not greater than zero']
  };
  let result = gt0Validation(valueObj);
  expect(result).toEqual(expectedValueObj);
});

test('Is a Number Validatation', () => {
  expect(isNumber(1)).toBe(true);
  expect(isNumber('0')).toBe(false);
});
