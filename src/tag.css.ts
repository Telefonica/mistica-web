import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const tag = style([
    sprinkles({
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 56,
        paddingY: 4,
        paddingRight: 12,
    }),
    {
        verticalAlign: 'middle',
        borderRadius: 50,
    },
]);
