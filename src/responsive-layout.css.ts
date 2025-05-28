import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

export const MOBILE_SIDE_MARGIN = 16;
export const TABLET_SIDE_MARGIN = 32;
export const SMALL_DESKTOP_SIDE_MARGIN = 48;
export const LARGE_DESKTOP_MAX_WIDTH = 1416;

const marginValue = {
    largeDesktop: `calc((100vw - ${LARGE_DESKTOP_MAX_WIDTH}px) / 2)`,
    desktop: `${SMALL_DESKTOP_SIDE_MARGIN}px`,
    tablet: `${TABLET_SIDE_MARGIN}px`,
    mobile: `${MOBILE_SIDE_MARGIN}px`,
};

const currentMargin = createVar();
const sideMargin = createVar();
export const vars = {sideMargin};

export const resetContainerMobile = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            width: 'auto',
            margin: `0 calc(-1 * ${fallbackVar(sideMargin, '0px')})`,
        },
    },
});

export const resetContainerDesktop = style({
    '@media': {
        [mq.desktopOrBigger]: {
            width: 'auto',
            margin: `0 calc(-1 * ${fallbackVar(sideMargin, '0px')})`,
        },
    },
});

export const resetMobile = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            vars: {
                [sideMargin]: '0px',
            },
        },
    },
});

export const resetDesktop = style({
    '@media': {
        [mq.desktopOrBigger]: {
            vars: {
                [sideMargin]: '0px',
            },
        },
    },
});

export const responsiveLayoutContainer = style({
    width: `calc(100% + 2 * ${fallbackVar(sideMargin, '0px')})`,
    margin: `0 calc(-1 * ${fallbackVar(sideMargin, '0px')})`,
    vars: {
        [currentMargin]: '0px',
    },
});

export const desktopContainer = style({
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

export const forcedMarginDesktopContainer = style({
    '@media': {
        [mq.largeDesktop]: {
            vars: {
                [currentMargin]: `calc(${marginValue.largeDesktop} + ${fallbackVar(sideMargin, '0px')})`,
            },
        },
        [mq.desktop]: {
            vars: {
                [currentMargin]: `calc(${marginValue.desktop} + ${fallbackVar(sideMargin, '0px')})`,
            },
        },
    },
});

export const mobileContainer = style({
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

export const forcedMarginMobileContainer = style({
    '@media': {
        [mq.tablet]: {
            vars: {
                [currentMargin]: `calc(${marginValue.tablet} + ${fallbackVar(sideMargin, '0px')})`,
            },
        },
        [mq.mobile]: {
            vars: {
                [currentMargin]: `calc(${marginValue.mobile} + ${fallbackVar(sideMargin, '0px')})`,
            },
        },
    },
});

export const backgroundVariant = {
    inverse: sprinkles({background: skinVars.colors.backgroundBrand}),
    media: sprinkles({background: 'transparent'}),
    alternative: sprinkles({background: skinVars.colors.backgroundAlternative}),
};

export const responsiveLayout = style({
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
    margin: `0 ${currentMargin}`,
    vars: {
        [sideMargin]: currentMargin,
    },
});

export const fullWidth = style([
    sprinkles({width: '100%'}),
    {
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
    },
]);
