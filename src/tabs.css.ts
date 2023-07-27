import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

const TAB_MAX_WIDTH = 284;
const TAB_HEIGHT = 56;

export const outerBorder = style({
    borderBottom: `1px solid ${vars.colors.divider}`,
});

export const outer = style([
    sprinkles({
        minHeight: TAB_HEIGHT,
        width: '100%',
        position: 'relative',
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                display: 'flex',
            },
        },
    },
]);
export const inner = style({
    position: 'relative',
    width: '100%',
    // if tabs don't fit horizontally they can be scrolled
    overflowX: 'scroll',

    // hide scrollbar
    scrollbarWidth: 'none', // Firefox
    '::-webkit-scrollbar': {
        display: 'none', // Chrome/Safari
    },
});
export const tabsContainer = sprinkles({
    minHeight: TAB_HEIGHT,
    width: '100%',
    display: 'flex',
});

const baseTab = style([
    sprinkles({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: 16,
        minWidth: 80,
        minHeight: TAB_HEIGHT,
        background: 'transparent',
    }),
    {
        textAlign: 'center',
        verticalAlign: 'baseline',
        borderBottom: '2px solid transparent',
        borderTop: 'initial',
        borderRight: 'initial',
        borderLeft: 'initial',
        maxWidth: TAB_MAX_WIDTH,
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textPrimary,
                },
            },
            [mq.desktopOrBigger]: {
                padding: `16px 32px`,
            },
        },
    },
]);

export const tabVariants = styleVariants({
    default: [baseTab],
    tabs1: [
        baseTab,
        {
            '@media': {
                [mq.tabletOrSmaller]: {
                    minWidth: '100%',
                    maxWidth: undefined,
                },
            },
        },
    ],
    tabs2: [
        baseTab,
        {
            '@media': {
                [mq.tabletOrSmaller]: {
                    minWidth: '50%',
                    maxWidth: undefined,
                },
            },
        },
    ],
    tabs3: [
        baseTab,
        {
            '@media': {
                [mq.tabletOrSmaller]: {
                    minWidth: 'calc(100% / 3)',
                    maxWidth: undefined,
                },
            },
        },
    ],
});

const tabSelectedBase = sprinkles({
    color: vars.colors.textPrimary,
});

export const tabSelectionVariants = styleVariants({
    noSelected: [
        sprinkles({
            color: vars.colors.textSecondary,
        }),
    ],
    selected: [
        tabSelectedBase,
        style({
            borderBottom: `2px solid ${vars.colors.controlActivated}`,
        }),
    ],
    selectedAnimating: [
        tabSelectedBase,
        style({
            borderBottom: '2px solid transparent',
        }),
    ],
});

export const icon = style({
    height: pxToRem(24),
    width: pxToRem(24),
});
export const animatedLine = sprinkles({
    display: 'none', // will be overriden by inline styles in animateLine function
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 2,
    background: vars.colors.controlActivated,
});
