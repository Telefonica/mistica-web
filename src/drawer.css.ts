import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const ANIMATION_DURATION_MS = 400; // review

export const container = style({
    background: vars.colors.background,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    '@media': {
        [mq.tabletOrSmaller]: {
            left: 0,
            transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
        },
        [mq.desktopOrBigger]: {
            borderTopLeftRadius: vars.borderRadii.container,
            borderBottomLeftRadius: vars.borderRadii.container,
            transition: `transform ${ANIMATION_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        },
    },
});

export const open = style({
    transform: '',
});

export const closed = style({
    '@media': {
        [mq.desktopOrBigger]: {
            transform: 'translateX(100%)',
        },
        [mq.tabletOrSmaller]: {
            transform: 'translateY(100%)',
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

export const closeButton = style({
    position: 'absolute',
    top: 8,
    right: 8,
});
