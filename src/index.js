export * from "./validations";

export function validateFactory(validationFunction, validatioMessage) {
  if (typeof validationFunction != "function")
    throw Error("Factory needs a function");

  return function validate(acc) {
    if (!validationFunction(acc.value)) {
      acc = validationError(acc, validatioMessage);
    }
    return acc;
  };
}

const validationError = (acc, err_str) => {
  const errors = [...acc.errors, err_str];
  return {
    errors,
    pass: false,
    value: acc.value
  };
};
export const initValue = val => ({ value: val, pass: true, errors: [] });
