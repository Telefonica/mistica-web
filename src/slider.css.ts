import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {applyAlpha} from './utils/color';
import {sprinkles} from './sprinkles.css';

const DEFAULT_THUMB_SIZE = 20;
const IOS_THUMB_SIZE = 28;

export const container = style([
    sprinkles({
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    }),
    {
        touchAction: 'none',
    },
]);

export const disabled = style({
    opacity: 0.5,
    pointerEvents: 'none',
});

export const track = sprinkles({
    width: '100%',
    height: 4,
    borderRadius: vars.borderRadii.bar,
});

export const thumbContainer = style([
    sprinkles({
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        top: '50%',
        transform: 'translateY(-50%)',
        WebkitTapHighlightColor: 'transparent',
    },
]);

export const defaultThumb = style([
    sprinkles({
        width: DEFAULT_THUMB_SIZE,
        height: DEFAULT_THUMB_SIZE,
        borderRadius: '50%',
        background: vars.colors.controlActivated,
    }),
    {
        transition: '0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
]);

export const iosThumb = style([
    sprinkles({
        background: vars.colors.iosControlKnob,
        borderRadius: '50%',
    }),
    {
        width: IOS_THUMB_SIZE,
        height: IOS_THUMB_SIZE,
        border: ' 0.5px solid rgba(0, 0, 0, 0.04)',
        boxSizing: 'border-box',
        boxShadow: '0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12)',
    },
]);

export const thumbHover = style({
    '@media': {
        [mq.supportsHover]: {
            boxShadow: `0 0 0 5px ${applyAlpha(vars.rawColors.controlActivated, 0.2)}`,
        },
    },
});

export const thumbActive = style({
    boxShadow: `0 0 0 8px ${applyAlpha(vars.rawColors.controlActivated, 0.2)}`,
});

export const input = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        left: 0,
    }),
    {
        appearance: 'none',
        WebkitAppearance: 'none',
        '::-webkit-slider-thumb': {
            appearance: 'none',
            WebkitAppearance: 'none',
            pointerEvents: 'none',
        },
    },
]);
