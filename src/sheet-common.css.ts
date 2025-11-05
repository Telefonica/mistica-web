import {createVar, keyframes, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const insideSheetDialog = createVar();
export const vars = {insideSheetDialog};

export const transitionDuration = 400;

const sheetClosedStyle = {
    transform: 'translateY(100%)',
};

const translateUp = keyframes({
    '0%': sheetClosedStyle,
    '100%': {},
});

const modalClosedStyle = {
    opacity: 0,
    transform: 'scale(.8)',
};

const fadeScale = keyframes({
    '0%': modalClosedStyle,
    '100%': {},
});

const timmingFunction = 'cubic-bezier(0.32, 0.72, 0, 1)';

const topMargin = 64;

export const SheetContainer = style([
    sprinkles({
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
    }),
    {
        transition: `transform ${transitionDuration}ms ${timmingFunction}`,
        animation: `${translateUp} ${transitionDuration}ms ${timmingFunction}`,

        '@media': {
            [mq.desktopOrBigger]: {
                vars: {
                    [insideSheetDialog]: '1',
                },

                pointerEvents: 'none', // allow clicks to go through this layer and hit the overlay
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animationName: fadeScale,
                transition: `opacity ${transitionDuration}ms ${timmingFunction}, transform ${transitionDuration}ms ${timmingFunction}`,
            },
        },
    },
]);

export const Sheet = style([
    sprinkles({
        background: skinVars.colors.background,
    }),
    {
        userSelect: 'none',
        borderTopLeftRadius: skinVars.borderRadii.sheet,
        borderTopRightRadius: skinVars.borderRadii.sheet,

        // used for overdrag. A bottom padding would be a simpler solution, but then translateY(100%) wouldn't work as expected
        ':after': {
            flexBasis: 0,
            position: 'absolute',
            zIndex: -1,
            top: '80%',
            left: 0,
            right: 0,
            background: skinVars.colors.background,
            content: '""',
            height: '150vh',
        },

        '@media': {
            [mq.desktopOrBigger]: {
                position: 'relative',
                pointerEvents: 'initial', // restore pointer events (disabled by parent SheetContainer) to work inside the modal
                borderRadius: skinVars.borderRadii.sheet,
                overflow: 'hidden',
                userSelect: 'initial',

                ':after': {
                    display: 'none',
                },
            },
        },
    },
]);

export const closingSheet = style({
    ...sheetClosedStyle,
    '@media': {
        [mq.desktopOrBigger]: modalClosedStyle,
    },
});

export const SheetContent = style([
    sprinkles({
        paddingTop: 32, // drag handle height
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        maxHeight: [`calc(100vh - ${topMargin}px)`, `calc(100dvh - ${topMargin}px)`],
        minHeight: 100,

        '@media': {
            [mq.desktopOrBigger]: {
                width: 680,
                paddingTop: 0,
                maxHeight: ['560px', 'min(calc(100vh - 64px), 560px)'],
            },
        },
    },
]);

export const children = sprinkles({
    overflowY: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
});

export const sheetTopDraggingArea = style([
    sprinkles({
        // Absolute positioned with a bigger size to increase the touchable area for dragging
        position: 'absolute',
        top: 0,
        height: 64,
        paddingY: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }),
    {
        zIndex: 1,
        touchAction: 'none', // prevent scrolling while dragging

        '@media': {
            [mq.desktopOrBigger]: {
                display: 'none',
            },
        },
    },
]);

export const handleContainer = style([
    sprinkles({
        display: 'none',
    }),
    {
        '@media': {
            // Handle is rendered only in mobile version
            [mq.tabletOrSmaller]: {
                position: 'absolute',
                top: 8,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            },
        },
    },
]);

export const handleTouchable = style([
    sprinkles({
        width: 24,
        height: 4,
    }),
]);

export const handleBar = sprinkles({
    background: skinVars.colors.control,
    width: '100%',
    height: '100%',
    borderRadius: 2,
});

export const modalCloseButton = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 24,
    }),
    {
        zIndex: 1,
        '@media': {
            [mq.tabletOrSmaller]: {
                display: 'none',
            },
        },
    },
]);

export const modalCloseButtonIcon = style([
    sprinkles({
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    }),
    {
        transition: 'background-color 0.1s ease-in-out',
        selectors: {
            ':not(:disabled) > &:active': {
                background: skinVars.colors.backgroundContainerPressed,
            },
        },
        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    ':not(:disabled) > &:hover': {
                        background: skinVars.colors.backgroundContainerHover,
                    },
                    ':not(:disabled) > &:active': {
                        background: skinVars.colors.backgroundContainerPressed,
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

const overlayClosedStyle = {opacity: 0};
const overlayAnimation = keyframes({
    '0%': overlayClosedStyle,
});

export const overlay = style([
    sprinkles({
        position: 'fixed',
        background: skinVars.colors.backgroundOverlay,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }),
    {
        touchAction: 'none',
        animation: `${overlayAnimation} ${transitionDuration}ms ${timmingFunction}`,
        transition: `opacity ${transitionDuration}ms ${timmingFunction}`,
    },
]);

export const closingOverlay = style(overlayClosedStyle);

export const stickyTitle = style([
    sprinkles({
        position: 'sticky',
        top: 0,
        background: skinVars.colors.background,
    }),
    {
        zIndex: 1,
    },
]);

export const stickyButtons = style([
    sprinkles({
        position: 'sticky',
        bottom: 0,
        background: skinVars.colors.background,
    }),
    {
        zIndex: 1,
    },
]);

export const bodyContent = style({
    position: 'relative',
    zIndex: 0,
    '@media': {
        [mq.desktopOrBigger]: {
            flex: 1,
        },
    },
});
