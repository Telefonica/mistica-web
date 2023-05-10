import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const base = style([
    sprinkles({
        display: 'inline-block',
    }),
    {
        border: 0,
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
    },
]);
