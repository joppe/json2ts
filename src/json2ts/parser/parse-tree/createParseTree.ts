import { Json } from '@apestaartje/types';

import { createNode } from '../node/createNode';
import { getNodeType } from '../node/getNodeType';
import { isAlreadyChild } from './isAlreadyChild';
import { Node } from '../node/Node';
import { NodeType } from '../node/NodeType';
import { ucfirst } from '@apestaartje/string';
import { nodeTypeToString } from '../node/nodeTypeToString';

export function createParseTree(name: string, data: Json, postFixNameWithType: boolean = false): Node {
    const type: NodeType = getNodeType(data);
    const node: Node = createNode(`${name}${postFixNameWithType ? ucfirst(nodeTypeToString(type)) : '' }`, type);

    if (type === NodeType.Object) {
        Object.keys(<object>data)
            .forEach((key: string): void => {
                node.children.push(createParseTree(key, <Json>(<object>data)[key]));
            });
    } else if (type === NodeType.Array) {
        (<Json[]>data).forEach((child: Json): void => {
            const childNode: Node = createParseTree(name, child, true);

            if (!isAlreadyChild(childNode, node.children)) {
                node.children.push(childNode);
            }
        });
    }

    return node;
}
