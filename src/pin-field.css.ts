import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';
import {keyframes, style} from '@vanilla-extract/css';
import {desktopFontSize, mobileFontSize} from './text-field-base.css';
import * as mq from './media-queries.css';
import {pxToRem} from './utils/css';

export const pinInputLineHeight = pxToRem(16);

export const fieldContainer = style({
    width: 'fit-content',
});

export const disabled = style({
    opacity: 0.5,
    cursor: 'default',
});

const fieldCommonStyles = style([
    sprinkles({
        border: 'input',
        display: 'flex',
        borderRadius: vars.borderRadii.input,
        position: 'relative',
        background: vars.colors.backgroundContainer,
    }),
    {
        width: `calc(${pinInputLineHeight} * 3)`,
    },
]);

export const field = fieldCommonStyles;

export const focusedField = style([
    field,
    {
        border: `1px solid ${vars.colors.controlActivated}`,
    },
]);

export const readOnlyField = style([
    fieldCommonStyles,
    {
        background: vars.colors.neutralLow,
    },
]);

export const input = style({
    textAlign: 'center',
});

export const passwordInput = sprinkles({
    color: 'transparent',
});

const passwordDotAnimation = keyframes({
    '0%': {
        scale: 0,
    },
    '100%': {
        scale: 1,
    },
});

export const passwordDot = style({
    userSelect: 'none',
    pointerEvents: 'none',
    fontFamily: 'Lucida Grande, Arial, sans-serif', // same font we use for password input
    fontSize: mobileFontSize,
    '@media': {
        [mq.desktopOrBigger]: {
            fontSize: desktopFontSize,
        },
    },
    color: vars.colors.textPrimary,
    animationName: passwordDotAnimation,
    animationDuration: '0.3s',
    animationTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
    transformOrigin: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto', // center the div
    width: pinInputLineHeight,
    height: pinInputLineHeight,
    textAlign: 'center',
});
