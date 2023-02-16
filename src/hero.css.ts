import {createVar, style, fallbackVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {
    LARGE_DESKTOP_MAX_WIDTH,
    MOBILE_SIDE_MARGIN,
    SMALL_DESKTOP_SIDE_MARGIN,
    TABLET_SIDE_MARGIN,
} from './responsive-layout.css';

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

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 24},
]);

export const layout = style([
    {
        margin: 'auto',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',

        '@media': {
            [mq.largeDesktop]: {
                width: LARGE_DESKTOP_MAX_WIDTH,
            },
            [mq.desktop]: {
                width: `calc(100% - ${SMALL_DESKTOP_SIDE_MARGIN * 2}px)`,
                margin: `0 ${SMALL_DESKTOP_SIDE_MARGIN}px`,
            },
            [mq.tablet]: {
                display: 'flex',
                flex: 1,
                width: `calc(100% - ${TABLET_SIDE_MARGIN * 2}px)`,
                margin: `0 ${TABLET_SIDE_MARGIN}px`,
            },
            [mq.mobile]: {
                display: 'flex',
                flex: 1,
                width: `calc(100% - ${MOBILE_SIDE_MARGIN * 2}px)`,
                margin: `0 ${MOBILE_SIDE_MARGIN}px`,
            },
        },
    },
]);
