import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const outerCircleBase = style([
    sprinkles({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        borderRadius: '50%',
    }),
    {
        width: 20,
        height: 20,
        verticalAlign: 'middle',
        transition: 'background 0.3s, box-shadow 0.3s',
    },
]);

export const outerCircleVariants = styleVariants({
    default: [
        outerCircleBase,
        {background: vars.colors.background, boxShadow: `inset 0 0 0 2px ${vars.colors.control}`},
    ],
    ios: [
        outerCircleBase,
        {background: vars.colors.background, boxShadow: `inset 0 0 0 1px ${vars.colors.control}`},
    ],
    checked: [
        outerCircleBase,
        {
            boxShadow: `inset 0 0 0 2px ${vars.colors.controlActivated}`,
            // using a gradient here to not fill until the circle edge, otherwise the radiobutton border looks strange
            background: vars.colors.background,
        },
    ],
    checkedIos: [
        outerCircleBase,
        {
            boxShadow: `inset 0 0 0 5px ${vars.colors.controlActivated}`,
            background: `radial-gradient(circle, ${vars.colors.iosControlKnob} 0%, ${vars.colors.iosControlKnob} 64%, transparent 64%, transparent 100%)`,
        },
    ],
});

export const overBrandOuterCircleVariants = styleVariants({
    default: [
        outerCircleBase,
        {background: 'transparent', boxShadow: `inset 0 0 0 2px ${vars.colors.controlBrand}`},
    ],
    ios: [
        outerCircleBase,
        {background: 'transparent', boxShadow: `inset 0 0 0 1px ${vars.colors.controlBrand}`},
    ],
    checked: [
        outerCircleBase,
        {
            boxShadow: `inset 0 0 0 2px ${vars.colors.controlActivatedBrand}`,
            // using a gradient here to not fill until the circle edge, otherwise the radiobutton border looks strange
            background: 'transparent',
        },
    ],
    checkedIos: [
        outerCircleBase,
        {
            boxShadow: `inset 0 0 0 5px ${vars.colors.controlActivatedBrand}`,
            background: `radial-gradient(circle, ${vars.colors.controlKnobBrand} 0%, ${vars.colors.controlKnobBrand} 64%, transparent 64%, transparent 100%)`,
        },
    ],
});

const innerCircleBase = style([
    sprinkles({
        display: 'flex',
        borderRadius: '50%',
    }),
    {
        height: 10,
        width: 10,
        opacity: 0,
        transition: `transform 0.2s, opacity 0.2s`,
        transform: 'scale(0)',
    },
]);

export const innerCircleVariant = styleVariants({
    default: [innerCircleBase],
    checked: [
        innerCircleBase,
        sprinkles({
            background: vars.colors.controlActivated,
        }),
        {
            opacity: 1,
            transform: 'none',
        },
    ],
});

export const overBrandInnerCircleVariant = styleVariants({
    default: [innerCircleBase],
    checked: [
        innerCircleBase,
        sprinkles({
            background: vars.colors.controlActivatedBrand,
        }),
        {
            opacity: 1,
            transform: 'none',
        },
    ],
});

const radioButtonBase = style({
    WebkitTapHighlightColor: 'transparent',
});

export const radioButton = style([
    radioButtonBase,
    {
        cursor: 'pointer',
    },
]);

export const radioButtonContainerDisabled = style([
    radioButtonBase,
    {
        cursor: 'default',
    },
]);

export const disabled = style({cursor: 'default', opacity: 0.5});
