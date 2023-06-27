import {style, globalStyle, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

import type {ComplexStyleRule} from '@vanilla-extract/css';

const transitionTiming = '0.3s cubic-bezier(0.77, 0, 0.175, 1)';

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
const PADDING_X_LINK = 12;
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

        selectors: {
            '&:hover:not([disabled])': {
                transition: `background-color ${transitionTiming}, color ${transitionTiming}, border-color ${transitionTiming}`,
            },

            [`&[disabled]:not(${isLoading})`]: disabledStyle,
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
            '&:enabled:active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundSelected,
            },

            // Next media queries were added in each button style, because a pair of bugs in mobile devices (related to: https://jira.tid.es/browse/APPS-1882):
            // - When tapping on a button that takes you to next screen and then go back to the previous one, button still have the focus styles
            // - Same behavior if you do long press on the button

            // What these media queries do, is:
            // - Make sure that in FF hover still has it's proper styles
            // - Media query with "coarse" (mobile), avoids that in devices that have coarse implemented, focus style doesn't get stuck

            // Must be always declared for Firefox
            '&:hover:not([disabled])': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundHover,

                '@media': {
                    [mq.touchableOnly]: {
                        // Revert hover background in touch devices
                        backgroundColor: vars.colors.buttonPrimaryBackground,
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
            '&:enabled:active': {
                backgroundColor: vars.colors.buttonPrimaryBackgroundInverseSelected,
                color: vars.colors.textButtonPrimaryInverseSelected,
            },

            '&:hover:not([disabled])': {
                color: vars.colors.textButtonPrimaryInverseSelected,
                backgroundColor: vars.colors.buttonPrimaryBackgroundInverseSelected,

                '@media': {
                    [mq.touchableOnly]: {
                        color: vars.colors.textButtonPrimaryInverse,
                        backgroundColor: vars.colors.buttonPrimaryBackgroundInverse,
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
            '&:enabled:active': {
                color: vars.colors.textButtonSecondarySelected,
                borderColor: vars.colors.buttonSecondaryBorderSelected,
                backgroundColor: vars.colors.buttonSecondaryBackgroundSelected,
            },

            '&:hover:not([disabled])': {
                color: vars.colors.textButtonSecondarySelected,
                borderColor: vars.colors.buttonSecondaryBorderSelected,
                backgroundColor: vars.colors.buttonSecondaryBackgroundHover,

                '@media': {
                    [mq.touchableOnly]: {
                        color: vars.colors.textButtonSecondary,
                        backgroundColor: 'transparent',
                        borderColor: vars.colors.buttonSecondaryBorder,
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
            '&:enabled:active': {
                borderColor: vars.colors.buttonSecondaryBorderInverseSelected,
                color: vars.colors.textButtonSecondaryInverseSelected,
                backgroundColor: vars.colors.buttonSecondaryBackgroundInverseSelected,
            },

            '&:hover:not([disabled])': {
                borderColor: vars.colors.buttonSecondaryBorderInverseSelected,
                color: vars.colors.textButtonSecondaryInverseSelected,
                backgroundColor: vars.colors.buttonSecondaryBackgroundInverseHover,

                '@media': {
                    [mq.touchableOnly]: {
                        borderColor: vars.colors.buttonSecondaryBorderInverse,
                        color: vars.colors.textButtonSecondaryInverse,
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
            '&:enabled:active': {
                backgroundColor: vars.colors.buttonDangerBackgroundSelected,
            },

            '&:hover:not([disabled])': {
                backgroundColor: vars.colors.buttonDangerBackgroundHover,

                '@media': {
                    [mq.touchableOnly]: {
                        backgroundColor: vars.colors.buttonDangerBackground,
                    },
                },
            },
        },
    },
];

export const link = style([
    sprinkles({
        display: 'inline-block',
        width: 'auto',
        position: 'relative',
        borderRadius: vars.borderRadii.button,
        paddingX: PADDING_X_LINK,
        border: 'none',
        color: vars.colors.textLink,
        background: 'transparent',
        overflow: 'hidden',
        minWidth: 40,
    }),
    {
        paddingTop: PADDING_Y_LINK,
        paddingBottom: PADDING_Y_LINK,
        fontWeight: 500,
        transition: `background-color ${transitionTiming}, color ${transitionTiming}`,

        selectors: {
            '&:enabled:active': {
                backgroundColor: vars.colors.buttonLinkBackgroundSelected,
            },

            [`&[disabled]:not(${isLoading})`]: disabledStyle,

            '&:hover:not([disabled])': {
                backgroundColor: vars.colors.buttonLinkBackgroundSelected,

                '@media': {
                    [mq.touchableOnly]: {
                        backgroundColor: 'initial',
                    },
                },
            },
        },
    },
]);

export const inverseLink = style([
    sprinkles({
        color: vars.colors.textLinkInverse,
    }),
    {
        selectors: {
            '&:enabled:active': {
                backgroundColor: vars.colors.buttonLinkBackgroundInverseSelected,
            },

            '&:hover:not([disabled])': {
                backgroundColor: vars.colors.buttonLinkBackgroundInverseSelected,

                '@media': {
                    [mq.touchableOnly]: {
                        backgroundColor: 'initial',
                    },
                },
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

export const alignedLink = style({marginLeft: -PADDING_X_LINK});

export const variants = styleVariants({
    primary: lightPrimary,
    secondary: lightSecondary,
    danger,
});

export const inverseVariants = styleVariants({
    primary: lightPrimaryInverse,
    secondary: lightSecondaryInverse,
    danger,
});
