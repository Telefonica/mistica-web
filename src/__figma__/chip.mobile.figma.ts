// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=3610-9110
// source=src/chip.tsx
// component=Chip
import figma from 'figma';

const instance = figma.selectedInstance;

const textLayer = instance.findText('Text');
const text = textLayer.type === 'TEXT' ? textLayer.textContent : '';

// "Small" and "Selected" are VARIANTs mapping onto the `small` and `active` props.
const small = instance.getEnum('Small', {True: true, False: false});
const selected = instance.getEnum('Selected', {True: true, False: false});

// "Icon" VARIANT toggles the swappable "Choose icon →" instance.
const iconVariant = instance.getEnum('Icon', {True: true, False: false});
const icon = instance.getInstanceSwap('Choose icon →');
let iconCode;
if (iconVariant && icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

export default {
    example: figma.code`
        <Chip
            ${small ? 'small' : ''}
            active={${selected}}
            ${iconCode ? figma.code`Icon={${iconCode}}` : ''}
            onClose={() => {}}
        >
            ${text}
        </Chip>
    `,
    imports: ['import {Chip} from "@telefonica/mistica";'],
    id: 'chip-mobile',
    metadata: {nestable: false},
};
