import { isEqual } from '../../util/equal/isEqual';
import { Node } from '../node/Node';

export function isAlreadyChild(newChild: Node, children: Node[]): boolean {
    return children.find((existingChild: Node): boolean => {
        return isEqual(newChild, existingChild);
    }) !== undefined;
}
