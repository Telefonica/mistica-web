import {createVar, style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';

const ARROW_CONTAINER_SIZE = 20;
const ARROW_SIZE = 12;

const top = createVar();
const left = createVar();
const padding = createVar();
const delay = createVar();
const enterTransform = createVar();
const maxWidth = createVar();

export const tooltipVars = {
    top,
    left,
    padding,
    delay,
    enterTransform,
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
    opacity: 1,
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
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: vars.borderRadii.popup,
    background: vars.colors.backgroundContainer,
});

export const content = style({
    padding: 7,
    position: 'relative',
    minWidth: 40,
    maxWidth,
    overflow: 'hidden',
});

export const tooltipCenter = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const arrowContainer = style({
    position: 'absolute',
    width: ARROW_CONTAINER_SIZE,
    height: ARROW_CONTAINER_SIZE / 2,
    overflow: 'hidden',
});

export const arrow = style({
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    position: 'absolute',
    top: 0,
    background: vars.colors.backgroundContainer,
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    boxSizing: 'border-box',
    borderRadius: '0 0 2px 0',
});
