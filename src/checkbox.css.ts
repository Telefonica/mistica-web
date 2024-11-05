import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const checkboxContainerBase = style([
    sprinkles({
        display: 'inline',
    }),
    {
        WebkitTapHighlightColor: 'transparent',
    },
]);

export const checkboxContainer = style([
    checkboxContainerBase,
    {
        cursor: 'pointer',
    },
]);

export const checkboxContainerDisabled = style([
    checkboxContainerBase,
    {
        cursor: 'default',
    },
]);

const boxBase = style([
    sprinkles({
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: vars.borderRadii.checkbox,
    }),
    {
        height: 18,
        width: 18,
        userSelect: 'none',
        outline: '1px solid transparent',
        verticalAlign: 'middle',
        transition: 'box-shadow 0.3s',
    },
]);

export const boxVariant = styleVariants({
    ios: [boxBase, {background: vars.colors.background, boxShadow: `inset 0 0 0 1px ${vars.colors.control}`}],
    rest: [
        boxBase,
        {background: vars.colors.background, boxShadow: `inset 0 0 0 2px ${vars.colors.control}`},
    ],
    checked: [
        boxBase,
        {background: vars.colors.background, boxShadow: `inset 0 0 0 12px ${vars.colors.controlActivated}`},
    ],
});

export const inverseBoxVariant = styleVariants({
    ios: [boxBase, {background: 'transparent', boxShadow: `inset 0 0 0 1px ${vars.colors.controlInverse}`}],
    rest: [boxBase, {background: 'transparent', boxShadow: `inset 0 0 0 2px ${vars.colors.controlInverse}`}],
    checked: [
        boxBase,
        {background: 'transparent', boxShadow: `inset 0 0 0 12px ${vars.colors.controlActivatedInverse}`},
    ],
});

export const check = style([
    sprinkles({
        display: 'block',
    }),
    {
        transform: 'scale(0, 0)',
        transformOrigin: 'center',
        transition: 'transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)', // https://easings.net/#easeInOutBack
    },
]);

export const checkChecked = style({
    transform: 'scale(1, 1)',
});

export const disabled = style({
    opacity: 0.5,
    cursor: 'default',
});
