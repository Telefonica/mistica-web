import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const ANIMATION_DURATION_MS = 350;
const WIDTH_CONTENT = 388;

export const container = style([
    sprinkles({
        position: 'fixed',
        display: 'flex',
        background: vars.colors.background,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    }),
    {
        left: 0,
        transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.5, 0, 0.5, 1)`,
        paddingBottom: 'env(safe-area-inset-bottom)',
        '@media': {
            [mq.tabletOrBigger]: {
                left: 'auto',
                borderTopLeftRadius: vars.borderRadii.container,
                borderBottomLeftRadius: vars.borderRadii.container,
                minWidth: `calc(${WIDTH_CONTENT}px + ${vars.spacing.drawerPadding.left} + ${vars.spacing.drawerPadding.right})`,
                maxWidth: 'calc(100vw - 40px)',
            },
        },
    },
]);

export const drawer = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    }),
    {
        paddingTop: vars.spacing.drawerPadding.top,
    },
]);

export const titleContainer = style([
    sprinkles({
        flexShrink: 0,
        flexGrow: 0,
    }),
    {
        marginBottom: 16,
    },
]);

export const scrollableSection = style([
    sprinkles({
        flexGrow: 1,
        overflowY: 'auto',
    }),
]);

export const open = style({
    transform: 'initial',
});

export const closed = style({
    '@media': {
        [mq.mobile]: {
            transform: 'translateY(100%)',
        },
        [mq.tabletOrBigger]: {
            transform: 'translateX(100%)',
        },
    },
});

export const overlay = style([
    sprinkles({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: vars.colors.backgroundOverlay,
    }),
    {
        transition: `opacity ${ANIMATION_DURATION_MS}ms`,
        touchAction: 'none',
    },
]);

export const overlayClosed = style({
    opacity: 0,
});

export const overlayOpen = style({
    opacity: 1,
});

export const closeButtonContainer = sprinkles({
    position: 'absolute',
    top: 8,
    right: 8,
});

export const horizontalPadding = style({
    paddingLeft: vars.spacing.drawerPadding.left,
    paddingRight: vars.spacing.drawerPadding.right,
});

export const bottomPadding = style({
    paddingBottom: vars.spacing.drawerPadding.bottom,
});

export const buttonsLayoutContainer = style({
    padding: `16px ${vars.spacing.drawerPadding.right} ${vars.spacing.drawerPadding.bottom} ${vars.spacing.drawerPadding.left}`,
    '@media': {
        [mq.tabletOrBigger]: {
            padding: `24px ${vars.spacing.drawerPadding.right} ${vars.spacing.drawerPadding.bottom} ${vars.spacing.drawerPadding.left}`,
        },
    },
});
