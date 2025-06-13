import {createVar, globalStyle, keyframes, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

const stepperMinHeight = createVar();

export const vars = {
    stepperMinHeight,
};

const filledBarKeyframes = keyframes({
    '0%': {
        width: 0,
    },
});

const reverseFilledBarKeyframes = keyframes({
    '0%': {
        width: '100%',
    },
    // Needed this opacity trick to avoid a tiny bar that appear when the animation end
    '99%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    },
});

const currentNumberKeyframes = keyframes({
    '0%': {
        borderColor: skinVars.colors.borderHigh,
        backgroundColor: 'transparent',
    },
    '100%': {
        borderColor: skinVars.colors.completedStep,
        backgroundColor: skinVars.colors.completedStep,
    },
});

const currentNumberTextKeyframes = keyframes({
    '0%': {
        color: skinVars.colors.textSecondary,
    },
    '100%': {
        color: skinVars.colors.textPrimaryInverse,
    },
});

const stepIconKeyframes = keyframes({
    '0%': {
        backgroundColor: skinVars.colors.completedStep,
        transform: 'scale(1)',
    },
    '100%': {
        backgroundColor: skinVars.colors.completedStep,
        transform: 'scale(0)',
    },
});

export const stepper = style([
    sprinkles({
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: 24,
    }),
    {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        '@media': {
            [mq.desktopOrBigger]: {
                minHeight: stepperMinHeight,
            },
            [mq.tabletOrSmaller]: {
                alignItems: 'center',
            },
        },
    },
]);

export const listItem = sprinkles({
    display: 'flex',
    alignItems: 'center',
});

export const step = style([
    sprinkles({
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    {
        textAlign: 'center',
        selectors: {
            ':first-child > &': {
                alignItems: 'flex-start',
                textAlign: 'left',
            },
            ':last-child > &': {
                alignItems: 'flex-end',
                textAlign: 'right',
            },
        },
    },
]);

export const stepIconNumber = style([
    sprinkles({
        position: 'relative',
        display: 'flex',
    }),
    {
        height: `calc(${pxToRem(8)} + 16px)`,
        width: `calc(${pxToRem(8)} + 16px)`,
        '@media': {
            [mq.desktopOrBigger]: {
                height: `calc(${pxToRem(16)} + 16px)`,
                width: `calc(${pxToRem(16)} + 16px)`,
            },
        },
    },
]);

export const iconAnimation = style({
    ':after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: `${stepIconKeyframes} .3s ease-in-out`,
        willChange: 'transform',
        transition: 'transform .3s ease-in-out',
    },
});

export const number = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    }),
    {
        border: `2px solid ${skinVars.colors.borderHigh}`,
    },
]);

export const currentNumber = style({
    transition: 'border-color .3s ease-in-out, background-color .3s ease-in-out',
    willChange: 'border-color, background-color',
    animation: `${currentNumberKeyframes} .3s ease-in-out`,
    background: skinVars.colors.completedStep,
    borderColor: skinVars.colors.completedStep,
});

globalStyle(`${currentNumber} span`, {
    animation: `${currentNumberTextKeyframes} .3s ease-in-out`,
    willChange: 'color',
    transition: 'color .3s ease-in-out',
});

export const textContainer = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        width: 200,
        top: `calc(${pxToRem(24)} + 18px)`,
        '@media': {
            [mq.tabletOrSmaller]: {
                display: 'none',
            },
        },
    },
]);

export const barContainer = sprinkles({
    position: 'absolute',
    left: 16,
    height: '100%',
    width: '100%',
});

export const bar = style([
    sprinkles({
        height: 4,
        width: '100%',
        borderRadius: skinVars.borderRadii.bar,
        overflow: 'hidden',
    }),
    {
        margin: '0 8px',
        background: skinVars.colors.barTrack,
    },
]);

export const barFilled = style([
    sprinkles({
        height: 4,
        width: '100%',
        borderRadius: skinVars.borderRadii.bar,
        overflow: 'hidden',
    }),
    {
        background: skinVars.colors.controlActivated,
    },
]);

export const barFilledAnimation = style({
    transition: `width ${transition}`,
    animation: `${filledBarKeyframes} ${transition}`,
});

export const barFilledReverseAnimation = style([
    sprinkles({
        width: 0,
    }),
    {
        transition: `width ${transition}`,
        animation: `${reverseFilledBarKeyframes} ${transition}`,
    },
]);
