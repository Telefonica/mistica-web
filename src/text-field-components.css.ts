import {style} from '@vanilla-extract/css';
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

export const field = sprinkles({
    overflow: 'hidden',
    border: 'regular',
    display: 'flex',
    borderRadius: vars.borderRadii.input,
    position: 'relative',
});

export const helperContainer = sprinkles({
    paddingLeft: 12,
    paddingRight: 16,
    display: 'flex',
});

export const helperText = style([
    sprinkles({
        flexGrow: 1,
        display: 'flex',
        paddingTop: 4,
    }),
    {
        margin: 0, // reset p default browser margin
        lineHeight: '0',
    },
]);
