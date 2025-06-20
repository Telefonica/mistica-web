import {createVar, fallbackVar, globalStyle, style} from '@vanilla-extract/css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import * as iconButtonStyles from './icon-button.css';
import {applyAlpha} from './utils/color';
import {sprinkles} from './sprinkles.css';
import {vars as responsiveLayoutVars} from './responsive-layout.css';

export const carouselComponentContainer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
    }),
]);

export const bulletButton = style([
    sprinkles({
        display: 'block',
        border: 'none',
        background: 'transparent',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 4,
                paddingRight: 4,
            },
        },
    },
]);

export const bulletVisibility = style([bulletButton, {display: 'block'}]);

export const bulletVisibilityMobile = style([
    bulletButton,
    {display: 'none'},
    {'@media': {[mq.mobile]: {display: 'block'}}},
]);

export const bulletVisibilityTablet = style([
    bulletButton,
    {display: 'none'},
    {'@media': {[mq.tablet]: {display: 'block'}}},
]);

export const bulletVisibilityDesktop = style([
    bulletButton,
    {display: 'none'},
    {'@media': {[mq.desktopOrBigger]: {display: 'block'}}},
]);

const bulletBase = style([
    sprinkles({
        borderRadius: '50%',
    }),
    {
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
    },
]);
export const bullet = style([bulletBase, sprinkles({background: skinVars.colors.control})]);
export const bulletInverse = style([bulletBase, {background: applyAlpha(skinVars.rawColors.inverse, 0.5)}]);
export const bulletActive = style([bulletBase, sprinkles({background: skinVars.colors.controlActivated})]);
export const bulletActiveInverse = style([bulletBase, sprinkles({background: skinVars.colors.inverse})]);

export const bulletInactiveSizing = style([
    sprinkles({
        width: 8,
        height: 8,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                width: 4,
                height: 4,
            },
        },
    },
]);

export const bulletActiveSizing = style([
    bulletInactiveSizing,
    {
        transform: 'scale(1.25)', // 10px

        '@media': {
            [mq.tabletOrSmaller]: {
                transform: 'scale(1.5)', // 6px
            },
        },
    },
]);

export const bulletInactiveMediumSizing = style([
    bulletInactiveSizing,
    {
        transform: 'scale(0.75)', // 6px

        '@media': {
            [mq.tabletOrSmaller]: {
                transform: 'scale(0.75)',
            },
        },
    },
]);

export const bulletInactiveSmallSizing = style([
    bulletInactiveSizing,
    {
        transform: 'scale(0.5)',

        '@media': {
            [mq.tabletOrSmaller]: {
                transform: 'scale(0.5)',
            },
        },
    },
]);

export const slideshowContainer = style([
    sprinkles({
        position: 'relative',
    }),
    {}, // needed to force vanilla extract to generate a class name (not only sprinkles)
]);

export const slideshowWithBullets = style({});

const hideScrollbar = style({
    scrollbarWidth: 'none', // Hide in FF
    '::-webkit-scrollbar': {
        display: 'none', // Hide in Chrome/Safari
    },
});

export const carouselContainer = sprinkles({
    isolation: 'isolate',
    // This minWidth value is a workaround to solve an issue when the page is rendered in a hidden webview
    // in that case the window size is reported as 0 and the scroll snap is placed at the wrong slide
    minWidth: 64,
    position: 'relative',
});

export const carouselControlsContainer = style([
    sprinkles({
        paddingTop: 8,
    }),
]);

export const carouselControlsVisibility = style({
    display: 'none',
    order: 1, // to ensure controls are always rendered after the carousel items
});
export const carouselControlsVisibilityMobile = style({
    '@media': {
        [mq.mobile]: {
            display: 'block',
        },
    },
});
export const carouselControlsVisibilityTablet = style({
    '@media': {
        [mq.tablet]: {
            display: 'block',
        },
    },
});
export const carouselControlsVisibilityDesktop = style({
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'block',
        },
    },
});

export const carouselAutoplayControlContainer = style([
    sprinkles({
        minWidth: 64,
    }),
    iconButtonStyles.bleedLeft.small,
    {
        '@media': {
            [mq.desktopOrBigger]: {
                marginLeft: 0,
            },
        },
    },
]);

