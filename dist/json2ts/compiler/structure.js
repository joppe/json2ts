import { isPrimitive, NodeType } from 'app/parser/node';
import { merge as mergeArrays } from 'app/util/array';
import { isEqualArray } from 'app/util/equal';
import { ucfirst } from 'app/util/ucfirst';
import { createGenerator } from 'app/util/uuid';
const uuidGenerator = createGenerator();
export function nodeTypeToTypeScriptType(type) {
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
export function mergeProperties(a, b) {
    const properties = a.properties.map((prop) => {
        return {
            name: prop.name,
            type: prop.type,
            isArray: prop.isArray,
            optional: true
        };
    });
    b.properties.forEach((prop) => {
        const existing = properties.find((p) => {
            return p.name === prop.name;
        });
        if (existing === undefined) {
            properties.push({
                name: prop.name,
                type: prop.type,
                isArray: prop.isArray,
                optional: true
            });
        }
        else if (!isEqualArray(existing.type, prop.type)) {
            prop.type = mergeArrays(existing.type, prop.type);
        }
        else {
            existing.optional = false;
        }
    });
    return {
        id: a.id,
        name: a.name,
        properties
    };
}
export function mergeStructures(add, collection) {
    const result = {};
    const keys = Object.keys(collection);
    if (keys.length === 0) {
        return {
            [add.id]: add
        };
    }
    keys.forEach((id) => {
        const existing = collection[id];
        if (existing.name === add.name) {
            result[id] = mergeProperties(existing, add);
        }
        else {
            result[id] = existing;
        }
    });
    return result;
}
export function primitiveProperty(node) {
    return {
        property: {
            name: node.name,
            type: [
                nodeTypeToTypeScriptType(node.type)
            ],
            isArray: false,
            optional: false
        },
        structures: {}
    };
}
export function objectProperty(node) {
    const result = structure(node);
    const struct = result.structures[result.id];
    return {
        id: struct.id,
        property: {
            name: node.name,
            type: [
                struct.name
            ],
            isArray: false,
            optional: false
        },
        structures: result.structures
    };
}
export function arrayProperty(node) {
    let type = [];
    let structures = {};
    node.children.forEach((child) => {
        const result = property(child);
        if (result.id !== undefined) {
            structures = mergeStructures(result.structures[result.id], structures);
            delete result.structures[result.id];
        }
        structures = Object.assign(Object.assign({}, structures), result.structures);
        if (result.property.isArray) {
            type = mergeArrays(type, [result.property.type]);
        }
        else {
            type = mergeArrays(type, result.property.type);
        }
    });
    return {
        property: {
            name: node.name,
            type,
            isArray: true,
            optional: false
        },
        structures
    };
}
export function property(node) {
    if (isPrimitive(node.type)) {
        return primitiveProperty(node);
    }
    else if (node.type === NodeType.Object) {
        return objectProperty(node);
    }
    else if (node.type === NodeType.Array) {
        return arrayProperty(node);
    }
}
export function structure(node) {
    if (node.type !== NodeType.Object) {
        throw new Error(`Unexpected node type "${node.type}"`);
    }
    let structures = {};
    const struct = {
        id: uuidGenerator(),
        name: ucfirst(node.name),
        properties: []
    };
    structures[struct.id] = struct;
    node.children.forEach((child) => {
        const result = property(child);
        struct.properties.push(result.property);
        structures = Object.assign(Object.assign({}, structures), result.structures);
    });
    return {
        id: struct.id,
        structures
    };
}
//# sourceMappingURL=structure.js.map