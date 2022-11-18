import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const checkboxContainer = style([
    sprinkles({
        display: 'inline',
    }),
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
        borderRadius: 2,
        background: vars.colors.background,
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
    ios: [boxBase, {boxShadow: `inset 0 0 0 1px ${vars.colors.control}`}],
    rest: [boxBase, {boxShadow: `inset 0 0 0 2px ${vars.colors.control}`}],
    checked: [boxBase, {boxShadow: `inset 0 0 0 12px ${vars.colors.controlActivated}`}],
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
});
