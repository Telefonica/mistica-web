import {globalStyle, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';
import {iconContainerSize} from './icon-button.css';

const borderSize = 1;

// We need to substract border size from padding because the container has boxSizing: border-box
export const fieldVerticalPadding = 8 - borderSize;
export const fieldLeftPadding = 12 - borderSize;
export const fieldRightPadding = 16 - borderSize;

export const fieldElementsGap = 12;
export const fieldEndIconGap = 4;
export const iconButtonSize = iconContainerSize.default;

export const mobileFontSize = pxToRem(16);
export const desktopFontSize = pxToRem(18);

export const labelLineHeight = pxToRem(24);
export const inputLineHeight = pxToRem(24);

export const shrinkedLabelLineHeight = {
    mobile: pxToRem(16),
    desktop: pxToRem(20),
};

export const labelFontSize = {
    mobile: pxToRem(16),
    desktop: pxToRem(18),
};

const topSpaceWithLabel = {
    desktop: `calc(${shrinkedLabelLineHeight.desktop} + ${fieldVerticalPadding}px)`,
    mobile: `calc(${shrinkedLabelLineHeight.mobile} + ${fieldVerticalPadding}px)`,
};

const topSpaceWithoutLabel = {
    desktop: `calc(${shrinkedLabelLineHeight.desktop} / 2 + ${fieldVerticalPadding}px)`,
    mobile: `calc(${shrinkedLabelLineHeight.mobile} / 2 + ${fieldVerticalPadding}px)`,
};

const bottomSpaceWithLabel = {
    desktop: fieldVerticalPadding,
    mobile: fieldVerticalPadding,
};

const bottomSpaceWithoutLabel = {
    desktop: `calc(${shrinkedLabelLineHeight.desktop} / 2 + ${fieldVerticalPadding}px)`,
    mobile: `calc(${shrinkedLabelLineHeight.mobile} / 2 + ${fieldVerticalPadding}px)`,
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
        borderRadius: `calc(${vars.borderRadii.input} - 1px)`,
        lineHeight: inputLineHeight,
        fontSize: desktopFontSize,
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: mobileFontSize,
            },
        },
        caretColor: vars.colors.controlActivated,

        /**
         * Seems like 'display: flex' is causing issues on firefox and the input takes over the whole space
         * https://stackoverflow.com/questions/43314921/strange-input-widths-in-firefox-vs-chrome
         */
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

        // reset FF red shadow styles for required inputs
        boxShadow: 'none',
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
        paddingY: 0,
    }),
    {
        // the outline is set in the field container
        outline: 'none',
        resize: 'none',
    },
    commonInputStyles,
]);

export const hiddenDatePlaceholder = style({
    selectors: {
        /**
         * Chrome: hide placeholder (dd/mm/yyyy).
         * `opacity: 0` is needed when min/max is set and some parts of the date are disabled.
         * be sure to check that case when updating these styles.
         */
        '&::-webkit-datetime-edit': {
            color: 'transparent',
            opacity: 0,
        },
    },
});

export const emptyDateValue = style({
    /**
     * In iOS, the value's height collapses to 0 when the input's value is empty.
     * We prevent this by forcing the minHeight in this case.
     */
    selectors: {
        '&::-webkit-date-and-time-value': {
            minHeight: inputLineHeight,
        },
    },
});

export const input = style([
    sprinkles({
        position: 'relative',
    }),
    {
        // the outline is set in the field container
        outline: 'none',
        margin: 0,
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

            /**
             * Chrome: make the native icon invisible and stretch it over the whole field so you can click
             * anywhere in the input field to trigger the native datepicker
             */
            '&::-webkit-calendar-picker-indicator': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                padding: 0,
                margin: 0,
                color: 'transparent',
                background: 'transparent',
                cursor: 'pointer',
            },

            /**
             * Chrome: datetime fields are 2px taller than other input fields. This is because the browser adds
             * 1px of top/bottom padding inside the input
             */
            //
            '&[type="month"]::-webkit-datetime-edit-fields-wrapper': {
                padding: 0,
            },
            '&[type="date"]::-webkit-datetime-edit-fields-wrapper': {
                padding: 0,
            },
            '&[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper': {
                padding: 0,
            },

            // Override Chrome input autocomplete styles
            '&:-webkit-autofill': {
                WebkitTextFillColor: vars.colors.textPrimary,
                // The background can not be overriden, but we can delay the background color transition to avoid the change
                transitionProperty: 'background-color',
                transitionDelay: '99999s',
            },

            // iOS date/time fields are centered by default, but we want them left aligned
            '&::-webkit-date-and-time-value': {
                textAlign: 'left',

                // In Android, Chrome adds margin to the date's value, causing the input to be taller than expected
                margin: 0,
            },
        },
    },
    commonInputStyles,
]);

/**
 * Firefox: hide value if not valid or focused
 * Only apply when Firefox, otherwise it breaks styles in safari mobile
 */
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
    paddingTop: topSpaceWithLabel.desktop,
    paddingBottom: bottomSpaceWithLabel.desktop,
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingTop: topSpaceWithLabel.mobile,
            paddingBottom: bottomSpaceWithLabel.mobile,
        },
    },
});

export const inputWithoutLabel = style({
    paddingTop: topSpaceWithoutLabel.desktop,
    paddingBottom: bottomSpaceWithoutLabel.desktop,
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingTop: topSpaceWithoutLabel.mobile,
            paddingBottom: bottomSpaceWithoutLabel.mobile,
        },
    },
});

export const textAreaWithLabel = style({
    // using margin instead of padding to avoid the multiline text being visible through the label
    marginTop: topSpaceWithLabel.desktop,
    paddingBottom: bottomSpaceWithLabel.desktop,
    height: `calc(${pxToRem(152)} - ${topSpaceWithLabel.desktop} - 2px)`,
    '@media': {
        [mq.tabletOrSmaller]: {
            marginTop: topSpaceWithLabel.mobile,
            paddingBottom: bottomSpaceWithLabel.mobile,
            height: `calc(${pxToRem(152)} - ${topSpaceWithLabel.mobile} - 2px)`,
        },
    },
});

export const textAreaWithoutLabel = style({
    marginTop: 0,
    paddingTop: topSpaceWithoutLabel.desktop,
    paddingBottom: bottomSpaceWithoutLabel.desktop,
    height: `calc(${pxToRem(152)} - 2px)`,
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingTop: topSpaceWithoutLabel.mobile,
            paddingBottom: bottomSpaceWithoutLabel.mobile,
        },
    },
});

export const endIconContainer = style([
    sprinkles({
        paddingLeft: fieldEndIconGap,
        display: 'flex',
        alignItems: 'center',
    }),
    {
        paddingRight: fieldRightPadding,
        alignSelf: 'center',
    },
]);

export const startIcon = style([
    sprinkles({
        paddingRight: fieldElementsGap,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        position: 'absolute',
    }),
    {
        paddingLeft: fieldLeftPadding,
        // passthrough click events to the input
        pointerEvents: 'none',
    },
]);

export const prefix = style([
    sprinkles({
        paddingRight: fieldElementsGap,
    }),
    {
        paddingLeft: fieldLeftPadding,
        transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
]);

export const menuItem = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    }),
    {
        height: pxToRem(48),
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

        // one more than TextField label
        zIndex: 2,
    },
]);

globalStyle(`${suggestionsContainer} > ul`, {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
});

export const fieldEndIconContainer = style({
    // remove extra button space on the right so that icon is not too far from field's container
    marginRight: -12,
});
