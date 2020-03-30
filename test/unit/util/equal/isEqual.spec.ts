import { isEqual } from '@apestaartje/json2ts/util/equal/isEqual';

/**
 * Check if two variables are the same
 */

describe('isEqual', (): void => {
    it('Return true if the given arguments are the same reference', (): void => {
        const a: number = 12;
        const b: number = a;

        expect(isEqual(a, b)).toBe(true);
    });

    it('Return true if the given arguments are the same', (): void => {
        expect(isEqual(12, 12)).toBe(true);
        expect(isEqual(['Hello World!'], ['Hello World!'])).toBe(true);
        expect(isEqual({x: 12, y: 9}, {x: 12, y: 9})).toBe(true);
        expect(isEqual(
            {
                x: 12,
                y: 9,
                children: [
                    {
                        isRoot: false,
                        name: 'Foo',
                        properties: [
                            {
                                size: 'big',
                                color: 'green',
                            },
                            56,
                        ],
                    },
                ],
            },
            {
                y: 9,
                x: 12,
                children: [
                    {
                        isRoot: false,
                        name: 'Foo',
                        properties: [
                            56,
                            {
                                size: 'big',
                                color: 'green',
                            },
                        ],
                    },
                ],
            })).toBe(true);
    });
});
