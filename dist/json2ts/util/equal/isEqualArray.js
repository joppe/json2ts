import { isEqual } from './isEqual';
function clone(arr) {
    const c = arr.slice(0);
    c.sort();
    return c;
}
export function isEqualArray(a, b) {
    const length = a.length;
    if (length !== b.length) {
        return false;
    }
    const aClone = clone(a);
    const bClone = clone(b);
    return aClone.every((e, index) => {
        return isEqual(e, bClone[index]);
    });
}
//# sourceMappingURL=isEqualArray.js.map