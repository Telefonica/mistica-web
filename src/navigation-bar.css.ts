import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE} from './theme';
import * as mq from './media-queries.css';
import {vars as colorVars} from './skins/skin-contract.css';

const NAVBAR_ZINDEX = 25;
const BURGER_ZINDEX = 26;

const BURGER_MENU_ANIMATION_DURATION_MS = 300;

export const burgerIconContainer = style([
    sprinkles({
        position: 'relative',
        width: 24,
        height: 24,
    }),
    {
        verticalAlign: 'middle',
        borderRadius: 50,
    },
]);

const iconBase = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        opacity: 1,
        transform: 'rotate(0) scale(1)',
        transition: 'transform 300ms, opacity 100ms',
    },
]);

export const iconCloseHidden = style([
    iconBase,
    {
        opacity: 0,
        transform: 'rotate(-45deg) scale(0.9)',
    },
]);

export const iconMenuHidden = style([
    iconBase,
    {
        opacity: 0,
        transform: 'rotate(0deg) scale(0.7)',
    },
]);

export const topFixed = style([
    sprinkles({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
    }),
    {
        zIndex: NAVBAR_ZINDEX,
    },
]);

const navbarBase = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: NAVBAR_HEIGHT_DESKTOP,
        paddingY: 16,
    }),
    {
        borderBottomStyle: 'solid',

        '@media': {
            [mq.tabletOrSmaller]: {
                height: NAVBAR_HEIGHT_MOBILE,
                padding: '8px 0',
                transition: 'border-color 300ms',
            },
        },
    },
]);

export const navbarBorderColorVariants = styleVariants({
    default: [navbarBase, {borderColor: colorVars.colors.divider}],
    inverse: [navbarBase, {borderColor: 'transparent'}],
    menuOpen: [
        navbarBase,
        {
            borderColor: colorVars.colors.divider,

            '@media': {
                [mq.tabletOrSmaller]: {
                    borderColor: 'transparent',
                },
            },
        },
    ],
});

export const section = style([
    sprinkles({
        height: NAVBAR_HEIGHT_DESKTOP,
        display: 'flex',
        alignItems: 'center',
        paddingX: 8,
        border: 'none',
        background: 'transparent',
    }),
    {
        borderBottom: `2px solid transparent`,
        transition: 'border-color 300ms ease-in-out',
    },
]);

export const selectedSectionVariantes = styleVariants({
    default: {borderColor: colorVars.colors.controlActivated},
    inverse: {borderColor: colorVars.colors.inverse},
});

export const textWrapperVariants = styleVariants({
    default: {
        color: colorVars.colors.textPrimary,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: colorVars.colors.textSecondary,
                },
            },
        },
    },
    inverse: {
        color: colorVars.colors.textPrimaryInverse,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: colorVars.colors.textSecondaryInverse,
                },
            },
        },
    },
});

export const spacer = style([
    sprinkles({
        height: NAVBAR_HEIGHT_DESKTOP,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                height: NAVBAR_HEIGHT_MOBILE,
            },
        },
    },
]);

export const burgerMenuEnter = style({
    transform: 'translate(-100vw)',
});

export const burgerMenuEnterActive = style({
    transform: 'translate(0)',
});

export const burgerMenuExit = style({
    transform: 'translate(0)',
});

export const burgerMenuExitActive = style({
    transform: 'translate(-100vw)',
});

export const logoContainer = sprinkles({
    display: 'flex',
    justifyContent: 'center',
});

export const burgerMenu = style([
    sprinkles({
        position: 'fixed',
        top: NAVBAR_HEIGHT_MOBILE,
        left: 0,
        right: 0,
        background: colorVars.colors.background,
    }),
    {
        zIndex: BURGER_ZINDEX,
        height: `calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px)`,
        overflowY: 'auto',
        transition: `transform ${BURGER_MENU_ANIMATION_DURATION_MS}ms ease-out`,
    },
]);

export const iconButtonVariants = styleVariants({
    default: [
        sprinkles({color: colorVars.colors.neutralHigh}),
        {
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: colorVars.colors.neutralMedium,
                    },
                },
            },
        },
    ],
    inverse: [
        sprinkles({color: colorVars.colors.inverse}),
        {
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: colorVars.colors.inverse,
                    },
                },
            },
        },
    ],
});

export const lineHeightFix = style({
    // This fixes vertical alignment issues with icons in the secondary navigation, because mistica icons
    // use display inline and other components like Badge use inline-block.
    lineHeight: 0,
});
