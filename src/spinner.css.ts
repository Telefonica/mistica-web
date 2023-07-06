import {keyframes, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

const rotatorKeyframes = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(270deg)',
    },
});

const dashKeyframes = keyframes({
    '0%': {
        strokeDashoffset: 187,
    },
    '50%': {
        strokeDashoffset: 46.75,
        transform: 'rotate(135deg)',
    },
    '100%': {
        strokeDashoffset: 187,
        transform: 'rotate(450deg)',
    },
});

const spinnerIosKeyframes = keyframes({
    '0%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    },
});

export const spinnerDefault = style([
    sprinkles({flexShrink: 0, display: 'block'}),
    {
        animation: `${rotatorKeyframes} 1.4s linear infinite`,
    },
]);

export const spinnerDefaultPath = style({
    strokeDasharray: 187,
    strokeDashoffset: 0,
    transformOrigin: 'center',
    animation: `${dashKeyframes} 1.4s ease-in-out infinite`,
});

export const spinnerIos = sprinkles({
    flexShrink: 0,
    display: 'block',
});

export const spinnerIosSvgPath = style({
    animation: `${spinnerIosKeyframes} 1s infinite linear`,
    selectors: {
        '&:nth-of-type(2)': {animationDelay: '-.880s'},
        '&:nth-of-type(3)': {animationDelay: '-.750s'},
        '&:nth-of-type(4)': {animationDelay: '-.625s'},
        '&:nth-of-type(5)': {animationDelay: '-.500s'},
        '&:nth-of-type(6)': {animationDelay: '-.375s'},
        '&:nth-of-type(7)': {animationDelay: '-.250s'},
        '&:nth-of-type(8)': {animationDelay: '-.125s'},
    },
});
