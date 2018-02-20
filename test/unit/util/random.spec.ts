import { random } from 'app/util/random';

/**
 * Test the generation of a random number within a range.
 */

describe('random', (): void => {
    it('Without arguments should return a value 0 or 1', (): void => {
        const i = random();

        expect(i === 0 || i === 1).toBe(true);
    });

    it('When min and max are the same always return min value', (): void => {
        const i = random(10, 10);

        expect(i === 10).toBe(true);
    });

    it('Return a value between min and max', (): void => {
        for (let p = 0; p < 50; p += 1) {
            const i = random(10, 23);

            expect(i >= 10).toBe(true);
            expect(i <= 23).toBe(true);
        }
    });

    it('Throw an exception when the max value is larger then the min value', (): void => {
        expect((): void => {
            random(10);
        }).toThrow();
    });
});

