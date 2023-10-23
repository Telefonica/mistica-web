import {createVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

export const MOBILE_SIDE_MARGIN = 16;
export const TABLET_SIDE_MARGIN = 32;
export const SMALL_DESKTOP_SIDE_MARGIN = 40;
export const LARGE_DESKTOP_MAX_WIDTH = 1224;

const sideMargin = createVar();
export const vars = {sideMargin};

export const responsiveLayoutContainer = style([
    sprinkles({width: '100%'}),
    {
        vars: {
            [sideMargin]: '0px',
        },
        '@media': {
            [mq.desktopOrBigger]: {
                vars: {
                    [sideMargin]: `${SMALL_DESKTOP_SIDE_MARGIN}px`,
                },
            },
            [mq.tablet]: {
                vars: {
                    [sideMargin]: `${TABLET_SIDE_MARGIN}px`,
                },
            },
            [mq.mobile]: {
                vars: {
                    [sideMargin]: `${MOBILE_SIDE_MARGIN}px`,
                },
            },
        },
    },
]);

export const expandedResponsiveLayoutContainer = style([
    {
        selectors: {
            '& &': {
                width: 'auto',
                margin: `0 calc(-1 * ${sideMargin})`,
                '@media': {
                    [mq.largeDesktop]: {
                        margin: `0 calc(-1 * (100vw - ${LARGE_DESKTOP_MAX_WIDTH}px) / 2)`,
                    },
                },
            },
        },
    },
]);

export const fullwidthContainer = style([
    {
        vars: {
            [sideMargin]: '0px',
        },
    },
]);

export const backgroundVariant = {
    inverse: sprinkles({background: skinVars.colors.backgroundBrand}),
    alternative: sprinkles({background: skinVars.colors.backgroundAlternative}),
};

export const responsiveLayout = style({
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',

    margin: `0 ${sideMargin}`,
});

export const expandedResponsiveLayout = style({
    '@media': {
        [mq.largeDesktop]: {
            margin: `0 calc((100vw - ${LARGE_DESKTOP_MAX_WIDTH}px) / 2)`,
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
