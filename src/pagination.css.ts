import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

export const container = style([
    sprinkles({
        display: 'inline-flex',
        alignItems: 'center',
    }),
    {
        gap: 4,
        padding: '8px 16px',
        width: 'fit-content',
        maxWidth: '100%',
        boxSizing: 'border-box',

        '@media': {
            [mq.desktopOrBigger]: {
                gap: 8,
            },
        },
    },
]);

/*
 * Variant for the "Previous / Next only" (hidePageList) layout. Per Figma the
 * gap between Previous and Next when the page list is absent is 16px (vs the
 * default 4/8px gap of the regular container).
 */
export const containerNavOnly = style({
    gap: 16,
    '@media': {
        [mq.desktopOrBigger]: {
            gap: 16,
        },
    },
});

/*
 * Compact view (high-zoom or space-limited contexts < 375px wide): navigation
 * stacks vertically with Previous on top, page list in the middle, Next at
 * the bottom. The JS layer also reduces the page list to current ± 1.
 */
export const containerCompact = style([
    sprinkles({
        display: 'inline-flex',
    }),
    {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '8px 16px',
        width: 'fit-content',
        maxWidth: '100%',
        boxSizing: 'border-box',
    },
]);

export const pageList = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
    }),
    {
        gap: 4,
        margin: 0,
        padding: 0,
        listStyle: 'none',

        '@media': {
            [mq.desktopOrBigger]: {
                gap: 8,
            },
        },
    },
]);

export const pageListItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

/*
 * Page items use the Figma anatomy size (32px circle) on every viewport so the
 * full pagination fits on mobile screens (~375px). Vertical hit area stays at
 * 48px on mobile to give a comfortable thumb target. WCAG 2.2 Target Size
 * (Minimum) is satisfied through the spacing exception: 32px circles with a
 * 4px gap between centers (36px apart) easily inscribe non-overlapping 24px
 * circles, so the rule passes even though the literal target width is below
 * 24×24 only in width.
 */
const interactiveArea = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        position: 'relative',
        width: 32,
        minWidth: 32,
        height: 48,
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textPrimary,
        borderRadius: skinVars.borderRadii.button,
        WebkitTapHighlightColor: 'transparent',
        boxSizing: 'border-box',

        '@media': {
            [mq.desktopOrBigger]: {
                height: 32,
            },
        },
    },
]);

const pageElement = style([
    interactiveArea,
    {
        ':before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 32,
            height: 32,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            opacity: 0,
            transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
        },

        '@media': {
            [mq.desktopOrBigger]: {
                minWidth: 32,
            },
        },
    },
]);

export const pageButton = style([
    pageElement,
    {
        cursor: 'pointer',

        selectors: {
            '&:active:before': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1)',
                backgroundColor: skinVars.colors.brandLow,
            },
            '&:disabled': {
                cursor: 'default',
                opacity: 0.5,
            },
        },

        '@media': {
            [mq.supportsHover]: {
                selectors: {
                    '&:hover:before': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1.06)',
                        backgroundColor: skinVars.colors.neutralLow,
                    },
                    '&:active:before': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1)',
                        backgroundColor: skinVars.colors.brandLow,
                    },
                },
            },
            [mq.touchableOnly]: {
                ':before': {
                    transition: 'none',
                },
            },
        },
    },
]);

export const currentPage = style([
    pageElement,
    {
        cursor: 'default',
        color: skinVars.colors.textActivated,

        ':before': {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            backgroundColor: skinVars.colors.brandLow,
        },
    },
]);

export const pageContent = style({
    position: 'relative',
    zIndex: 1,
});

export const ellipsis = style([
    interactiveArea,
    {
        color: skinVars.colors.textPrimary,
        cursor: 'default',

        '@media': {
            [mq.desktopOrBigger]: {
                width: 16,
                minWidth: 16,
            },
        },
    },
]);

/*
 * Navigation button matches the page-item layout on mobile (32 wide x 48 tall)
 * so the whole pagination fits inside a 375px viewport even with the densest
 * "1 ... N N+1 N+2 ... LAST" layout. The hit area still passes WCAG 2.2 via
 * the spacing exception (32px button + 4px gap = 36px center-to-center, room
 * to inscribe non-overlapping 24px touch circles). Desktop relaxes width to
 * auto so the inline label can expand the button naturally.
 */
export const navigationButton = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        gap: 4,
        width: 32,
        minWidth: 32,
        height: 48,
        padding: 0,
        border: 0,
        font: 'inherit',
        background: 'transparent',
        color: skinVars.colors.textLink,
        borderRadius: skinVars.borderRadii.button,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',

        selectors: {
            '&:active': {
                backgroundColor: skinVars.colors.buttonLinkBackgroundPressed,
            },
            '&:disabled': {
                cursor: 'default',
                opacity: 0.5,
            },
        },

        '@media': {
            [mq.desktopOrBigger]: {
                width: 'auto',
                minWidth: 32,
                height: 32,
            },
            [mq.supportsHover]: {
                selectors: {
                    '&:hover': {
                        color: skinVars.colors.textLink,
                    },
                },
            },
        },
    },
]);

export const navigationButtonIconOnly = style({
    '@media': {
        [mq.desktopOrBigger]: {
            width: 32,
            minWidth: 32,
        },
    },
});

export const navigationLabel = style({
    display: 'inline-flex',

    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'none',
        },
    },
});
