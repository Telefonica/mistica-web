import {style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {applyAlpha} from './utils/color';

export const TRANSITION_TIME_IN_MS = 300;

export const snackbar = style([
    sprinkles({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }),
    {
        transition: `visibility ${TRANSITION_TIME_IN_MS}ms`,
        visibility: 'hidden',
    },
]);

export const snackbarContainer = style([
    sprinkles({
        position: 'relative',
    }),
    {
        zIndex: 1, // Render above everything, including other portals
    },
]);

export const snackbarOpen = style({
    visibility: 'visible',
});

export const wrapper = style([
    sprinkles({
        position: 'fixed',
        borderRadius: vars.borderRadii.popup,
    }),
    {
        maxWidth: 800,
        minWidth: 360,
        minHeight: 48,
        padding: `14px 16px`,
        bottom: 40,
        opacity: 0,
        transform: 'translateY(100px)',
        transition: `transform ${TRANSITION_TIME_IN_MS}ms ease-in-out, opacity ${TRANSITION_TIME_IN_MS}ms ease-in-out`,

        '@media': {
            [mq.tabletOrSmaller]: {
                left: 8,
                right: 8,
                bottom: 8,
                minWidth: 0,
            },
        },
    },
]);

export const wrapperCritical = sprinkles({background: vars.colors.feedbackErrorBackground});
export const wrapperInfo = sprinkles({background: vars.colors.feedbackInfoBackground});

export const wrapperOpen = style({
    opacity: 1,
    transform: 'initial',
    animationDuration: `${TRANSITION_TIME_IN_MS}ms`,
});

const baseContent = sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
});

export const contentWithLongButton = style([
    baseContent,
    sprinkles({
        flexDirection: 'column',
    }),
]);

export const contentWithoutLongButton = style([
    baseContent,
    sprinkles({
        flexDirection: 'row',
        alignItems: 'center',
    }),
]);

export const textContainer = sprinkles({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
});

const hoverStyles = {
    transition: 'background-color 0.1s ease-in-out',
    ':active': {
        background: applyAlpha(vars.rawColors.inverse, 0.2),
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: applyAlpha(vars.rawColors.inverse, 0.1),
            },
            ':active': {
                background: applyAlpha(vars.rawColors.inverse, 0.2),
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
} as const;

export const button = style([
    {
        flexShrink: 0,
        marginTop: -6,
        marginLeft: 16,
        marginBottom: -6,
        marginRight: -8,
        cursor: 'pointer',
        borderRadius: vars.borderRadii.button,

        '@media': {
            [mq.desktopOrBigger]: {
                marginLeft: 48,
            },
        },
    },
    hoverStyles,
]);

export const longButton = style({
    marginTop: 18,
    marginLeft: -8,
    alignSelf: 'flex-end',
    '@media': {
        [mq.desktopOrBigger]: {
            marginLeft: -8,
        },
    },
});

export const buttonTouchable = sprinkles({
    paddingY: 4,
    paddingX: 8,
    border: 'none',
    padding: 0,
    background: 'transparent',
});

const dismissButtonBase = sprinkles({
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 8,
});

export const dismissButton = styleVariants({
    centered: [dismissButtonBase, {top: 'calc(50% - 16px)'}],
    topRight: [dismissButtonBase, sprinkles({top: 8})],
});

export const dismissIcon = style([
    sprinkles({
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    }),
    hoverStyles,
]);
