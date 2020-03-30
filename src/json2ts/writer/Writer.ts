import { getType } from '../util/type/getType';
import { PropertyType } from '../compiler/PropertyType';
import { StringBuffer } from '../compiler/StringBuffer';
import { TSInterface } from '../compiler/TSInterface';
import { TSProperty } from '../compiler/TSProperty';

export class Writer {
    private readonly _rootInterface: TSInterface;

    public constructor(rootInterface: TSInterface) {
        this._rootInterface = rootInterface;
    }

    public write(): string {
        return this.object(this._rootInterface)
            .toStringTree();
    }

    private type(propertyTypes: PropertyType[], isArray: boolean): StringBuffer {
        const buffer: StringBuffer = new StringBuffer();

        propertyTypes.forEach((propertyType: PropertyType, index: number): void => {
            const type: string = getType(propertyType);

            if (index > 0) {
                buffer.append('|');
            }

            if (type === 'Array') {
                const nested: StringBuffer = this.type(<PropertyType[]>propertyType, true);

                buffer.append(`<span class="type type--array">${nested.toString()}</span>`);
                buffer.addChildren(nested.children);
            } else if (type === 'Object') {
                buffer.append(`<span class="type type--object">${(<TSInterface>propertyType).name}</span>`);
                buffer.addChild(this.object(<TSInterface>propertyType));
            } else {
                buffer.append(`<span class="type type--primitive">${<string>propertyType}</span>`);
            }
        });

        if (propertyTypes.length > 1) {
            buffer.wrap('(', ')');
        }

        if (isArray) {
            buffer.append('[]');
        }

        return buffer;
    }

    private object(object: TSInterface): StringBuffer {
        const buffer: StringBuffer = new StringBuffer();

        buffer.newLine();
        buffer.append('<span class="keyword keyword--interface">interface</span>');
        buffer.space();
        buffer.append(`<span class="name name--interface">${object.name}</span>`);
        buffer.append(' {');

        object.properties.forEach((property: TSProperty): void => {
            buffer.newLine();
            buffer.tab();
            buffer.append(`<span class="name name--property">${property.name}</span>`);

            if (property.isOptional) {
                buffer.append('?');
            }

            buffer.append(':');
            buffer.space();

            const nested: StringBuffer = this.type(property.type, property.isArray);
            buffer.append(`<span class="type">${nested.toString()}</span>`);

            buffer.addChildren(nested.children);
            buffer.append(';');
        });

        buffer.newLine();
        buffer.append('}');
        buffer.newLine();

        return buffer;
    }
}
