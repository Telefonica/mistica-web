import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_DESKTOP_LARGE} from './theme';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {NAVBAR_ZINDEX, spacerMobile} from './navigation-shared.css';

// The styles of the bar itself live in `navigation-shared.css.ts`, which every navigation surface reads.
// This file holds what belongs to `MainNavigationBar` and `FunnelNavigationBar` alone: the desktop menu,
// the sections of the bar, and the actions.

export const DESKTOP_SMALL_MENU_WIDTH = 184;

export const DESKTOP_MENU_ANIMATION_DURATION_MS = 400;
const DESKTOP_MENU_CONTENT_ANIMATION_DURATION_MS = 800;

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

export const selectedSectionVariants = styleVariants({
    default: {borderColor: vars.colors.controlActivated},
    brand: {borderColor: vars.colors.inverse},
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
    alternative: {
        color: vars.colors.textPrimary,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textSecondary,
                },
            },
        },
    },
    brand: {
        color: vars.colors.textPrimaryBrand,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textSecondaryBrand,
                },
            },
        },
    },
    negative: {
        color: vars.colors.textPrimaryNegative,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textSecondaryNegative,
                },
            },
        },
    },
    media: {
        color: vars.colors.textPrimaryMedia,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textSecondaryMedia,
                },
            },
        },
    },
});

export const navigationBarAction = sprinkles({
    border: 'none',
    background: 'transparent',
    padding: 0,
});

export const spacerLarge = style([
    {
        height: NAVBAR_HEIGHT_DESKTOP_LARGE,
    },
    spacerMobile,
]);

export const mainNavbarContent = sprinkles({
    display: 'flex',
    alignItems: 'center',
});

export const mainNavBarSectionsContainer = style([
    sprinkles({display: 'flex', flex: 1}),
    {minWidth: 'fit-content'},
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
