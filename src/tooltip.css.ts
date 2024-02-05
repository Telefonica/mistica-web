import {style} from '@vanilla-extract/css';
import {vars} from './skins/skin-contract.css';
import {sprinkles} from './sprinkles.css';

export const CONTENT_MIN_WIDTH = 40;
const ARROW_CONTAINER_SIZE = 20;
const CONTENT_PADDING = 8;
const ARROW_SIZE = 12;
const BORDER_SIZE = 1;

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

export const contentContainer = style([
    sprinkles({
        position: 'relative',
        overflow: 'hidden',
    }),
    {
        minWidth: CONTENT_MIN_WIDTH - 2 * BORDER_SIZE, // border is not included in this container
    },
]);

export const content = style({
    padding: CONTENT_PADDING - BORDER_SIZE,
});

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

export const closeButtonIcon = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        top: CONTENT_PADDING - BORDER_SIZE,
        right: CONTENT_PADDING - BORDER_SIZE,
        zIndex: 1,
    },
]);
