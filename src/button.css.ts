import {style, globalStyle, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

import type {ComplexStyleRule} from '@vanilla-extract/css';

const transitionTiming = '0.1s ease-in-out';

export const BUTTON_MIN_WIDTH = 104;
const BORDER_PX = 1.5;
export const ICON_MARGIN_PX = 8;
export const X_PADDING_PX = 16 - BORDER_PX;
const Y_PADDING_PX = 12 - BORDER_PX;
export const X_SMALL_PADDING_PX = 12 - BORDER_PX;
const Y_SMALL_PADDING_PX = 6 - BORDER_PX;
export const ICON_SIZE = 24;
export const SMALL_ICON_SIZE = 20;
export const SPINNER_SIZE = 20;
export const SMALL_SPINNER_SIZE = 16;
export const PADDING_Y_LINK = 6;
export const PADDING_X_LINK = 12;
export const CHEVRON_MARGIN_LEFT_LINK = 2;

const disabledStyle = {opacity: 0.5};

export const isLoading = style({});

const button = style([
    sprinkles({
        display: 'inline-block',
        position: 'relative',
        width: 'auto',
        borderRadius: vars.borderRadii.button,
        overflow: 'hidden',
        padding: 0,
    }),
    {
        border: `${BORDER_PX}px solid transparent`,
        minWidth: BUTTON_MIN_WIDTH,
        transition: `background-color ${transitionTiming}, color ${transitionTiming}, border-color ${transitionTiming}`,

        selectors: {
            [`&[disabled]:not(${isLoading})`]: disabledStyle,
        },
        '@media': {
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const loadingFiller = style([
    sprinkles({
        display: 'block',
        height: 0,
        overflow: 'hidden',
    }),
    {
        opacity: 0,
    },
]);

export const small = style({
    minWidth: 80,
});

export const loadingContent = style([
    sprinkles({
        display: 'inline-flex',
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    {
        left: X_PADDING_PX,
        right: X_PADDING_PX,
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,

        selectors: {
            [`${small} &`]: {
                left: X_SMALL_PADDING_PX,
                right: X_SMALL_PADDING_PX,
            },
            [`${isLoading} &`]: {
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
    },
]);

export const textContent = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        padding: `${Y_PADDING_PX}px ${X_PADDING_PX}px`, // height 48
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,

        selectors: {
            [`${small} &`]: {
                padding: `${Y_SMALL_PADDING_PX}px ${X_SMALL_PADDING_PX}px`, // height 32
            },
            [`${isLoading} &`]: {
                transform: 'translateY(-2rem)',
                opacity: 0,
            },
        },
    },
]);

globalStyle(`${textContent} svg`, {
    display: 'block',
});

const lightPrimary: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimary,
        background: vars.colors.buttonPrimaryBackground,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundHover,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundSelected,
                    },
                },
            },
        },
    },
];

const lightPrimaryInverse: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryInverse,
        background: vars.colors.buttonPrimaryBackgroundInverse,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundInverseSelected,
                color: vars.colors.textButtonPrimaryInverseSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        color: vars.colors.textButtonPrimaryInverseSelected,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundInverseSelected,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundInverseSelected,
                        color: vars.colors.textButtonPrimaryInverseSelected,
                    },
                },
            },
        },
    },
];

const lightSecondary: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondary,
        background: 'transparent',
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorder,

        selectors: {
            '&:not([disabled]):active': {
                color: vars.colors.textButtonSecondarySelected,
                borderColor: vars.colors.buttonSecondaryBorderSelected,
                backgroundColor: vars.colors.buttonSecondaryBackgroundSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        color: vars.colors.textButtonSecondarySelected,
                        borderColor: vars.colors.buttonSecondaryBorderSelected,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundHover,
                    },
                    '&:not([disabled]):active': {
                        color: vars.colors.textButtonSecondarySelected,
                        borderColor: vars.colors.buttonSecondaryBorderSelected,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundSelected,
                    },
                },
            },
        },
    },
];

const lightSecondaryInverse: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryInverse,
        background: 'transparent',
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderInverse,

        selectors: {
            '&:not([disabled]):active': {
                borderColor: vars.colors.buttonSecondaryBorderInverseSelected,
                color: vars.colors.textButtonSecondaryInverseSelected,
                backgroundColor: vars.colors.buttonSecondaryBackgroundInverseSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        borderColor: vars.colors.buttonSecondaryBorderInverseSelected,
                        color: vars.colors.textButtonSecondaryInverseSelected,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundInverseHover,
                    },
                    '&:not([disabled]):active': {
                        borderColor: vars.colors.buttonSecondaryBorderInverseSelected,
                        color: vars.colors.textButtonSecondaryInverseSelected,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundInverseSelected,
                    },
                },
            },
        },
    },
];

const danger: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimary,
        background: vars.colors.buttonDangerBackground,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonDangerBackgroundSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonDangerBackgroundHover,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonDangerBackgroundSelected,
                    },
                },
            },
        },
    },
];

const link = style([
    sprinkles({
        display: 'inline-block',
        width: 'auto',
        position: 'relative',
        borderRadius: vars.borderRadii.button,
        paddingX: PADDING_X_LINK,
        border: 'none',
        overflow: 'hidden',
        minWidth: 40,
    }),
    {
        paddingTop: PADDING_Y_LINK,
        paddingBottom: PADDING_Y_LINK,
        fontWeight: 500,
        transition: `background-color ${transitionTiming}`,

        selectors: {
            [`&[disabled]:not(${isLoading})`]: disabledStyle,
        },

        '@media': {
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const textContentLink = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,

        selectors: {
            [`${isLoading} &`]: {
                transform: 'translateY(-2rem)',
                opacity: 0,
            },
        },
    },
]);

globalStyle(`${textContentLink} svg`, {
    display: 'block',
});

export const defaultLink: ComplexStyleRule = [
    link,
    sprinkles({
        color: vars.colors.textLink,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkBackgroundSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkBackgroundSelected,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkBackgroundSelected,
                    },
                },
            },
        },
    },
];

export const defaultLinkInverse: ComplexStyleRule = [
    link,
    sprinkles({
        color: vars.colors.textLinkInverse,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkBackgroundInverseSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkBackgroundInverseSelected,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkBackgroundInverseSelected,
                    },
                },
            },
        },
    },
];

const dangerLink: ComplexStyleRule = [
    link,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundSelected,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundSelected,
                    },
                },
            },
        },
    },
];

const dangerLinkInverse: ComplexStyleRule = [
    link,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundInverse,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundInverseSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundInverseSelected,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundInverseSelected,
                    },
                },
            },
        },
    },
];

const dangerLinkInverseDark: ComplexStyleRule = [
    link,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundInverseSelected,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundInverseSelected,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundInverseSelected,
                    },
                },
            },
        },
    },
];

export const buttonVariants = styleVariants({
    primary: lightPrimary,
    secondary: lightSecondary,
    danger,
});

export const inverseButtonVariants = styleVariants({
    primary: lightPrimaryInverse,
    secondary: lightSecondaryInverse,
    danger,
});

export const linkVariants = styleVariants({
    default: defaultLink,
    danger: dangerLink,
    dangerDark: dangerLink,
});

export const inverseLinkVariants = styleVariants({
    default: defaultLinkInverse,
    danger: dangerLinkInverse,
    dangerDark: dangerLinkInverseDark,
});
