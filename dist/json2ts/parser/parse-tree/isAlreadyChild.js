import { isEqual } from '../../util/equal/isEqual';
export function isAlreadyChild(newChild, children) {
    return children.find((existingChild) => {
        return isEqual(newChild, existingChild);
    }) !== undefined;
}
//# sourceMappingURL=isAlreadyChild.js.map