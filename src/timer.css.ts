import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const timerWrapper = style([
    sprinkles({
        display: 'inline-block',
    }),
    {
        textDecoration: 'inherit',
    },
]);

export const content = style([
    sprinkles({
        display: 'inline-flex',
    }),
    {
        flexWrap: 'wrap',
        whiteSpace: 'break-spaces',
        textDecoration: 'inherit',
    },
]);

export const unitContainer = sprinkles({
    display: 'flex',
    justifyContent: 'center',
});
