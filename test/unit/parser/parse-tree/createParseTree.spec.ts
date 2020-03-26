import { createParseTree } from '@apestaartje/json2ts/parser/parse-tree/createParseTree';
import { Node } from '@apestaartje/json2ts/parser/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/node/NodeType';

/**
 * Check the generation of an Abstract Syntax Tree
 */

describe('createParseTree', (): void => {
    it('handle simple object', (): void => {
        const generated: Node = createParseTree('root', { foo: 'foo', bar: 12, isTrue: false });
        const expected: Node = {
            name: 'root',
            type: NodeType.Object,
            children: [
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
            ],
        };

        expect(generated).toEqual(expected);
    });

    it('handle number', (): void => {
        const generated: Node = createParseTree('root', 1);
        const expected: Node = {
            name: 'root',
            type: NodeType.Number,
            children: [],
        };

        expect(generated).toEqual(expected);
    });

    it('handle string', (): void => {
        const generated: Node = createParseTree('root', 'Hello world!');
        const expected: Node = {
            name: 'root',
            type: NodeType.String,
            children: [],
        };

        expect(generated).toEqual(expected);
    });

    it('handle boolean', (): void => {
        const generated: Node = createParseTree('root', true);
        const expected: Node = {
            name: 'root',
            type: NodeType.Boolean,
            children: [],
        };

        expect(generated).toEqual(expected);
    });

    it('handle array', (): void => {
        const generated: Node = createParseTree('root', [1, 3, 59]);
        const expected: Node = {
            name: 'root',
            type: NodeType.Array,
            children: [
                {
                    name: 'rootNumber',
                    type: NodeType.Number,
                    children: [],
                },
            ],
        };

        expect(generated).toEqual(expected);
    });

    it('handle nested arrays', (): void => {
        const generated: Node = createParseTree('root', { foo: [ [ { id: 1 }, 'hello', 9, 10 ] ] });
        const expected: Node = {
            name: 'root',
            type: NodeType.Object,
            children: [
                {
                    name: 'foo',
                    type: NodeType.Array,
                    children: [
                        {
                            name: 'fooArray',
                            type: NodeType.Array,
                            children: [
                                {
                                    name: 'fooObject',
                                    type: NodeType.Object,
                                    children: [
                                        {
                                            name: 'id',
                                            type: NodeType.Number,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    name: 'fooString',
                                    type: NodeType.String,
                                    children: [],
                                },
                                {
                                    name: 'fooNumber',
                                    type: NodeType.Number,
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        expect(generated).toEqual(expected);
    });
});
