import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const ANIMATION_DURATION_MS = 400; // review

export const container = style({
    position: 'fixed',
    display: 'flex',
    paddingBottom: 'env(safe-area-inset-bottom)',
    background: vars.colors.background,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    '@media': {
        [mq.mobile]: {
            left: 0,
            transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
        },
        [mq.tabletOrBigger]: {
            borderTopLeftRadius: vars.borderRadii.container,
            borderBottomLeftRadius: vars.borderRadii.container,
            transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        },
    },
});

export const drawer = style([
    sprinkles({
        paddingTop: 40,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    }),
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                paddingBottom: 16 - 8,
            },
            [mq.desktopOrBigger]: {
                paddingBottom: 24 - 8,
            },
        },
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
    transform: '',
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

export const closeButtonContainer = style({
    position: 'absolute',
    top: 8,
    right: 8,
});