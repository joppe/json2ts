import { NodeType } from './NodeType';

export function nodeTypeToString(type: NodeType): string {
    if (type === NodeType.String) {
        return 'string';
    } else if (type === NodeType.Number) {
        return 'number';
    } else if (type === NodeType.Boolean) {
        return 'boolean';
    } else if (type === NodeType.Array) {
        return 'array';
    } else if (type === NodeType.Object) {
        return 'object';
    }

    throw new Error(`Unsupported type ${type}`);
}
