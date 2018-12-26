/**
 * Validiont functions return a boolean
 * should validate if certain condition is met.
 *
 */

export const isNumber = value => typeof value === 'number';

export const gt0 = value => isNumber(value) && value > 0;
