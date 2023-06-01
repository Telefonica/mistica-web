import {sprinkles} from './sprinkles.css';
import {style} from '@vanilla-extract/css';

export const moreItems = style([
    sprinkles({
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    {
        boxSizing: 'border-box',
        zIndex: 1,
    },
]);
