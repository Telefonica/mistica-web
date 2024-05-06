import {createVar, style} from '@vanilla-extract/css';

const transitionDuration = createVar();

export const vars = {transitionDuration};

export const chevronRotateTransition = style({
    transition: `transform ${transitionDuration}`,
    '@media': {
        ['(prefers-reduced-motion)']: {
            transition: 'none',
        },
    },
});

export const chevronColorTransition = style({
    transition: `fill ${transitionDuration}`,
    '@media': {
        ['(prefers-reduced-motion)']: {
            transition: 'none',
        },
    },
});
