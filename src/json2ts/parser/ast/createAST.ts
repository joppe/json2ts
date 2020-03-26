import { ucfirst } from '@apestaartje/string';

import { Node } from '../node/Node';
import { IntermediateProperty } from './IntermediateProperty';
import { NodeType } from '../node/NodeType';
import { nodeTypeToString } from '../node/nodeTypeToString';
import { isPrimitiveType } from '../node/isPrimitiveType';
import { Structure } from './Structure';
import { merge } from '../../util/array/merge';

function createPrimitiveProperty(node: Node): IntermediateProperty {
    return {
        name: node.name,
        type: [
            nodeTypeToString(node.type),
        ],
        isArray: false,
        isOptional: false,
        nested: [],
    };
}

function createObjectProperty(node: Node): IntermediateProperty {
    const nested: Structure[] = createStructure(node);

    return {
        name: node.name,
        type: [
            ucfirst(nested[0].name),
        ],
        isArray: false,
        isOptional: false,
        nested,
    };
}

function mergeStructures(structure: Structure, structures: Structure): Structure[] {
    return [];
}

function createArrayProperty(node: Node): IntermediateProperty {
    const structures: Structure[] = [];
    let type: string[] = [];

    node.children.forEach((child: Node): void => {
        const { nested, ...property } = createProperty(child);

        console.log(node.name, JSON.stringify(nested));

        /**
         * Don't spread the nested, just add them. This way the nesting stays intact.
         * With help of the nesting we can merge the structures.
         *
         * Somehow the information of different children must be kept alive.
         */
        structures.push(...nested);
        type = merge(type, property.isArray ? [property.type] : property.type);
    });

    return {
        name: node.name,
        type,
        isArray: true,
        isOptional: false,
        nested: structures,
    };
}

function createProperty(child: Node): IntermediateProperty {
    if (isPrimitiveType(child.type)) {
        return createPrimitiveProperty(child);
    } else if (child.type === NodeType.Object) {
        return createObjectProperty(child);
    } else if (child.type === NodeType.Array) {
        return createArrayProperty(child);
    }

    throw new Error(`Unsupported node type ${child.type}`);
}

function createStructure(node: Node): Structure[] {
    const structures: Structure[] = [];
    const structure: Structure = {
        name: ucfirst(node.name),
        properties: [],
    };

    node.children.forEach((child: Node): void => {
        const { nested, ...property } = createProperty(child);

        structure.properties.push(property);
        structures.push(...nested);
    });

    return [
        structure,
        ...structures,
    ];
}

export function createAST(parseTree: Node): Structure[] {
    return createStructure(parseTree);
}
