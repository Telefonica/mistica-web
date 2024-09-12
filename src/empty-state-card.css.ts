import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';

export const container = style({
    '@media': {
        [mq.desktopOrBigger]: {
            maxWidth: 392,
        },
    },
});

export const image = style([
    sprinkles({
        display: 'block', // to avoid letter's descenders bottom space
        height: 64,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                height: 80,
            },
        },
    },
]);

export const assetContainer = style([
    sprinkles({
        width: 48,
        height: 48,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                width: 56,
                height: 56,
            },
        },
    },
]);
