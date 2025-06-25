export function isEmptyObject(object) {
    if (object == null) return true; // handles null and undefined

    for (let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return false;
        }
    }
    return true;
}

export function generateUUID() {
    return crypto.randomUUID();
}

export function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function camelCaseToLabel(str) {
    if (!str) return '';
    return str
        .replace(/([A-Z])/g, ' $1')      // insert space before capital letters
        .replace(/^./, char => char.toUpperCase()); // capitalize the first letter
}

export function emptyFunction() { }

export default {
    isEmptyObject,
    generateUUID,
    capitalizeFirstLetter,
    camelCaseToLabel,
    emptyFunction
};
