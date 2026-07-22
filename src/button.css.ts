import {style, globalStyle, styleVariants, createVar} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

import type {ComplexStyleRule, StyleRule} from '@vanilla-extract/css';

const minWidth = createVar();
export const buttonVars = {minWidth};

const colorTransitionTiming = '0.1s ease-in-out';
const contentTransitionTiming = '0.3s cubic-bezier(0.77, 0, 0.175, 1)';

export const buttonMinWidth = {
    default: '104px',
    small: '80px',
};

export const linkMinWidth = {
    default: '24px',
    small: '24px',
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

export const buttonPaddingLeft = {
    default: `calc(${vars.spacing.buttonDefaultPadding.left} - ${borderSize})`,
    small: `calc(${vars.spacing.buttonSmallPadding.left} - ${borderSize})`,
};

export const buttonPaddingRight = {
    default: `calc(${vars.spacing.buttonDefaultPadding.right} - ${borderSize})`,
    small: `calc(${vars.spacing.buttonSmallPadding.right} - ${borderSize})`,
};

export const buttonPaddingY = {
    default: `calc(12px - ${borderSize})`,
    small: `calc(6px - ${borderSize})`,
};

const smallButtonHeight = `calc(${pxToRem(20)} + ${buttonPaddingY.small} + ${buttonPaddingY.small} + ${borderSize} + ${borderSize})`;

const disabledStyle = {opacity: 0.5};

export const isLoading = style({});

export const smallTouchableContainer = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: smallButtonHeight,
    overflow: 'visible',
    verticalAlign: 'bottom',
});

export const smallTouchableArea = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: 'transparent',
        padding: 0,
    }),
    {
        borderRadius: vars.borderRadii.button,
        overflow: 'visible',
        width: '100%',
        '@media': {
            [mq.touchableOnly]: {
                minHeight: 48,
            },
        },
    },
]);

export const smallTouchableVisual = style({
    width: '100%',
    pointerEvents: 'none',
});

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
            [`${smallTouchableArea}[disabled]:not(${isLoading}) &`]: disabledStyle,
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
        left: buttonPaddingLeft.default,
        right: buttonPaddingRight.default,
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${contentTransitionTiming}, transform ${contentTransitionTiming}`,

        selectors: {
            [`${small} &`]: {
                left: buttonPaddingLeft.small,
                right: buttonPaddingRight.small,
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
        padding: `${buttonPaddingY.default} ${buttonPaddingRight.default} ${buttonPaddingY.default} ${buttonPaddingLeft.default}`, // height 48
        opacity: 1,
        transition: `opacity ${contentTransitionTiming}, transform ${contentTransitionTiming}`,

        selectors: {
            [`${small} &`]: {
                padding: `${buttonPaddingY.small} ${buttonPaddingRight.small} ${buttonPaddingY.small} ${buttonPaddingLeft.small}`, // height 32
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

const interactiveStyles = ({active, hover = active}: {active: StyleRule; hover?: StyleRule}): StyleRule => ({
    selectors: {
        '&:not([disabled]):active': active,
        [`${smallTouchableArea}:not([disabled]):active &`]: active,
    },

    '@media': {
        [mq.supportsHover]: {
            selectors: {
                '&:hover:not([disabled])': hover,
                [`${smallTouchableArea}:hover:not([disabled]) &`]: hover,
                '&:not([disabled]):active': active,
                [`${smallTouchableArea}:not([disabled]):active &`]: active,
            },
        },
    },
});

const lightPrimary: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimary,
        background: vars.colors.buttonPrimaryBackground,
    }),
    interactiveStyles({
        active: {backgroundColor: vars.colors.buttonPrimaryBackgroundPressed},
        hover: {backgroundColor: vars.colors.buttonPrimaryBackgroundHover},
    }),
];

const lightPrimaryOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryBrand,
        background: vars.colors.buttonPrimaryBackgroundBrand,
    }),
    interactiveStyles({
        active: {
            backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
            color: vars.colors.textButtonPrimaryBrandPressed,
        },
    }),
];

const lightPrimaryOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryNegative,
        background: vars.colors.buttonPrimaryBackgroundNegative,
    }),
    interactiveStyles({
        active: {
            backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
            color: vars.colors.textButtonPrimaryNegativePressed,
        },
    }),
];

const lightPrimaryMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimaryMedia,
        background: vars.colors.buttonPrimaryBackgroundMedia,
    }),
    interactiveStyles({
        active: {
            backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
            color: vars.colors.textButtonPrimaryMediaPressed,
        },
    }),
];

const lightSecondary: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondary,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorder,
    },
    interactiveStyles({
        active: {
            color: vars.colors.textButtonSecondaryPressed,
            borderColor: vars.colors.buttonSecondaryBorderPressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundPressed,
        },
        hover: {
            color: vars.colors.textButtonSecondaryPressed,
            borderColor: vars.colors.buttonSecondaryBorderPressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundHover,
        },
    }),
];

const lightSecondaryOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryBrand,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderBrand,
    },
    interactiveStyles({
        active: {
            borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
            color: vars.colors.textButtonSecondaryBrandPressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundBrandPressed,
        },
        hover: {
            borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
            color: vars.colors.textButtonSecondaryBrandPressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundBrandHover,
        },
    }),
];

const lightSecondaryOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryNegative,
        background: 'transparent',
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderNegative,
    },
    interactiveStyles({
        active: {
            borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
            color: vars.colors.textButtonSecondaryNegativePressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundNegativePressed,
        },
        hover: {
            borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
            color: vars.colors.textButtonSecondaryNegativePressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundNegativeHover,
        },
    }),
];

const lightSecondaryMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonSecondaryMedia,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderMedia,
    },
    interactiveStyles({
        active: {
            borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
            color: vars.colors.textButtonSecondaryMediaPressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundMediaPressed,
        },
        hover: {
            borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
            color: vars.colors.textButtonSecondaryMediaPressed,
            backgroundColor: vars.colors.buttonSecondaryBackgroundMediaHover,
        },
    }),
];

const danger: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textButtonPrimary,
        background: vars.colors.buttonDangerBackground,
    }),
    interactiveStyles({
        active: {backgroundColor: vars.colors.buttonDangerBackgroundPressed},
        hover: {backgroundColor: vars.colors.buttonDangerBackgroundHover},
    }),
];

export const defaultLink: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLink,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkBackgroundPressed}}),
];

export const defaultLinkOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkBrand,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed}}),
];

export const defaultLinkOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkNegative,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed}}),
];

export const defaultLinkMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkMedia,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed}}),
];

const dangerLink: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed}}),
];

const dangerLinkOverBrand: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundBrand,
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed}}),
];

const dangerLinkOverNegative: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundNegative,
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed}}),
];

const dangerLinkMedia: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDangerMedia,
        background: vars.colors.buttonLinkDangerBackgroundMedia,
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed}}),
];

const dangerLinkOverBrandDark: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed}}),
];

const dangerLinkOverNegativeDark: ComplexStyleRule = [
    button,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    interactiveStyles({active: {backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed}}),
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
