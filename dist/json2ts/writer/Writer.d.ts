import { TSInterface } from '../compiler/TSInterface';
export declare class Writer {
    private readonly _rootInterface;
    constructor(rootInterface: TSInterface);
    write(): string;
    private type;
    private object;
}
