/**
 * Generate a random number within a given range.
 */

export function random(min: number = 0, max: number = 1): number {
    if (max < min) {
        throw new Error(`Maximum (${max}) must be larger then minimum (${min}) value`);
    }

    // tslint:disable-next-line insecure-random
    const i: number = Math.random();
    const diff: number = max - min;

    return min + Math.round(i * diff);
}
