import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars as skinVars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

const TAB_MAX_WIDTH = 284;
const TAB_HEIGHT = 56;

const borderColor = createVar();

export const vars = {
    borderColor,
};

export const outerBorder = style({
    borderBottom: `1px solid ${vars.borderColor}`,
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
                color: skinVars.colors.textPrimary,
            },
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: skinVars.colors.textPrimary,
                    },
                },
            },
        }),
    ],
    brand: [
        style({
            ':focus-visible': {
                ...focusOutlineStyles,
                color: skinVars.colors.textPrimaryBrand,
            },
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: skinVars.colors.textPrimaryBrand,
                    },
                },
            },
        }),
    ],
    negative: [
        style({
            ':focus-visible': {
                ...focusOutlineStyles,
                color: skinVars.colors.textPrimaryNegative,
            },
            '@media': {
                [mq.supportsHover]: {
                    ':hover': {
                        color: skinVars.colors.textPrimaryNegative,
                    },
                },
            },
        }),
    ],
});

export const tabSelectionVariants = styleVariants({
    noSelected: [
        sprinkles({
            color: skinVars.colors.textSecondary,
        }),
    ],
    noSelectedBrand: [
        sprinkles({
            color: skinVars.colors.textSecondaryBrand,
        }),
    ],
    noSelectedNegative: [
        sprinkles({
            color: skinVars.colors.textSecondaryNegative,
        }),
    ],
    selected: [
        style({
            borderBottom: `2px solid ${skinVars.colors.controlActivated}`,
            color: skinVars.colors.textPrimary,
        }),
    ],
    selectedBrand: [
        style({
            borderBottom: `2px solid ${skinVars.colors.controlActivatedBrand}`,
            color: skinVars.colors.textPrimaryBrand,
        }),
    ],
    selectedNegative: [
        style({
            borderBottom: `2px solid ${skinVars.colors.controlActivatedNegative}`,
            color: skinVars.colors.textPrimaryNegative,
        }),
    ],
    selectedAnimating: [
        style({
            borderBottom: '2px solid transparent',
            color: skinVars.colors.textPrimary,
        }),
    ],
    selectedAnimatingBrand: [
        style({
            borderBottom: '2px solid transparent',
            color: skinVars.colors.textPrimaryBrand,
        }),
    ],
    selectedAnimatingNegative: [
        style({
            borderBottom: '2px solid transparent',
            color: skinVars.colors.textPrimaryNegative,
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
