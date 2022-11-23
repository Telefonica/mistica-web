import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const flip = style({
    perspective: 1000,
});

export const flipFront = sprinkles({position: 'absolute'});

export const flipBack = style({
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
});

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
