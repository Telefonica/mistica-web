import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';

const transitionTiming = '0.2s ease-in-out';
const BUTTON_SIZE = 32;
const TOUCHABLE_AREA_WIDTH = 40;

export const hasTrashIcon = style({});
export const isButtonDisabled = style({});

export const counter = style({
    padding: 3,
    boxSizing: 'border-box',
    borderRadius: vars.borderRadii.button,
    background: vars.colors.backgroundContainer,
    display: 'inline-flex',
    cursor: 'default',
    overflow: 'hidden',
});

export const disabled = style({
    opacity: '50%',
});

export const valueContainer = style({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
});

export const buttonContainer = style({
    position: 'relative',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
});

export const button = style({
    position: 'absolute',
    top: -(TOUCHABLE_AREA_WIDTH - BUTTON_SIZE) / 2,
    left: -(TOUCHABLE_AREA_WIDTH - BUTTON_SIZE) / 2,
    width: TOUCHABLE_AREA_WIDTH,
    height: TOUCHABLE_AREA_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const defaultButtonIcon = style([
    {
        position: 'absolute',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
]);

export const trashButtonIcon = style([
    defaultButtonIcon,
    {
        pointerEvents: 'none',
        opacity: 0,
        transform: `translateY(100%)`,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        selectors: {
            [`${hasTrashIcon} &`]: {
                pointerEvents: 'auto',
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
    },
]);

export const decreaseButtonIcon = style([
    defaultButtonIcon,
    {
        pointerEvents: 'auto',
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        selectors: {
            [`${hasTrashIcon} &`]: {
                pointerEvents: 'none',
                transform: `translateY(-100%)`,
                opacity: 0,
            },
        },
    },
]);

export const buttonBackground = style({
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    position: 'absolute',
    borderRadius: vars.borderRadii.button,
    transform: 'scale(0)',
    transition: `transform ${transitionTiming}, background ${transitionTiming}`,
    background: vars.colors.brandLow,

    selectors: {
        [`${buttonContainer}:active:not(${isButtonDisabled}) &`]: {
            transform: 'scale(1.06)',
        },
        [`${hasTrashIcon} &`]: {
            background: vars.colors.errorLow,
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
                    transform: 'scale(1.06)',
                },
                [`${hasTrashIcon} &`]: {
                    background: vars.colors.errorLow,
                },
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});
