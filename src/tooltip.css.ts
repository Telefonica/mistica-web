import {createVar, style} from '@vanilla-extract/css';

const top = createVar();
const left = createVar();
const delay = createVar();
const enterTransform = createVar();

export const vars = {
    top,
    left,
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
    minWidth: 40,
    maxWidth: 496,
    position: 'fixed',
});

export const tooltip = style({
    padding: 8,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
});
