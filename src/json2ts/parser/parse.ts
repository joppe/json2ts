import { Json } from '@apestaartje/types';

import { createAST } from './ast/createAST';
import { Node } from './ast/node/Node';

export function parse(json: string, rootName: string): Node {
    const data: Json = <Json>JSON.parse(json);

    return createAST(rootName, data);
}
