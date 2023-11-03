import {globalStyle, keyframes, style} from '@vanilla-extract/css';

const slideUpFadeInKeyFrames = keyframes({
    from: {
        transform: 'translate3d(0, 50px, 0)',
        opacity: 0,
    },
    to: {
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
    },
});

const textFadeOutKeyFrames = keyframes({
    from: {
        opacity: 1,
    },
    to: {
        opacity: 0,
    },
});

const wavesFadeOutKeyFrames = keyframes({
    '0%, 80%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    },
});

export const overlappingChildren = style({
    display: 'grid',
});

globalStyle(`${overlappingChildren} > *`, {
    gridRow: 1,
    gridColumn: 1,
    width: 140,
});

export const fullScreenContainer = style({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
});

export const description = style({
    position: 'absolute',
    bottom: 88,
    visibility: 'hidden',
});

export const slideUpFadeIn = style({
    animation: `${slideUpFadeInKeyFrames} 0.5s cubic-bezier(0.29, 0, 0.71, 1)`,
    visibility: 'visible',
});

export const textFadeOut = style({
    animation: `${textFadeOutKeyFrames} 1s cubic-bezier(0.29, 0, 0.71, 1)`,
    opacity: 0,
});

export const wavesFadeOut = style({
    animation: `${wavesFadeOutKeyFrames} 1.3s cubic-bezier(0.29, 0, 0.71, 1)`,
    opacity: 0,
});
