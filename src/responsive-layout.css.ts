import {createVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const MOBILE_SIDE_MARGIN = 16;
const TABLET_SIDE_MARGIN = 32;
const SMALL_DESKTOP_SIDE_MARGIN = 40;
const LARGE_DESKTOP_MAX_WIDTH = 1224;

export const responsiveLayoutSideMargin = createVar();

export const container = style({
    width: '100%',
});

export const responsiveLayout = style({
    margin: 'auto',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',

    vars: {
        [responsiveLayoutSideMargin]: '0',
    },

    '@media': {
        [mq.largeDesktop]: {
            width: LARGE_DESKTOP_MAX_WIDTH,
        },
        [mq.desktop]: {
            width: `calc(100% - ${SMALL_DESKTOP_SIDE_MARGIN * 2}px)`,
            margin: `0 ${SMALL_DESKTOP_SIDE_MARGIN}px`,
        },
        [mq.tablet]: {
            width: `calc(100% - ${TABLET_SIDE_MARGIN * 2}px)`,
            margin: `0 ${TABLET_SIDE_MARGIN}px`,

            vars: {
                [responsiveLayoutSideMargin]: String(TABLET_SIDE_MARGIN),
            },
        },
        [mq.mobile]: {
            width: `calc(100% - ${MOBILE_SIDE_MARGIN * 2}px)`,
            margin: `0 ${MOBILE_SIDE_MARGIN}px`,

            vars: {
                [responsiveLayoutSideMargin]: String(MOBILE_SIDE_MARGIN),
            },
        },
    },
});

export const fullWidth = style({
    width: '100%',
    margin: 0,
    '@media': {
        [mq.largeDesktop]: {
            width: 'auto',
            margin: 'auto',
        },
    },
});
