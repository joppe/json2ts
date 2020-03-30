export declare class StringBuffer {
    private _text;
    private readonly _children;
    get children(): StringBuffer[];
    space(): void;
    newLine(): void;
    tab(): void;
    prepend(str: string): void;
    append(str: string): void;
    wrap(pre: string, post: string): void;
    flush(): void;
    addChild(buffer: StringBuffer): void;
    addChildren(buffers: StringBuffer[]): void;
    toString(): string;
    toStringTree(): string;
}
