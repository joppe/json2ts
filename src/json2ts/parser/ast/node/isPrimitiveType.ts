import { NodeType } from './NodeType';

export function isPrimitiveType(value: NodeType): boolean {
    return (
        value === NodeType.Boolean ||
        value === NodeType.Number ||
        value === NodeType.String
    );
}
