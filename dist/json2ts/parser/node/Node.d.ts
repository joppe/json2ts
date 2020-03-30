import { NodeType } from './NodeType';
export declare type Node = {
    name: string;
    type: NodeType;
    children: Node[];
};
