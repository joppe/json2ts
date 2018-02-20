/**
 * Array utility functions
 */

// tslint:disable no-any export-name
export function merge(a: any[], b: any[]): any[] {
    const c: any = a.slice(0);

    b.forEach((element: any): void => {
        if (c.indexOf(element) === -1) {
            c.push(element);
        }
    });

    return c;
}
