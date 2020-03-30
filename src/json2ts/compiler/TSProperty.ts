import { PropertyType } from './PropertyType';

export type TSProperty = {
    name: string;
    type: PropertyType[];
    isArray: boolean;
    isOptional: boolean;
};
