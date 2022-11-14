import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const video = style([
    sprinkles({display: 'block', width: '100%', height: '100%'}),
    {
        background: 'transparent',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '100%',
    },
]);
