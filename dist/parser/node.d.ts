import { JSONValue } from 'app/util/json';
export declare enum NodeType {
    Array = 0,
    Boolean = 1,
    Number = 2,
    Object = 3,
    String = 4,
}
export declare type Node = {
    name: string;
    type: NodeType;
    children: Node[];
};
export declare function isPrimitive(value: NodeType): boolean;
export declare function getNodeType(value: JSONValue): NodeType;
export declare function create(name: string, type: NodeType): Node;
