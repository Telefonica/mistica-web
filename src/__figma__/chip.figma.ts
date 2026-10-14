// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2106-4571
// source=src/chip.tsx
// component=Chip
import figma from 'figma';

const instance = figma.selectedInstance;

const textLayer = instance.findText('Text');
const text = textLayer.type === 'TEXT' ? textLayer.textContent : '';

// "Closable" and "Type" VARIANTs select which flavour of Chip is rendered:
// closable chip (onClose), action chip (href), or selection/toggle chip (active only).
const closable = instance.getEnum('Closable', {True: true, False: false});
const type = instance.getEnum('Type', {Action: 'action', Selection: 'selection'});

// "Small" and "Selected" are VARIANTs mapping onto the `small` and `active` props.
const small = instance.getEnum('Small', {True: true, False: false});
const selected = instance.getEnum('Selected', {True: true, False: false});

// "Badge" VARIANT toggles the numeric badge (only rendered on non-closable chips).
const badge = instance.getEnum('Badge', {True: 2, False: undefined});

// "Icon" VARIANT toggles the swappable "Choose icon" instance.
const iconVariant = instance.getEnum('Icon', {True: true, False: false});
const icon = instance.getInstanceSwap('Choose icon');
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
            ${!closable && badge ? figma.code`badge={${badge}}` : ''}
            ${closable ? 'onClose={() => {}}' : ''}
            ${!closable && type === 'action' ? 'href="https://example.com"' : ''}
        >
            ${text}
        </Chip>
    `,
    imports: ['import {Chip} from "@telefonica/mistica";'],
    id: 'chip',
    metadata: {nestable: false},
};
