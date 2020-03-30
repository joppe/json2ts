import { isEqual } from '../equal/isEqual';
export function contains(arr, needle) {
    return arr.find((element) => {
        return isEqual(element, needle);
    }) !== undefined;
}
//# sourceMappingURL=contains.js.map