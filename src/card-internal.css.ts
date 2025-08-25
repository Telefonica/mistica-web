import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const aspectRatio = createVar();

export const vars = {aspectRatio};

export const container = style([
    sprinkles({
        position: 'relative',
        display: 'flex',
        flexDirection: 'row', // Not working if column. Not sure why
    }),
    {
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
    },
]);

export const containerPaddingXVariants = styleVariants({
    display: [sprinkles({paddingX: 24})],
    default: [
        sprinkles({paddingX: 16}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    paddingLeft: 24,
                    paddingRight: 24,
                },
            },
        },
    ],
    snap: [
        sprinkles({paddingX: 16}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    paddingLeft: 24,
                    paddingRight: 24,
                },
            },
        },
    ],
});

export const containerPaddingTopVariants = styleVariants({
    display: [sprinkles({paddingTop: 24})],
    default: [
        sprinkles({paddingTop: 16}),
        {
            '@media': {
                [mq.desktopOrBigger]: {paddingTop: 24},
            },
        },
    ],
    snap: [
        sprinkles({paddingTop: 16}),
        {
            '@media': {
                [mq.desktopOrBigger]: {paddingTop: 24},
            },
        },
    ],
});

export const actionsContainerVariants = styleVariants({
    display: [sprinkles({paddingTop: 24})],
    default: [
        sprinkles({paddingTop: 16}),
        {
            '@media': {
                [mq.desktopOrBigger]: {paddingTop: 24},
            },
        },
    ],
    snap: [sprinkles({paddingTop: 16})],
});

export const containerPaddingBottomVariants = styleVariants({
    display: [sprinkles({paddingBottom: 32})],
    default: [
        sprinkles({paddingBottom: 24}),
        {
            '@media': {[mq.desktopOrBigger]: {paddingBottom: 32}},
        },
    ],
    snap: [
        sprinkles({paddingBottom: 16}),
        {
            '@media': {[mq.desktopOrBigger]: {paddingBottom: 24}},
        },
    ],
});

export const boxed = style({
    minHeight: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

export const touchable = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: 0,
        border: 'none',
        background: 'transparent',
        width: '100%',
        height: '100%',
    }),
    {
        isolation: 'isolate', // Needed to preserve border-radius with Video component and Safari
    },
]);

export const touchableContainer = style({});

const touchableCardOverlayBase = style({
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1,
    transition: 'background-color 0.1s ease-in-out',
});

export const touchableCardOverlay = style([
    touchableCardOverlayBase,
    {
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

export const contentContainer = style([
    sprinkles({
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }),
    {
        gap: 8,
    },
]);

export const textContent = style([
    sprinkles({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    }),
]);

export const topActionsContainer = style([
    sprinkles({
        position: 'absolute',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'row',
    }),
    {
        gap: 16,
        zIndex: 2,
    },
]);

export const backgroundImageOrVideoContainer = style([
    sprinkles({
        width: '100%',
        height: '100%',
        position: 'absolute',
        objectFit: 'cover',
    }),
    {
        zIndex: 0,
    },
]);
