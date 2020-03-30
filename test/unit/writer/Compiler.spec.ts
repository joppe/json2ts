import { compile } from '@apestaartje/json2ts/compiler/compile';
import { Node } from '@apestaartje/json2ts/parser/ast/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/ast/node/NodeType';
import { Writer } from '@apestaartje/json2ts/writer/Writer';

// tslint:disable max-func-body-length
describe('Writer', (): void => {
    describe('compile', (): void => {
        it('return a string', (): void => {
            const ast: Node = {
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
            const writer: Writer = new Writer(compile(ast));
            const expected: string = '<span class="keyword keyword--interface">interface</span>&nbsp;<span class="name name--interface">Root</span> {<span class="name name--property">foo</span>:&nbsp;<span class="type">(<span class="type type--object">Foo</span>|<span class="type type--array">(<span class="type type--primitive">number</span>|<span class="type type--object">Foo1</span>)[]</span>)[]</span>;<span class="name name--property">bar</span>:&nbsp;<span class="type"><span class="type type--primitive">number</span></span>;<span class="name name--property">isTrue</span>:&nbsp;<span class="type"><span class="type type--primitive">boolean</span></span>;}<span class="keyword keyword--interface">interface</span>&nbsp;<span class="name name--interface">Foo</span> {<span class="name name--property">foobar1</span>:&nbsp;<span class="type"><span class="type type--array"><span class="type type--object">Foobar1</span>[]</span>[]</span>;}<span class="keyword keyword--interface">interface</span>&nbsp;<span class="name name--interface">Foobar1</span> {<span class="name name--property">hello</span>:&nbsp;<span class="type"><span class="type type--primitive">string</span></span>;}<span class="keyword keyword--interface">interface</span>&nbsp;<span class="name name--interface">Foo1</span> {<span class="name name--property">x</span>:&nbsp;<span class="type"><span class="type type--primitive">number</span></span>;<span class="name name--property">y</span>:&nbsp;<span class="type"><span class="type type--primitive">number</span></span>;<span class="name name--property">z</span>?:&nbsp;<span class="type"><span class="type type--primitive">number</span></span>;}';

            expect(writer.write().replace(/\n|\t/g, '')).toBe(expected);
        });
    });
});
