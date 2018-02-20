/**
 * Type/Interface for JSON.
 */

export type JSONValue = string | number | boolean | IJSONObject | IJSONArray;

export interface IJSONObject {
    [property: string]: JSONValue;
}

export interface IJSONArray extends Array<JSONValue> {
}

export function isJSONArray(value: JSONValue): value is IJSONArray {
    return Array.isArray(<IJSONArray>value);
}
