import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {fieldTopPadding, fieldLeftPadding, fieldRightPadding, fieldVars} from './text-field-base.css';

export const DEFAULT_WIDTH = 328;

export const labelContainer = style([
    sprinkles({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
    }),
    {
        left: fieldLeftPadding,
        top: fieldTopPadding,
        pointerEvents: 'none',
        transformOrigin: '0 0',
        fontSize: fieldVars.desktopFontSize,
        transform: `translateY(calc(${fieldVars.shrinkedLabelDesktopLineHeight} / 2)) scale(1)`,
        lineHeight: fieldVars.desktopLineHeight,
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: fieldVars.mobileFontSize,
                lineHeight: fieldVars.mobileLineHeight,
                transform: `translateY(calc(${fieldVars.shrinkedLabelMobileLineHeight} / 2)) scale(1)`,
            },
        },
        width: `calc(100% - ${fieldLeftPadding}px - ${fieldRightPadding}px)`,
    },
]);

export const labelText = style([
    sprinkles({
        overflow: 'hidden',
        flexShrink: 1,
    }),
    {
        display: '-webkit-box',
        wordBreak: 'break-all',
        WebkitBoxOrient: 'vertical',
        boxOrient: 'vertical',
        WebkitLineClamp: 1,
        lineClamp: 1,
    },
]);

export const shrinked = style({
    transform: `translateY(0) scale(${fieldVars.labelScaleDesktop})`,
    lineHeight: `calc(${fieldVars.shrinkedLabelDesktopLineHeight} / ${fieldVars.labelScaleDesktop})`,
    width: `calc(100% - ${fieldLeftPadding}px - ${fieldRightPadding}px / ${fieldVars.labelScaleDesktop})`,
    '@media': {
        [mq.tabletOrSmaller]: {
            transform: `translateY(0) scale(${fieldVars.labelScaleMobile})`,
            lineHeight: `calc(${fieldVars.shrinkedLabelMobileLineHeight} / ${fieldVars.labelScaleMobile})`,
            width: `calc(100% - ${fieldLeftPadding}px - ${fieldRightPadding}px / ${fieldVars.labelScaleMobile})`,
        },
    },
});

export const fieldContainer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        minWidth: 96,
    },
]);

export const disabled = style({
    opacity: 0.5,
    cursor: 'default',
});

export const normalWidth = style([
    sprinkles({
        width: '100%',
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                width: DEFAULT_WIDTH,
            },
        },
    },
]);

export const fullWidth = sprinkles({
    width: '100%',
});

// See https://css-tricks.com/copy-the-browsers-native-focus-styles/
export const browserDefaultFocusOutline = [
    '5px auto Highlight', // Firefox
    '5px auto -webkit-focus-ring-color', // Chrome / Safari
];

export const focused = style({
    outline: browserDefaultFocusOutline,
});

export const fieldFocusRing = style({
    ':focus-within': {
        outline: browserDefaultFocusOutline,
    },
    selectors: {
        // when the field has an end icon button (like the password visibility toggle or the CVV help icon), and it is focused, don't show the focus ring on the field
        '&:has(button:focus-visible)': {
            outline: 'none',
        },
    },
});

export const field = style([
    sprinkles({
        border: 'input',
        display: 'flex',
        borderRadius: vars.borderRadii.input,
        position: 'relative',
    }),
    fieldFocusRing,
]);

export const helperContainer = sprinkles({
    paddingLeft: 12,
    paddingRight: 16,
    display: 'flex',
});

export const leftHelperText = style([
    sprinkles({
        display: 'flex',
    }),
    {
        margin: 0, // reset p default browser margin
        lineHeight: '0',
    },
]);

export const rightHelperText = sprinkles({paddingLeft: 16});

export const helperText = sprinkles({
    flexGrow: 1,
    paddingTop: 4,
});

export const warnIcon = style({
    display: 'block',
    marginRight: 4,
    width: ['1rem', '1lh'], // some browsers don't support 'lh' unit yet
    height: ['1rem', '1lh'],
});

export const background = styleVariants({
    default: [sprinkles({background: vars.colors.backgroundContainer})],
    readOnly: [sprinkles({background: vars.colors.neutralLow})],
});
