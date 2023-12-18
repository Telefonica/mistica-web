import {createVar, fallbackVar, globalStyle, style} from '@vanilla-extract/css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {applyAlpha} from './utils/color';
import {sprinkles} from './sprinkles.css';
import {vars as responsiveLayoutVars} from './responsive-layout.css';
import {desktopMediumColumn, desktopSmallColumn} from './grid-layout.css';

const bulletBase = style([
    sprinkles({
        width: 8,
        height: 8,
        borderRadius: '50%',
    }),
    {
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown

        '@media': {
            [mq.tabletOrSmaller]: {
                width: 4,
                height: 4,
            },
        },
    },
]);

const bulletActiveBase = style([
    bulletBase,
    {
        transform: 'scale(1.25)', // 10px

        '@media': {
            [mq.tabletOrSmaller]: {
                transform: 'scale(1.5)', // 6px
            },
        },
    },
]);

export const bullet = style([bulletBase, sprinkles({background: skinVars.colors.control})]);
export const bulletInverse = style([bulletBase, {background: applyAlpha(skinVars.rawColors.inverse, 0.5)}]);
export const bulletActive = style([
    bulletActiveBase,
    sprinkles({background: skinVars.colors.controlActivated}),
]);
export const bulletActiveInverse = style([
    bulletActiveBase,
    sprinkles({background: skinVars.colors.inverse}),
]);

const arrowButtonSize = 40;
export const slideshowContainer = sprinkles({
    position: 'relative',
});

const hideScrollbar = style({
    scrollbarWidth: 'none', // Hide in FF
    '::-webkit-scrollbar': {
        display: 'none', // Hide in Chrome/Safari
    },
});

const arrowButtonBase = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: skinVars.colors.backgroundContainer,
        width: arrowButtonSize,
        height: arrowButtonSize,
    }),
    {
        transition: 'opacity 0.2s',
        selectors: {
            '&[disabled]': {
                opacity: 0,
            },
        },
        '@media': {
            // don't show carrousel arrow buttons in touch devices, just regular horizontal scroll
            [mq.touchableOnly]: {
                display: 'none',
            },
        },
    },
]);

export const carouselContainer = sprinkles({
    isolation: 'isolate',
    // This minWidth value is a workaround to solve an issue when the page is rendered in a hidden webview
    // in that case the window size is reported as 0 and the scroll snap is placed at the wrong slide
    minWidth: 64,
    position: 'relative',
});

const itemsPerPage = createVar();
const itemsPerPageMobile = createVar();
const itemsPerPageTablet = createVar();
const itemsPerPageDesktop = createVar();
const gap = createVar();
const mobilePageOffset = createVar();

export const vars = {
    itemsPerPageMobile,
    itemsPerPageTablet,
    itemsPerPageDesktop,
    gap,
    mobilePageOffset,
};

export const DEFAULT_DESKTOP_GAP = 16;
const DEFAULT_MOBILE_GAP = 8;
const DEFAULT_MOBILE_PAGE_OFFSET = '24px';
const DEFAULT_TABLET_PAGE_OFFSET = '36px';

export const carousel = style([
    hideScrollbar,
    sprinkles({
        display: 'flex',
        minWidth: '100%',
    }),
    {
        overflowX: 'auto',

        vars: {
            [gap]: String(DEFAULT_MOBILE_GAP),
            [mobilePageOffset]: DEFAULT_MOBILE_PAGE_OFFSET,
        },

        '@media': {
            [mq.tablet]: {
                vars: {
                    [mobilePageOffset]: DEFAULT_TABLET_PAGE_OFFSET,
                },
            },
            [mq.desktopOrBigger]: {
                vars: {
                    [gap]: String(DEFAULT_DESKTOP_GAP),
                },
            },
        },
    },
]);

const responsiveLayoutSideMargin = fallbackVar(responsiveLayoutVars.sideMargin, '0px');

export const carouselWithScroll = style({
    margin: 0,
    '@media': {
        [mq.tabletOrSmaller]: {
            margin: `0 calc(${responsiveLayoutSideMargin} * -1)`,
        },
    },
});

export const centeredCarousel = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            ':before': {
                content: '""',
                flexShrink: 0,
                display: 'block',
                width: '25%',
            },
            ':after': {
                content: '""',
                flexShrink: 0,
                display: 'block',
                width: '25%',
            },
        },
    },
});

