import { isEqual } from './isEqual';
export function isEqualObject(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    return aKeys.every((key) => {
        return isEqual(a[key], b[key]);
    });
}
//# sourceMappingURL=isEqualObject.js.map