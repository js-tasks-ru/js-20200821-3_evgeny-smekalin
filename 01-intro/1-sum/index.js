/**
 * sum
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */
export default function sum(m, n) {
  if (isNaN(m) || isNaN(n)) {
    throw 'Argument is not a number';
  }

  return m + n;
}
