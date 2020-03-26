import { NodeType } from './NodeType';
export function isPrimitiveType(value) {
    return (value === NodeType.Boolean ||
        value === NodeType.Number ||
        value === NodeType.String);
}
//# sourceMappingURL=isPrimitiveType.js.map