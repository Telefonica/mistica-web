import {style, keyframes} from '@vanilla-extract/css';

const fadeIn = keyframes({
    '0%': {opacity: 1},
    '100%': {opacity: 0},
});

export const wrapper = style({
    animationName: fadeIn,
    animationTimingFunction: 'ease',
    animationFillMode: 'both',
});
