import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

export const LABEL_LEFT_POSITION = 12;
export const DEFAULT_WIDTH = 328;

// to scale to the correct text-preset when the transition applies
export const LABEL_SCALE_DESKTOP = 0.78; // Text1/Text3 = 14/18 (desktop)
export const LABEL_SCALE_MOBILE = 0.75; // Text1/Text3 = 12/16 (mobile)

export const labelContainer = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        height: 24,
        display: 'flex',
        flexDirection: 'row',
        left: LABEL_LEFT_POSITION,
    }),
    {
        pointerEvents: 'none',
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

export const fieldSingle = style([
    sprinkles({height: 56}),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                height: 60,
            },
        },
    },
]);

export const fieldMulti = style({
    height: 152,
});

export const helperContainer = sprinkles({
    paddingLeft: 12,
    paddingRight: 16,
    display: 'flex',
});

export const helperText = style({
    margin: 0,
    marginTop: 4,
    flexGrow: 1,
});

export const leftText = style({
    textAlign: 'left',
});

export const rightText = style({
    textAlign: 'right',
});
