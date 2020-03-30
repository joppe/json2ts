import { Node } from '@apestaartje/json2ts/parser/ast/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/ast/node/NodeType';
import { TSInterface } from '@apestaartje/json2ts/compiler/TSInterface';
import { compile } from '@apestaartje/json2ts/compiler/compile';

// tslint:disable max-func-body-length

describe('compile', (): void => {
    it('handle simple object', (): void => {
        const input: Node = {
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
        const expected: TSInterface = {
            name: 'Root',
            properties: [
                {
                    name: 'foo',
                    isArray: false,
                    isOptional: false,
                    type: ['string'],
                },
                {
                    name: 'bar',
                    isArray: false,
                    isOptional: false,
                    type: ['number'],
                },
                {
                    name: 'isTrue',
                    isArray: false,
                    isOptional: false,
                    type: ['boolean'],
                },
            ],
        };

        expect(compile(input)).toEqual(expected);
    });

    it('handle nested object', (): void => {
        const input: Node = {
            name: 'root',
            type: NodeType.Object,
            children: [
                {
                    name: 'foo',
                    type: NodeType.Object,
                    children: [
                        {
                            name: 'foobar',
                            type: NodeType.Number,
                            children: [],
                        },
                    ],
                },
                {
                    name: 'meta',
                    type: NodeType.Object,
                    children: [
                        {
                            name: 'name',
                            type: NodeType.String,
                            children: [],
                        },
                        {
                            name: 'position',
                            type: NodeType.Object,
                            children: [
                                {
                                    name: 'x',
                                    type: NodeType.Number,
                                    children: [],
                                },
                                {
                                    name: 'y',
                                    type: NodeType.Number,
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'isTrue',
                    type: NodeType.Boolean,
                    children: [],
                },
            ],
        };
        const expected: TSInterface = {
            name: 'Root',
            properties: [
                {
                    name: 'foo',
                    isArray: false,
                    isOptional: false,
                    type: [
                        {
                            name: 'Foo',
                            properties: [
                                {
                                    name: 'foobar',
                                    isArray: false,
                                    isOptional: false,
                                    type: ['number'],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'meta',
                    isArray: false,
                    isOptional: false,
                    type: [
                        {
                            name: 'Meta',
                            properties: [
                                {
                                    name: 'name',
                                    isArray: false,
                                    isOptional: false,
                                    type: ['string'],
                                },
                                {
                                    name: 'position',
                                    isArray: false,
                                    isOptional: false,
                                    type: [
                                        {
                                            name: 'Position',
                                            properties: [
                                                {
                                                    name: 'x',
                                                    isArray: false,
                                                    isOptional: false,
                                                    type: ['number'],
                                                },
                                                {
                                                    name: 'y',
                                                    isArray: false,
                                                    isOptional: false,
                                                    type: ['number'],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'isTrue',
                    isArray: false,
                    isOptional: false,
                    type: ['boolean'],
                },
            ],
        };

        expect(compile(input)).toEqual(expected);
    });

    it('handle simple array', (): void => {
        const input: Node = {
            name: 'Root',
            type: NodeType.Object,
            children: [
                {
                    name: 'foo',
                    type: NodeType.Array,
                    children: [
                        {
                            name: 'foo',
                            type: NodeType.Number,
                            children: [],
                        },
                        {
                            name: 'bar',
                            type: NodeType.String,
                            children: [],
                        },
                    ],
                },
            ],
        };
        const expected: TSInterface = {
            name: 'Root',
            properties: [
                {
                    name: 'foo',
                    isArray: true,
                    isOptional: false,
                    type: [
                        'number',
                        'string',
                    ],
                },
            ],
        };

        expect(compile(input)).toEqual(expected);
    });

    it('handle nested array', (): void => {
        const input: Node = {
            name: 'Root',
            type: NodeType.Object,
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
                                    name: 'foobar1',
                                    type: NodeType.Array,
                                    children: [
                                        {
                                            name: 'foobar1',
                                            type: NodeType.Array,
                                            children: [
                                                {
                                                    name: 'Foobar1',
                                                    type: NodeType.Object,
                                                    children: [
                                                        {
                                                            name: 'hello',
                                                            type: NodeType.String,
                                                            children: [],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'foo',
                            type: NodeType.Array,
                            children: [
                                {
                                    name: 'foo',
                                    type: NodeType.Number,
                                    children: [],
                                },
                                {
                                    name: 'Foo1',
                                    type: NodeType.Object,
                                    children: [
                                        {
                                            name: 'x',
                                            type: NodeType.Number,
                                            children: [],
                                        },
                                        {
                                            name: 'y',
                                            type: NodeType.Number,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    name: 'Foo1',
                                    type: NodeType.Object,
                                    children: [
                                        {
                                            name: 'x',
                                            type: NodeType.Number,
                                            children: [],
                                        },
                                        {
                                            name: 'y',
                                            type: NodeType.Number,
                                            children: [],
                                        },
                                        {
                                            name: 'z',
                                            type: NodeType.Number,
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
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
        const expected: TSInterface = {
            name: 'Root',
            properties: [
                {
                    name: 'foo',
                    isArray: true,
                    isOptional: false,
                    type: [
                        {
                            name: 'Foo',
                            properties: [
                                {
                                    name: 'foobar1',
                                    isArray: true,
                                    isOptional: false,
                                    type: [
                                        [
                                            {
                                                name: 'Foobar1',
                                                properties: [
                                                    {
                                                        name: 'hello',
                                                        isArray: false,
                                                        isOptional: false,
                                                        type: ['string'],
                                                    },
                                                ],
                                            },
                                        ],
                                    ],
                                },
                            ],
                        },
                        [
                            'number' ,
                            {
                                name: 'Foo1',
                                properties: [
                                    {
                                        name: 'x',
                                        isArray: false,
                                        isOptional: false,
                                        type: ['number'],
                                    },
                                    {
                                        name: 'y',
                                        isArray: false,
                                        isOptional: false,
                                        type: ['number'],
                                    },
                                    {
                                        name: 'z',
                                        isArray: false,
                                        isOptional: true,
                                        type: ['number'],
                                    },
                                ],
                            },
                        ],
                    ],
                },
                {
                    name: 'bar',
                    isArray: false,
                    isOptional: false,
                    type: ['number'],
                },
                {
                    name: 'isTrue',
                    isArray: false,
                    isOptional: false,
                    type: ['boolean'],
                },
            ],
        };

        expect(compile(input)).toEqual(expected);
    });
});
