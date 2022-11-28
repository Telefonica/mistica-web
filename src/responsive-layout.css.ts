import {createVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

const MOBILE_SIDE_MARGIN = 16;
const TABLET_SIDE_MARGIN = 32;
const SMALL_DESKTOP_SIDE_MARGIN = 40;
const LARGE_DESKTOP_MAX_WIDTH = 1224;

const sideMargin = createVar();
export const vars = {sideMargin};

export const container = sprinkles({width: '100%'});

export const inverseBackground = sprinkles({background: skinVars.colors.backgroundBrand});

export const responsiveLayout = style({
    margin: 'auto',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',

    vars: {
        [sideMargin]: '0px',
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
                [sideMargin]: `${TABLET_SIDE_MARGIN}px`,
            },
        },
        [mq.mobile]: {
            width: `calc(100% - ${MOBILE_SIDE_MARGIN * 2}px)`,
            margin: `0 ${MOBILE_SIDE_MARGIN}px`,

            vars: {
                [sideMargin]: `${MOBILE_SIDE_MARGIN}px`,
            },
        },
    },
});

export const fullWidth = style([
    sprinkles({width: '100%'}),
    {
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
    },
]);
