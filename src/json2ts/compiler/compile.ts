import { ucfirst } from '@apestaartje/string';

import { getType } from '../util/type/getType';
import { isEqualArray } from '../util/equal/isEqualArray';
import { isPrimitiveType } from '../parser/ast/node/isPrimitiveType';
import { merge } from '../util/array/merge';
import { Node } from '../parser/ast/node/Node';
import { NodeType } from '../parser/ast/node/NodeType';
import { nodeTypeToString } from '../parser/ast/node/nodeTypeToString';
import { PropertyType } from './PropertyType';
import { TSInterface } from './TSInterface';
import { TSProperty } from './TSProperty';

function cloneProperties(master: TSInterface): TSProperty[] {
    return master.properties.map((property: TSProperty): TSProperty => {
        return {
            ...property,
            isOptional: true,
        };
    });
}

function findProperty(searchProperty: TSProperty, properties: TSProperty[]): TSProperty | undefined {
    return properties.find((prop: TSProperty): boolean => {
        return prop.name === searchProperty.name;
    });
}

function mergeProperties(master: TSInterface | undefined, slave: TSInterface): TSInterface {
    if (master === undefined) {
        return slave;
    }

    const properties: TSProperty[] = cloneProperties(master);

    slave.properties.forEach((property: TSProperty): void => {
        const existingProperty: TSProperty | undefined = findProperty(property, properties);

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
    let object: TSInterface | undefined;
    const primitives: PropertyType[] = [];
    const nested: PropertyType[] = [];

    propertyTypes.forEach((propertyType: PropertyType): void => {
        const type: string = getType(propertyType);

        if (type === 'Array') {
            nested.push(propertyType);
        } else if (type === 'String' && primitives.includes(propertyType) === false) {
            primitives.push(propertyType);
        } else if (type === 'Object') {
            object = mergeProperties(object, <TSInterface>propertyType);
        }
    });

    const result: PropertyType[] = object === undefined ? [] : [object];

    return [
        ...primitives,
        ...result,
        ...nested,
    ];
}

function createArrayProperty(node: Node): TSProperty {
    const type: PropertyType[] = [];

    node.children.forEach((child: Node): void => {
        const property: TSProperty = createProperty(child);

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

function createObjectProperty(node: Node): TSProperty {
    const nested: TSInterface = createInterface(node);

    return {
        name: node.name,
        type: [
            nested,
        ],
        isArray: false,
        isOptional: false,
    };
}

function createPrimitiveProperty(node: Node): TSProperty {
    return {
        name: node.name,
        type: [
            nodeTypeToString(node.type),
        ],
        isArray: false,
        isOptional: false,
    };
}

function createProperty(node: Node): TSProperty {
    if (node.type === NodeType.Array) {
        return createArrayProperty(node);
    } else if (node.type === NodeType.Object) {
        return createObjectProperty(node);
    } else if (isPrimitiveType(node.type)) {
        return createPrimitiveProperty(node);
    }

    throw new Error(`Unsupported node type ${node.type}`);
}

function createInterface(node: Node): TSInterface {
    const properties: TSProperty[] = node.children.map((child: Node): TSProperty => {
        return createProperty(child);
    });

    return {
        name: ucfirst(node.name),
        properties,
    };
}

export function compile(ast: Node): TSInterface {
    return createInterface(ast);
}
