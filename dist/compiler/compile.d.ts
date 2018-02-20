import { IPropertyTypeArray, Structure } from 'app/compiler/structure';
export declare function arrayType(types: IPropertyTypeArray): string;
export declare function compile(structures: {
    [id: string]: Structure;
}): string;
