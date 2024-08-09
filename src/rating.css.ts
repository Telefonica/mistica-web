import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const halfIconContainer = sprinkles({
    position: 'relative',
});

export const halfIconInactive = sprinkles({
    position: 'absolute',
});

export const halfIconActive = style([
    sprinkles({
        position: 'relative',
    }),
    {
        clipPath: 'rect(0 50% 100% 0)',
        WebkitClipPath: 'rect(0 50% 100% 0)',
    },
]);

export const disabled = style({
    opacity: 0.5,
});

export const touchable = style({
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    selectors: {
        '&:not([disabled]):active': {
            transform: 'scale(1.2)',
        },
    },
});
