import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

export const container = style([
    sprinkles({
        display: 'inline-flex',
        alignItems: 'center',
    }),
    {
        gap: 4,
        padding: '8px 16px',
        width: 'fit-content',
        maxWidth: '100%',
        boxSizing: 'border-box',

        '@media': {
            [mq.desktopOrBigger]: {
                gap: 8,
            },
        },
    },
]);

export const pageList = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
    }),
    {
        gap: 4,
        margin: 0,
        padding: 0,
        listStyle: 'none',

        '@media': {
            [mq.desktopOrBigger]: {
                gap: 8,
            },
        },
    },
]);

export const pageListItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

/*
 * Accessibility: per Figma spec, each Page Item must expose a minimum 48x48px
 * interactive area on mobile (the visible 32px circle is centered within it).
 * Desktop reduces back to 32x32. Width grows via @media on mobile-first base.
 */
const interactiveArea = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        position: 'relative',
        width: 48,
        minWidth: 48,
        height: 48,
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textPrimary,
        borderRadius: skinVars.borderRadii.button,
        WebkitTapHighlightColor: 'transparent',
        boxSizing: 'border-box',

        '@media': {
            [mq.desktopOrBigger]: {
                width: 32,
                minWidth: 32,
                height: 32,
            },
        },
    },
]);

const pageElement = style([
    interactiveArea,
    {
        ':before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 32,
            height: 32,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            opacity: 0,
            transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
        },

        '@media': {
            [mq.desktopOrBigger]: {
                minWidth: 32,
            },
        },
    },
]);

export const pageButton = style([
    pageElement,
    {
        cursor: 'pointer',

        selectors: {
            '&:active:before': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1)',
                backgroundColor: skinVars.colors.brandLow,
            },
            '&:disabled': {
                cursor: 'default',
                opacity: 0.5,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:before': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1.06)',
                        backgroundColor: skinVars.colors.neutralLow,
                    },
                    '&:active:before': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1)',
                        backgroundColor: skinVars.colors.brandLow,
                    },
                },
            },
            [mq.touchableOnly]: {
                ':before': {
                    transition: 'none',
                },
            },
        },
    },
]);

export const currentPage = style([
    pageElement,
    {
        cursor: 'default',
        color: skinVars.colors.textActivated,

        ':before': {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            backgroundColor: skinVars.colors.brandLow,
        },
    },
]);

export const pageContent = style({
    position: 'relative',
    zIndex: 1,
});

export const ellipsis = style([
    interactiveArea,
    {
        color: skinVars.colors.textPrimary,
        cursor: 'default',

        '@media': {
            [mq.desktopOrBigger]: {
                width: 16,
                minWidth: 16,
            },
        },
    },
]);

/*
 * Accessibility: on mobile the chevron-only nav button must keep the 48x48
 * minimum tap area (the label is hidden under tablet breakpoint). On desktop
 * the label brings its own width so we relax min-width to 32px.
 */
export const navigationButton = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        gap: 4,
        width: 48,
        minWidth: 48,
        height: 48,
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textLink,
        borderRadius: skinVars.borderRadii.button,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',

        selectors: {
            '&:active': {
                backgroundColor: skinVars.colors.buttonLinkBackgroundPressed,
            },
            '&:disabled': {
                cursor: 'default',
                opacity: 0.5,
            },
        },

        '@media': {
            [mq.desktopOrBigger]: {
                width: 'auto',
                minWidth: 32,
                height: 32,
            },
            [mq.supportsHover]: {
                selectors: {
                    '&:hover': {
                        color: skinVars.colors.textLink,
                    },
                },
            },
        },
    },
]);

export const navigationButtonIconOnly = style({
    '@media': {
        [mq.desktopOrBigger]: {
            width: 32,
            minWidth: 32,
        },
    },
});

export const navigationLabel = style({
    display: 'inline-flex',

    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'none',
        },
    },
});
