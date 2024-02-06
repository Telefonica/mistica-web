import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

export const boxBorder = sprinkles({
    border: 'regular',
});

export const desktopOnly = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            border: 'none',
            borderRadius: 0,
            background: 'initial',
        },
    },
});
