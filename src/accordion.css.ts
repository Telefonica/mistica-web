import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const accordionContent = sprinkles({
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

const basePanel = style({
    display: 'grid',
    transition: 'grid-template-rows 0.4s',
});

export const openPanel = style([
    basePanel,
    {
        gridTemplateRows: '1fr',
    },
]);

export const closePanel = style([
    basePanel,
    {
        gridTemplateRows: '0fr',
    },
]);

export const panelContent = style({
    overflow: 'hidden',
});
