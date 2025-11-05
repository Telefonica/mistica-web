import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {
    fieldVerticalPadding,
    inputLineHeight,
    labelFontSize,
    labelLineHeight,
    shrinkedLabelLineHeight,
    fieldLeftPadding,
    fieldRightPadding,
} from './text-field-base.css';

export const DEFAULT_WIDTH = 328;

// to scale to the correct text-preset when the transition applies
export const LABEL_SCALE_DESKTOP = 0.78; // Text1/Text3 = 14/18 (desktop)
export const LABEL_SCALE_MOBILE = 0.75; // Text1/Text3 = 12/16 (mobile)

export const labelContainer = style([
    sprinkles({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
    }),
    {
        left: fieldLeftPadding,
        top: fieldVerticalPadding,
        pointerEvents: 'none',
        transformOrigin: '0 0',
        fontSize: labelFontSize.desktop, // cannot use Text3/Text1 preset comps because we want to apply a scale transition (zoom-out)
        transform: `translateY(calc((${shrinkedLabelLineHeight.desktop} + ${inputLineHeight} - ${labelLineHeight}) / 2)) scale(1)`,
        lineHeight: labelLineHeight,
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: labelFontSize.mobile,
                transform: `translateY(calc((${shrinkedLabelLineHeight.mobile} + ${inputLineHeight} - ${labelLineHeight}) / 2)) scale(1)`,
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
    transform: `translateY(0) scale(${LABEL_SCALE_DESKTOP})`,
    lineHeight: `calc(${shrinkedLabelLineHeight.desktop} / ${LABEL_SCALE_DESKTOP})`,
    width: `calc(100% - ${fieldLeftPadding}px - ${fieldRightPadding}px) / ${LABEL_SCALE_DESKTOP}`,
    '@media': {
        [mq.tabletOrSmaller]: {
            transform: `translateY(0) scale(${LABEL_SCALE_MOBILE})`,
            lineHeight: `calc(${shrinkedLabelLineHeight.mobile} / ${LABEL_SCALE_MOBILE})`,
            width: `calc(100% - ${fieldLeftPadding}px - ${fieldRightPadding}px) / ${LABEL_SCALE_MOBILE}`,
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
