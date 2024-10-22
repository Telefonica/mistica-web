import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {style, keyframes, styleVariants} from '@vanilla-extract/css';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

const barBackgroundBase = sprinkles({
    borderRadius: vars.borderRadii.bar,
    height: 4,
});

export const barBackground = styleVariants({
    default: [barBackgroundBase, {background: vars.colors.barTrack}],
    inverse: [barBackgroundBase, {background: vars.colors.barTrackInverse}],
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
    width: '100%',
});
