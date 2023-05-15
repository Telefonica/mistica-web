import {sprinkles} from './sprinkles.css';
import {style} from '@vanilla-extract/css';

export const column = sprinkles({
    display: 'flex',
    flexDirection: 'column',
});

export const container = style([
    sprinkles({display: 'flex', justifyContent: 'space-between', position: 'relative'}),
]);

export const secundaryContainer = style([
    {
        paddingLeft: 32,
        textAlign: 'right',
    },
]);
