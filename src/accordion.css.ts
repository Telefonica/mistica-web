import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const itemContent = sprinkles({
    width: '100%',
    border: 'none',
    background: 'transparent',
    display: 'block',
    height: '100%',
    padding: 0,
});

export const touchableBackground = style({
    transition: 'background-color 0.1s ease-in-out',
    ':active': {
        background: vars.colors.backgroundContainerPressed,
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.backgroundContainerHover,
            },
            ':active': {
                background: vars.colors.backgroundContainerPressed,
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const touchableBackgroundInverse = style({
    transition: 'background-color 0.1s ease-in-out',
    ':active': {
        background: vars.colors.backgroundContainerBrandPressed,
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: vars.colors.backgroundContainerBrandHover,
            },
            ':active': {
                background: vars.colors.backgroundContainerBrandPressed,
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const chevronContainer = style({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
});

export const panelContainer = style({
    display: 'grid',
});

export const panelTransitionClasses = {
    enter: style({
        gridTemplateRows: '0fr',
    }),
    enterActive: style({
        gridTemplateRows: '1fr',
        transition: 'grid-template-rows 0.4s',
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    }),
    exit: style({
        gridTemplateRows: '1fr',
    }),
    exitActive: style({
        gridTemplateRows: '0fr',
        transition: 'grid-template-rows 0.4s',
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },
        },
    }),
};

export const panel = style({
    overflow: 'hidden',
});
