import { getType } from '../util/type/getType';
import { PropertyType } from '../compiler/PropertyType';
import { StringBuffer } from '../compiler/StringBuffer';
import { InterfaceDefinition } from '../compiler/InterfaceDefinition';
import { PropertyDefinition } from '../compiler/PropertyDefinition';

export class Writer {
    private readonly _rootDefinition: InterfaceDefinition;

    public constructor(rootDefinition: InterfaceDefinition) {
        this._rootDefinition = rootDefinition;
    }

    public write(): string {
        return this.object(this._rootDefinition)
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
                buffer.append(`<span class="type type--object">${(<InterfaceDefinition>propertyType).name}</span>`);
                buffer.addChild(this.object(<InterfaceDefinition>propertyType));
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

    private object(definition: InterfaceDefinition): StringBuffer {
        const buffer: StringBuffer = new StringBuffer();

        buffer.newLine();
        buffer.append('<span class="keyword keyword--interface">interface</span>');
        buffer.space();
        buffer.append(`<span class="name name--interface">${definition.name}</span>`);
        buffer.append(' {');

        definition.properties.forEach((property: PropertyDefinition): void => {
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
