import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

export const textContainer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                flexDirection: 'row',
            },
        },
    },
]);
