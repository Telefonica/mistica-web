import {sprinkles} from './sprinkles.css';
import {style} from '@vanilla-extract/css';

export const column = sprinkles({
    display: 'flex',
    flexDirection: 'column',
});

export const container = style([
    {
        paddingLeft: 32,
        textAlign: 'right',
    },
]);
