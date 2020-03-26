import { ucfirst } from '@apestaartje/string';
import { NodeType } from '../node/NodeType';
import { isPrimitiveType } from '../node/isPrimitiveType';
function nodeTypeToString(type) {
    if (type === NodeType.String) {
        return 'string';
    }
    else if (type === NodeType.Number) {
        return 'number';
    }
    else if (type === NodeType.Boolean) {
        return 'boolean';
    }
    throw new Error(`Unsupported type ${type}`);
}
function createPrimitiveProperty(node) {
    return {
        isArray: false,
        isOptional: false,
        name: node.name,
        type: [
            nodeTypeToString(node.type),
        ],
    };
}
function createObjectProperty(node, structures) {
    return {
        isArray: false,
        isOptional: false,
        name: node.name,
        type: [
            structures[0].name,
        ],
    };
}
function createArrayProperty(node) {
    const type = [];
    return {
        isArray: true,
        isOptional: false,
        name: node.name,
        type,
    };
}
export function createAST(parseTree) {
    const structures = [];
    const structure = {
        name: ucfirst(parseTree.name),
        properties: [],
    };
    parseTree.children.forEach((child) => {
        if (isPrimitiveType(child.type)) {
            structure.properties.push(createPrimitiveProperty(child));
        }
        else if (child.type === NodeType.Object) {
            const nested = createAST(child);
            structure.properties.push(createObjectProperty(child, nested));
            structures.push(...nested);
        }
        else if (child.type === NodeType.Array) {
            const nested = child.children.map(createAST);
        }
    });
    return [
        structure,
        ...structures,
    ];
}
//# sourceMappingURL=createAST.js.map