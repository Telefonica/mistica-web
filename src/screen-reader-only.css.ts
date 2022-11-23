import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';

export const screenReaderOnly = style([
    sprinkles({
        position: 'absolute',
        padding: 0,
        overflow: 'hidden',
        border: 'none',
    }),
    {
        margin: -1,
        width: 1,
        height: 1,
        clip: 'rect(0, 0, 0, 0)',
        userSelect: 'none',
    },
]);
