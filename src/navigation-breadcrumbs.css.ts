import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 16},
]);

export const link = style({
    ':hover': {
        textDecoration: 'underline',
    },
});

export const current = style({
    textDecoration: 'none',
    pointerEvents: 'none',
});

export const list = style([sprinkles({padding: 0}), {margin: 0, listStyleType: 'none'}]);

export const listItem = sprinkles({display: 'inline'});
