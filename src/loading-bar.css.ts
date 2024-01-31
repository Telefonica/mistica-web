import {style, keyframes} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const TRANSITION_DURATION_MS = 400;

const enterAnimation = keyframes({
    from: {
        transform: 'translateY(-4px)',
    },
    to: {
        transform: 'translateY(0)',
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
        animation: `${enterAnimation} ${TRANSITION_DURATION_MS}ms ease-out`,
        transition: `transform ${TRANSITION_DURATION_MS}ms ease-out`,
    },
]);

export const hidden = style({
    transform: 'translateY(-4px)',
});

export const progressContainer = sprinkles({
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    background: vars.colors.loadingBar,
    height: 4,
});

const progressIndicator = keyframes({
    '0%': {
        transform: 'translateX(0%)',
    },
    '50%': {
        transform: 'translateX(100%)',
        animationTimingFunction: 'ease-out',
    },
    '100%': {
        transform: 'translateX(200%)',
        animationTimingFunction: 'ease-out',
    },
});

export const progress = style([
    sprinkles({
        position: 'absolute',
        width: '100%',
        height: '100%',
    }),
    {
        left: '-100%',
        animation: `${progressIndicator} 1.2s infinite`,
        animationDelay: `${TRANSITION_DURATION_MS}ms`,
        background: vars.colors.loadingBarBackground,
    },
]);
