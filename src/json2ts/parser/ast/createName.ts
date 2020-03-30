import { ucfirst } from '@apestaartje/string';

import { NodeType } from './node/NodeType';

type NameRegistry = {[key: string]: number};

const nameRegistry: NameRegistry = {};

export function flush(): void {
    Object.keys(nameRegistry)
        .forEach((key: string): void => {
            // tslint:disable-next-line no-dynamic-delete
            delete nameRegistry[key];
        });
}

export function createName(nameProposal: string, type: NodeType): string {
    if (type !== NodeType.Object) {
        return nameProposal;
    }

    let name: string = ucfirst(nameProposal);

    if (nameRegistry[name] === undefined) {
        nameRegistry[name] = 0;
    }

    if (nameRegistry[name] > 0) {
        name = `${name}${String(nameRegistry[name])}`;
    }

    nameRegistry[name] += 1;

    return name;
}
