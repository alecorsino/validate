import { compose } from "ramda";

const gt0 = acc => {
  if (acc.value < 1) {
    acc = validationError(acc, "Not greater than zero");
  }
  return acc;
};
const isNumber = acc => {
  if (typeof acc.value !== "number") {
    acc = validationError(acc, "Not a Number");
  }

  return acc;
};

const validationError = (acc, err_str) => {
  const errors = [...acc.errors, err_str];
  return {
    errors,
    pass: false,
    value: acc.value
  };
};
export const initValue = val => ({ value: val, pass: true, errors: [] });

export const isNumberGreaterThanZero = compose(
  isNumber,
  gt0
);

// isNumberGreaterThanZero(initValue(0));
