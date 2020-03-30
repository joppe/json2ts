import { Node } from '@apestaartje/json2ts/parser/ast/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/ast/node/NodeType';
import { parse } from '@apestaartje/json2ts/parser/parse';

describe('parse', (): void => {
    it('create a parse tree from a valid JSON', (): void => {
        const expected: Node = {
            name: 'Root',
            type: NodeType.Object,
            children: [
                {
                    name: 'foo',
                    type: NodeType.String,
                    children: [],
                },
                {
                    name: 'quux',
                    type: NodeType.Boolean,
                    children: [],
                },
            ],
        };

        expect(parse('{"foo": "bar", "quux": false}', 'root')).toEqual(expected);
    });
});
