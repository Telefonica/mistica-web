import {createVar, style, fallbackVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';

const height = createVar();

export const vars = {height};

export const container = style([
    sprinkles({display: 'flex'}),
    {
        minHeight: 400,
        height: fallbackVar(height, '100%'),
        '@media': {
            [mq.desktopOrBigger]: {
                minHeight: 460,
                height: fallbackVar(height, '100%'),
            },
        },
    },
]);

export const containerMobile = sprinkles({flexDirection: 'column'});

export const containerDesktop = sprinkles({alignItems: 'center', height: '100%'});
