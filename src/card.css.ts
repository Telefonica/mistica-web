import {createVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {iconContainerSize} from './icon-button.css';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 16},
]);

export const touchable = style([
    sprinkles({display: 'flex', position: 'relative'}),
    {
        minHeight: '100%',
        width: '100%',
        isolation: 'isolate', // Needed to preserve border-radius with Video component and Safari
        padding: 0,
        border: 'none',
        background: 'transparent',
    },
]);

export const cardContentContainer = sprinkles({
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
});

export const touchableContainer = style({});

export const boxed = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
});

const touchableCardOverlayBase = style({
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
});

export const touchableMediaCardOverlay = style([
    touchableCardOverlayBase,
    {
        zIndex: 2,
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            [`${touchable}:active &`]: {
                backgroundColor: skinVars.colors.backgroundContainerPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: skinVars.colors.backgroundContainerHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: skinVars.colors.backgroundContainerPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const circularMediaOverlay = style({});

export const touchableNakedMediaOverlay = style([
    touchableCardOverlayBase,
    {
        zIndex: 2,
        borderRadius: skinVars.borderRadii.container,
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            [`${circularMediaOverlay}&`]: {
                borderRadius: '50%',
            },
            [`${touchable}:active &`]: {
                backgroundColor: skinVars.colors.coverBackgroundPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: skinVars.colors.coverBackgroundHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: skinVars.colors.coverBackgroundPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const touchableCardOverlay = style([
    touchableCardOverlayBase,
    {
        zIndex: 1,
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            [`${touchable}:active &`]: {
                backgroundColor: skinVars.colors.backgroundContainerPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: skinVars.colors.backgroundContainerHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: skinVars.colors.backgroundContainerPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const touchableCardOverlayInverse = style([
    touchableCardOverlayBase,
    {
        zIndex: 1,
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            [`${touchable}:active &`]: {
                backgroundColor: skinVars.colors.backgroundContainerBrandPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: skinVars.colors.backgroundContainerBrandHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: skinVars.colors.backgroundContainerBrandPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const touchableCardOverlayMedia = style([
    touchableCardOverlayBase,
    {
        zIndex: 1,
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            [`${touchable}:active &`]: {
                backgroundColor: skinVars.colors.coverBackgroundPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: skinVars.colors.coverBackgroundHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: skinVars.colors.coverBackgroundPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const mediaCard = sprinkles({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    flex: 1,
});

export const mediaCardContent = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        position: 'relative',
        paddingX: 16,
        paddingTop: 16,
        paddingBottom: 24,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    {
        zIndex: 3,
        '@media': {
            [mq.desktopOrBigger]: {
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 24,
                paddingBottom: 32,
            },
        },
    },
]);

export const mediaCardAsset = style([
    sprinkles({
        paddingLeft: {mobile: 16, desktop: 24},
        paddingTop: {mobile: 16, desktop: 24},
    }),
    {
        position: 'absolute',
        zIndex: 1,
    },
]);

export const nakedCardContent = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: 16,
    }),
    {
        transition: 'opacity 0.1s ease-in-out',
        selectors: {
            [`${touchableContainer} ${touchable}:active &`]: {
                transitionDuration: '0.1s',
                opacity: 0.6,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        opacity: 0.8,
                    },
                    [`${touchableContainer} ${touchable}:active &`]: {
                        transitionDuration: '0.1s',
                        opacity: 0.6,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
            [mq.desktopOrBigger]: {
                paddingRight: 8,
            },
        },
    },
]);

export const dataCard = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        position: 'relative',
        paddingY: 24,
        paddingX: 16,
        flexDirection: 'column',
        width: '100%',
    }),
    {
        zIndex: 2,
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 32,
                paddingBottom: 32,
                paddingLeft: 24,
                paddingRight: 24,
            },
        },
    },
]);

export const snapCard = style([
    sprinkles({
        display: 'flex',
        position: 'relative',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        flex: 1,
    }),
    {
        minHeight: 80,
        zIndex: 2,
        '@media': {
            [mq.desktopOrBigger]: {
                padding: 24,
            },
        },
    },
]);

const snapCardTouchableBase = sprinkles({
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: 0,
    border: 'none',
    background: 'transparent',
});

export const snapCardTouchableHover = style([
    snapCardTouchableBase,
    {
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    backgroundColor: skinVars.colors.backgroundAlternative,
                },
            },
        },
    },
]);

export const displayCardContainer = sprinkles({
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
});

export const displayCardContent = style({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
    zIndex: 2,
});

export const displayCardContentWithTopContent = sprinkles({paddingTop: 24});
export const displayCardContentWithAsset = sprinkles({paddingTop: {mobile: 16, desktop: 24}});

export const displayCardBackground = style({
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    zIndex: 0,
});

export const displayCardContentWrapper = sprinkles({paddingX: 24, paddingBottom: 24});

export const displayCardGradient = style([
    sprinkles({paddingTop: 40}),
    {
        background: skinVars.colors.cardContentOverlay,
    },
]);

export const posterCardContentWrapper = sprinkles({
    paddingX: {mobile: 16, desktop: 24},
    paddingBottom: 24,
});

const aspectRatio = createVar();
const topActionsCount = createVar();

export const vars = {aspectRatio, topActionsCount};

export const cardContainer = style({
    position: 'relative',
    display: 'flex',
    ':before': {
        float: 'left',
        content: '""',
        paddingTop: `calc(100% / ${aspectRatio})`,
    },
    ':after': {
        display: 'block',
        content: '""',
        clear: 'both',
    },
});

export const dataCardTopActionsWithoutIcon = style({
    /** Move the div to match the card border, ignoring content's padding. We add one extra pixel because of border's width */
    marginRight: -17,
    marginTop: -9,
    width: `calc((${iconContainerSize.small} + 16px) * ${topActionsCount})`,

    '@media': {
        [mq.desktopOrBigger]: {
            marginRight: -25,
            marginTop: -17,
        },
    },
});

export const flexColumn = sprinkles({
    display: 'flex',
    flexDirection: 'column',
});
