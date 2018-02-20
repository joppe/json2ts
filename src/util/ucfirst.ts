/**
 * Return the given string with the first character capitalized.
 */

const CHAR_RE: RegExp = /^(\w)(\w*)$/;

export function ucfirst(str: string): string {
    const matches: RegExpExecArray | null = CHAR_RE.exec(str);

    if (matches === null || matches.length !== 3) {
        return str;
    }

    return `${matches[1].toUpperCase()}${matches[2]}`;
}
