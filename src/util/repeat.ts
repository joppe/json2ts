/**
 * Repeat a string a number of times.
 */

export function repeat(input: string, count: number): string {
    const int: number = Math.floor(count);

    if (count <= 0) {
        throw new Error(`Count must be a positive number, "${count}" given.`);
    }

    // the count is always one extra (with join, two parts become one)
    // tslint:disable-next-line prefer-array-literal
    return new Array(int + 1).join(input);
}
