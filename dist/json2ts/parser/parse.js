import { createParseTree } from './parse-tree/createParseTree';
export function parse(json, rootName) {
    const data = JSON.parse(json);
    return createParseTree(rootName, data);
}
//# sourceMappingURL=parse.js.map