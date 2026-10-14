import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

export const container = style([
    sprinkles({
        display: 'inline-flex',
        alignItems: 'center',
        columnGap: {
            mobile: 4,
            desktop: 8,
        },
        paddingY: 8,
        paddingX: {
            mobile: 0,
            desktop: 16,
        },
        maxWidth: '100%',
    }),
    {
        width: 'fit-content',
        boxSizing: 'border-box',
    },
]);

export const containerNavOnly = style({
    gap: 16,
});

export const pageList = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        columnGap: {
            mobile: 4,
            desktop: 8,
        },
    }),
    {
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
]);

export const pageListDesktop = style({
    display: 'none',

    '@media': {
        [mq.desktopOrBigger]: {
            display: 'flex',
        },
    },
});

export const pageListMobile = style({
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'none',
        },
    },
});

export const pageListItem = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        minWidth: 48,
        height: 48,

        '@media': {
            [mq.desktopOrBigger]: {
                minWidth: 32,
                height: 32,
            },
        },
    },
]);

const interactiveArea = style([
    {
        position: 'relative',
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textPrimary,
        borderRadius: skinVars.borderRadii.button,
        WebkitTapHighlightColor: 'transparent',
        boxSizing: 'border-box',

        selectors: {
            '&&': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            },
        },
    },
]);

const pageElement = style([
    interactiveArea,
    {
        selectors: {
            '&&': {
                width: 'auto',
                minWidth: 48,
                padding: '0 12px',
            },
        },

        ':before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'max(32px, calc(100% - 16px))',
            height: 32,
            borderRadius: 16,
            transform: 'translate(-50%, -50%) scale(0.8)',
            opacity: 0,
            transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
        },

        '@media': {
            [mq.desktopOrBigger]: {
                selectors: {
                    '&&': {
                        minWidth: 32,
                        padding: '0 4px',
                    },
                },

                ':before': {
                    width: '100%',
                },
            },
        },
    },
]);

export const pageButton = style([
    pageElement,
    {
        cursor: 'pointer',

        selectors: {
            '&:active:not(:disabled):before': {
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
                    '&:hover:not(:disabled):before': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1.06)',
                        backgroundColor: skinVars.colors.neutralLow,
                    },
                    '&:active:not(:disabled):before': {
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

export const pageButtonVariants = styleVariants({
    default: {},
    brand: {
        color: skinVars.colors.textButtonSecondaryBrand,
        selectors: {
            '&:active:not(:disabled)': {
                color: skinVars.colors.textBrand,
            },
            '&:active:not(:disabled):before': {
                backgroundColor: skinVars.colors.brandLow,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not(:disabled):before': {
                        backgroundColor: skinVars.colors.backgroundContainerBrandHover,
                    },
                    '&:active:not(:disabled)': {
                        color: skinVars.colors.textBrand,
                    },
                    '&:active:not(:disabled):before': {
                        backgroundColor: skinVars.colors.brandLow,
                    },
                },
            },
        },
    },
    negative: {
        color: skinVars.colors.textButtonSecondaryNegative,
        selectors: {
            '&:active:not(:disabled)': {
                color: skinVars.colors.textButtonPrimaryNegative,
            },
            '&:active:not(:disabled):before': {
                backgroundColor: skinVars.colors.buttonPrimaryBackgroundNegative,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not(:disabled):before': {
                        backgroundColor: skinVars.colors.backgroundContainerBrandHover,
                    },
                    '&:active:not(:disabled)': {
                        color: skinVars.colors.textButtonPrimaryNegative,
                    },
                    '&:active:not(:disabled):before': {
                        backgroundColor: skinVars.colors.buttonPrimaryBackgroundNegative,
                    },
                },
            },
        },
    },
    alternative: {},
    media: {},
});

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

export const currentPageVariants = styleVariants({
    default: {},
    brand: {
        color: skinVars.colors.textBrand,
        ':before': {
            backgroundColor: skinVars.colors.brandLow,
        },
    },
    negative: {
        color: skinVars.colors.textButtonPrimaryNegative,
        ':before': {
            backgroundColor: skinVars.colors.buttonPrimaryBackgroundNegative,
        },
    },
    alternative: {},
    media: {},
});

export const pageContent = style({
    position: 'relative',
    zIndex: 1,
});

export const navigationButtonLinkVariants = styleVariants({
    default: {},
    brand: {
        selectors: {
            '&&': {
                color: skinVars.colors.textButtonSecondaryBrand,
            },
        },
    },
    negative: {
        selectors: {
            '&&': {
                color: skinVars.colors.textButtonSecondaryNegative,
            },
        },
    },
    alternative: {},
    media: {},
});
