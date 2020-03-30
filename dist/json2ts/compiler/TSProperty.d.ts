import { PropertyType } from './PropertyType';
export declare type TSProperty = {
    name: string;
    type: PropertyType[];
    isArray: boolean;
    isOptional: boolean;
};
