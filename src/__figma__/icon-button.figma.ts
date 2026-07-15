// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2166-4324
// source=src/icon-button.tsx
// component=IconButton
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {Brand: 'brand', Danger: 'danger', Neutral: 'neutral'});

const backgroundType = instance.getEnum('Background type', {
    Soft: 'soft',
    Solid: 'solid',
    Transparent: 'transparent',
});

// "State" is a VARIANT (Default | Disabled | Loading) mapping onto `disabled` and `showSpinner`.
const state = instance.getEnum('State', {Default: 'default', Disabled: 'disabled', Loading: 'loading'});

// "Small" is a VARIANT (false | true) mapping to the boolean `small` code prop.
const small = instance.getEnum('Small', {true: true, false: false});

const icon = instance.getInstanceSwap('Choose icon');
let iconCode;
if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

export default {
    example: figma.code`
        <IconButton
            ${iconCode ? figma.code`Icon={${iconCode}}` : ''}
            ${type ? figma.code`type="${type}"` : ''}
            ${backgroundType ? figma.code`backgroundType="${backgroundType}"` : ''}
            ${small ? 'small' : ''}
            ${state === 'disabled' ? 'disabled' : ''}
            ${state === 'loading' ? 'showSpinner' : ''}
            aria-label="icon button"
            onPress={() => {}}
        />
    `,
    imports: ['import {IconButton} from "@telefonica/mistica";'],
    id: 'icon-button',
    metadata: {nestable: false},
};
