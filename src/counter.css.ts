import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';

const transitionTiming = '0.2s ease-in-out';

export const isTrashIconVisible = style({});
export const isButtonDisabled = style({});

export const counter = style({
    height: 40,
    padding: 3,
    boxSizing: 'border-box',
    borderRadius: vars.borderRadii.button,
    background: vars.colors.backgroundContainer,
    display: 'inline-block',
    cursor: 'default',
    overflow: 'hidden',
});

export const buttonContainer = style({
    position: 'relative',
});

export const buttonIcon = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const trashButtonIcon = style([
    buttonIcon,
    {
        opacity: 0,
        transform: 'translateY(40px)',
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        selectors: {
            [`${isTrashIconVisible} &`]: {
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
    },
]);

export const decreaseButtonIcon = style([
    buttonIcon,
    {
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        selectors: {
            [`${isTrashIconVisible} &`]: {
                transform: 'translateY(-40px)',
                opacity: 0,
            },
        },
    },
]);

const baseButtonBackground = style({
    position: 'relative',
    width: 32,
    height: 32,
    borderRadius: vars.borderRadii.button,
    transform: 'scale(0)',
    transition: 'transform 0.15s ease-in-out',
});

export const defaultButtonBackground = style([
    baseButtonBackground,
    {
        background: vars.colors.brandLow,
        selectors: {
            [`${buttonContainer}:active:not(${isButtonDisabled}) &`]: {
                transform: 'scale(1.0625)',
            },
        },
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },

            [mq.supportsHover]: {
                selectors: {
                    [`${buttonContainer}:hover:not(${isButtonDisabled}) &`]: {
                        transform: 'scale(1)',
                    },
                    [`${buttonContainer}:active:not(${isButtonDisabled}) &`]: {
                        transform: 'scale(1.0625)',
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);

export const trashButtonBackground = style([
    baseButtonBackground,
    {
        background: vars.colors.errorLow,
        selectors: {
            [`${buttonContainer}:active:not(${isButtonDisabled}) &`]: {
                transform: 'scale(1.0625)',
            },
        },
        '@media': {
            ['(prefers-reduced-motion)']: {
                transition: 'none',
            },

            [mq.supportsHover]: {
                selectors: {
                    [`${buttonContainer}:hover:not(${isButtonDisabled}) &`]: {
                        transform: 'scale(1)',
                    },
                    [`${buttonContainer}:active:not(${isButtonDisabled}) &`]: {
                        transform: 'scale(1.0625)',
                    },
                },
            },
            [mq.touchableOnly]: {
                transition: 'none',
            },
        },
    },
]);
