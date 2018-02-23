/**
 * Buffer text.
 * Has methods to add new line and tab character.
 */

// tslint:disable-next-line quotemark
const NEW_LINE_CHAR: string = "\n";

// tslint:disable-next-line quotemark
const TAB_CHAR: string = "\t";

export interface IBuffer {
    newLine(): void;
    tab(): void;
    append(str: string): void;
    flush(): string;
}

export function createBuffer(): IBuffer {
    let text: string[] = [];

    return {
        newLine(): void {
            text.push(NEW_LINE_CHAR);
        },

        tab(): void {
            text.push(TAB_CHAR);
        },

        append(str: string): void {
            text.push(str);
        },

        flush(): string {
            const output: string = text.join('');

            text = [];

            return output;
        }
    };
}
