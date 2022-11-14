import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const FADE_IN_DURATION_MS = 300;

export const image = style([
    sprinkles({top: 0, left: 0, display: 'block', width: '100%', height: '100%'}),
    {
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
        zIndex: 1,
        transition: `opacity ${FADE_IN_DURATION_MS}ms`,
    },
]);

export const noBorder = style({
    borderRadius: 0,
});
