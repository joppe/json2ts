import { IntermediateProperty } from './IntermediateProperty';

export type Property = Omit<IntermediateProperty, 'nested'>;
