import { compile } from './compiler/compile';
import { Node } from './parser/ast/node/Node';
import { parse } from './parser/parse';
import { TSInterface } from './compiler/TSInterface';

export function json2ts(json: string, rootName: string): TSInterface {
    const ast: Node = parse(json, rootName);

    return compile(ast);
}
