import { ucfirst } from '@apestaartje/string';

import { getType } from '../util/type/getType';
import { InterfaceDefinition } from './InterfaceDefinition';
import { isEqualArray } from '../util/equal/isEqualArray';
import { isPrimitiveType } from '../parser/ast/node/isPrimitiveType';
import { merge } from '../util/array/merge';
import { Node } from '../parser/ast/node/Node';
import { NodeType } from '../parser/ast/node/NodeType';
import { nodeTypeToString } from '../parser/ast/node/nodeTypeToString';
import { PropertyType } from './PropertyType';
import { PropertyDefinition } from './PropertyDefinition';

function cloneProperties(definition: InterfaceDefinition): PropertyDefinition[] {
    return definition.properties.map((property: PropertyDefinition): PropertyDefinition => {
        return {
            ...property,
            isOptional: true,
        };
    });
}

function findProperty(searchProperty: PropertyDefinition, properties: PropertyDefinition[]): PropertyDefinition | undefined {
    return properties.find((prop: PropertyDefinition): boolean => {
        return prop.name === searchProperty.name;
    });
}

function mergeProperties(master: InterfaceDefinition | undefined, slave: InterfaceDefinition): InterfaceDefinition {
    if (master === undefined) {
        return slave;
    }

    const properties: PropertyDefinition[] = cloneProperties(master);

    slave.properties.forEach((property: PropertyDefinition): void => {
        const existingProperty: PropertyDefinition | undefined = findProperty(property, properties);

        if (existingProperty === undefined) {
            properties.push({
                ...property,
                isOptional: true,
            });
        } else {
            existingProperty.isOptional = false;

            if (!isEqualArray(existingProperty.type, property.type)) {
                existingProperty.type = merge(existingProperty.type, property.type);
            }
        }
    });

    return {
        name: master.name,
        properties,
    };
}

function normalizePropertyTypes(propertyTypes: PropertyType[]): PropertyType[] {
    let definition: InterfaceDefinition | undefined;
    const primitives: PropertyType[] = [];
    const nested: PropertyType[] = [];

    propertyTypes.forEach((propertyType: PropertyType): void => {
        const type: string = getType(propertyType);

        if (type === 'Array') {
            nested.push(propertyType);
        } else if (type === 'String' && primitives.includes(propertyType) === false) {
            primitives.push(propertyType);
        } else if (type === 'Object') {
            definition = mergeProperties(definition, <InterfaceDefinition>propertyType);
        }
    });

    const result: PropertyType[] = definition === undefined ? [] : [definition];

    return [
        ...primitives,
        ...result,
        ...nested,
    ];
}

function createArrayProperty(node: Node): PropertyDefinition {
    const type: PropertyType[] = [];

    node.children.forEach((child: Node): void => {
        const property: PropertyDefinition = createProperty(child);

        if (child.type === NodeType.Array) {
            type.push(property.type);
        } else {
            type.push(...property.type);
        }
    });

    return {
        name: node.name,
        type: normalizePropertyTypes(type),
        isArray: true,
        isOptional: false,
    };
}

function createObjectProperty(node: Node): PropertyDefinition {
    const nested: InterfaceDefinition = createInterface(node);

    return {
        name: node.name,
        type: [
            nested,
        ],
        isArray: false,
        isOptional: false,
    };
}

function createPrimitiveProperty(node: Node): PropertyDefinition {
    return {
        name: node.name,
        type: [
            nodeTypeToString(node.type),
        ],
        isArray: false,
        isOptional: false,
    };
}

function createProperty(node: Node): PropertyDefinition {
    if (node.type === NodeType.Array) {
        return createArrayProperty(node);
    } else if (node.type === NodeType.Object) {
        return createObjectProperty(node);
    } else if (isPrimitiveType(node.type)) {
        return createPrimitiveProperty(node);
    }

    throw new Error(`Unsupported node type ${node.type}`);
}

function createInterface(node: Node): InterfaceDefinition {
    const properties: PropertyDefinition[] = node.children.map((child: Node): PropertyDefinition => {
        return createProperty(child);
    });

    return {
        name: ucfirst(node.name),
        properties,
    };
}

export function compile(ast: Node): InterfaceDefinition {
    return createInterface(ast);
}
