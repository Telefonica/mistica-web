import {keyframes, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const transitionDuration = 500;

const openingAnimation = keyframes({
    '0%': {
        transform: `translateY(100%)`,
    },
    '100%': {
        transform: `translateY(0)`,
    },
});

const timmingFunction = 'cubic-bezier(0.32, 0.72, 0, 1)';

const topMargin = 64;

export const bottomSheet = style([
    sprinkles({
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: skinVars.colors.background,
    }),
    {
        userSelect: 'none',
        transition: `transform ${transitionDuration}ms ${timmingFunction}`,
        animation: `${openingAnimation} ${transitionDuration}ms ${timmingFunction}`,
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
    },
]);

export const bottomSheetContent = style([
    sprinkles({
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
    }),
    {
        maxHeight: [`calc(100vh - ${topMargin}px)`, `calc(100dvh - ${topMargin}px)`],
        minHeight: 100, // ['50vh', '50dvh'],
    },
]);

export const children = sprinkles({
    overflowY: 'auto',
    flex: 1,
});

export const closingSheet = style({
    transform: `translateY(100%)`,
});

// absolute positioned with a bigger size to increase the touchable area for dragging
export const handleContainer = style([
    sprinkles({
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
    },
]);

export const handle = sprinkles({
    background: skinVars.colors.control,
    width: 24,
    height: 4,
    borderRadius: 2,
});

const overlayAnimation = keyframes({
    '0%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1,
    },
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

export const closingOverlay = style({opacity: 0});

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

export const titleDivider = style({position: 'sticky', top: 44});

// covers the divider when there isn't scroll
export const titleDividerCover = style({
    position: 'relative',
    top: -1,
    height: 1,
    width: '100%',
    background: skinVars.colors.background,
});

export const sheetActionRow = style([
    sprinkles({
        display: 'flex',
        padding: 16,
        minHeight: 72,
        alignItems: 'center',
    }),
    {
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: skinVars.colors.backgroundContainerHover,
                },
                ':active': {
                    background: skinVars.colors.backgroundContainerPressed,
                },
            },
        },
    },
]);

export const sheetActionRowIcon = sprinkles({
    paddingRight: 16,
});

export const infoItemIcon = sprinkles({
    display: 'flex',
    alignItems: 'center',
    height: 24,
});
