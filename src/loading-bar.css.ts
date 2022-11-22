import {style, keyframes} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const TRANSITION_DURATION_MS = 400;

const progressIndicator = keyframes({
    '0%': {
        transform: 'translateX(0%)',
    },
    '100%': {
        transform: 'translateX(150%)',
    },
});

const innerProgressIndicator = keyframes({
    '0%': {
        transform: 'scaleX(0.1)',
    },
    '20%': {
        transform: 'scaleX(0.35)',
    },
    '50%': {
        transform: 'scaleX(0.7)',
    },
    '100%': {
        transform: 'scaleX(0.8)',
    },
});

export const portal = style([
    sprinkles({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
    }),
    {
        zIndex: 9999,
    },
]);

export const progressContainer = sprinkles({
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: vars.colors.loadingBarBackground,
    height: 4,
});

export const progress = style([
    sprinkles({
        position: 'absolute',
        height: '100%',
        width: '100%',
    }),
    {
        left: '-55%',
        animation: `${progressIndicator} 1.2s ease-out infinite`,
        animationDelay: String(TRANSITION_DURATION_MS),
        backgroundColor: vars.colors.loadingBar,
    },
]);

export const innerProgress = style([
    sprinkles({
        height: '100%',
    }),
    {
        transform: 'scaleX(0.1)',
        animation: `${innerProgressIndicator} 1.2s ease-out infinite`,
        animationDelay: String(TRANSITION_DURATION_MS),
    },
]);

export const enter = style({
    transition: `${TRANSITION_DURATION_MS}ms ease-out`,
    transform: 'translateY(-4px)',
});

export const enterActive = style({
    transform: 'translateY(0)',
});

export const exit = style({
    transform: 'translateY(0)',
    transition: `${TRANSITION_DURATION_MS}ms ease-out`,
});

export const exitActive = style({
    transform: 'translateY(-4px)',
});
