import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {mq} from '.';

const aspectRatio = createVar();

export const vars = {aspectRatio};

export const container = style([
    sprinkles({
        position: 'relative',
        display: 'flex',
        flexDirection: 'row', // Not working if vertical. Not sure why
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

const displayContainerPaddings = style([
    sprinkles({
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 32,
        paddingLeft: 24,
    }),
]);

const defaultContainerPaddings = style([
    sprinkles({
        paddingTop: 16,
        paddingBottom: 24,
        paddingRight: 16,
        paddingLeft: 16,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 24,
                paddingRight: 24,
                paddingBottom: 32,
                paddingLeft: 24,
            },
        },
    },
]);

const snapContainerPaddings = style([
    sprinkles({
        padding: 16,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                padding: 24,
            },
        },
    },
]);

export const boxed = style({
    minHeight: '100%',
    position: 'relative',
    borderRadius: skinVars.borderRadii.container,
});

export const containerPaddingsVariants = styleVariants({
    display: [displayContainerPaddings],
    default: [defaultContainerPaddings],
    snap: [snapContainerPaddings],
});

export const touchable = style([
    sprinkles({
        display: 'flex',
        position: 'relative',
        padding: 0,
        border: 'none',
        background: 'transparent',
        width: '100%',
    }),
    {
        minHeight: '100%',
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
