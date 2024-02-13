import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

const iconColor = createVar();
const background = createVar();
const backgroundHover = createVar();
const backgroundActive = createVar();

export const vars = {iconColor, background, backgroundHover, backgroundActive};

export const disabled = style({
    opacity: 0.5,
});

export const isLoading = style({});
export const overlayContainer = style({});

const transitionTiming = '0.1s ease-in-out';
const minTouchableArea = '48px';

const iconContainerSize = {
    default: '3rem',
    small: '2rem',
};

export const iconSize = {
    default: '1.5rem',
    small: '1.25rem',
};

const touchableArea = {
    default: `calc(max(${minTouchableArea}, ${iconContainerSize.default}))`,
    small: `calc(max(${minTouchableArea}, ${iconContainerSize.small}))`,
};

export const bleedArea = {
    default: `calc(-1 * (${touchableArea.default} - ${iconSize.default}) / 2)`,
    small: `calc(-1 * (${touchableArea.small} - ${iconSize.small}) / 2)`,
};

const baseButtonContainer = sprinkles({
    padding: 0,
    border: 'none',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const buttonContainer = styleVariants({
    default: [
        baseButtonContainer,
        {
            width: touchableArea.default,
            height: touchableArea.default,
        },
    ],
    small: [
        baseButtonContainer,
        {
            width: touchableArea.small,
            height: touchableArea.small,
        },
    ],
});

const baseIconContainer = style([
    sprinkles({
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    }),
    {
        backgroundColor: background,
    },
]);

export const iconContainer = styleVariants({
    default: [
        baseIconContainer,
        {
            width: iconContainerSize.default,
            height: iconContainerSize.default,
        },
    ],
    small: [
        baseIconContainer,
        {
            width: iconContainerSize.small,
            height: iconContainerSize.small,
        },
    ],
});

export const overlay = style({
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    transition: `background-color ${transitionTiming}`,

    selectors: {
        [`${overlayContainer}:active &`]: {
            backgroundColor: backgroundActive,
        },
    },

    '@media': {
        [mq.supportsHover]: {
            selectors: {
                [`${overlayContainer}:hover &`]: {
                    backgroundColor: backgroundHover,
                },
                [`${overlayContainer}:active &`]: {
                    backgroundColor: backgroundActive,
                },
            },
        },
    },
});

export const icon = style([
    sprinkles({
        position: 'relative',
        display: 'inline-flex',
    }),
    {
        zIndex: 1,
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}, color ${transitionTiming}`,
        color: iconColor,

        selectors: {
            [`${isLoading} &`]: {
                transform: 'translateY(-2rem)',
                opacity: 0,
            },
        },
    },
]);

export const spinner = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        zIndex: 1,
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}, color ${transitionTiming}`,
        color: iconColor,

        selectors: {
            [`${isLoading} &`]: {
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
    },
]);

export const oldIconButtonBase = style([
    sprinkles({
        display: 'inline-block',
    }),
    {
        border: 0,
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
    },
]);
