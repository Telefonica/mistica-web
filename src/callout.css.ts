import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const container = style([
    sprinkles({
        display: 'flex',
        borderRadius: 8,
        padding: 16,
        overflow: 'hidden',
    }),
    {
        minHeight: 56,
    },
]);

export const content = style([sprinkles({flex: 1}), {alignSelf: 'center'}]);
