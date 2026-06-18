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

const disabledStyle = {opacity: 0.5};

export const isLoading = style({});

const minButtonArea = {
    touchable: '48px',
};

// Visual height of the small button (= 32px): text line-height (20px) + vertical paddings + borders.
// Derived from the constants so it stays in sync if the padding/border ever change.
const smallButtonHeight = `calc(${pxToRem(20)} + ${buttonPaddingY.small} + ${buttonPaddingY.small} + ${borderSize} + ${borderSize})`;

export const touchableArea = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 0,
    border: 'none',
    // Keep the focus outline / hit-area corners rounded like the visible button, even though the
    // visual styling now lives in the inner element.
    borderRadius: vars.borderRadii.button,
    background: 'transparent',
    overflow: 'visible',
});

export const buttonContainer = style({
    display: 'inline-block',
    verticalAlign: 'bottom', // required to remove bottom gap when rendered as inline-block (same as BaseTouchable)
});

const visual = style([
    sprinkles({
        display: 'inline-block',
        position: 'relative',
        borderRadius: vars.borderRadii.button,
        overflow: 'hidden',
        padding: 0,
    }),
    {
        width: '100%',
        minWidth: buttonVars.minWidth,
        border: `${borderSize} solid transparent`,
        transition: `background-color ${colorTransitionTiming}, color ${colorTransitionTiming}, border-color ${colorTransitionTiming}`,

        selectors: {
            [`${touchableArea}[disabled]:not(${isLoading}) &`]: disabledStyle,
        },
        '@media': {
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const small = style({
    selectors: {
        [`&${touchableArea}`]: {
            '@media': {
                // Only the vertical hit area is enforced (48px tall). The width keeps following the
                // content/minWidth as before: forcing a 48px minWidth would center-shift narrow
                // elements like a small ButtonLink (minWidth 24px) and break ButtonGroup alignment.
                [mq.touchableOnly]: {
                    minHeight: minButtonArea.touchable,
                    marginTop: `min(0px, calc((${smallButtonHeight} - ${minButtonArea.touchable}) / 2))`,
                    marginBottom: `min(0px, calc((${smallButtonHeight} - ${minButtonArea.touchable}) / 2))`,
                },
            },
        },
    },
});
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

const lightPrimary: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textButtonPrimary,
        background: vars.colors.buttonPrimaryBackground,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonPrimaryBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundHover,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundPressed,
                    },
                },
            },
        },
    },
];

const lightPrimaryOverBrand: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textButtonPrimaryBrand,
        background: vars.colors.buttonPrimaryBackgroundBrand,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
                color: vars.colors.textButtonPrimaryBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        color: vars.colors.textButtonPrimaryBrandPressed,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundBrandPressed,
                        color: vars.colors.textButtonPrimaryBrandPressed,
                    },
                },
            },
        },
    },
];

const lightPrimaryOverNegative: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textButtonPrimaryNegative,
        background: vars.colors.buttonPrimaryBackgroundNegative,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
                color: vars.colors.textButtonPrimaryNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        color: vars.colors.textButtonPrimaryNegativePressed,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundNegativePressed,
                        color: vars.colors.textButtonPrimaryNegativePressed,
                    },
                },
            },
        },
    },
];

const lightPrimaryMedia: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textButtonPrimaryMedia,
        background: vars.colors.buttonPrimaryBackgroundMedia,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
                color: vars.colors.textButtonPrimaryMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        color: vars.colors.textButtonPrimaryMediaPressed,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonPrimaryBackgroundMediaPressed,
                        color: vars.colors.textButtonPrimaryMediaPressed,
                    },
                },
            },
        },
    },
];

const lightSecondary: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textButtonSecondary,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorder,

        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                color: vars.colors.textButtonSecondaryPressed,
                borderColor: vars.colors.buttonSecondaryBorderPressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        color: vars.colors.textButtonSecondaryPressed,
                        borderColor: vars.colors.buttonSecondaryBorderPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundHover,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
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
    visual,
    sprinkles({
        color: vars.colors.textButtonSecondaryBrand,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderBrand,
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
                color: vars.colors.textButtonSecondaryBrandPressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        borderColor: vars.colors.buttonSecondaryBorderBrandPressed,
                        color: vars.colors.textButtonSecondaryBrandPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundBrandHover,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
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
    visual,
    sprinkles({
        color: vars.colors.textButtonSecondaryNegative,
        background: 'transparent',
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderNegative,
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
                color: vars.colors.textButtonSecondaryNegativePressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        borderColor: vars.colors.buttonSecondaryBorderNegativePressed,
                        color: vars.colors.textButtonSecondaryNegativePressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundNegativeHover,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
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
    visual,
    sprinkles({
        color: vars.colors.textButtonSecondaryMedia,
        background: vars.colors.buttonSecondaryBackgroundBrand,
    }),
    {
        borderColor: vars.colors.buttonSecondaryBorderMedia,

        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
                color: vars.colors.textButtonSecondaryMediaPressed,
                backgroundColor: vars.colors.buttonSecondaryBackgroundMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        borderColor: vars.colors.buttonSecondaryBorderMediaPressed,
                        color: vars.colors.textButtonSecondaryMediaPressed,
                        backgroundColor: vars.colors.buttonSecondaryBackgroundMediaHover,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
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
    visual,
    sprinkles({
        color: vars.colors.textButtonPrimary,
        background: vars.colors.buttonDangerBackground,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonDangerBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonDangerBackgroundHover,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonDangerBackgroundPressed,
                    },
                },
            },
        },
    },
];

export const defaultLink: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLink,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundPressed,
                    },
                },
            },
        },
    },
];

export const defaultLinkOverBrand: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkBrand,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

export const defaultLinkOverNegative: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkNegative,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundNegativePressed,
                    },
                },
            },
        },
    },
];

export const defaultLinkMedia: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkMedia,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkBackgroundMediaPressed,
                    },
                },
            },
        },
    },
];

const dangerLink: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverBrand: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundBrand,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverNegative: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: vars.colors.buttonLinkDangerBackgroundNegative,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
                    },
                },
            },
        },
    },
];

const dangerLinkMedia: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkDangerMedia,
        background: vars.colors.buttonLinkDangerBackgroundMedia,
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundMediaPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverBrandDark: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundBrandPressed,
                    },
                },
            },
        },
    },
];

const dangerLinkOverNegativeDark: ComplexStyleRule = [
    visual,
    sprinkles({
        color: vars.colors.textLinkDanger,
        background: 'transparent',
    }),
    {
        selectors: {
            [`${touchableArea}:not([disabled]):active &`]: {
                backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableArea}:hover:not([disabled]) &`]: {
                        backgroundColor: vars.colors.buttonLinkDangerBackgroundNegativePressed,
                    },
                    [`${touchableArea}:not([disabled]):active &`]: {
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
