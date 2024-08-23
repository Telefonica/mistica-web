import {createVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

const iconSize = createVar();
const interactiveAreaSize = createVar();

export const vars = {iconSize};

// Space between each icon
const iconSpacing = '16px';

/**
 * In touchable devices, minimum interactive area is 48px.
 * In pointer devices, minimum interactive area is 24px.
 */
const minInteractiveArea = {
    pointer: '24px',
    touchable: '48px',
};

// Minimum size of icon container so that interactive areas don't overlap
const minContainerSize = {
    pointer: `calc(${minInteractiveArea.pointer} - ${iconSpacing})`,
    touchable: `calc(${minInteractiveArea.touchable} - ${iconSpacing})`,
};

export const IconWrapper = style([
    sprinkles({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    {
        // set width and height in order to ignore inline svg extra spacing
        width: iconSize,
        height: iconSize,

        minWidth: minContainerSize.pointer,
        minHeight: minContainerSize.pointer,
        '@media': {
            [mq.touchableOnly]: {
                minWidth: minContainerSize.touchable,
                minHeight: minContainerSize.touchable,
            },
        },
    },
]);

export const halfIconContainer = sprinkles({
    position: 'relative',
});

export const halfIconInactive = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
        WebkitClipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
    },
]);

export const halfIconActive = style([
    sprinkles({
        position: 'relative',
    }),
    {
        clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
        WebkitClipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
    },
]);

export const disabled = style({
    opacity: 0.5,
});

export const firstIcon = style({});
export const lastIcon = style({});

export const touchable = style({
    vars: {
        [interactiveAreaSize]: minInteractiveArea.pointer,
    },
    '@media': {
        [mq.touchableOnly]: {
            vars: {
                [interactiveAreaSize]: minInteractiveArea.touchable,
            },
        },
    },

    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',

    '::after': {
        content: '',
        position: 'absolute',
        /**
         * min() is not supported in old browsers (https://caniuse.com/css-math-functions).
         * We don't force the minimum touchable area in that case.
         */
        top: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
        bottom: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
        left: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
        right: [0, `min(0px, calc((100% - ${interactiveAreaSize}) / 2))`],
    },

    selectors: {
        [`&:not(${disabled}):active`]: {
            transform: 'scale(1.2)',
        },

        // Add extra width on the left/right of interactive area so that we cover the space between icons
        [`&:not(${firstIcon}):after`]: {
            left: [
                `calc(-1 * ${iconSpacing} / 2)`,
                `min(calc(-1 * ${iconSpacing} / 2), calc((100% - ${interactiveAreaSize}) / 2))`,
            ],
        },
        [`&:not(${lastIcon}):after`]: {
            right: [
                `calc(-1 * ${iconSpacing} / 2)`,
                `min(calc(-1 * ${iconSpacing} / 2), calc((100% - ${interactiveAreaSize}) / 2))`,
            ],
        },
    },
});
