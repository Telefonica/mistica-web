import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';

import type {PadSize} from './box';

export const TABLET_SIDE_MARGIN: PadSize = 32;
export const LARGE_DESKTOP_SIDE_MARGIN: PadSize = 64;
export const EXTRA_LARGE_DESKTOP_MAX_WIDTH = 1704;

const marginValue = {
    extraLargeDesktop: `calc((100vw - ${EXTRA_LARGE_DESKTOP_MAX_WIDTH}px) / 2)`,
    largeDesktop: `${LARGE_DESKTOP_SIDE_MARGIN}px`,
    desktop: skinVars.spacing.responsiveLayoutMargin,
    tablet: `${TABLET_SIDE_MARGIN}px`,
    mobile: skinVars.spacing.responsiveLayoutMargin,
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
        [mq.extraLargeDesktop]: {
            vars: {
                [currentMargin]: marginValue.extraLargeDesktop,
            },
        },
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
        [mq.extraLargeDesktop]: {
            vars: {
                [currentMargin]: `calc(${marginValue.extraLargeDesktop} + ${fallbackVar(sideMargin, '0px')})`,
            },
        },
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
    brand: sprinkles({background: skinVars.colors.backgroundBrand}),
    negative: sprinkles({background: skinVars.colors.backgroundNegative}),
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
