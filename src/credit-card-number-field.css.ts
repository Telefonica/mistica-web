import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const flip = style({
    perspective: 1000,
});

const baseIconContainer = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }),
    {
        backfaceVisibility: 'hidden',
    },
]);

export const flipFront = style([
    baseIconContainer,
    sprinkles({
        position: 'absolute',
    }),
]);

export const flipBack = style([
    baseIconContainer,
    {
        transform: 'rotateY(180deg)',
    },
]);

const flipInner = style([
    sprinkles({
        position: 'relative',
    }),
    {
        transition: 'transform 0.4s',
        transformStyle: 'preserve-3d',
    },
]);

export const variants = styleVariants({
    default: [flipInner, style({transform: 'none'})],
    backface: [flipInner, style({transform: 'rotateY(180deg)'})],
});
