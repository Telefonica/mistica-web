import {createVar, keyframes, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

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

export const outAnimationMs = 500;
const background = createVar();
const backgroundAnimationTiming = `${outAnimationMs}ms cubic-bezier(.1,0,.7,1)`;
const backgroundFadeIn = keyframes({
    '0%': {
        background: applyAlpha(background, 0),
    },
    '100%': {
        background: applyAlpha(background, 1),
    },
});

export const screenBackgroundAnimated = style({
    animation: `${backgroundFadeIn} ${backgroundAnimationTiming}`,
});

export const screenBackground = styleVariants({
    default: {
        vars: {
            [background]: skinVars.rawColors.background,
        },
        background: applyAlpha(background, 1),
    },
    inverse: {
        vars: {
            [background]: skinVars.rawColors.backgroundBrand,
        },
        background: applyAlpha(background, 1),
    },
});

export const screenBackgroundFadeOut = style({
    transition: `all ${backgroundAnimationTiming}`,
    background: applyAlpha(background, 0),
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

const textAnimationTiming = `${outAnimationMs}ms cubic-bezier(.1,0,.7,1)`;
const textOutStyles = {
    transform: 'translateY(50px)',
    opacity: 0,
};

const textIn = keyframes({
    '0%': textOutStyles,
    '100%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
});

export const loadingScreenTextAnimated = style({
    animation: `${textIn} ${textAnimationTiming}`,
});

export const loadingScreenTextAnimatedOut = style({
    transition: `transform ${textAnimationTiming}, opacity ${textAnimationTiming}`,
    ...textOutStyles,
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