export const carouselPagesControlsContainer = style([
    iconButtonStyles.bleedRight.small,
    {
        '@media': {
            [mq.desktopOrBigger]: {
                marginRight: 0,
            },
        },
    },
]);

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

export const carouselWithScrollMobile = style({
    '@media': {
        [mq.mobile]: {
            margin: `0 calc(${responsiveLayoutSideMargin} * -1)`,
        },
    },
});
export const carouselWithScrollTablet = style({
    '@media': {
        [mq.tablet]: {
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
    listStyle: 'none',
    scrollSnapAlign: 'start',
    flexShrink: 0,
    width: `calc(1 / ${itemsPerPage} * 100% + ${gap} / ${itemsPerPage} * 1px)`,
    scrollMargin: `calc(-1px * ${gap})`,
    ':first-child': {
        width: `calc(1 / ${itemsPerPage} * 100% - ${gap} * (${itemsPerPage} - 1) / ${itemsPerPage} * 1px)`,
        scrollMargin: 0,
    },
    '@media': {
        [mq.desktopOrBigger]: {
            vars: {
                [itemsPerPage]: itemsPerPageDesktop,
            },
        },
        [mq.mobile]: {
            vars: {
                [itemsPerPage]: itemsPerPageMobile,
            },
            selectors: {
                [`${carouselWithScrollMobile}:not(${centeredCarousel}) &`]: {
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage})`,
                },
                [`${carouselWithScrollMobile}:not(${centeredCarousel}) &:first-child`]: {
                    paddingLeft: responsiveLayoutSideMargin,
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage} - ${gap} * 1px + ${responsiveLayoutSideMargin})`,
                },
                [`${carouselWithScrollMobile}:not(${centeredCarousel}) &:last-child`]: {
                    paddingRight: responsiveLayoutSideMargin,
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage} + ${responsiveLayoutSideMargin})`,
                },
            },
        },
        [mq.tablet]: {
            vars: {
                [itemsPerPage]: itemsPerPageTablet,
            },
            selectors: {
                [`${carouselWithScrollTablet}:not(${centeredCarousel}) &`]: {
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage})`,
                },
                [`${carouselWithScrollTablet}:not(${centeredCarousel}) &:first-child`]: {
                    paddingLeft: responsiveLayoutSideMargin,
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage} - ${gap} * 1px + ${responsiveLayoutSideMargin})`,
                },
                [`${carouselWithScrollTablet}:not(${centeredCarousel}) &:last-child`]: {
                    paddingRight: responsiveLayoutSideMargin,
                    width: `calc(1 / ${itemsPerPage} * 100% - (2 * ${mobilePageOffset} + ${gap} * 1px) / ${itemsPerPage} + ${responsiveLayoutSideMargin})`,
                },
            },
        },
        [mq.tabletOrSmaller]: {
            scrollMargin: mobilePageOffset,

            selectors: {
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

export const carouselBullets = style([
    sprinkles({
        display: 'flex',
        paddingTop: 4,
        paddingBottom: 2,
    }),
    {
        margin: '0 -4px',
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingTop: 14,
                margin: '0 -2px', // required to align with specs at pixel perfect level
            },
        },
    },
]);

export const noCarouselBulletsDesktop = style({
    '@media': {[mq.desktopOrBigger]: {display: 'none'}},
});

export const noCarouselBulletsTablet = style({
    '@media': {[mq.tablet]: {display: 'none'}},
});

export const noCarouselBulletsMobile = style({
    '@media': {[mq.mobile]: {display: 'none'}},
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

export const slideshowControlsContainer = style([
    sprinkles({
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        display: 'flex',
        width: '100%',
        height: 32,
    }),
    {
        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
        paddingLeft: 40,
        paddingRight: 40,
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingLeft: 32,
                paddingRight: 32,
            },
            [mq.mobile]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
        },
    },
]);

export const slideshowControlsContainerSingleItem = style([
    sprinkles({
        justifyContent: 'flex-end',
    }),
]);

export const slideshowAutoplayControlContainer = style([
    sprinkles({
        minWidth: 80,
    }),
]);

export const slideshowBulletsContainer = style([
    sprinkles({
        paddingTop: 4,
        paddingLeft: 8,
        paddingRight: 8,
    }),
]);
