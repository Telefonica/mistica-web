// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10659-9868
// source=src/button.tsx
// component=ButtonDanger
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
        <ButtonDanger
            ${small ? 'small' : ''}
            ${state === 'disabled' ? 'disabled' : ''}
            ${state === 'loading' ? 'showSpinner' : ''}
            ${iconCode && iconPosition === 'start' ? figma.code`StartIcon={${iconCode}}` : ''}
            ${iconCode && iconPosition === 'end' ? figma.code`EndIcon={${iconCode}}` : ''}
            onPress={() => {}}
        >
            ${label}
        </ButtonDanger>
    `,
    imports: ['import {ButtonDanger} from "@telefonica/mistica";'],
    id: 'button-danger',
    metadata: {nestable: false},
};
