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
        opacity: 0.2,
    },
});

export const spinnerDefault = style([
    sprinkles({flexShrink: 0}),
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
});

export const spinnerIosSvgPath = style({
    animation: `${spinnerIosKeyframes} 1s infinite linear`,
    selectors: {
        '&:nth-of-type(2)': {animationDelay: '-.080s'},
        '&:nth-of-type(3)': {animationDelay: '-.160s'},
        '&:nth-of-type(4)': {animationDelay: '-.240s'},
        '&:nth-of-type(5)': {animationDelay: '-.320s'},
        '&:nth-of-type(6)': {animationDelay: '-.400s'},
        '&:nth-of-type(7)': {animationDelay: '-.480s'},
        '&:nth-of-type(8)': {animationDelay: '-.560s'},
        '&:nth-of-type(9)': {animationDelay: '-.640s'},
        '&:nth-of-type(10)': {animationDelay: '-.720s'},
        '&:nth-of-type(11)': {animationDelay: '-.800s'},
        '&:nth-of-type(12)': {animationDelay: '-.880s'},
    },
});
