import { PropertyType } from './PropertyType';

export type PropertyDefinition = {
    name: string;
    type: PropertyType[];
    isArray: boolean;
    isOptional: boolean;
};
