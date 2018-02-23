import { IPropertyTypeArray, Property, Structure } from 'app/compiler/structure';
import { createBuffer , IBuffer } from 'app/util/buffer';
import { getType } from 'app/util/type';

/**
 * Compile the structures to a string.
 */

export function arrayType(types: IPropertyTypeArray): string {
    const buffer: IBuffer = createBuffer();

    if (types.length > 1) {
        buffer.append('(');
    }

    types.forEach((type: IPropertyTypeArray | string, index: number) => {
        if (index > 0) {
            buffer.append('|');
        }

        if (getType(type) === 'Array') {
            buffer.append(arrayType(<IPropertyTypeArray>type));
        } else {
            buffer.append(<string>type);
        }
    });

    if (types.length > 1) {
        buffer.append(')');
    }

    buffer.append('[]');

    return buffer.flush();
}

export function compile(structures: { [id: string]: Structure }): string {
    const buffer: IBuffer = createBuffer();

    Object.keys(structures).forEach((id: string): void => {
        const structure: Structure = structures[id];

        buffer.newLine();
        buffer.append('<span class="keyword">interface</span> ');
        buffer.append(`<span class="interface-name">${structure.name}</span>`);
        buffer.append(' {');

        structure.properties.forEach((property: Property): void => {
            buffer.newLine();
            buffer.tab();
            buffer.append(`<span class="name">${property.name}</span>`);

            if (property.optional) {
                buffer.append('?');
            }

            buffer.append(': ');

            if (property.isArray) {
                buffer.append(`<span class="type">${arrayType(property.type)}</span>`);
            } else {
                buffer.append(`<span class="type">${property.type.join('')}</span>`);
            }

            buffer.append(';');
        });

        buffer.newLine();
        buffer.append('}');
        buffer.newLine();

    });

    buffer.newLine();

    return buffer.flush();
}
