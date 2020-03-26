import { Node } from './Node';
import { NodeType } from './NodeType';

export function createNode(name: string, type: NodeType): Node {
    return {
        name,
        type,
        children: [],
    };
}
