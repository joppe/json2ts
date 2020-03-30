import { merge } from '@apestaartje/json2ts/util/array/merge';

describe('merge', (): void => {
    it('When two arrays are totally different the result contains all elements of both arrays', (): void => {
        const a: string[] = ['a', 'b', 'c'];
        const b: string[] = ['d', 'e', 'f'];

        expect(merge(a, b)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('When arrays have elements in common the values keep unique in the result', (): void => {
        const a: string[] = ['a', 'b', 'c'];
        const b: string[] = ['a', 'e', 'c'];

        expect(merge(a, b)).toEqual(['a', 'b', 'c', 'e']);
    });

    it('Will not break with an empty array', (): void => {
        const b: string[] = ['a', 'e', 'c'];

        expect(merge([], b)).toEqual(['a', 'e', 'c']);
        expect(merge(b, [])).toEqual(['a', 'e', 'c']);
    });

    it('Handles complex values', (): void => {
        // tslint:disable-next-line no-any
        const a: any[] = [
            'foo',
            78,
            false,
            [
                'a', 'b', 'c',
            ],
            {
                a: 'foo',
                bar: [1, 2, 3, 4],
            },
        ];
        // tslint:disable-next-line no-any
        const b: any[] = [
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

        expect(merge(a, b)).toEqual([
            'foo',
            78,
            false,
            [
                'a', 'b', 'c',
            ],
            {
                a: 'foo',
                bar: [1, 2, 3, 4],
            },
            true,
        ]);
    });
});
