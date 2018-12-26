const { initValue, validateFactory, compose, composeValidations } = require('../lib/index');

test('Validation Factory', () => {
  let mockValidationFun = val => false;
  const MOCK_ERROR_MSG = 'MOCK: ALWAYS FAIL';

  const vf = validateFactory(mockValidationFun, MOCK_ERROR_MSG);

  const value = 0;
  let valueObj = initValue(value); // { value: val, pass: true, errors: [] }
  let result = vf(valueObj);
  expect(result.value).toBe(value);
  expect(result.pass).toBe(false);
  expect(result.errors).toEqual(expect.arrayContaining([MOCK_ERROR_MSG]));
});

test('Compose: should compose functions right-to-left f(g(h(...fns(x)))', () => {
  let mockFun1 = val => val + 1;
  let mockFun2 = val => val + 2;
  let mockFun3 = val => val + 3;
  const composed = compose(
    mockFun3,
    mockFun2,
    mockFun1
  );

  expect(composed('')).toBe('123');
});

test('composeValidations: Compose With initValue Wrapper', () => {
  let mockFun1 = val => val;
  const composedWtihInit = composeValidations(mockFun1);

  const MY_VALUE = 'My Value';
  expect(composedWtihInit(MY_VALUE)).toEqual({
    errors: [],
    pass: true,
    value: MY_VALUE
  });
});
