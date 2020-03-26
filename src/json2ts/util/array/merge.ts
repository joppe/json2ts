import { contains } from './contains';

// tslint:disable-next-line no-any export-name
export function merge(a: any[], b: any[]): any[] {
    // tslint:disable-next-line no-any
    const c: any[] = a.slice(0);

    // tslint:disable-next-line no-any
    b.forEach((element: any): void => {
        if (contains(c, element) === false) {
            c.push(element);
        }
    });

    return c;
}