export const carouselItem = style({
    scrollSnapAlign: 'start',
    flexShrink: 0,
    width: `calc(1 / ${itemsPerPageDesktop} * 100% + ${gap} / ${itemsPerPageDesktop} * 1px)`,
    scrollMargin: `calc(-1px * ${gap})`,
    ':first-child': {
        width: `calc(1 / ${itemsPerPageDesktop} * 100% - (${gap} * (${itemsPerPageDesktop} - 1)) / ${itemsPerPageDesktop} * 1px)`,
        scrollMargin: 0,
    },
    '@media': {
        [mq.mobile]: {
            vars: {
                [itemsPerPage]: itemsPerPageMobile,
            },
        },
        [mq.tablet]: {
            vars: {
                [itemsPerPage]: itemsPerPageTablet,
            },
        },
        [mq.tabletOrSmaller]: {
            width: `calc(1 / ${itemsPerPage} * 100% + ${gap} / ${itemsPerPage} * 1px)`,

            ':first-child': {
                width: `calc(1 / ${itemsPerPage} * 100% - ${gap} * (${itemsPerPage} - 1) / ${itemsPerPage} * 1px)`,
            },

            scrollSnapAlign: 'start',
            scrollMargin: mobilePageOffset,

            selectors: {
                [`${carouselWithScroll}:not(${centeredCarousel}) &`]: {
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage})`,
                },
                [`${carouselWithScroll}:not(${centeredCarousel}) &:first-child`]: {
                    paddingLeft: responsiveLayoutSideMargin,
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage} - ${gap} * 1px + ${responsiveLayoutSideMargin})`,
                },
                [`${carouselWithScroll}:not(${centeredCarousel}) &:last-child`]: {
                    paddingRight: responsiveLayoutSideMargin,
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage} + ${responsiveLayoutSideMargin})`,
                },
                [`${centeredCarousel} &`]: {
                    width: '50%',
                    scrollSnapAlign: 'center',
                    scrollMargin: 0,
                },
            },
        },
    },
    ':empty': {
        display: 'none',
    },
});

globalStyle(`${carouselItem}:not(:empty) ~ ${carouselItem}:not(:empty)`, {
    paddingLeft: `calc(${gap} * 1px)`,
});

export const carouselArrowButton = style([
    arrowButtonBase,
    sprinkles({
        border: 'regular',
        position: 'absolute',
    }),
    {
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
        top: `calc(50% - ${arrowButtonSize / 2}px)`,
    },
]);

export const carouselPrevArrowButton = style([
    carouselArrowButton,
    {
        left: -arrowButtonSize / 2,
        '@media': {
            [mq.tabletOrSmaller]: {
                left: `calc(${responsiveLayoutSideMargin} * -1)`,
            },
            [mq.largeDesktop]: {
                left: -(24 + arrowButtonSize),
            },
        },
        selectors: {
            [`${desktopSmallColumn} &`]: {
                left: -arrowButtonSize / 2,
            },
            [`${desktopMediumColumn} &`]: {
                left: -arrowButtonSize / 2,
            },
        },
    },
]);

export const carouselNextArrowButton = style([
    carouselArrowButton,
    {
        right: -arrowButtonSize / 2,
        '@media': {
            [mq.tabletOrSmaller]: {
                right: `calc(${responsiveLayoutSideMargin} * -1)`,
            },
            [mq.largeDesktop]: {
                right: -(24 + arrowButtonSize),
            },
        },
        selectors: {
            [`${desktopSmallColumn} &`]: {
                right: -arrowButtonSize / 2,
            },
            [`${desktopMediumColumn} &`]: {
                right: -arrowButtonSize / 2,
            },
        },
    },
]);

export const carouselBullets = sprinkles({
    display: 'flex',
    justifyContent: 'center',
});

export const slideshow = style([
    hideScrollbar,
    sprinkles({
        display: 'flex',
        minWidth: '100%',
    }),
    {
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        '@media': {
            [mq.tabletOrSmaller]: {
                margin: `0 calc(${responsiveLayoutSideMargin} * -1)`,
            },
        },
    },
]);

export const slideshowItem = style([
    sprinkles({
        width: '100%',
        flexShrink: 0,
    }),
    {
        scrollSnapAlign: 'start',
    },
]);

export const slideshowPrevArrowButton = style([
    carouselArrowButton,
    sprinkles({left: 24}),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                left: 0,
            },
        },
    },
]);

export const slideshowNextArrowButton = style([
    carouselArrowButton,
    sprinkles({right: 24}),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                right: 0,
            },
        },
    },
]);

export const slideshowBullets = style([
    sprinkles({
        position: 'absolute',
        bottom: 24,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    }),
    {
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
    },
]);
