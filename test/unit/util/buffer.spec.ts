import { createBuffer, IBuffer } from 'app/util/buffer';

/**
 * buffer
 */

describe('buffer', (): void => {
    describe('createBuffer', (): void => {
        it('Concatenate all chars to one char when calling flush', (): void => {
            const buffer: IBuffer = createBuffer();

            buffer.append('a');
            buffer.append('a');
            buffer.append('a');
            buffer.append('a');
            buffer.append('a');
            buffer.append('a');

            expect(buffer.flush()).toBe('aaaaaa');
        });
    });
});
