import { createNode } from '../node/createNode';
import { getNodeType } from '../node/getNodeType';
import { isAlreadyChild } from './isAlreadyChild';
import { NodeType } from '../node/NodeType';
export function createParseTree(name, data) {
    const type = getNodeType(data);
    const node = createNode(name, type);
    if (type === NodeType.Object) {
        Object.keys(data)
            .forEach((key) => {
            node.children.push(createParseTree(key, data[key]));
        });
    }
    else if (type === NodeType.Array) {
        data.forEach((child) => {
            const childNode = createParseTree(name, child);
            if (!isAlreadyChild(childNode, node.children)) {
                node.children.push(childNode);
            }
        });
    }
    return node;
}
//# sourceMappingURL=createParseTree.js.map