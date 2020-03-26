import { PropertyType } from './PropertyType';
export declare type Property = {
    name: string;
    type: PropertyType[];
    isArray: boolean;
    isOptional: boolean;
};
