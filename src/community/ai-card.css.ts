import {createVar, globalStyle, style, keyframes} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import {vars as skinVars} from '../skins/skin-contract.css';
import * as mq from '../media-queries.css';

const borderColorVar = createVar();

export const vars = {borderColorVar};

const fill = (color: string) => `linear-gradient(${color}, ${color}) padding-box`;
const borderLayer = `${borderColorVar} border-box`;

const containerBackground = (overlayColor: string) =>
    `${fill(overlayColor)}, ${fill(skinVars.colors.backgroundContainer)}, ${borderLayer}`;

export const container = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        width: '100%',
    }),
    {
        position: 'relative',
        maxWidth: '100%',
        minWidth: 288,
        minHeight: 64,
        gap: 8,
        borderRadius: skinVars.borderRadii.container,
        border: '1px solid transparent',
        boxSizing: 'border-box',
        textAlign: 'left',
        vars: {
            [borderColorVar]: `linear-gradient(${skinVars.colors.border}, ${skinVars.colors.border})`,
        },
        background: containerBackground('transparent'),
    },
]);

export const containerInteractive = style({
    transition: 'background 120ms ease',
    ':focus-visible': {
        outline: `2px solid ${skinVars.colors.borderSelected}`,
        outlineOffset: 2,
    },
    ':active': {
        background: containerBackground(skinVars.colors.backgroundContainerPressed),
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: containerBackground(skinVars.colors.backgroundContainerHover),
            },
            ':active': {
                background: containerBackground(skinVars.colors.backgroundContainerPressed),
            },
        },
        [mq.touchableOnly]: {
            transition: 'none',
        },
    },
});

export const textLine = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
    }),
    {
        flex: '1 1 auto',
        minWidth: 0,
        maxWidth: '100%',
    },
]);

export const slot = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    {
        flex: '0 0 auto',
        lineHeight: 0,
    },
]);

globalStyle(`${slot} > svg`, {
    display: 'block',
});

export const textWrapper = style({
    display: 'grid',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
});

const textContent = style({
    gridArea: '1 / 1',
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
});

export const ghost = style([
    textContent,
    {
        visibility: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
    },
]);

export const visibleContent = textContent;

const caretBlink = keyframes({
    '0%': {opacity: 1},
    '50%': {opacity: 0},
});

export const caret = style({
    color: skinVars.colors.textBrand,
});

export const caretHidden = style({
    visibility: 'hidden',
});

export const caretBlinking = style({
    animationName: caretBlink,
    animationDuration: '1060ms',
    animationTimingFunction: 'step-end',
    animationIterationCount: 'infinite',
});
