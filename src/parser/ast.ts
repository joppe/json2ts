import { create as createNode, getNodeType, Node, NodeType } from 'app/parser/node';
import { isEqual } from 'app/util/equal';
import { IJSONArray, JSONValue } from 'app/util/json';

/**
 * Create an AST tree from an object literal
 */

/**
 * Prevent that there are two (or more) children with exactly the same structure.
 */
function isAlreadyChild(newChild: Node, children: Node[]): boolean {
    return children.find((existingChild: Node): boolean => {
        return isEqual(newChild, existingChild);
    }) !== undefined;
}

/**
 * Create a leaf node.
 */
function leaf(name: string, data: JSONValue): Node {
    const type: NodeType = getNodeType(data);
    const node: Node = createNode(name, type);

    if (type === NodeType.Object) {
        Object.keys(data).forEach((key: string): void => {
            node.children.push(leaf(key, data[key]));
        });
    } else if (type === NodeType.Array) {
        (<IJSONArray>data).forEach((child: JSONValue): void => {
            const childNode: Node = leaf(name, child);

            if (!isAlreadyChild(childNode, node.children)) {
                node.children.push(childNode);
            }
        });
    }

    return node;
}

/**
 * Create an Abstract Syntax Tree from a given json.
 */
export function ast(data: JSONValue, rootName: string): Node {
    let root: Node;
    const rootType: NodeType = getNodeType(data);

    if (rootType === NodeType.Object) {
        root = leaf(rootName, data);
    } else {
        root = createNode(rootName, NodeType.Object);
        root.children.push(leaf(`${rootName}Child`, data));
    }

    return root;
}
