/**
 * Get the type of a variable.
 */

const TYPE_RE: RegExp = /^\[object\s(\w+)\]$/;

// tslint:disable-next-line no-any export-name
export function getType(value: any): string {
    const raw: string = Object.prototype.toString.call(value);
    const matches: RegExpExecArray | null = TYPE_RE.exec(raw);

    if (matches === null || matches.length !== 2) {
        throw new Error(`Type could not be found for "${raw}"`);
    }

    return matches[1];
}
