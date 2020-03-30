import { compile } from './compiler/compile';
import { InterfaceDefinition } from './compiler/InterfaceDefinition';
import { Node } from './parser/ast/node/Node';
import { parse } from './parser/parse';

export function json2ts(json: string, rootName: string): InterfaceDefinition {
    const ast: Node = parse(json, rootName);

    return compile(ast);
}
