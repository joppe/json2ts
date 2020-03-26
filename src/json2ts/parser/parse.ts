import { Json } from '@apestaartje/types';

import { createParseTree } from './parse-tree/createParseTree';
import { Node } from './node/Node';

/**
 * Create a ParseTree from JSON
 */

export function parse(json: string, rootName: string): Node {
    const data: Json = <Json>JSON.parse(json);

    return createParseTree(rootName, data);
}
