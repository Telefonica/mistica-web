import {createVar, style} from '@vanilla-extract/css';

const top = createVar();
const left = createVar();
const padding = createVar();
const delay = createVar();
const enterTransform = createVar();

export const tooltipVars = {
    top,
    left,
    padding,
    delay,
    enterTransform,
};

export const tooltipTransitionClasses = {
    enter: style({
        opacity: 0,
        transform: enterTransform,
    }),
    enterActive: style({
        opacity: 1,
        transform: 'translateY(0)',
        transition: `opacity .3s linear ${delay},transform .5s cubic-bezier(0.215,0.61,0.335,1) ${delay}`,
    }),
    exit: style({
        opacity: 1,
    }),
    exitActive: style({
        opacity: 0,
        transition: `opacity .3s linear`,
    }),
};

export const container = style({
    top,
    left,
    zIndex: 10000,
    position: 'fixed',
    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
    padding,
    minWidth: 40,
    maxWidth: 496,
});

export const tooltip = style({
    padding: 8,
    position: 'relative',
});
