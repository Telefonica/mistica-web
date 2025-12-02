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
                backgroundColor: vars.colors.buttonPrimaryBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundHover,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundPressed,
                    },
                },
            },
        },
    },
];

const lightPrimaryOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryBrand,
        background: vars.colors.buttonPrimaryBackgroundBrand,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
                color: vars.colors.textButtonPrimaryBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        color: vars.colors.textButtonPrimaryBrandPressed,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
                        color: vars.colors.textButtonPrimaryBrandPressed,
                    },
                },
            },
        },
    },
];

const lightPrimaryOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryNegative,
        background: vars.colors.buttonPrimaryBackgroundNegative,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
                color: vars.colors.textButtonPrimaryNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        color: vars.colors.textButtonPrimaryNegativePressed,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
                        color: vars.colors.textButtonPrimaryNegativePressed,
                    },
                },
            },
        },
    },
];

const lightPrimaryMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryMedia,
        background: vars.colors.buttonPrimaryBackgroundMedia,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
                color: vars.colors.textButtonPrimaryMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        color: vars.colors.textButtonPrimaryMediaPressed,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
                        color: vars.colors.textButtonPrimaryMediaPressed,
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
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorder,

        selectors: {
            '&:not([disabled]):active': {
                color: vars.colors.textButtonSecondaryPressed,
                borderColor: vars.colors.buttonSecondaryBorderPressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        color: vars.colors.textButtonSecondaryPressed,
                        borderColor: vars.colors.buttonSecondaryBorderPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundHover,
                    },
                    '&:not([disabled]):active': {
                        color: vars.colors.textButtonSecondaryPressed,
                        borderColor: vars.colors.buttonSecondaryBorderPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundPressed,
                    },
                },
            },
        },
    },
];

const lightSecondaryOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryBrand,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderBrand,
        selectors: {
            '&:not([disabled]):active': {
                borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
                color: vars.colors.textButtonSecondaryBrandPressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
                        color: vars.colors.textButtonSecondaryBrandPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundBrandHover,
                    },
                    '&:not([disabled]):active': {
                        borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
                        color: vars.colors.textButtonSecondaryBrandPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

const lightSecondaryOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryNegative,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderNegative,
        selectors: {
            '&:not([disabled]):active': {
                borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
                color: vars.colors.textButtonSecondaryNegativePressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
                        color: vars.colors.textButtonSecondaryNegativePressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundNegativeHover,
                    },
                    '&:not([disabled]):active': {
                        borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
                        color: vars.colors.textButtonSecondaryNegativePressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundNegativePressed,
                    },
                },
            },
        },
    },
];

const lightSecondaryMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryMedia,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderMedia,

        selectors: {
            '&:not([disabled]):active': {
                borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
                color: vars.colors.textButtonSecondaryMediaPressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
                        color: vars.colors.textButtonSecondaryMediaPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundMediaHover,
                    },
                    '&:not([disabled]):active': {
                        borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
                        color: vars.colors.textButtonSecondaryMediaPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundMediaPressed,
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
                backgroundColor: vars.colors.buttonDangerBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonDangerBackgroundHover,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonDangerBackgroundPressed,
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
                backgroundColor: vars.colors.buttonLinkBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkBackgroundPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkBackgroundPressed,
                    },
                },
            },
        },
    },
];

export const defaultLinkOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkBrand,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

export const defaultLinkOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkNegative,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed,
                    },
                },
            },
        },
    },
];

export const defaultLinkMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkMedia,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed,
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
                backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundBrand,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundNegative,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
                    },
                },
            },
        },
    },
];

const dangerLinkMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDangerMedia,
        background: vars.colors.buttonLinkDangerBackgroundMedia,
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverBrandDark: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverNegativeDark: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            '&:not([disabled]):active': {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:not([disabled])': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
                    },
                    '&:not([disabled]):active': {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
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

export const overBrandButtonVariants = styleVariants({
    primary: lightPrimaryOverBrand,
    secondary: lightSecondaryOverBrand,
    danger,
    link: defaultLinkOverBrand,
    linkDanger: dangerLinkOverBrand,
    linkDangerDark: dangerLinkOverBrandDark,
});

export const overNegativeButtonVariants = styleVariants({
    primary: lightPrimaryOverNegative,
    secondary: lightSecondaryOverNegative,
    danger,
    link: defaultLinkOverNegative,
    linkDanger: dangerLinkOverNegative,
    linkDangerDark: dangerLinkOverNegativeDark,
});

export const overMediaButtonVariants = styleVariants({
    primary: lightPrimaryMedia,
    secondary: lightSecondaryMedia,
    danger,
    link: defaultLinkMedia,
    linkDanger: dangerLinkMedia,
    linkDangerDark: dangerLinkMedia,
});
