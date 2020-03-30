import { contains } from './contains';
export function merge(a, b) {
    const c = a.slice(0);
    b.forEach((element) => {
        if (contains(c, element) === false) {
            c.push(element);
        }
    });
    return c;
}
//# sourceMappingURL=merge.js.map