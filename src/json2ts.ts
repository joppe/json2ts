import { compile } from 'app/compiler/compile';
import { structure, StructureResult } from 'app/compiler/structure';
import { Node } from 'app/parser/node';
import { parse } from 'app/parser/parse';

/**
 * Convenient function that hides all implementation details.
 */

export function json2ts(json: string, rootName: string): string {
    const result: Node = parse(json, rootName);
    const structures: StructureResult = structure(result);

    return compile(structures.structures);
}
