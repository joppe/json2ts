import { isEqual } from '../equal/isEqual';

// tslint:disable-next-line no-any
export function contains(arr: any[], needle: any): boolean {
    // tslint:disable-next-line no-any
    return arr.find((element: any): boolean => {
        return isEqual(element, needle);
    }) !== undefined;
}
