import { createAST } from '@apestaartje/json2ts/parser/ast/createAST';
import { Node } from '@apestaartje/json2ts/parser/ast/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/ast/node/NodeType';
import { flush } from '@apestaartje/json2ts/parser/ast/createName';

/**
 * Check the generation of an Abstract Syntax Tree
 */

describe('createParseTree', (): void => {
    beforeEach((): void => {
        flush();
    });

    it('handle simple object', (): void => {
        const generated: Node = createAST('root', { foo: 'foo', bar: 12, isTrue: false });
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
        const generated: Node = createAST('root', 1);
        const expected: Node = {
            name: 'root',
            type: NodeType.Number,
            children: [],
        };

        expect(generated).toEqual(expected);
    });

    it('handle string', (): void => {
        const generated: Node = createAST('root', 'Hello world!');
        const expected: Node = {
            name: 'root',
            type: NodeType.String,
            children: [],
        };

        expect(generated).toEqual(expected);
    });

    it('handle boolean', (): void => {
        const generated: Node = createAST('root', true);
        const expected: Node = {
            name: 'root',
            type: NodeType.Boolean,
            children: [],
        };

        expect(generated).toEqual(expected);
    });

    it('handle array', (): void => {
        const generated: Node = createAST('root', [1, 3, 59]);
        const expected: Node = {
            name: 'root',
            type: NodeType.Array,
            children: [
                {
                    name: 'root',
                    type: NodeType.Number,
                    children: [],
                },
            ],
        };

        expect(generated).toEqual(expected);
    });

    it('handle nested arrays', (): void => {
        /**
         *  Interface Root {
         *      foo: (Foo | string | number)[][];
         *  }
         *
         *  Interface Foo {
         *      x: number;
         *  }
         */
        const generated: Node = createAST('root', { foo: [ [ { id: 1 }, 'hello', 9, 10 ] ] });
        const expected: Node = {
            name: 'Root',
            type: NodeType.Object,
            children: [
                {
                    name: 'foo',
                    type: NodeType.Array,
                    children: [
                        {
                            name: 'foo',
                            type: NodeType.Array,
                            children: [
                                {
                                    name: 'Foo',
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
                                    name: 'foo',
                                    type: NodeType.String,
                                    children: [],
                                },
                                {
                                    name: 'foo',
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
