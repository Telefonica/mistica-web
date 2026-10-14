// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4772-9007
// source=src/avatar.tsx
// component=Avatar
import figma from 'figma';

const instance = figma.selectedInstance;

// "Type" VARIANT selects how the avatar renders: initials, image or icon.
const type = instance.getEnum('Type', {
    Initials: 'letters',
    Image: 'image',
    Icon: 'icon',
});

// "Initials" is a TEXT component property.
const initials = instance.getString('Initials');

// "Choose icon" INSTANCE_SWAP holds the icon rendered when Type=Icon.
const icon = instance.getInstanceSwap('Choose icon');
let iconCode;
if (type === 'icon' && icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

// "Border" BOOLEAN maps to the `border` prop.
const border = instance.getBoolean('Border');

// "Badge" BOOLEAN toggles the nested Badge instance. Its "+9" and "Non-numeric"
// variants decide the numeric/boolean value passed to the `badge` prop.
const hasBadge = instance.getBoolean('Badge');
const badgeInstance = instance.findInstance('Badge');
let badgeValue;
if (hasBadge && badgeInstance.type === 'INSTANCE') {
    const plusNine = badgeInstance.getEnum('+9', {True: true, False: false});
    const nonNumeric = badgeInstance.getEnum('Non-numeric', {True: true, False: false});
    badgeValue = plusNine ? 15 : nonNumeric ? true : 2;
}

export default {
    example: figma.code`
        <Avatar
            size={64}
            ${type === 'image' ? figma.code`src="https://picsum.photos/1200/1200"` : ''}
            ${type === 'letters' ? figma.code`initials="${initials}"` : ''}
            ${iconCode ? figma.code`Icon={${iconCode}}` : ''}
            ${hasBadge ? figma.code`badge={${badgeValue}}` : ''}
            ${border ? 'border' : ''}
        />
    `,
    imports: ['import {Avatar} from "@telefonica/mistica";'],
    id: 'avatar-mobile',
    metadata: {nestable: false},
};
