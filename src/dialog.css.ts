import {style, keyframes, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {pxToRem} from './utils/css';

export const ANIMATION_DURATION_MS = 200;

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

export const wrapper = style([
    sprinkles({
        position: 'relative',
    }),
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
        minHeight: 0,
        minWidth: 0,
        animation: `${fadeIn} ${ANIMATION_DURATION_MS}ms ease-in-out`,
        transition: `opacity ${ANIMATION_DURATION_MS}ms ease-in-out`,
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
            [mq.desktopOrBigger]: {
                padding: 24,
            },
        },
    },
]);

export const modalContent = style([
    sprinkles({
        background: vars.colors.background,
        borderRadius: vars.borderRadii.container,
    }),
    {
        animation: `${fadeScale} ${ANIMATION_DURATION_MS}ms ease-in-out`,
        willChange: 'transform, opacity',
        transition: `opacity ${ANIMATION_DURATION_MS}ms ease-in-out, transform ${ANIMATION_DURATION_MS}ms ease-in-out`,
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
        maxHeight: 'calc(100vh - 32px)',

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
