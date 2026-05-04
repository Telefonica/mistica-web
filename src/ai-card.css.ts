import {globalStyle, style, keyframes} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import * as mq from './media-queries.css';

const fill = (color: string) => `linear-gradient(${color}, ${color}) padding-box`;
const border = `linear-gradient(200deg, var(--vivoPurple600, rgba(174, 66, 228, 0.35)) 17.51%, var(--vivoPurple500, rgba(189, 74, 255, 0.35)) 38.3%, var(--vivoPink500, rgba(235, 60, 125, 0.35)) 82.5%) border-box`;

const gradientBackground = (overlayColor: string) =>
    `${fill(overlayColor)}, ${fill(vars.colors.backgroundContainer)}, ${border}`;

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
        borderRadius: vars.borderRadii.container,
        border: '1px solid transparent',
        boxSizing: 'border-box',
        textAlign: 'left',
        background: gradientBackground('transparent'),
    },
]);

export const containerInteractive = style({
    transition: 'background 120ms ease',
    ':focus-visible': {
        outline: `2px solid ${vars.colors.borderSelected}`,
        outlineOffset: 2,
    },
    ':active': {
        background: gradientBackground(vars.colors.backgroundContainerPressed),
    },
    '@media': {
        [mq.supportsHover]: {
            ':hover': {
                background: gradientBackground(vars.colors.backgroundContainerHover),
            },
            ':active': {
                background: gradientBackground(vars.colors.backgroundContainerPressed),
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
    color: vars.colors.textBrand,
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
