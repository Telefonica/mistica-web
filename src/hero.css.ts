import {createVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';

const height = createVar();

export const vars = {height};

export const container = style([
    sprinkles({display: 'flex'}),
    {
        height,
    },
]);

export const containerMinHeight = style({
    minHeight: 400,
    '@media': {
        [mq.desktopOrBigger]: {
            minHeight: 460,
        },
    },
});

export const containerMobile = sprinkles({flexDirection: 'column'});

export const containerDesktop = sprinkles({alignItems: 'center', height: '100%'});

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 24},
]);

export const layout = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
    },
});

export const expandedContent = style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});
