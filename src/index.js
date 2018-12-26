export * from './validations';

/**
 * Given a validation function and a validaiton error message
 * It builds a composable validation functions that return error message object when validation fails.
 * i.e.
 *
 * const validation1 = validateFactory(function isNumberOne(value){return value === 1}, 'Is not One')
 * const validation2 = validateFactory(function isAtring(value){return typeof value === "string" }, 'Is not a string')
 * @param {*} validationFunction
 * @param {*} validationErrorMessage
 */
export function validateFactory(validationFunction, validationErrorMessage) {
  if (typeof validationFunction != 'function') throw Error('Factory needs a function');

  return function validate(accumulator) {
    if (!validationFunction(accumulator.value)) {
      accumulator = validationError(accumulator, validationErrorMessage);
    }
    return accumulator;
  };
}

/**
 * Functional composition right-to-left
 * i.e.
 * f(g(h(x)))
 *
 * @param  {...any} fns
 */
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

/**
 * Compose/Chain all validations created with validateFactory into one.
 * composeValidations(val1, val2, val3).
 * this is the same as  compose(initValue, val2, val1);
 * @param  {...any} fns
 */
export const composeValidations = (...fns) =>
  compose(
    initValue,
    ...fns
  );

/**
 * Validation Error Object
 * @param {*} accumulator
 * The accumulator accumulates the callback's return values;
 * it is the accumulated value previously returned in the last invocation of the callback
 * @param {*} err_str
 * Error mesage when validations fails.
 */
const validationError = (accumulator, err_str) => {
  const errors = [...accumulator.errors, err_str];
  return {
    errors,
    pass: false,
    value: accumulator.value
  };
};

/**
 * Value validation wrapper
 * @param {*} val
 */
export const initValue = val => ({ value: val, pass: true, errors: [] });
