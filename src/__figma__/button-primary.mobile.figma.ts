// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=22230-10269
// source=src/button.tsx
// component=ButtonPrimary
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Action');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

// "State" is a VARIANT (Default | Disabled | Loading | Pressed). It maps onto two
// independent code props: `disabled` and `showSpinner`. "Pressed" and "Default"
// map to neither.
const state = instance.getEnum('State', {
    Default: 'default',
    Disabled: 'disabled',
    Loading: 'loading',
    Pressed: 'default',
});

// "Small" is a VARIANT (False | True), not a Figma BOOLEAN property.
const small = instance.getEnum('Small', {True: true, False: false});

// "Icon" VARIANT decides whether the swapped icon renders as StartIcon or EndIcon.
const iconPosition = instance.getEnum('Icon', {
    None: 'none',
    StartIcon: 'start',
    EndIcon: 'end',
});

const icon = instance.getInstanceSwap('Choose icon');
let iconCode;
if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

export default {
    example: figma.code`
        <ButtonPrimary
            ${small ? 'small' : ''}
            ${state === 'disabled' ? 'disabled' : ''}
            ${state === 'loading' ? 'showSpinner' : ''}
            ${iconCode && iconPosition === 'start' ? figma.code`StartIcon={${iconCode}}` : ''}
            ${iconCode && iconPosition === 'end' ? figma.code`EndIcon={${iconCode}}` : ''}
            onPress={() => {}}
        >
            ${label}
        </ButtonPrimary>
    `,
    imports: ['import {ButtonPrimary} from "@telefonica/mistica";'],
    id: 'button-primary-mobile',
    metadata: {nestable: false},
};
