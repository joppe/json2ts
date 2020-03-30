import { getType } from '@apestaartje/json2ts/util/type/getType';

describe('getType', (): void => {
    it('string', (): void => {
        expect(getType('foo')).toBe('String');
        expect(getType('')).toBe('String');
    });

    it('number', (): void => {
        expect(getType(1)).toBe('Number');
        expect(getType(-3.901)).toBe('Number');
    });

    it('boolean', (): void => {
        expect(getType(true)).toBe('Boolean');
        expect(getType(false)).toBe('Boolean');
    });

    it('array', (): void => {
        expect(getType([1, {}, 4, false])).toBe('Array');
        expect(getType([])).toBe('Array');
    });

    it('date', (): void => {
        expect(getType(new Date())).toBe('Date');
    });

    it('object', (): void => {
        expect(getType({foo: 'bar'})).toBe('Object');
        expect(getType({})).toBe('Object');
    });
});
