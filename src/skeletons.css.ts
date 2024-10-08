import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {style, keyframes, styleVariants} from '@vanilla-extract/css';

const transition = '1.5s linear';

export const background = styleVariants({
    default: [sprinkles({background: vars.colors.backgroundSkeleton})],
    inverse: [sprinkles({background: vars.colors.backgroundSkeletonInverse})],
});

const pulseKeyframes = keyframes({
    '0%': {
        opacity: 1,
    },

    '50%': {
        opacity: 0.5,
    },

    '100%': {
        opacity: 1,
    },
});

export const animation = style([
    sprinkles({
        display: 'block',
    }),
    {
        animation: `${pulseKeyframes} ${transition} infinite`,
    },
]);

export const row = sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const circle = sprinkles({
    flexShrink: 0,
    flexGrow: 0,
});

export const line = style([
    sprinkles({
        flexShrink: 1,
    }),
    {
        marginLeft: 16,
    },
]);
