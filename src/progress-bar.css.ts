import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {style, keyframes} from '@vanilla-extract/css';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

export const barBackground = sprinkles({
    borderRadius: 2,
    height: 4,
    background: vars.colors.control,
});

const barKeyFrames = keyframes({
    '0%': {
        maxWidth: '0',
    },
});

export const bar = style([
    sprinkles({
        height: '100%',
        borderRadius: 2,
    }),
    {
        transition: `max-width ${transition}`,
        animation: `${barKeyFrames} ${transition}`,
    },
]);
