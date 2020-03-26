import { contains } from '@apestaartje/json2ts/util/array/contains';

describe('contains', (): void => {
    it('Tells if a value is in an array', (): void => {
        const arr: (string | number)[] = ['hello', 42, 'foo', 1, 2, 3, 'a'];

        expect(contains(arr, 'foo')).toBe(true);
        expect(contains(arr, 1)).toBe(true);
        expect(contains(arr, 'foobar')).toBe(false);
    });

    it('Can handle complex values', (): void => {
        // tslint:disable-next-line no-any
        const arr: any[] = [
            {
                a: 'foo',
                bar: [1, 2, 3, 4],
            },
            78,
            true,
            [
                'a', 'b', 'c',
            ],
        ];

        expect(contains(arr, ['a', 'b', 'c'])).toBe(true);
        expect(contains(arr, ['a', 'b', 'd'])).toBe(false);
        expect(contains(
            arr,
            {
                a: 'foo',
                bar: [1, 2, 3, 4],
            },
        )).toBe(true);
        expect(contains(
            arr,
            {
                a: 'foobar',
                bar: [1, 2, 3, 4],
            },
        )).toBe(false);
    });
});
