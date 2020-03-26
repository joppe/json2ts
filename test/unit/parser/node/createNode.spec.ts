import { createNode } from '@apestaartje/json2ts/parser/node/createNode';
import { Node } from '@apestaartje/json2ts/parser/node/Node';
import { NodeType } from '@apestaartje/json2ts/parser/node/NodeType';

describe('createNode', (): void => {
    it('return a Node object', (): void => {
        const node: Node = createNode('test', NodeType.String);

        expect(node).toEqual({
            name: 'test',
            type: NodeType.String,
            children: [],
        });
    });
});
