import { random } from 'app/util/random';
import { repeat } from 'app/util/repeat';

/**
 * Generate an uuid.
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier
 */

const PARTS: number[] = [
    8,
    4,
    4,
    4,
    12
];

const CHAR: string = '.';

const GLUE: string = '-';

type UUIDStore = {
    [id: string]: boolean;
};

/**
 * Create a placeholder string (blueprint) that will be used by the generate function.
 * The placeholder exists of characters that will be replaced in the generate function by a random hex value. The
 * character that will replaced is the `char` argument.
 */
export function placeholder(parts: number[] = PARTS, char: string = CHAR, glue: string = GLUE): string {
    return parts.map((count: number): string => {
        return repeat(char, count);
    }).join(glue);
}

/**
 * Generate an uuid.
 * Provide a blueprint where all occurrences of replace will be replaced by a random hex value.
 */
export function generate(blueprint: string, replace: string): string {
    return blueprint.split('').map((c: string): string => {
        if (c === replace) {
            return random(0, 15).toString(16);
        }

        return c;
    }).join('');
}

/**
 * Create an uuid generator, that will generate unique uuids.
 */
export function generator(parts: number[] = PARTS, char: string = CHAR, glue: string = GLUE): () => string {
    const blueprint: string = placeholder(parts, char, glue);
    const store: UUIDStore = {};

    return (): string => {
        let uuid: string = generate(blueprint, char);

        while (store[uuid] !== undefined) {
            uuid = generate(blueprint, char);
        }

        store[uuid] = true;

        return uuid;
    };
}
