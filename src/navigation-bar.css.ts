import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_DESKTOP_LARGE, NAVBAR_HEIGHT_MOBILE} from './theme';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';

const NAVBAR_ZINDEX = 25;

export const DESKTOP_SMALL_MENU_WIDTH = 184;

export const BURGER_MENU_ANIMATION_DURATION_MS = 300;
export const DESKTOP_MENU_ANIMATION_DURATION_MS = 400;
const DESKTOP_MENU_CONTENT_ANIMATION_DURATION_MS = 800;

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

const borderWidth = 1;

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

export const desktopMenuFirstSection = style({});
export const desktopMenuLastSection = style({});

export const desktopMenuSectionContainer = style([
    sprinkles({position: 'relative', display: 'flex'}),
    {
        '::after': {
            content: '',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },

        selectors: {
            // Add extra width on the left/right of interactive area so that we cover the space between sections
            [`&:not(${desktopMenuFirstSection}):after`]: {
                left: -16,
            },
            [`&:not(${desktopMenuLastSection}):after`]: {
                right: -16,
            },
        },
    },
]);

export const desktopMenuSectionWithArrowWrapper = sprinkles({
    position: 'relative',
});

export const desktopMenuSectionArrowContainer = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
    }),
    {
        // Avoid element from affecting hover status of the section
        zIndex: -1,
        right: -8,
    },
]);

export const desktopMenuSectionArrow = style([
    sprinkles({
        border: 'none',
        background: 'transparent',
        padding: 0,
    }),
    {
        transition: `opacity 0.1s`,
    },
]);

export const section = style([
    sprinkles({
        height: NAVBAR_HEIGHT_DESKTOP,
        display: 'flex',
        alignItems: 'center',
        paddingX: 8,
        border: 'none',
        background: 'transparent',
        position: 'relative',
    }),
    {
        zIndex: 1,
        borderBottom: `2px solid transparent`,
        transition: 'border-color 300ms ease-in-out',
    },
]);

export const selectedSectionVariantes = styleVariants({
    default: {borderColor: vars.colors.controlActivated},
    inverse: {borderColor: vars.colors.inverse},
});

export const textWrapperVariants = styleVariants({
    default: {
        color: vars.colors.textPrimary,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textSecondary,
                },
            },
        },
    },
    inverse: {
        color: vars.colors.textPrimaryInverse,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textSecondaryInverse,
                },
            },
        },
    },
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

export const navigationBarAction = sprinkles({
    border: 'none',
    background: 'transparent',
    padding: 0,
});

export const desktopOnly = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'none',
        },
    },
});

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
        paddingLeft: 136,
    },
]);

const spacerMobile = style({
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

export const spacerLarge = style([
    {
        height: NAVBAR_HEIGHT_DESKTOP_LARGE,
    },
    spacerMobile,
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

export const mainNavbarContent = sprinkles({
    display: 'flex',
    alignItems: 'center',
});

export const mainNavBarSectionsContainer = style([
    sprinkles({display: 'flex', flex: 1}),
    {minWidth: 'fit-content'},
]);

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

export const burgerMenuButton = style({
    marginRight: 24,
    width: 'fit-content',
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'none',
        },
    },
});

export const burgerMenu = sprinkles({
    position: 'fixed',
    top: NAVBAR_HEIGHT_MOBILE,
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

export const iconButtonVariants = styleVariants({
    default: [
        sprinkles({color: vars.colors.neutralHigh}),
        {
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: vars.colors.neutralMedium,
                    },
                },
            },
        },
    ],
    inverse: [
        sprinkles({color: vars.colors.inverse}),
        {
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: vars.colors.inverse,
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

export const mainNavigationBarContentWrapper = style([
    sprinkles({width: '100%'}),
    {
        transition: `clip-path ${DESKTOP_MENU_ANIMATION_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    },
]);

export const desktopMenuWrapper = sprinkles({
    position: 'absolute',
    left: 0,
    right: 0,
});

export const desktopMenuContainer = style([
    sprinkles({
        position: 'fixed',
        left: 0,
        right: 0,
    }),
    {
        zIndex: NAVBAR_ZINDEX,
    },
]);

export const desktopMenuBackgroundContainer = style([
    sprinkles({
        background: vars.colors.backgroundContainer,
        position: 'absolute',
        left: 0,
        right: 0,
    }),
    {
        transition: `height ${DESKTOP_MENU_ANIMATION_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    },
]);

export const desktopSmallMenuContainer = style([
    sprinkles({
        background: vars.colors.backgroundContainer,
        position: 'fixed',
        paddingY: 40,
        paddingX: 24,
        overflowY: 'auto',
    }),
    {
        zIndex: NAVBAR_ZINDEX,
        borderRadius: `0 0 ${vars.borderRadii.popup} ${vars.borderRadii.popup}`,
        width: DESKTOP_SMALL_MENU_WIDTH,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    },
]);

export const desktopMenu = style([
    sprinkles({
        paddingY: 40,
        position: 'relative',
    }),
    {
        transform: 'translateY(-16px)',
        opacity: 0,
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    },
]);

export const desktopMenuContentFadeIn = style({
    transform: 'translateY(0)',
    opacity: 1,
    transition: `opacity ${DESKTOP_MENU_CONTENT_ANIMATION_DURATION_MS}ms cubic-bezier(0.33, 1, 0.68, 1), transform ${DESKTOP_MENU_CONTENT_ANIMATION_DURATION_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`,
    '@media': {
        ['(prefers-reduced-motion)']: {
            transition: 'none',
        },
    },
});

export const desktopMenuColumnItem = style({
    color: vars.colors.textPrimary,
});
