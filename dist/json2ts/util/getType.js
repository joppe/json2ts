const TYPE_RE = /^\[object\s(\w+)\]$/;
export function getType(value) {
    const raw = Object.prototype.toString.call(value);
    const matches = TYPE_RE.exec(raw);
    if (matches === null || matches.length !== 2) {
        throw new Error(`Type could not be found for "${raw}"`);
    }
    return matches[1];
}
//# sourceMappingURL=getType.js.map