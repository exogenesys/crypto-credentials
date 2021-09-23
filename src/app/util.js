export function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}
export function isValidString(str) {
  return typeof str === "string" && str !== "";
}
