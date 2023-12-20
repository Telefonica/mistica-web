import {keyframes, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

export const loadingScreen = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    {
        minHeight: '100vh',
    },
]);

export const inOutAnimationMs = 500;
const backgroundAnimationTiming = `${inOutAnimationMs}ms cubic-bezier(.1,0,.7,1)`;
const backgroundFadeIn = keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
    },
});

export const screenBackgroundAnimated = style({
    animation: `${backgroundFadeIn} ${backgroundAnimationTiming}`,
});

export const screenBackground = styleVariants({
    default: {
        background: skinVars.colors.background,
    },
    inverse: {
        background: skinVars.colors.backgroundBrand,
    },
});

export const screenBackgroundFadeOut = style({
    transition: `opacity ${backgroundAnimationTiming}`,
    opacity: 0,
});

export const loadingScreenChildren = sprinkles({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

export const loadingScreenText = sprinkles({
    paddingTop: 24,
});

const textAnimationTiming = `${inOutAnimationMs}ms cubic-bezier(.1,0,.7,1)`;

const textIn = keyframes({
    '0%': {
        transform: 'translateY(50px)',
        opacity: 0,
    },
    '100%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
});

export const loadingScreenTextAnimated = style({
    animation: `${textIn} ${textAnimationTiming}`,
    animationFillMode: 'both',
});

export const loadingScreenTextAnimatedOut = style({
    transition: `opacity ${textAnimationTiming}`,
    opacity: 0,
});

const pulseAnimation = keyframes({
    '0%': {
        transform: 'scale(1)',
    },
    '50%': {
        transform: 'scale(1.05)',
    },
    '100%': {
        transform: 'scale(1)',
    },
});

export const pulseLogo = style({
    animation: `${pulseAnimation} 1.4s infinite ease-out`,
    transformOrigin: 'center',
});
