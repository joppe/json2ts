import { getType } from 'app/util/type';

/**
 * Check if any two given variables are structural and by value the same.
 * They don't have to be the same reference.
 */

// tslint:disable-next-line no-any
export function isEqualArray(a: any[], b: any[]): boolean {
    const length: number = a.length;

    if (length !== b.length) {
        return false;
    }

    // tslint:disable-next-line no-any
    const aClone: any[] = a.slice(0);

    // tslint:disable-next-line no-any
    const bClone: any[] = b.slice(0);

    aClone.sort();
    bClone.sort();

    for (let i: number = 0; i < length; i += 1) {
        if (!isEqual(aClone[i], bClone[i])) {
            return false;
        }
    }

    return true;
}

// tslint:disable-next-line no-any
export function isEqualObject(a: { [id: string]: any }, b: { [id: string]: any }): boolean {
    const aKeys: string[] = Object.keys(a);
    const bKeys: string[] = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    for (const key of aKeys) {
        if (!isEqual(a[key], b[key])) {
            return false;
        }
    }

    return true;
}

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
        return a.getTime() === b.getTime();
    } else if (aType === 'Array') {
        return isEqualArray(a, b);
    } else if (aType === 'Object') {
        return isEqualObject(a, b);
    }

    return false;
}
