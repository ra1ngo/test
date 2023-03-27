/*
 * Немного магии функционального программирования
 * В основном используется как частичное применение для валидации пропсов vue
 */

export function isObjectContainsFields(...fields) {
  return function (obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    return fields.every((field) => Object.prototype.hasOwnProperty.call(obj, field));
  };
}

export function isArrayContainsObjectsWithFields(...fields) {
  return function (arr) {
    if (!Array.isArray(arr)) return false;
    return arr.every((item) => isObjectContainsFields(...fields)(item));
  };
}
