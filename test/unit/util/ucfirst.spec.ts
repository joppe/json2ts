import { ucfirst } from 'app/util/ucfirst';

/**
 * Create a first chararter capitalized string.
 */

describe('ucfirst', (): void => {
    it('Should not break on an empty string', (): void => {
        expect(ucfirst('')).toBe('');
    });

    it('Should not touch a character that is not in a-z', (): void => {
        expect(ucfirst('1')).toBe('1');
        // tslint:disable-next-line quotemark
        expect(ucfirst("\nbla")).toBe("\nbla");
        expect(ucfirst('#$%@')).toBe('#$%@');
        expect(ucfirst(' 243&*$*$')).toBe(' 243&*$*$');
    });

    it('Should return a capitalized version of a character', (): void => {
        expect(ucfirst('a')).toBe('A');
        expect(ucfirst('f')).toBe('F');
        expect(ucfirst('x')).toBe('X');
    });
});
