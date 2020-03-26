import { Structure } from './Structure';
import { PropertyType } from './PropertyType';

export type IntermediateProperty = {
    name: string;
    type: PropertyType[];
    isArray: boolean;
    isOptional: boolean;
    nested: Structure[];
};
