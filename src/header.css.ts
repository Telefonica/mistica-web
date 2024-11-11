import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';

export const hideOnTabletOrSmaller = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'none',
        },
    },
});
export const breadcrumbs = style([
    hideOnTabletOrSmaller,
    sprinkles({
        paddingBottom: {desktop: 32},
    }),
]);

export const hideOnDesktop = style({
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'none',
        },
    },
});

export const flexColumn = sprinkles({
    display: 'flex',
    flexDirection: 'column',
});
