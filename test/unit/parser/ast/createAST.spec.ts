import { createAST } from '@apestaartje/json2ts/parser/ast/createAST';
import { Node } from '@apestaartje/json2ts/parser/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/node/NodeType';
import { Structure } from '@apestaartje/json2ts/parser/ast/Structure';

// tslint:disable max-func-body-length

describe('createAST', (): void => {
    /*
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
        const expected: Structure[] = [
            {
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
            },
        ];

        expect(createAST(input)).toEqual(expected);
    });
    */

    /*
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
        const expected: Structure[] = [
            {
                name: 'Root',
                properties: [
                    {
                        name: 'foo',
                        isArray: false,
                        isOptional: false,
                        type: ['Foo'],
                    },
                    {
                        name: 'meta',
                        isArray: false,
                        isOptional: false,
                        type: ['Meta'],
                    },
                    {
                        name: 'isTrue',
                        isArray: false,
                        isOptional: false,
                        type: ['boolean'],
                    },
                ],
            },
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
                        type: ['Position'],
                    },
                ],
            },
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
        ];

        expect(createAST(input)).toEqual(expected);
    });
    */

    it('handle nested array', (): void => {
        const input: Node = {
            name: 'root',
            type: NodeType.Object,
            children: [
                {
                    name: 'foo',
                    type: NodeType.Array,
                    children: [
                        {
                            name: 'fooObject',
                            type: NodeType.Object,
                            children: [
                                {
                                    name: 'foobar1',
                                    type: NodeType.Array,
                                    children: [
                                        {
                                            name: 'foobar2',
                                            type: NodeType.Array,
                                            children: [
                                                {
                                                    name: 'quux',
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
                            name: 'fooArray',
                            type: NodeType.Array,
                            children: [
                                {
                                    name: 'fooArrayNumber1',
                                    type: NodeType.Number,
                                    children: [],
                                },
                                {
                                    name: 'fooArrayNumber2',
                                    type: NodeType.Number,
                                    children: [],
                                },
                                {
                                    name: 'fooArrayObject3',
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
                                    name: 'fooArrayObject',
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
        const expected: Structure[] = [
            {
                name: 'Root',
                properties: [
                    {
                        name: 'foo',
                        isArray: true,
                        isOptional: false,
                        type: ['FooObject', ['number', 'FooArrayObject']],
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
            },
            {
                name: 'FooObject',
                properties: [
                    {
                        name: 'foobar',
                        isArray: false,
                        isOptional: false,
                        type: ['number'],
                    },
                ],
            },
            {
                name: 'FooArrayObject',
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
        ];

        // console.log(JSON.stringify(createAST(input)));

        expect(createAST(input).sort()).toEqual(expected.sort());
    });
});
