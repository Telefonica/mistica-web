import {style, keyframes} from '@vanilla-extract/css';

const fadeIn = keyframes({
    '0%': {opacity: 0},
    '100%': {opacity: 1},
});

export const wrapper = style({
    animationName: fadeIn,
    animationTimingFunction: 'ease',
    animationFillMode: 'both',
});
