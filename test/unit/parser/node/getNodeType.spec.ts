import { getNodeType } from '@apestaartje/json2ts/parser/node/getNodeType';
import { NodeType } from '@apestaartje/json2ts/parser/node/NodeType';

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
            // tslint:disable-next-line no-any
            getNodeType(<any>undefined);
        }).toThrow();
    });
});
