import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

const ARROW_CONTAINER_SIZE = 20;
const ARROW_SIZE = 12;

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

export const container = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        zIndex: 1,
        opacity: 1,
        filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
    },
]);

export const tooltip = style([
    sprinkles({
        position: 'relative',
        borderRadius: vars.borderRadii.popup,
        background: vars.colors.backgroundContainer,
    }),
    {
        // needed because the tooltip minWidth/maxWidth are being set with inline styles
        boxSizing: 'border-box',
    },
]);

export const content = style([
    sprinkles({
        position: 'relative',
        minWidth: 40,
        overflow: 'hidden',
    }),
    {
        padding: 7,
    },
]);

export const tooltipCenter = sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const arrowContainer = style([
    sprinkles({
        position: 'absolute',
        width: ARROW_CONTAINER_SIZE,
        overflow: 'hidden',
    }),
    {
        height: ARROW_CONTAINER_SIZE / 2,
    },
]);

export const arrow = style([
    sprinkles({
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        position: 'absolute',
        top: 0,
        background: vars.colors.backgroundContainer,
    }),
    {
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        boxSizing: 'border-box',
        borderRadius: '0 0 2px 0',
    },
]);
