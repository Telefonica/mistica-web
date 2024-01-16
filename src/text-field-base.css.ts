import {globalStyle, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

export const fieldVerticalPadding = 8;

export const mobileFontSize = pxToRem(16);
export const desktopFontSize = pxToRem(18);

export const labelLineHeight = pxToRem(24);
export const inputLineHeight = pxToRem(24);

export const shrinkedLabelLineHeight = {
    desktop: pxToRem(20),
    mobile: pxToRem(16),
};

export const labelFontSize = {
    mobile: pxToRem(16),
    desktop: pxToRem(18),
};

const commonInputStyles = style([
    sprinkles({
        border: 'none',
        minWidth: 0,
        color: vars.colors.textPrimary,
        width: '100%',
    }),
    {
        background: 'none',
        outline: 0,
        lineHeight: inputLineHeight,
        fontSize: desktopFontSize,
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: mobileFontSize,
            },
        },
        caretColor: vars.colors.controlActivated,
        // Seems like 'display: flex' is causing issues on firefox and the input takes over the whole space https://stackoverflow.com/questions/43314921/strange-input-widths-in-firefox-vs-chrome
        textOverflow: 'ellipsis',
        selectors: {
            '&::placeholder': {
                opacity: 0,
                transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            },
            '&:focus::placeholder': {
                opacity: 0.5,
            },
        },
        boxShadow: 'none', // reset FF red shadow styles for required inputs
    },
]);

export const container = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        minWidth: 96,
    },
]);

// creating a style because a globalStyle uses the generated className
export const fullWidth = style({
    width: '100%',
    display: 'inline-flex',
});

globalStyle(`${fullWidth} > div`, {
    width: '100%',
    display: 'inline-flex',
});

export const textArea = style([
    sprinkles({
        padding: 0,
    }),
    {
        resize: 'none',
        paddingBottom: fieldVerticalPadding,
    },
    commonInputStyles,
]);

export const textAreaWithLabel = style({
    // using margin instead of padding to avoid the multiline text being visible through the label
    marginTop: `calc(${shrinkedLabelLineHeight.desktop} + ${fieldVerticalPadding}px)`,
    '@media': {
        [mq.tabletOrSmaller]: {
            marginTop: `calc(${shrinkedLabelLineHeight.mobile} + ${fieldVerticalPadding}px)`,
        },
    },
});

export const textAreaWithoutLabel = style({
    paddingTop: 2 * fieldVerticalPadding,
});

export const input = style([
    sprinkles({
        position: 'relative',
        height: '100%',
    }),
    {
        WebkitAppearance: 'none',
        appearance: 'none',

        selectors: {
            '&::-webkit-search-cancel-button': {
                WebkitAppearance: 'none',
                appearance: 'none',
            },
            '&::-webkit-search-decoration': {
                WebkitAppearance: 'none',
                appearance: 'none',
            },
            // Chrome: make the native icon invisible and stretch it over the whole field so you can click
            // anywhere in the input field to trigger the native datepicker
            '&::-webkit-calendar-picker-indicator': {
                position: 'absolute',
                top: 0,
                left: -24, // to fully cover input area
                right: 0,
                bottom: 0,
                width: 'auto',
                height: 'auto',
                opacity: 0,
                color: 'transparent',
                background: 'transparent',
                cursor: 'pointer',
            },

            // Chrome: hide value if not valid or focused
            // `opacity: 0` is needed when min/max is set and some parts of the date are disabled
            // be sure to check that case when updating these styles
            '&[type="month"]:not(:valid):not(:focus)::-webkit-datetime-edit': {
                color: 'transparent',
                opacity: 0,
            },
            '&[type="date"]:not(:valid):not(:focus)::-webkit-datetime-edit': {
                color: 'transparent',
                opacity: 0,
            },
            '&[type="datetime-local"]:not(:valid):not(:focus)::-webkit-datetime-edit': {
                color: 'transparent',
                opacity: 0,
            },

            // Override Chrome input autocomplete styles:
            '&:-webkit-autofill': {
                WebkitTextFillColor: vars.colors.textPrimary,
                // The background can not be overriden, but we can delay the background color transition to avoid the change
                transitionProperty: 'background-color',
                transitionDelay: '99999s',
            },
            // iOS date/time fields are centered by default, but we want them left aligned
            '&::-webkit-date-and-time-value': {
                textAlign: 'left',
            },
        },
    },
    commonInputStyles,
]);

// Firefox: hide value if not valid or focused
// Only apply when Firefox, otherwise it breaks styles in safari mobile
export const inputFirefoxStyles = style({
    selectors: {
        '&[type="month"]:not(:valid):not(:focus)': {
            color: 'transparent',
        },
        '&[type="date"]:not(:valid):not(:focus)': {
            color: 'transparent',
        },
        '&[type="datetime-local"]:not(:valid):not(:focus)': {
            color: 'transparent',
        },
    },
});

export const inputWithLabel = style({
    paddingTop: `calc(${shrinkedLabelLineHeight.desktop} + ${fieldVerticalPadding}px)`,
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingTop: `calc(${shrinkedLabelLineHeight.mobile} + ${fieldVerticalPadding}px)`,
        },
    },
    paddingBottom: fieldVerticalPadding,
});

export const inputWithoutLabel = style({
    paddingTop: `calc(${shrinkedLabelLineHeight.desktop} / 2)`,
    paddingBottom: `calc(${shrinkedLabelLineHeight.desktop} / 2)`,

    '@media': {
        [mq.tabletOrSmaller]: {
            paddingTop: `calc(${shrinkedLabelLineHeight.mobile} / 2)`,
            paddingBottom: `calc(${shrinkedLabelLineHeight.mobile} / 2)`,
        },
    },
});

export const endIcon = style([
    sprinkles({
        paddingLeft: 8,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
    }),
    {
        alignSelf: 'center',
    },
]);

export const startIcon = style([
    sprinkles({
        paddingX: 12,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        position: 'absolute',
    }),
    {
        pointerEvents: 'none', // passthrough click events to the input
    },
]);

export const prefix = style([
    sprinkles({
        paddingLeft: 12,
        paddingRight: 16,
    }),
    {
        transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
]);

export const prefixWithLabel = style([
    sprinkles({
        paddingBottom: 8,
    }),
    {
        paddingTop: 28,
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingTop: 24,
            },
        },
    },
]);

export const prefixWithoutLabel = sprinkles({
    paddingY: 16,
});

export const menuItem = style([
    sprinkles({
        height: 48,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    }),
    {
        padding: '6px 16px',
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        selectors: {
            '&:hover': {
                background: 'rgba(0, 0, 0, 0.08)',
            },
        },
    },
]);

export const menuItemSelected = sprinkles({
    background: vars.colors.backgroundAlternative,
});

export const suggestionsContainer = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        background: 'white',
        zIndex: 2, // one more than TextField label
    },
]);

globalStyle(`${suggestionsContainer} > ul`, {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
});
