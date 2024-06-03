import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const circle = style([
    {
        boxSizing: 'border-box',
    },
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    }),
]);
