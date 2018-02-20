import { repeat } from 'app/util/repeat';

/**
 * Repeat a given string.
 */

describe('repeat', (): void => {
    it('Repeat a given string a given number of times', (): void => {
        expect(repeat('a', 3)).toBe('aaa');
        expect(repeat('hello', 1)).toBe('hello');
        expect(repeat('ha', 5)).toBe('hahahahaha');
    });

    it('Throw an error when the repeat count is zero or negative', (): void => {
        expect((): void => {
            repeat('foo', -1);
        }).toThrow();
    });
});
