import {style, globalStyle, styleVariants, createVar} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

import type {ComplexStyleRule} from '@vanilla-extract/css';

const minWidth = createVar();
export const buttonVars = {minWidth};

const colorTransitionTiming = '0.1s ease-in-out';
const contentTransitionTiming = '0.3s cubic-bezier(0.77, 0, 0.175, 1)';

export const buttonMinWidth = {
    default: '104px',
    small: '80px',
};

export const linkMinWidth = {
    default: '40px',
    small: '40px',
};

export const borderSize = '1.5px';
export const iconMargin = '8px';
export const chevronMarginLeft = '2px';

export const iconSize = {
    default: pxToRem(24),
    small: pxToRem(20),
};

export const spinnerSize = {
    default: pxToRem(20),
    small: pxToRem(16),
};

export const buttonPaddingX = {
    default: `calc(16px - ${borderSize})`,
    small: `calc(12px - ${borderSize})`,
};

export const buttonPaddingY = {
    default: `calc(12px - ${borderSize})`,
    small: `calc(6px - ${borderSize})`,
};

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
        minWidth: buttonVars.minWidth,
        border: `${borderSize} solid transparent`,
        transition: `background-color ${colorTransitionTiming}, color ${colorTransitionTiming}, border-color ${colorTransitionTiming}`,

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

export const small = style({});
export const smallLink = style({});

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
        left: buttonPaddingX.default,
        right: buttonPaddingX.default,
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${contentTransitionTiming}, transform ${contentTransitionTiming}`,

        selectors: {
            [`${small} &`]: {
                left: buttonPaddingX.small,
                right: buttonPaddingX.small,
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
        padding: `${buttonPaddingY.default} ${buttonPaddingX.default}`, // height 48
        opacity: 1,
        transition: `opacity ${contentTransitionTiming}, transform ${contentTransitionTiming}`,

        selectors: {
            [`${small} &`]: {
                padding: `${buttonPaddingY.small} ${buttonPaddingX.small}`, // height 32
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

export const defaultLink: ComplexStyleRule = [
    button,
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
    button,
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
    button,
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
    button,
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
    button,
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
    link: defaultLink,
    linkDanger: dangerLink,
    linkDangerDark: dangerLink,
});

export const inverseButtonVariants = styleVariants({
    primary: lightPrimaryInverse,
    secondary: lightSecondaryInverse,
    danger,
    link: defaultLinkInverse,
    linkDanger: dangerLinkInverse,
    linkDangerDark: dangerLinkInverseDark,
});
