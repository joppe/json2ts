import { isEqual } from './isEqual';

// tslint:disable-next-line no-any
export function isEqualObject(a: { [id: string]: any }, b: { [id: string]: any }): boolean {
    const aKeys: string[] = Object.keys(a);
    const bKeys: string[] = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    return aKeys.every((key: string): boolean => {
        return isEqual(a[key], b[key]);
    });
}
