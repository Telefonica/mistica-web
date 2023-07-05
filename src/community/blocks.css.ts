import {style} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';

export const column = sprinkles({
    display: 'flex',
    flexDirection: 'column',
});

export const rightContent = style({
    paddingLeft: 32,
    textAlign: 'right',
});
