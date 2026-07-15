// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10659-9869
// source=src/button.tsx
// component=ButtonLink
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Action');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

const state = instance.getEnum('State', {
    Default: 'default',
    Disabled: 'disabled',
    Loading: 'loading',
    Pressed: 'default',
});

const small = instance.getEnum('Small', {True: true, False: false});

const bleedLeft = instance.getBoolean('BleedLeft');
const bleedRight = instance.getBoolean('BleedRight');
const bleedY = instance.getBoolean('BleedY');

const iconPosition = instance.getEnum('Icon', {
    None: 'none',
    startIcon: 'start',
    endIcon: 'end',
});

const icon = instance.getInstanceSwap('Choose icon →');
let iconCode;
if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

export default {
    example: figma.code`
        <ButtonLink
            ${small ? 'small' : ''}
            ${state === 'disabled' ? 'disabled' : ''}
            ${state === 'loading' ? 'showSpinner' : ''}
            ${bleedLeft ? 'bleedLeft' : ''}
            ${bleedRight ? 'bleedRight' : ''}
            ${bleedY ? 'bleedY' : ''}
            ${iconCode && iconPosition === 'start' ? figma.code`StartIcon={${iconCode}}` : ''}
            ${iconCode && iconPosition === 'end' ? figma.code`EndIcon={${iconCode}}` : ''}
            onPress={() => {}}
        >
            ${label}
        </ButtonLink>
    `,
    imports: ['import {ButtonLink} from "@telefonica/mistica";'],
    id: 'button-link',
    metadata: {nestable: false},
};
