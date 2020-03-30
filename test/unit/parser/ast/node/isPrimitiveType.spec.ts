import { isPrimitiveType } from '@apestaartje/json2ts/parser/ast/node/isPrimitiveType';
import { NodeType } from '@apestaartje/json2ts/parser/ast/node/NodeType';

/**
 * Check generation of Node objects.
 */

describe('isPrimitive', (): void => {
    it('Should tell if a type is an primitive', (): void => {
        expect(isPrimitiveType(NodeType.Array)).toBe(false);
        expect(isPrimitiveType(NodeType.Boolean)).toBe(true);
        expect(isPrimitiveType(NodeType.Number)).toBe(true);
        expect(isPrimitiveType(NodeType.String)).toBe(true);
        expect(isPrimitiveType(NodeType.Object)).toBe(false);
    });
});
