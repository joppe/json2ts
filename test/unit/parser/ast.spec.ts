import { ast } from 'app/parser/ast';
import { Node, NodeType } from 'app/parser/node';

/**
 * Check the generation of an Abstract Syntax Tree
 */

describe('ast', (): void => {
    describe('ast', (): void => {
        it('Create a ast of a simple object', (): void => {
            const generated: Node = ast({ foo: 'foo', bar: 12, isTrue: false }, 'root');
            const expected: Node = {
                name: 'root',
                type: NodeType.Object,
                children: [
                    {
                        name: 'foo',
                        type: NodeType.String,
                        children: []
                    },
                    {
                        name: 'bar',
                        type: NodeType.Number,
                        children: []
                    },
                    {
                        name: 'isTrue',
                        type: NodeType.Boolean,
                        children: []
                    }
                ]
            };

            expect(generated).toEqual(expected);
        });

        it('Automatically wrap a number root', (): void => {
            const generated: Node = ast(1, 'root');
            const expected: Node = {
                name: 'root',
                type: NodeType.Object,
                children: [
                    {
                        name: '',
                        type: NodeType.Number,
                        children: []
                    }
                ]
            };

            expect(generated).toEqual(expected);
        });

        it('Automatically wrap a string root', (): void => {
            const generated: Node = ast('Hello world!', 'root');
            const expected: Node = {
                name: 'root',
                type: NodeType.Object,
                children: [
                    {
                        name: '',
                        type: NodeType.String,
                        children: []
                    }
                ]
            };

            expect(generated).toEqual(expected);
        });

        it('Automatically wrap a boolean root', (): void => {
            const generated: Node = ast(true, 'root');
            const expected: Node = {
                name: 'root',
                type: NodeType.Object,
                children: [
                    {
                        name: '',
                        type: NodeType.Boolean,
                        children: []
                    }
                ]
            };

            expect(generated).toEqual(expected);
        });

        it('Automatically wrap an array root', (): void => {
            const generated: Node = ast([1, 3, 59], 'root');
            const expected: Node = {
                name: 'root',
                type: NodeType.Object,
                children: [
                    {
                        name: '',
                        type: NodeType.Array,
                        children: [
                            {
                                name: '',
                                type: NodeType.Number,
                                children: []
                            }
                        ]
                    }
                ]
            };

            expect(generated).toEqual(expected);
        });

        it('Handle nested arrays', (): void => {
            const generated: Node = ast({ foo: [ [ { id: 1 }, 'hello', 9, 10 ] ] }, 'root');
            const expected: Node = {
                name: 'root',
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
                                        name: 'foo',
                                        type: NodeType.Object,
                                        children: [
                                            {
                                                name: 'id',
                                                type: NodeType.Number,
                                                children: []
                                            }
                                        ]
                                    },

                                    {
                                        name: 'foo',
                                        type: NodeType.String,
                                        children: []
                                    },

                                    {
                                        name: 'foo',
                                        type: NodeType.Number,
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            expect(generated).toEqual(expected);
        });
    });
});
