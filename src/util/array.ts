/**
 * Array utility functions
 */
import { isEqual } from 'app/util/equal';

// tslint:disable-next-line no-any
export function indexOf(arr: any[], needle: any): boolean {
    // tslint:disable-next-line no-any
    return arr.find((element: any): boolean => {
        return isEqual(element, needle);
    }) !== undefined;
}

// tslint:disable-next-line no-any export-name
export function merge(a: any[], b: any[]): any[] {
    // tslint:disable-next-line no-any
    const c: any = a.slice(0);

    // tslint:disable-next-line no-any
    b.forEach((element: any): void => {
        if (indexOf(c, element) === false) {
            c.push(element);
        }
    });

    return c;
}
