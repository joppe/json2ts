import { isAlreadyChild } from '@apestaartje/json2ts/parser/ast/isAlreadyChild';
import { Node } from '@apestaartje/json2ts/parser/ast/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/ast/node/NodeType';

/**
 * Check the generation of an Abstract Syntax Tree
 */

describe('isAlreadyChild', (): void => {
    it('tells is there are no equal Nodes', (): void => {
        const children: Node[] = [
            {
                name: 'foo',
                type: NodeType.String,
                children: [],
            },
            {
                name: 'bar',
                type: NodeType.Number,
                children: [],
            },
            {
                name: 'isTrue',
                type: NodeType.Boolean,
                children: [],
            },
        ];
        const a: Node = {
            name: 'foo',
            type: NodeType.String,
            children: [],
        };
        const b: Node = {
            name: 'foobar',
            type: NodeType.String,
            children: [],
        };

        expect(isAlreadyChild(a, children)).toBe(true);
        expect(isAlreadyChild(b, children)).toBe(false);
    });
});
