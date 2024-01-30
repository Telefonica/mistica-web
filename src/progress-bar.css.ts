import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {style, keyframes} from '@vanilla-extract/css';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

export const barBackground = sprinkles({
    borderRadius: vars.borderRadii.bar,
    height: 4,
    background: vars.colors.barTrack,
});

export const bar = sprinkles({
    height: '100%',
    borderRadius: vars.borderRadii.bar,
});

const barKeyFrames = keyframes({
    '0%': {
        maxWidth: '0%',
    },
});

const barKeyFramesInverte = keyframes({
    '0%': {
        maxWidth: '100%',
    },
});

export const normal = style({
    transition: `max-width ${transition}`,
    animation: `${barKeyFrames} ${transition}`,
    '@media': {
        ['(prefers-reduced-motion)']: {
            transition: 'none',
            animation: 'none',
        },
    },
});

export const inverse = style({
    transition: `max-width ${transition}`,
    animation: `${barKeyFramesInverte} ${transition}`,
    '@media': {
        ['(prefers-reduced-motion)']: {
            transition: 'none',
            animation: 'none',
        },
    },
});

export const progressBarSteppedContainer = style({
    display: 'inline-block',
    width: '100%',
});
