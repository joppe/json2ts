import { isPrimitive, Node, NodeType } from 'app/parser/node';
import { merge as mergeArrays } from 'app/util/array';
import { isEqualArray } from 'app/util/equal';
import { ucfirst } from 'app/util/ucfirst';
import { createGenerator } from 'app/util/uuid';

/**
 * Create a structure (interface definition) from an AST.
 */

export type PropertyType = string | IPropertyTypeArray;

export interface IPropertyTypeArray extends Array<PropertyType> {}

export type Property = {
    name: string;
    type: IPropertyTypeArray;
    isArray: boolean;
    optional: boolean;
};

export type Structure = {
    id: string;
    name: string;
    properties: Property[];
};

export type StructureResult = {
    id: string;
    structures: { [id: string]: Structure };
};

export type PropertyResult = {
    id?: string;
    property: Property;
    structures: { [id: string]: Structure };
};

const uuidGenerator: () => string = createGenerator();

export function nodeTypeToTypeScriptType(type: NodeType): string {
    if (type === NodeType.String) {
        return 'string';
    } else if (type === NodeType.Number) {
        return 'number';
    } else if (type === NodeType.Boolean) {
        return 'boolean';
    }

    throw new Error(`Unsupported type ${type}`);
}

/**
 * Merge the properties of two structures to one structure.
 */
export function mergeProperties(a: Structure, b: Structure): Structure {
    const properties: Property[] = a.properties.map((prop: Property): Property => {
        return {
            name: prop.name,
            type: prop.type,
            isArray: prop.isArray,
            optional: true
        };
    });

    b.properties.forEach((prop: Property): void => {
        const existing: Property | undefined = properties.find((p: Property): boolean => {
            return p.name === prop.name;
        });

        if (existing === undefined) {
            properties.push({
                name: prop.name,
                type: prop.type,
                isArray: prop.isArray,
                optional: true
            });
        } else if (!isEqualArray(existing.type, prop.type)) {
            prop.type = mergeArrays(existing.type, prop.type);
        } else {
            existing.optional = false;
        }
    });

    return {
        id: a.id,
        name: a.name,
        properties
    };
}

/**
 * Add a structure to a collection of structures. If the structure name already exists, merge the structures to one
 * structure.
 */
export function mergeStructures(add: Structure, collection: { [id: string]: Structure }): { [id: string]: Structure } {
    const result: { [id: string]: Structure } = {};
    const keys: string[] = Object.keys(collection);

    // The collection is empty, make the structure that needs to be added the collection.
    if (keys.length === 0) {
        return {
            [add.id]: add
        };
    }

    keys.forEach((id: string): void => {
        const existing: Structure = collection[id];

        if (existing.name === add.name) {
            result[id] = mergeProperties(existing, add);
        } else {
            result[id] = existing;
        }
    });

    return result;
}

/**
 * Create a property definition for a primitive type.
 */
export function primitiveProperty(node: Node): PropertyResult {
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

/**
 * Create a property definition for an object type
 */
export function objectProperty(node: Node): PropertyResult {
    const result: StructureResult = structure(node);
    const struct: Structure = result.structures[result.id];

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

/**
 * Create a property definition for an array type
 */
export function arrayProperty(node: Node): PropertyResult {
    let type: string[] = [];
    let structures: { [id: string]: Structure } = {};

    node.children.forEach((child: Node): void => {
        const result: PropertyResult = property(child);

        if (result.id !== undefined) {
            // Merge the structure of the property with the structures of its sibling properties
            structures = mergeStructures(result.structures[result.id], structures);

            delete result.structures[result.id];
        }

        // Merge all grandchild property structures
        structures = {...structures, ...result.structures};

        if (result.property.isArray) {
            type = mergeArrays(type, [result.property.type]);
        } else {
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

/**
 * Property factory function
 */
export function property(node: Node): PropertyResult {
    if (isPrimitive(node.type)) {
        return primitiveProperty(node);
    } else if (node.type === NodeType.Object) {
        return objectProperty(node);
    } else if (node.type === NodeType.Array) {
        return arrayProperty(node);
    }
}

export function structure(node: Node): StructureResult {
    if (node.type !== NodeType.Object) {
        throw new Error(`Unexpected node type "${node.type}"`);
    }

    let structures: { [id: string]: Structure } = {};
    const struct: Structure = {
        id: uuidGenerator(),
        name: ucfirst(node.name),
        properties: []
    };

    structures[struct.id] = struct;

    node.children.forEach((child: Node): void => {
        const result: PropertyResult = property(child);

        struct.properties.push(result.property);
        structures = {...structures, ...result.structures};
    });

    return {
        id: struct.id,
        structures
    };
}
