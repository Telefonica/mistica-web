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
        height: TAB_HEIGHT,
        position: 'relative',
        overflow: 'hidden',
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                display: 'flex',
            },
        },
    },
]);
export const inner = style([
    sprinkles({
        position: 'absolute',
        left: 0,
        right: 0,
        // this height is to hide the scrollbar
        height: 80,
    }),
    {
        // if tabs don't fit horizontally they can be scrolled
        overflowX: 'scroll',
        overflowY: 'hidden',
    },
]);
export const tabsContainer = sprinkles({
    height: TAB_HEIGHT,
    display: 'flex',
});

const baseTab = style([
    sprinkles({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        height: TAB_HEIGHT,
        backgroundColor: 'transparent',
    }),
    {
        flex: '1 0 80px',
        verticalAlign: 'baseline',
        textAlign: 'center',
        borderBottom: '2px solid transparent',
        borderTop: 'initial',
        borderRight: 'initial',
        borderLeft: 'initial',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    color: vars.colors.textPrimary,
                },
            },
            [mq.desktopOrBigger]: {
                flex: '0 1 208px',
                padding: `16px 32px`,
                maxWidth: TAB_MAX_WIDTH,
            },
        },
    },
]);

export const tabVariants = styleVariants({
    default: [
        baseTab,
        style({
            maxWidth: TAB_MAX_WIDTH,
        }),
    ],
    tabs2: [
        baseTab,
        style({
            maxWidth: [`max(50%, ${TAB_MAX_WIDTH}px)`, TAB_MAX_WIDTH], // max() is not supported by all browsers
        }),
    ],
    tabs3: [
        baseTab,
        style({
            maxWidth: [`max(33.33%, ${TAB_MAX_WIDTH}px)`, TAB_MAX_WIDTH], // max() is not supported by all browsers
        }),
    ],
});

export const tabWithIcon = style({
    flexBasis: 112,
    '@media': {
        [mq.desktopOrBigger]: {
            flexBasis: 208,
        },
    },
});

const tabSelectedBae = sprinkles({
    color: vars.colors.textPrimary,
});

export const tabSelectionVariants = styleVariants({
    noSelected: [
        sprinkles({
            color: vars.colors.textSecondary,
        }),
    ],
    selected: [
        tabSelectedBae,
        style({
            borderBottom: `2px solid ${vars.colors.controlActivated}`,
        }),
    ],
    selectedAnimating: [
        tabSelectedBae,
        style({
            borderBottom: '2px solid transparent',
        }),
    ],
});

export const icon = style({
    marginRight: 8,
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
