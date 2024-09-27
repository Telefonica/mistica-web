import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const container = style([
    sprinkles({
        width: '100%',
        height: '100%',
    }),
    {
        display: 'grid',
    },
]);
