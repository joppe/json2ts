import { getNodeType, isPrimitive, NodeType } from '../../../src/parser/node';

/**
 * Check generation of Node objects.
 */

describe('node', (): void => {
    describe('getNodeType', (): void => {
        it('Should return a value from the enum NodeType', (): void => {
            expect(getNodeType(false)).toBe(NodeType.Boolean);
            expect(getNodeType(23441)).toBe(NodeType.Number);
            expect(getNodeType('TEST')).toBe(NodeType.String);
            expect(getNodeType([1, 2, 3, 4])).toBe(NodeType.Array);
            expect(getNodeType({x: 1, y: 10})).toBe(NodeType.Object);
        });

        it('Should throw an exception when an unsupported type is given', (): void => {
            expect((): void => {
                getNodeType(undefined);
            }).toThrow();
        });
    });

    describe('isPrimitive', (): void => {
        it('Should tell if a type is an primitive', (): void => {
            expect(isPrimitive(NodeType.Array)).toBe(false);
            expect(isPrimitive(NodeType.Boolean)).toBe(true);
            expect(isPrimitive(NodeType.Number)).toBe(true);
            expect(isPrimitive(NodeType.String)).toBe(true);
            expect(isPrimitive(NodeType.Object)).toBe(false);
        });
    });
});
