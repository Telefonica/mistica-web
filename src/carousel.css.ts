import {createVar, globalStyle, style} from '@vanilla-extract/css';
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

export const bullet = style([bulletBase, sprinkles({backgroundColor: skinVars.colors.control})]);
export const bulletInverse = style([
    bulletBase,
    {backgroundColor: applyAlpha(skinVars.rawColors.inverse, 0.5)},
]);
export const bulletActive = style([
    bulletActiveBase,
    sprinkles({backgroundColor: skinVars.colors.controlActivated}),
]);
export const bulletActiveInverse = style([
    bulletActiveBase,
    sprinkles({backgroundColor: skinVars.colors.inverse}),
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
        backgroundColor: skinVars.colors.backgroundContainer,
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
    // This minWidth value is a workaround to solve an issue when the page is rendered in a hidden webview
    // in that case the window size is reported as 0 and the scroll snap is placed at the wrong slide
    minWidth: 64,
    position: 'relative',
});

const itemsPerPageMobile = createVar();
const itemsPerPageDesktop = createVar();
const mobilePageOffsetPrev = createVar();
const mobilePageOffsetNext = createVar();
const gap = createVar();

export const vars = {
    itemsPerPageMobile,
    itemsPerPageDesktop,
    mobilePageOffsetPrev,
    mobilePageOffsetNext,
    gap,
};

export const DEFAULT_DESKTOP_GAP = 16;
const DEFAULT_MOBILE_GAP = 8;

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
        },

        '@media': {
            [mq.desktopOrBigger]: {
                vars: {
                    [gap]: String(DEFAULT_DESKTOP_GAP),
                },
            },
        },
    },
]);

export const carouselWithScroll = style({
    margin: `0 calc(${responsiveLayoutVars.sideMargin} * -1)`,
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
        [mq.tabletOrSmaller]: {
            width: `calc(1 / ${itemsPerPageMobile} * 100% + ${gap} / ${itemsPerPageMobile} * 1px)`,

            ':first-child': {
                width: `calc(1 / ${itemsPerPageMobile} * 100% - ${gap} * (${itemsPerPageMobile} - 1) / ${itemsPerPageMobile} * 1px)`,
            },

            scrollSnapAlign: 'start',
            scrollMargin: `calc(${mobilePageOffsetPrev} * 1px)`,

            selectors: {
                [`${carouselWithScroll}:not(${centeredCarousel}) &`]: {
                    width: `calc(1 / ${itemsPerPageMobile} * 100% - (${mobilePageOffsetNext} + ${mobilePageOffsetPrev} + ${gap}) / ${itemsPerPageMobile} * 1px)`,
                },
                [`${carouselWithScroll}:not(${centeredCarousel}) &:first-child`]: {
                    paddingLeft: responsiveLayoutVars.sideMargin,
                    width: `calc(1 / ${itemsPerPageMobile} * 100% - (${mobilePageOffsetNext} + ${mobilePageOffsetPrev} + ${gap}) / ${itemsPerPageMobile} * 1px - ${gap} * 1px + ${responsiveLayoutVars.sideMargin})`,
                },
                [`${carouselWithScroll}:not(${centeredCarousel}) &:last-child`]: {
                    paddingRight: responsiveLayoutVars.sideMargin,
                    width: `calc(1 / ${itemsPerPageMobile} * 100% - (${mobilePageOffsetNext} + ${mobilePageOffsetPrev} + ${gap}) / ${itemsPerPageMobile} * 1px + ${responsiveLayoutVars.sideMargin})`,
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
                left: `calc(${responsiveLayoutVars.sideMargin} * -1)`,
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
                right: `calc(${responsiveLayoutVars.sideMargin} * -1)`,
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
                margin: `0 calc(${responsiveLayoutVars.sideMargin} * -1)`,
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

export const slideshowArrowButton = style([
    arrowButtonBase,
    sprinkles({
        border: 'none',
        position: 'absolute',
    }),
    {
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
        top: `calc(50% - ${arrowButtonSize / 2}px)`,
    },
]);

export const slideshowPrevArrowButton = style([
    slideshowArrowButton,
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
    slideshowArrowButton,
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
