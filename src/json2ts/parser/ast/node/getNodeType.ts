import { Json } from '@apestaartje/types';

import { getType } from '../../../util/type/getType';
import { NodeType } from './NodeType';

export function getNodeType(value: Json): NodeType {
    const type: string = getType(value);

    switch (type) {
        case 'Array':
            return NodeType.Array;
        case 'Boolean':
            return  NodeType.Boolean;
        case 'Number':
            return NodeType.Number;
        case 'Object':
            return NodeType.Object;
        case 'String':
            return NodeType.String;
        default:
            throw new Error(`Unsupported type "${type}"`);
    }
}
