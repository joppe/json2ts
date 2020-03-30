import { isEqual } from './isEqual';

// tslint:disable-next-line no-any
function clone(arr: any[]): any[] {
    // tslint:disable-next-line no-any
    const c: any[] = arr.slice(0);

    c.sort();

    return c;
}

// tslint:disable-next-line no-any
export function isEqualArray(a: any[], b: any[]): boolean {
    const length: number = a.length;

    if (length !== b.length) {
        return false;
    }

    // tslint:disable-next-line no-any
    const aClone: any[] = clone(a);

    // tslint:disable-next-line no-any
    const bClone: any[] = clone(b);

    // tslint:disable-next-line no-any
    return aClone.every((e: any, index: number): boolean => {
        return isEqual(e, bClone[index]);
    });
}
