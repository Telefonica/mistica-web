import {createVar, style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

const ARROW_SIZE = 12;

const top = createVar();
const left = createVar();
const padding = createVar();
const delay = createVar();
const enterTransform = createVar();
const maxWidth = createVar();

const arrowTop = createVar();
const arrowLeft = createVar();

export const tooltipVars = {
    top,
    left,
    padding,
    delay,
    enterTransform,
    arrowTop,
    arrowLeft,
    maxWidth,
};

export const tooltipTransitionClasses = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
    exiting: {
        opacity: 0,
    },
    exited: {
        opacity: 0,
    },
    unmounted: {},
};

export const container = style({
    top,
    left,
    zIndex: 1,
    position: 'absolute',
    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
    opacity: 0,
    padding,
    transform: enterTransform,
    cursor: 'default',
});

export const enterTransition = style({
    transition: `opacity .1s linear ${delay},transform .3s cubic-bezier(0.215,0.61,0.335,1) ${delay}`,
});

export const exitTransition = style({
    transition: `opacity .1s linear`,
});

export const tooltip = style({
    padding: 7,
    position: 'relative',
    minWidth: 40,
    maxWidth,
});

export const tooltipCenter = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const arrowContainer = style({
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    position: 'absolute',
    top: arrowTop,
    left: arrowLeft,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const arrow = style({
    width: (ARROW_SIZE / 2) * Math.sqrt(2),
    height: (ARROW_SIZE / 2) * Math.sqrt(2),
    transform: 'rotate(45deg)',
    background: vars.colors.backgroundContainer,
    boxSizing: 'border-box',
});

export const leftArrowBorder = style({
    borderTop: `1px solid ${vars.colors.border}`,
    borderRight: `1px solid ${vars.colors.border}`,
});

export const rightArrowBorder = style({
    borderBottom: `1px solid ${vars.colors.border}`,
    borderLeft: `1px solid ${vars.colors.border}`,
});

export const topArrowBorder = style({
    borderBottom: `1px solid ${vars.colors.border}`,
    borderRight: `1px solid ${vars.colors.border}`,
});

export const bottomArrowBorder = style({
    borderTop: `1px solid ${vars.colors.border}`,
    borderLeft: `1px solid ${vars.colors.border}`,
});
