import {style, keyframes} from '@vanilla-extract/css';

const shake = keyframes({
    '10%, 90%': {
        transform: 'translate(3px, 0)',
    },
    '20%, 80%': {
        transform: 'translate(6px, 0)',
    },

    '30%, 50%, 70%': {
        transform: 'translate(0px, 0)',
    },

    '40%, 60%': {
        transform: 'translate(8px, 0)',
    },
});

export const outerAnimation = style({
    animation: `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`,
    animationDelay: '0.84s',
});
export const innerAnimation = style({
    animation: `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`,
    animationDelay: '0.8s',
});
