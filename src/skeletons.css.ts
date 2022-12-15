import {sprinkles} from './sprinkles.css';
import {style, keyframes} from '@vanilla-extract/css';

const transition = '1.5s linear';

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

export const animation = style({
    display: 'inline-block',
    animation: `${pulseKeyframes} ${transition} infinite`,
});

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
