import { getType } from '../getType';
import { isEqualArray } from './isEqualArray';
import { isEqualObject } from './isEqualObject';

/**
 * Check if any two given variables are structural and by value the same.
 * They don't have to be the same reference.
 */

// tslint:disable-next-line no-any
export function isEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    const aType: string = getType(a);
    const bType: string = getType(b);

    if (aType !== bType) {
        return false;
    }

    if (aType === 'Date') {
        return (<Date>a).getTime() === (<Date>b).getTime();
    }

    if (aType === 'Array') {
        // tslint:disable-next-line no-any
        return isEqualArray(<any[]>a, <any[]>b);
    }

    if (aType === 'Object') {
        return isEqualObject(<object>a, <object>b);
    }

    return false;
}
