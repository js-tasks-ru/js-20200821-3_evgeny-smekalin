/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (param != 'asc' && param != 'desc') {
    return arr;
  }

  const collator = new Intl.Collator(undefined, {
    caseFirst: 'upper',
  });

  return arr.slice().sort((a, b) => {
    return (param === 'asc') ? collator.compare(a, b) : collator.compare(b, a);
   });
}
