import {createVar, keyframes, style} from '@vanilla-extract/css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const arrowSize = 12;
const arrowWrapperWidth = 24; // arrowSize * 2;
const arrowWrapperHeight = arrowSize;
const animationTiming = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
const transitionDurationMs = 500;

const shadowAlpha = createVar();
const enterTransform = createVar();
const enterDoneTransform = createVar();
const exitTransform = createVar();
const enterActiveAnimationName = createVar();
const arrowBoxShadow = createVar();

export const vars = {
    shadowAlpha,
    enterTransform,
    enterDoneTransform,
    exitTransform,
    enterActiveAnimationName,
    arrowBoxShadow,
};

export const fadeInBottomKeyframes = keyframes({
    from: {opacity: 0},
    '40%': {opacity: 1},
    to: {
        opacity: 1,
        transform: 'translateY(0)',
    },
});

export const fadeInTopKeyframes = keyframes({
    from: {opacity: 0},
    '40%': {opacity: 1},
    to: {
        opacity: 1,
        transform: 'translateY(-100%)',
    },
});

export const fadeInXKeyframes = keyframes({
    from: {opacity: 0},
    '40%': {opacity: 1},
    to: {
        opacity: 1,
        transform: 'translateX(0) translateY(-50%)',
    },
});

export const fadeOutKeyframes = keyframes({
    from: {opacity: 1},
    to: {opacity: 0},
});

export const arrow = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        width: arrowSize,
        height: arrowSize,
        borderRadius: 2,
        background: skinVars.colors.backgroundContainer,
        border: 'regular',
    }),
    {
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        boxShadow: arrowBoxShadow,
    },
]);

export const arrowTop = style({
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
});

export const arrowRight = style({
    right: '100%',
    top: '50%',
    transform: 'translateY(-100%) rotate(90deg)',
    transformOrigin: 'bottom',
});

export const arrowBottom = style({
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
});

export const arrowLeft = style({
    left: '100%',
    top: '50%',
    transform: 'translateY(-100%) rotate(-90deg)',
    transformOrigin: 'bottom',
});

export const arrowWrapper = sprinkles({
    position: 'absolute',
    width: arrowWrapperWidth,
    height: arrowWrapperHeight,
    overflow: 'hidden',
    color: skinVars.colors.backgroundContainer,
});

// export const wrapper = sprinkles({
//     display: 'inline-block',

// });

export const wrapper = style([
    sprinkles({
        display: 'flex',
    }),
    {
        // width: '100%'
    },
]);

export const container = style([
    sprinkles({
        position: 'absolute',
        left: 16,
        width: 'auto',
        padding: 8,
        borderRadius: skinVars.borderRadii.popup,
        border: 'regular',
        display: 'flex',
    }),
    {
        minWidth: 40,
        maxWidth: 496,
        zIndex: 50,
        boxShadow: `0 2px 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
        backgroundColor: skinVars.colors.backgroundContainer,
    },
]);

export const enter = style({
    transform: enterTransform,
});

export const enterActive = style({
    animationName: enterActiveAnimationName,
    animationFillMode: 'both',
    animationDuration: `${transitionDurationMs}ms`,
    animationTimingFunction: animationTiming,
});

export const enterDone = style({
    transform: enterDoneTransform,
});

export const exit = style({
    transform: exitTransform,
    opacity: 1,
    transition: `opacity 0.3s ${animationTiming}`,
});

export const exitActive = style({
    animation: `${fadeOutKeyframes} 0.3s ${animationTiming} both`,
});
