import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const avatar = sprinkles({
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
});

export const image = style({
    objectFit: 'cover',
});
