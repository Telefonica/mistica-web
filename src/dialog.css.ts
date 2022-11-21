import {style, keyframes, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {pxToRem} from './utils/css';

const fadeIn = keyframes({
    '0%': {opacity: 0},
    '100%': {opacity: 1},
});

const fadeScale = keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(.8)',
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
    },
});

/** Must be higher than the fixed footer's z-index */
const Z_INDEX = 26;

export const wrapper = style([
    sprinkles({
        position: 'relative',
    }),
    {
        zIndex: Z_INDEX,
    },
]);

export const modalOpacityLayer = style([
    sprinkles({
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: vars.colors.backgroundOverlay,
    }),
    {
        zIndex: Z_INDEX,
        minHeight: 0,
        minWidth: 0,
        animation: `${fadeIn} .2s ease-in-out`,
        transition: 'opacity .2s ease-in-out',
    },
]);

export const closedOpactityLayer = style({opacity: 0});

export const modalCloseButtonContainer = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 16,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {padding: 24},
        },
    },
]);

export const modalContent = style([
    sprinkles({
        background: vars.colors.background,
        borderRadius: 8,
    }),
    {
        animation: `${fadeScale} .2s ease-in-out`,
        willChange: 'transform, opacity',
        transition: 'opacity .2s ease-in-out, transform .2s ease-in-out',
    },
]);

export const closedModalContent = style({opacity: 0, transform: 'scale(.8)'});

const dialogContainer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    {
        width: 'calc(100vw - 48px)',
        margin: 'auto',

        '@media': {
            [mq.desktopOrBigger]: {
                width: 680,
                padding: 40,
                maxHeight: 'calc(100vh - 64px)',
            },
        },
    },
]);

export const variants = styleVariants({
    dialog: [
        dialogContainer,
        sprinkles({
            paddingTop: 40,
            paddingBottom: 24,
            paddingX: 24,
        }),
    ],
    default: [
        dialogContainer,
        sprinkles({
            padding: 24,
        }),
    ],
});

export const dialogContent = style([
    sprinkles({
        flex: 1,
        minHeight: 0,
    }),
    {
        overflowY: 'auto',
    },
]);

export const dialogActions = style([
    sprinkles({
        paddingTop: 24,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 32,
            },
        },
    },
]);

export const iconContainer = style({
    width: pxToRem(40),
    height: pxToRem(40),

    '@media': {
        [mq.desktopOrBigger]: {
            width: pxToRem(64),
            height: pxToRem(64),
        },
    },
});
