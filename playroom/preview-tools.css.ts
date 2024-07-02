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
