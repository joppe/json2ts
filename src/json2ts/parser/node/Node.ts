import { NodeType } from './NodeType';

export type Node = {
    name: string;
    type: NodeType;
    children: Node[];
};
