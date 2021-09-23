export function updateObject(oldObject, newValues) {
  return { ...oldObject, ...newValues};
}
export function isValidString(str) {
  return typeof str === "string" && str !== "";
}
