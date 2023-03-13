import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const defaultPositionDesktop = 'bottom';
export const defaultPositionMobile = 'top';
export const arrowSize = 12;
export const distanceToTarget = 8 + arrowSize;
export const marginLeftRightMobile = 16;
export const maxWidthDesktop = 488;
const arrowWrapperWidth = arrowSize * 2;
const arrowWrapperHeight = arrowSize;

export const arrow = style([
    sprinkles({
        position: 'absolute',
        top: 0,
        border: 'regular',
        borderRadius: 2,
        background: vars.colors.backgroundContainer,
    }),
    {
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
    },
]);

export const arrowWrapper = style([
    sprinkles({
        position: 'absolute',
        color: vars.colors.backgroundContainer,
        overflow: 'hidden',
    }),
    {
        width: arrowWrapperWidth,
        height: arrowWrapperHeight,
    },
]);

export const container = style([
    sprinkles({
        position: 'absolute',
        width: 'auto',
        background: vars.colors.backgroundContainer,
        border: 'regular',
        borderRadius: 16,
    }),
    {
        zIndex: 9,
    },
]);

export const textAlign = sprinkles({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
});

export const textContent = style({
    textAlign: 'left',
    width: '100%',
    wordBreak: 'break-word',
});

export const closeButtonIcon = style([
    sprinkles({
        position: 'absolute',
        top: 8,
        right: 8,
    }),
    {
        zIndex: 1,
    },
]);
