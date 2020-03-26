/* 
  Check wheter an object is empty or undefined
*/
export function isEmptyObject(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

/* 
  Validate that a given pattern string is a valid regex 
*/
export function isValidRegex(pattern) {
  try {
    var regex = new RegExp(pattern);
    return true;
  } catch (e) {
    return false;
  }
}