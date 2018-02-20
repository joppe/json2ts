import { JSONValue } from 'app/util/json';
import { getType } from 'app/util/type';

/**
 * A Node is a intermediate presentation of the JSON structure
 */

export enum NodeType {
    Array,
    Boolean,
    Number,
    Object,
    String
}

export type Node = {
    name: string;
    type: NodeType;
    children: Node[];
};

export function isPrimitive(value: NodeType): boolean {
    return (
        value === NodeType.Boolean ||
        value === NodeType.Number ||
        value === NodeType.String
    );
}

export function getNodeType(value: JSONValue): NodeType {
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

export function create(name: string, type: NodeType): Node {
    return {
        name,
        type,
        children: []
    };
}
