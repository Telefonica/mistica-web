import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {applyAlpha} from './utils/color';

export const TRANSITION_TIME_IN_MS = 300;

const DESKTOP_VIEWPORT_INSET = '40px';
const MOBILE_VIEWPORT_INSET = '8px';
const TRANSITION_DISTANCE = 100;
const tabletWidthOrSmaller = `only screen and (max-width: ${mq.mediaQueriesConfig.desktopMinWidth - 1}px)`;
const viewportInset = createVar();
const slideOffset = createVar();

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
        borderRadius: vars.borderRadii.snackbar,
    }),
    {
        maxWidth: 800,
        minWidth: 360,
        minHeight: 48,
        padding: `14px 16px`,
        opacity: 0,
        transform: `translateY(${slideOffset})`,
        transition: `transform ${TRANSITION_TIME_IN_MS}ms ease-in-out, opacity ${TRANSITION_TIME_IN_MS}ms ease-in-out`,
        vars: {
            [viewportInset]: DESKTOP_VIEWPORT_INSET,
            [slideOffset]: `${TRANSITION_DISTANCE}px`,
        },

        '@media': {
            [tabletWidthOrSmaller]: {
                maxWidth: 'none',
            },
            [mq.tabletOrSmaller]: {
                left: viewportInset,
                right: viewportInset,
                bottom: viewportInset,
                minWidth: 0,
                vars: {[viewportInset]: MOBILE_VIEWPORT_INSET},
            },
        },
    },
]);

const top = style({
    '@media': {
        [mq.desktopOrBigger]: {
            top: viewportInset,
            vars: {[slideOffset]: `${-TRANSITION_DISTANCE}px`},
        },
    },
});

const bottom = style({bottom: viewportInset});

const left = style({
    '@media': {[mq.desktopOrBigger]: {left: viewportInset}},
});

const right = style({
    '@media': {[mq.desktopOrBigger]: {right: viewportInset}},
});

export const position = styleVariants({
    'top-left': [top, left],
    'top-center': [top],
    'top-right': [top, right],
    'bottom-left': [bottom, left],
    'bottom-center': [bottom],
    'bottom-right': [bottom, right],
});

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
