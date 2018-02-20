import { getType } from 'app/util/type';

/**
 * Get the type of a variable.
 */

describe('type', (): void => {
    describe('getType', (): void => {
        it('Should get the type of a given variable', (): void => {
            expect(getType(true)).toBe('Boolean');
            expect(getType(123)).toBe('Number');
            expect(getType('Hello World')).toBe('String');
            expect(getType([1, 2, 3, 4])).toBe('Array');
            expect(getType({foo: 'foo', bar: 'TEST'})).toBe('Object');
            expect(getType(new Date())).toBe('Date');
            expect(getType(null)).toBe('Null');
            expect(getType(undefined)).toBe('Undefined');
        });
    });
});
