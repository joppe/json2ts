import { getType } from '../../util/getType';
import { Json } from '@apestaartje/types';
import { NodeType } from './NodeType';

export function getNodeType(value: Json): NodeType {
    const type: string = getType(value);
    let nodeType: NodeType;

    switch (type) {
        case 'Array':
            nodeType = NodeType.Array;
            break;
        case 'Boolean':
            nodeType = NodeType.Boolean;
            break;
        case 'Number':
            nodeType = NodeType.Number;
            break;
        case 'Object':
            nodeType = NodeType.Object;
            break;
        case 'String':
            nodeType = NodeType.String;
            break;
        default:
            throw new Error(`Unsupported type "${type}"`);
    }

    return nodeType;
}
