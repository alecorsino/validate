# validate

Functional data validation

usage:
import {gt0, validateFactory, composeValidations} from 'validate';

const gt0Validation = validateFactory(gt0, "Not greater than zero");
const customValidation = validateFactory(val => val === 1, "Not number One");

const allValidations = composeValidations(gt0Validation, customValidation)

expect( allValidations(1).pass).toBe(true);

expect( allValidations('Hola')).toEqual(
{
value: 'Hola',
pass: false,
errors: [
"Not greater than zero",
"Not number One"
]
}
);
