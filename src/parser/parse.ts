import { ast } from 'app/parser/ast';
import { Node } from 'app/parser/node';
import { JSONValue } from 'app/util/json';

/**
 * Create an AST from JSON
 */

export function parse(json: string, rootName: string): Node {
    const data: JSONValue = JSON.parse(json);

    return ast(data, rootName);
}
