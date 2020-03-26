import { isEqualArray } from '@apestaartje/json2ts/util/equal/isEqualArray';

describe('isEqualArray', (): void => {
    it('same', (): void => {
        expect(isEqualArray([], [])).toBe(true);
        expect(isEqualArray([1, 2, 3, 4], [4, 1, 2, 3])).toBe(true);
        expect(isEqualArray([1, 2, 3, 4], [4, 1, 2, 3, 0])).toBe(false);
    });
});
