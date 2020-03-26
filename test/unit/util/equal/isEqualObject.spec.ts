import { isEqualObject } from '@apestaartje/json2ts/util/equal/isEqualObject';

describe('isEqualObject', (): void => {
    it('same', (): void => {
        expect(isEqualObject({}, {})).toBe(true);
        expect(isEqualObject({foo: 'bar', bar: 42}, {bar: 42, foo: 'bar'})).toBe(true);
        expect(isEqualObject({foo: 'bar', bar: 42}, {foo: 'bar', bar: 42, quux: []})).toBe(false);
    });
});
