import { getType } from '../getType';
import { isEqualArray } from './isEqualArray';
import { isEqualObject } from './isEqualObject';
export function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    const aType = getType(a);
    const bType = getType(b);
    if (aType !== bType) {
        return false;
    }
    if (aType === 'Date') {
        return a.getTime() === b.getTime();
    }
    if (aType === 'Array') {
        return isEqualArray(a, b);
    }
    if (aType === 'Object') {
        return isEqualObject(a, b);
    }
    return false;
}
//# sourceMappingURL=isEqual.js.map