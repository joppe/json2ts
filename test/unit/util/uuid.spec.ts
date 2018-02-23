import { createGenerator, createPlaceholder, generate } from 'app/util/uuid';

/**
 * Generate unique uuids
 */

describe('uuid', (): void => {
    describe('placeholder', (): void => {
        it('Generate a placeholder string with the default config', (): void => {
            expect(createPlaceholder()).toBe('........-....-....-....-............');
        });
    });

    describe('generate', (): void => {
        it('Create a string following the rules for UUID', (): void => {
            const uuid: string = generate('........-....-....-....-............', '.');

            expect(uuid.length).toBe(36);
            expect(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/.test(uuid)).toBe(true);
        });
    });

    describe('createGenerator', (): void => {
        it('Should never generate the same UUID', (): void => {
            const store: { [id: string]: boolean } = {};
            const uuidGenerator: () => string = createGenerator();

            for (let i = 0; i < 50; i += 1) {
                const uuid: string = uuidGenerator();

                expect(store[uuid]).toBe(undefined);
                store[uuid] = true;
                expect(store[uuid]).toBe(true);
            }
        });
    });
});
