import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

export const MOBILE_SIDE_MARGIN = 16;
export const TABLET_SIDE_MARGIN = 32;
export const SMALL_DESKTOP_SIDE_MARGIN = 40;
export const LARGE_DESKTOP_MAX_WIDTH = 1224;

const marginValue = {
    largeDesktop: `calc((100vw - ${LARGE_DESKTOP_MAX_WIDTH}px) / 2)`,
    desktop: `${SMALL_DESKTOP_SIDE_MARGIN}px`,
    tablet: `${TABLET_SIDE_MARGIN}px`,
    mobile: `${MOBILE_SIDE_MARGIN}px`,
};

const prevSideMargin = createVar();
const currentMargin = createVar();
const sideMargin = createVar();
export const vars = {sideMargin};

export const responsiveLayoutContainer = style([
    sprinkles({width: '100%'}),
    {
        vars: {
            [currentMargin]: '0px',
            [prevSideMargin]: fallbackVar(sideMargin, '0px'),
        },
    },
]);

export const desktopContainer = style({
    '@media': {
        [mq.largeDesktop]: {
            vars: {
                [currentMargin]: `calc(${marginValue.largeDesktop} - ${prevSideMargin})`,
            },
        },
        [mq.desktop]: {
            vars: {
                [currentMargin]: `calc(${marginValue.desktop} - ${prevSideMargin})`,
            },
        },
    },
});

export const forcedMarginDesktopContainer = style({
    '@media': {
        [mq.largeDesktop]: {
            vars: {
                [currentMargin]: marginValue.largeDesktop,
            },
        },
        [mq.desktop]: {
            vars: {
                [currentMargin]: marginValue.desktop,
            },
        },
    },
});

export const mobileContainer = style({
    '@media': {
        [mq.tablet]: {
            vars: {
                [currentMargin]: `calc(${marginValue.tablet} - ${prevSideMargin})`,
            },
        },
        [mq.mobile]: {
            vars: {
                [currentMargin]: `calc(${marginValue.mobile} - ${prevSideMargin})`,
            },
        },
    },
});

export const forcedMarginMobileContainer = style({
    '@media': {
        [mq.tablet]: {
            vars: {
                [currentMargin]: marginValue.tablet,
            },
        },
        [mq.mobile]: {
            vars: {
                [currentMargin]: marginValue.mobile,
            },
        },
    },
});

export const backgroundVariant = {
    inverse: sprinkles({background: skinVars.colors.backgroundBrand}),
    alternative: sprinkles({background: skinVars.colors.backgroundAlternative}),
};

export const responsiveLayout = style({
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
    margin: `0 ${currentMargin}`,
    vars: {
        [sideMargin]: `calc(${prevSideMargin} + ${currentMargin})`,
    },
});

export const fullWidth = style([
    sprinkles({width: '100%'}),
    {
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
    },
]);

export const resetMargin = style({
    width: 'auto',
    margin: `0 calc(-1 * ${fallbackVar(sideMargin, '0px')})`,
});

export const resetVars = style({
    vars: {
        [sideMargin]: '0px',
    },
});
