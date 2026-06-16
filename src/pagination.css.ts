import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const COMPACT_MQ = '(max-width: 374px)';

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
            [COMPACT_MQ]: {
                flexDirection: 'column',
            },
        },
    },
]);

export const containerNavOnly = style({
    gap: 16,
    '@media': {
        [mq.desktopOrBigger]: {
            gap: 16,
        },
    },
});

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
    width: 32,
    minWidth: 32,
    height: 48,
    '@media': {
        [mq.desktopOrBigger]: {
            height: 32,
        },
    },
});

export const pageListItemEllipsis = style([
    pageListItem,
    {
        '@media': {
            [mq.desktopOrBigger]: {
                width: 16,
                minWidth: 16,
            },
        },
    },
]);

export const fullOnlyItem = style({
    '@media': {
        [COMPACT_MQ]: {display: 'none'},
    },
});

const interactiveArea = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textPrimary,
        borderRadius: skinVars.borderRadii.button,
        WebkitTapHighlightColor: 'transparent',
        boxSizing: 'border-box',
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
    },
]);

export const navigationButton = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        gap: 4,
        width: 32,
        minWidth: 32,
        height: 48,
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textLink,
        borderRadius: skinVars.borderRadii.button,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transition: 'background-color 0.15s ease-in-out',

        selectors: {
            '&:active:not([aria-disabled="true"])': {
                backgroundColor: skinVars.colors.buttonLinkBackgroundPressed,
            },
            '&:disabled, &[aria-disabled="true"]': {
                cursor: 'default',
                opacity: 0.5,
            },
        },

        '@media': {
            [mq.desktopOrBigger]: {
                width: 'auto',
                minWidth: 32,
                height: 32,
                padding: '0 8px',
            },
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([aria-disabled="true"])': {
                        backgroundColor: skinVars.colors.buttonLinkBackgroundPressed,
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
