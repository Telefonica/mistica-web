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
    '@media': {
        [mq.supportsHover]: {
            transition: 'background-color 0.1s ease-in-out',
            ':hover': {
                background: vars.colors.backgroundContainerHover,
            },
            ':active': {
                background: vars.colors.backgroundContainerPressed,
            },
        },
    },
});

export const touchableBackgroundInverse = style({
    '@media': {
        [mq.supportsHover]: {
            transition: 'background-color 0.1s ease-in-out',
            ':hover': {
                background: vars.colors.backgroundContainerBrandHover,
            },
            ':active': {
                background: vars.colors.backgroundContainerBrandPressed,
            },
        },
    },
});

export const chevronContainer = style({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
});

export const openChevron = style({
    display: 'flex',
    transition: 'transform 0.4s',
    transform: 'rotate(-90deg)',
});

export const closeChevron = style({
    display: 'flex',
    transition: 'transform 0.4s',
    transform: 'rotate(90deg)',
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
    }),
    exit: style({
        gridTemplateRows: '1fr',
    }),
    exitActive: style({
        gridTemplateRows: '0fr',
        transition: 'grid-template-rows 0.4s',
    }),
};

export const panel = style({
    overflow: 'hidden',
});
