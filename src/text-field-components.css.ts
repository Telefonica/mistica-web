import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

export const LABEL_LEFT_POSITION = 12;
export const DEFAULT_WIDTH = 328;

// to scale to the correct text-preset when the transition applies
export const LABEL_SCALE_DESKTOP = parseFloat('0.78'); // Text1/Text3 = 14/18 (desktop)
export const LABEL_SCALE_MOBILE = parseFloat('0.75'); // Text1/Text3 = 12/16 (mobile)

export const labelContainer = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        height: 24,
        display: 'flex',
        flexDirection: 'row',
    }),
    {
        pointerEvents: 'none',
        left: LABEL_LEFT_POSITION,
        transformOrigin: '0 0',
        transform: 'translateY(18px) scale(1)',
        fontSize: 18, // cannot use Text3/Text1 preset comps because we want to apply a scale transition (zoom-out)
        lineHeight: '24px',
        '@media': {
            [mq.tabletOrSmaller]: {
                fontSize: 16,
                transform: 'translateY(16px) scale(1)',
            },
        },
        width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px)`,
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
    height: 20 / LABEL_SCALE_DESKTOP, // Text1 line-height is the expected final line-height.
    transform: `translateY(8px) scale(${LABEL_SCALE_DESKTOP})`,
    lineHeight: `${20 / LABEL_SCALE_DESKTOP}px`,
    width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px) / ${LABEL_SCALE_DESKTOP}`,
    '@media': {
        [mq.tabletOrSmaller]: {
            transform: `translateY(8px) scale(${LABEL_SCALE_MOBILE})`,
            height: 16 / LABEL_SCALE_MOBILE,
            lineHeight: `${16 / LABEL_SCALE_MOBILE}px`,
            width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px) / ${LABEL_SCALE_MOBILE}`,
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
});

export const normalWidth = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            width: '100%',
        },
        [mq.desktopOrBigger]: {
            width: DEFAULT_WIDTH,
        },
    },
});

export const fullWidth = style({
    width: '100%',
});

export const field = style([
    sprinkles({
        overflow: 'hidden',
        border: 'regular',
        display: 'flex',
        borderRadius: 8,
        position: 'relative',
    }),
    {},
]);

export const fieldSingle = style({
    height: 60,
    '@media': {
        [mq.tabletOrSmaller]: {
            height: 56,
        },
    },
});

export const fieldMulti = style({
    height: 152,
});
