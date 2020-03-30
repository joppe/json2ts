// tslint:disable-next-line quotemark
const NEW_LINE_CHAR: string = "\n";

// tslint:disable-next-line quotemark
const TAB_CHAR: string = "\t";

const SPACE_CHAR: string = '&nbsp;';

export class StringBuffer {
    private _text: string = '';
    private readonly _children: StringBuffer[] = [];

    get children(): StringBuffer[] {
        return [
            ...this._children,
        ];
    }

    public space(): void {
        this._text += SPACE_CHAR;
    }

    public newLine(): void {
        this._text += NEW_LINE_CHAR;
    }

    public tab(): void {
        this._text += TAB_CHAR;
    }

    public prepend(str: string): void {
        this._text = `${str}${this._text}`;
    }

    public append(str: string): void {
        this._text += str;
    }

    public wrap(pre: string, post: string): void {
        this._text = `${pre}${this._text}${post}`;
    }

    public flush(): void {
        this._text = '';
    }

    public addChild(buffer: StringBuffer): void {
        this._children.push(buffer);
    }

    public addChildren(buffers: StringBuffer[]): void {
        this._children.push(...buffers);
    }

    public toString(): string {
        return this._text;
    }

    public toStringTree(): string {
        const children: string[] = this._children.map((child: StringBuffer): string => child.toStringTree());

        return `${this._text}${children.join('')}`;
    }
}
