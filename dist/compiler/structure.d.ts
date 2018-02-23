import { Node, NodeType } from 'app/parser/node';
export declare type PropertyType = string | IPropertyTypeArray;
export interface IPropertyTypeArray extends Array<PropertyType> {
}
export declare type Property = {
    name: string;
    type: IPropertyTypeArray;
    isArray: boolean;
    optional: boolean;
};
export declare type Structure = {
    id: string;
    name: string;
    properties: Property[];
};
export declare type StructureResult = {
    id: string;
    structures: {
        [id: string]: Structure;
    };
};
export declare type PropertyResult = {
    id?: string;
    property: Property;
    structures: {
        [id: string]: Structure;
    };
};
export declare function nodeTypeToTypeScriptType(type: NodeType): string;
export declare function mergeProperties(a: Structure, b: Structure): Structure;
export declare function mergeStructures(add: Structure, collection: {
    [id: string]: Structure;
}): {
    [id: string]: Structure;
};
export declare function primitiveProperty(node: Node): PropertyResult;
export declare function objectProperty(node: Node): PropertyResult;
export declare function arrayProperty(node: Node): PropertyResult;
export declare function property(node: Node): PropertyResult;
export declare function structure(node: Node): StructureResult;
