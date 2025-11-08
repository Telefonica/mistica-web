import {globalStyle, style} from '@vanilla-extract/css';
import {mq, skinVars} from '../src';
import {sprinkles} from '../src/sprinkles.css';

export const controlsHeight = style({
    height: 57,
    '@media': {
        [mq.desktopOrBigger]: {
            height: 59,
        },
    },
});

export const controls = style([
    sprinkles({
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 16,
    }),
    {
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none', // Hide in FF
        '::-webkit-scrollbar': {
            display: 'none', // Hide in Chrome/Safari
        },

        gap: 8,
        zIndex: 2,
        background: 'white',
        borderBottom: `1px solid ${skinVars.colors.divider}`,
    },
    controlsHeight,
]);

globalStyle(`${controls} *`, {outline: 'none'});

export const flexSpacer = sprinkles({flex: 1});

export const tabs = style({
    flexBasis: '73%',
    whiteSpace: 'nowrap',
});

export const checkbox = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
    }),
    {
        gap: '8px',
    },
]);

export const floattingButton = style([
    sprinkles({
        position: 'fixed',
    }),
    {
        zIndex: 1,
    },
]);

globalStyle(`${floattingButton} *`, {outline: 'none'});

export const floattingButtonBackground = sprinkles({
    borderRadius: '50%',
    display: 'inline-block',
    width: 40,
    height: 40,
});

export const floatingButtonIcon = style({
    transition: 'transform 0.3s ease',
    '@media': {
        [mq.supportsHover]: {
            selectors: {
                [`${floattingButton}:hover &`]: {
                    transform: 'rotateZ(45deg)',
                },
            },
        },
    },
});

export const controlsTransitionClasses = {
    enter: style({
        transform: 'translateY(-100%)',
    }),
    enterActive: style({
        transform: 'translateY(0)',
        transition: 'transform .3s ease',
    }),
    exit: style({
        transform: 'translateY(0)',
    }),
    exitActive: style({
        transform: 'translateY(-100%)',
        transition: 'transform .3s ease',
    }),
};

// If we don't spread controlsTransitionClasses object, the animation is not working for some reason
export const floatingButtonTopTransitionClasses = {...controlsTransitionClasses};

export const floatingButtonBottomTransitionClasses = {
    enter: style({
        transform: 'translateY(100%)',
    }),
    enterActive: style({
        transform: 'translateY(0)',
        transition: 'transform .3s ease',
    }),
    exit: style({
        transform: 'translateY(0)',
    }),
    exitActive: style({
        transform: 'translateY(100%)',
        transition: 'transform .3s ease',
    }),
};

// Context toggle styles - using static timing values
export const contextToggle = style([
    sprinkles({
        position: 'fixed',
    }),
    {
        zIndex: 999,
        bottom: 20,
        left: 20,
    },
]);

export const contextToggleButton = style([
    sprinkles({
        position: 'relative',
        borderRadius: '50%',
        display: 'inline-block',
    }),
    {
        width: 56,
        height: 56,
        zIndex: 10000,
    },
]);

export const contextToggleItems = style([
    sprinkles({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }),
    {
        bottom: 70,
        left: 0,
        gap: 8,
        transition: 'all 0.3s ease-in-out',
        transformOrigin: 'bottom left',
    },
]);

export const contextToggleItemsOpen = style({
    transform: 'translateY(0)',
    opacity: 1,
});

export const contextToggleItemsClosed = style({
    transform: 'translateY(20px)',
    opacity: 0,
    pointerEvents: 'none',
});

export const contextToggleItemCircle = style([
    sprinkles({
        display: 'inline-block',
        borderRadius: 8,
        paddingX: 8,
        paddingY: 8,
    }),
    {
        minWidth: 140,
        height: 42,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.2s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
        },
    },
]);

// Individual animation states with staggered delays
// Item 0 (Default)
export const contextToggleItem0Open = style({
    transform: 'translateY(0)',
    opacity: 1,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
});

export const contextToggleItem0Closed = style({
    transform: 'translateY(30px)',
    opacity: 0,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.24s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.24s',
});

// Item 1 (Inverse)
export const contextToggleItem1Open = style({
    transform: 'translateY(0)',
    opacity: 1,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.08s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.08s',
});

export const contextToggleItem1Closed = style({
    transform: 'translateY(30px)',
    opacity: 0,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.16s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.16s',
});

// Item 2 (Alternative)
export const contextToggleItem2Open = style({
    transform: 'translateY(0)',
    opacity: 1,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.16s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.16s',
});

export const contextToggleItem2Closed = style({
    transform: 'translateY(30px)',
    opacity: 0,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.08s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.08s',
});

// Item 3 (Media)
export const contextToggleItem3Open = style({
    transform: 'translateY(0)',
    opacity: 1,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.24s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.24s',
});

export const contextToggleItem3Closed = style({
    transform: 'translateY(30px)',
    opacity: 0,
    transition:
        'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0s, opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
});

export const contextToggleItemCircleSelected = style({
    border: `2px solid ${skinVars.colors.controlActivated}`,
});
