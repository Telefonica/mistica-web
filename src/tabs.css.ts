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

export const outerBorderInverse = style({
    borderBottom: `1px solid ${vars.colors.dividerInverse}`,
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
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: 16,
        minWidth: 80,
        minHeight: TAB_HEIGHT,
        background: 'transparent',
    }),
    {
        outlineOffset: -8,
        textAlign: 'center',
        verticalAlign: 'baseline',
        borderBottom: '2px solid transparent',
        borderTop: 'initial',
        borderRight: 'initial',
        borderLeft: 'initial',
        maxWidth: TAB_MAX_WIDTH,
        '@media': {
            [mq.desktopOrBigger]: {
                padding: `16px 32px`,
            },
        },
    },
]);

export const tabVariants = styleVariants({
    default: [baseTab],
    fullWidth: [
        baseTab,
        {
            '@media': {
                [mq.tabletOrSmaller]: {
                    flex: '1 1 0px',
                },
            },
        },
    ],
});

const focusOutlineStyles = {
    // the revert important! is needed to bypass the styles applied by TabFocus component
    outline: 'revert !important',
    outlineOffset: -8,
};

export const tabHover = styleVariants({
    default: [
        style({
            ':focus-visible': {
                ...focusOutlineStyles,
                color: vars.colors.textPrimary,
            },
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: vars.colors.textPrimary,
                    },
                },
            },
        }),
    ],
    inverse: [
        style({
            ':focus-visible': {
                ...focusOutlineStyles,
                color: vars.colors.textPrimaryInverse,
            },
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: vars.colors.textPrimaryInverse,
                    },
                },
            },
        }),
    ],
});

export const tabSelectionVariants = styleVariants({
    noSelected: [
        sprinkles({
            color: vars.colors.textSecondary,
        }),
    ],
    noSelectedInverse: [
        sprinkles({
            color: vars.colors.textSecondaryInverse,
        }),
    ],
    selected: [
        style({
            borderBottom: `2px solid ${vars.colors.controlActivated}`,
            color: vars.colors.textPrimary,
        }),
    ],
    selectedInverse: [
        style({
            borderBottom: `2px solid ${vars.colors.controlActivatedInverse}`,
            color: vars.colors.textPrimaryInverse,
        }),
    ],
    selectedAnimating: [
        style({
            borderBottom: '2px solid transparent',
            color: vars.colors.textPrimary,
        }),
    ],
    selectedAnimatingInverse: [
        style({
            borderBottom: '2px solid transparent',
            color: vars.colors.textPrimaryInverse,
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
});
