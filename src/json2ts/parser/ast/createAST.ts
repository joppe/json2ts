import { Json } from '@apestaartje/types';

import { createName, flush } from './createName';
import { createNode } from './node/createNode';
import { getNodeType } from './node/getNodeType';
import { isAlreadyChild } from './isAlreadyChild';
import { Node } from './node/Node';
import { NodeType } from './node/NodeType';

function ast(name: string, data: Json): Node {
    const type: NodeType = getNodeType(data);
    const node: Node = createNode(createName(name, type), type);

    if (type === NodeType.Object) {
        Object.keys(<object>data)
            .forEach((key: string): void => {
                node.children.push(createAST(key, <Json>(<object>data)[key]));
            });
    } else if (type === NodeType.Array) {
        (<Json[]>data).forEach((child: Json): void => {
            const childNode: Node = createAST(name, child);

            if (!isAlreadyChild(childNode, node.children)) {
                node.children.push(childNode);
            }
        });
    }

    return node;
}

export function createAST(name: string, data: Json): Node {
    flush();

    return ast(name, data);
}
