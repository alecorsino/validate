export * from "./validations";

/**
 * Given a validation function and a validaiton error message
 * bulds a composable validation functions that retturn error message when validation fails.
 * i.e.
 *
 * const validation1 = validateFactory(function isNumberOne(value){return value === 1}, 'Is not One')
 * const validation2 = validateFactory(function isAtring(value){return typeof value === "string" }, 'Is not a string')
 *
 * const allValidations = compose(initValue, validation1, validation2)
 * Note: you can pass as first param to compose "initValue" so you can use your composed
 * value and just pass your value to validate directly
 *
 * allValidations(myValue)
 * @param {*} validationFunction
 * @param {*} validationErrorMessage
 */
export function validateFactory(validationFunction, validationErrorMessage) {
  if (typeof validationFunction != "function")
    throw Error("Factory needs a function");

  return function validate(acc) {
    if (!validationFunction(acc.value)) {
      acc = validationError(acc, validationErrorMessage);
    }
    return acc;
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
 * Same as compose but without the need to pass a inital value wrapper returned by initValue
 * i.e
 * const compWInitValue = composeValidations(val1, val2, val3);
 * compWInitValue('No need to wrapp initial value');
 *
 * otherwise you should need to use it like:
 * const composed = compose(val1, val2, val3);
 * composed(initValue('A value))
 *
 * @param  {...any} fns
 */
export const composeValidations = (...fns) =>
  compose(
    initValue,
    ...fns
  );

const validationError = (acc, err_str) => {
  const errors = [...acc.errors, err_str];
  return {
    errors,
    pass: false,
    value: acc.value
  };
};

/**
 * Value validation wrapper
 * @param {*} val
 */
export const initValue = val => ({ value: val, pass: true, errors: [] });
