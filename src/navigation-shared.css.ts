import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE} from './theme';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';

/*
 * Styles of the parts that every navigation surface shares: the header of a bar, the content of that
 * header, the burger icon, the panel that the burger opens, and the spacer of a fixed bar. `NavigationBar`,
 * `MainNavigationBar`, `FunnelNavigationBar` and `SidenavBar` all read them, so a change here reaches the
 * four of them.
 *
 * The styles of the desktop menu of `MainNavigationBar` stay in `navigation-bar.css.ts`, because that menu
 * belongs to that component alone.
 */

export const NAVBAR_ZINDEX = 25;

export const BURGER_MENU_ANIMATION_DURATION_MS = 300;

const borderWidth = 1;

// Header ----------------------------------------------------------------------

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
    }),
    {
        borderWidth,
        borderBottomStyle: 'solid',

        '@media': {
            [mq.tabletOrSmaller]: {
                transition: 'border-color 300ms',
            },
        },
    },
]);

export const navbarBorderColorVariants = styleVariants({
    default: [navbarBase, {borderColor: vars.colors.divider}],
    noBorder: [navbarBase, {borderColor: 'transparent'}],
    menuOpen: [
        navbarBase,
        {
            borderColor: vars.colors.divider,

            '@media': {
                [mq.tabletOrSmaller]: {
                    borderColor: 'transparent',
                },
            },
        },
    ],
});

export const navigationBarContent = style([
    sprinkles({
        alignItems: 'center',
        width: '100%',
        display: 'flex',
    }),
    {
        height: NAVBAR_HEIGHT_DESKTOP,
        '@media': {
            [mq.tabletOrSmaller]: {
                height: NAVBAR_HEIGHT_MOBILE - borderWidth,
            },
            [mq.desktopOrBigger]: {
                ':last-child': {
                    height: NAVBAR_HEIGHT_DESKTOP - borderWidth,
                },
            },
        },
    },
]);

export const navigationBarContentRight = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }),
    {
        height: NAVBAR_HEIGHT_DESKTOP,
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingLeft: 24,
                flex: 1,
                height: NAVBAR_HEIGHT_MOBILE - borderWidth,
            },
            [mq.desktopOrBigger]: {
                ':last-child': {
                    height: NAVBAR_HEIGHT_DESKTOP - borderWidth,
                },
            },
        },
    },
]);

export const navigationBarContentRightExpanded = style([
    navigationBarContentRight,
    sprinkles({
        flex: 1,
    }),
    {
        paddingLeft: 56,
    },
]);

export const desktopOnly = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'none',
        },
    },
});

export const logoContainer = style([
    sprinkles({
        display: 'flex',
        justifyContent: 'center',
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                marginRight: 0,
            },
        },
    },
]);

// The spacer keeps the content of the page below a bar that is fixed to the top of the viewport.
export const spacerMobile = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            height: NAVBAR_HEIGHT_MOBILE,
        },
    },
});

export const spacer = style([
    sprinkles({
        height: NAVBAR_HEIGHT_DESKTOP,
    }),
    spacerMobile,
]);

// Burger icon -----------------------------------------------------------------

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
        top: 0,
        left: 0,
        transition: 'transform 300ms, opacity 100ms',
    },
]);

export const iconCloseOpen = style([
    iconBase,
    {
        opacity: 1,
        transform: 'rotate(0) scale(1)',
    },
]);

export const iconCloseHidden = style([
    iconBase,
    {
        opacity: 0,
        transform: 'rotate(-45deg) scale(0.9)',
    },
]);

export const iconMenuOpen = style([
    iconBase,
    {
        opacity: 1,
        transform: 'scale(1)',
    },
]);

export const iconMenuHidden = style([
    iconBase,
    {
        opacity: 0,
        transform: 'scale(0.7)',
    },
]);

export const burgerMenuButton = style({
    marginRight: 24,
    width: 'fit-content',
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'none',
        },
    },
});

// Burger menu panel -----------------------------------------------------------

export const burgerMenu = sprinkles({
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    background: vars.colors.background,
});

export const burgerMenuContainer = sprinkles({
    height: '100%',
    position: 'relative',
});

export const burgerMenuContentContainer = style([
    sprinkles({
        overflowY: 'auto',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
    }),
    {
        transition: `transform ${BURGER_MENU_ANIMATION_DURATION_MS}ms ease-out`,
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    },
]);

export const burgerMenuTransition = {
    enter: style({
        transform: 'translate(-100vw)',
    }),
    enterActive: style({
        transform: 'translate(0)',
        transition: `transform ${BURGER_MENU_ANIMATION_DURATION_MS}ms ease-out`,
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    }),
    exit: style({
        transform: 'translate(0)',
    }),
    exitActive: style({
        transform: 'translate(-100vw)',
        transition: `transform ${BURGER_MENU_ANIMATION_DURATION_MS}ms ease-out`,
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    }),
};
