export interface IBuffer {
    newLine(): void;
    tab(): void;
    append(str: string): void;
    flush(): string;
}
export declare function createBuffer(): IBuffer;
