import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const transition = '0.8s cubic-bezier(0.215, 0.61, 0.355, 1)';

export const container = style([
    sprinkles({
        display: 'flex',
        flex: 1,
    }),
    {
        width: '100%',
    },
]);

export const targetContainer = style([{display: 'inline-block', width: '100%'}]);

export const rangeSlider = style([
    sprinkles({
        display: 'flex',
        position: 'relative',
        width: '100%',
    }),
]);

export const sliderBase = style([
    sprinkles({
        borderRadius: vars.borderRadii.bar,
        background: vars.colors.control,
    }),
    {
        WebkitAppearance: 'none',
        width: '100%',
        height: 4,
        outline: 'none',
        margin: 0,
        cursor: 'pointer',

        '::-webkit-slider-thumb': {
            WebkitAppearance: 'none',
            width: 20,
            height: 20,

            zIndex: 3,
            position: 'relative',
            borderRadius: vars.borderRadii.indicator,
        },

        '@media': {
            [mq.tabletOrSmaller]: {
                cursor: 'none',
            },
        },
    },
]);

export const sliderVariant = styleVariants({
    ios: [
        sliderBase,
        {
            selectors: {
                '&::-webkit-slider-thumb': {
                    WebkitAppearance: 'none',
                    width: 28,
                    height: 28,

                    background: vars.colors.iosControlKnob,
                    border: ' 0.5px solid rgba(0, 0, 0, 0.04)',
                    boxShadow: '0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12)',
                },
                '&::-webkit-slider-thumb:hover': {
                    cursor: 'grab',
                },
                '&::-webkit-slider-thumb:active': {
                    cursor: 'grabbing',
                },
            },
        },
    ],
    default: [
        sliderBase,
        {
            selectors: {
                '&::-webkit-slider-thumb:hover': {
                    cursor: 'grab',
                    opacity: 0.2,
                    boxShadow: `0px 0px 0px 6px ${vars.colors.controlActivated}`,
                    transition: `${transition}`,
                },
                '&::-webkit-slider-thumb:active': {
                    cursor: 'grabbing',
                    opacity: 0.2,
                    boxShadow: `0px 0px 0px 10px ${vars.colors.controlActivated}`,
                    transition: `${transition}`,
                },
            },
        },
    ],
});

export const sliderDisabled = style([
    sliderBase,
    {
        cursor: 'no-drop',
        selectors: {
            '&::-webkit-slider-thumb:hover': {
                cursor: 'no-drop',
                boxShadow: 'none',
            },
            '&::-webkit-slider-thumb:active': {
                cursor: 'no-drop',
                boxShadow: 'none',
            },
        },
    },
]);

export const sliderThumbBase = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        background: vars.colors.controlActivated,

        width: 20,
        height: 20,
        borderRadius: '50%',
        top: '93%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
    },
]);

export const sliderThumbVariant = styleVariants({
    ios: [
        sliderThumbBase,
        {
            background: vars.colors.iosControlKnob,

            border: ' 0.5px solid rgba(0, 0, 0, 0.04)',
            boxShadow: '0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12)',
        },
    ],
    default: [sliderThumbBase, {}],
});

export const progress = style([
    sprinkles({
        position: 'absolute',
        borderRadius: vars.borderRadii.bar,
        background: vars.colors.controlActivated,
    }),
    {
        width: '50%',
        height: 4,
        top: '93%',
        transform: 'translateY(-50%)',
        left: 0,
        pointerEvents: 'none',
    },
]);
