// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=47-4538
// source=src/tag.tsx
// component=Tag
import figma from 'figma';

const instance = figma.selectedInstance;

const textLayer = instance.findText('Text');
const text = textLayer.type === 'TEXT' ? textLayer.textContent : '';

// "State" VARIANT selects the tag `type`.
const type = instance.getEnum('State', {
    Active: 'active',
    Inactive: 'inactive',
    Promo: 'promo',
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
});

// "Small" is a VARIANT (not a BOOLEAN property) mapping onto the `small` code prop.
const small = instance.getEnum('Small', {True: true, False: false});

// "Badge" BOOLEAN toggles the numeric badge.
const hasBadge = instance.getBoolean('Badge');

// "Icon" VARIANT toggles the swappable "Choose icon →" instance.
const iconVariant = instance.getEnum('Icon', {True: true, False: false});
const icon = instance.getInstanceSwap('Choose icon →');
let iconCode;
if (iconVariant && icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

export default {
    example: figma.code`
        <Tag
            type="${type}"
            ${small ? 'small' : ''}
            ${hasBadge ? 'badge' : ''}
            ${iconCode ? figma.code`Icon={${iconCode}}` : ''}
        >
            ${text}
        </Tag>
    `,
    imports: ['import {Tag} from "@telefonica/mistica";'],
    id: 'tag-mobile',
    metadata: {nestable: false},
};
