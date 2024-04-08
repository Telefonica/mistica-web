import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

const colorTransitionTiming = '0.1s ease-in-out';
const contentTransitionTiming = '0.3s cubic-bezier(0.77, 0, 0.175, 1)';

const background = createVar();
const backgroundHover = createVar();
const backgroundActive = createVar();
const iconColor = createVar();

export const iconButtonTokens = styleVariants({
    'brand-solid-default': {
        vars: {
            [background]: skinVars.colors.buttonPrimaryBackground,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textButtonPrimary,
        },
    },
    'brand-solid-inverse': {
        vars: {
            [background]: skinVars.colors.buttonPrimaryBackgroundInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textButtonPrimaryInverse,
        },
    },
    'brand-solid-alternative': {
        vars: {
            [background]: skinVars.colors.buttonPrimaryBackground,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textButtonPrimary,
        },
    },

    'brand-soft-default': {
        vars: {
            [background]: skinVars.colors.brandLow,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textLink,
        },
    },
    'brand-soft-inverse': {
        vars: {
            [background]: skinVars.colors.backgroundContainerBrandOverInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textLinkInverse,
        },
    },
    'brand-soft-alternative': {
        vars: {
            [background]: skinVars.colors.brandLow,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textLink,
        },
    },

    'brand-transparent-default': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textLink,
        },
    },
    'brand-transparent-inverse': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textLinkInverse,
        },
    },
    'brand-transparent-alternative': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textLink,
        },
    },

    'neutral-solid-default': {
        vars: {
            [background]: skinVars.colors.neutralHigh,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.neutralLow,
        },
    },
    'neutral-solid-inverse': {
        vars: {
            [background]: skinVars.colors.inverse,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: 'black',
        },
    },
    'neutral-solid-alternative': {
        vars: {
            [background]: skinVars.colors.neutralHigh,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.neutralLow,
        },
    },

    'neutral-soft-default': {
        vars: {
            [background]: skinVars.colors.neutralLow,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.neutralHigh,
        },
    },
    'neutral-soft-inverse': {
        vars: {
            [background]: skinVars.colors.backgroundContainerBrandOverInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textButtonSecondaryInverse,
        },
    },
    'neutral-soft-alternative': {
        vars: {
            [background]: skinVars.colors.neutralLowAlternative,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textButtonSecondary,
        },
    },

    'neutral-transparent-default': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.neutralHigh,
        },
    },
    'neutral-transparent-inverse': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.inverse,
        },
    },
    'neutral-transparent-alternative': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.neutralHigh,
        },
    },

    'danger-solid-default': {
        vars: {
            [background]: skinVars.colors.buttonDangerBackground,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.inverse,
        },
    },
    'danger-solid-inverse': {
        vars: {
            [background]: skinVars.colors.buttonDangerBackground,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.inverse,
        },
    },
    'danger-solid-alternative': {
        vars: {
            [background]: skinVars.colors.buttonDangerBackground,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.inverse,
        },
    },

    'danger-soft-default': {
        vars: {
            [background]: skinVars.colors.errorLow,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },
    'danger-soft-inverse': {
        vars: {
            [background]: skinVars.colors.buttonLinkDangerBackgroundInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },
    'danger-soft-alternative': {
        vars: {
            [background]: skinVars.colors.errorLow,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },

    'danger-transparent-default': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },
    'danger-transparent-inverse': {
        vars: {
            [background]: skinVars.colors.buttonLinkDangerBackgroundInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },
    'danger-transparent-alternative': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },

    'brand-media': {
        vars: {
            [background]: applyAlpha(skinVars.rawColors.inverse, 0.7),
            [backgroundHover]: applyAlpha(skinVars.rawColors.inverse, 0.9),
            [backgroundActive]: applyAlpha(skinVars.rawColors.inverse, 1.0),
            [iconColor]: skinVars.colors.brand,
        },
    },
    'neutral-media': {
        vars: {
            [background]: applyAlpha(skinVars.rawColors.inverse, 0.7),
            [backgroundHover]: applyAlpha(skinVars.rawColors.inverse, 0.9),
            [backgroundActive]: applyAlpha(skinVars.rawColors.inverse, 1.0),
            [iconColor]: 'black',
        },
    },
    'danger-media': {
        vars: {
            [background]: applyAlpha(skinVars.rawColors.inverse, 0.7),
            [backgroundHover]: applyAlpha(skinVars.rawColors.inverse, 0.9),
            [backgroundActive]: applyAlpha(skinVars.rawColors.inverse, 1.0),
            [iconColor]: skinVars.colors.error,
        },
    },
});

export const disabled = style({
    opacity: 0.5,
});

export const isLoading = style({});
export const overlayContainer = style({});

export const iconSize = {
    default: '1.5rem',
    small: '1.25rem',
};

export const iconContainerSize = {
    default: `calc(${iconSize.default} + 24px)`,
    small: `calc(${iconSize.small} + 12px)`,
};

const bleedArea = {
    default: `calc((${iconContainerSize.default} - ${iconSize.default}) / 2)`,
    small: `calc((${iconContainerSize.small} - ${iconSize.small}) / 2)`,
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
            width: iconContainerSize.default,
            height: iconContainerSize.default,
        },
    ],
    small: [
        baseButtonContainer,
        {
            width: iconContainerSize.small,
            height: iconContainerSize.small,
        },
    ],
});

/**
 * In touchable devices, minimum interactive area of 48px.
 * In pointer devices, minimum interactive area is 24px.
 */

const minButtonArea = {
    pointer: '24px',
    touchable: '48px',
};

const interactiveAreaSize = createVar();

export const minimumInteractiveArea = style({
    vars: {
        [interactiveAreaSize]: minButtonArea.pointer,
    },
    '@media': {
        [mq.touchableOnly]: {
            vars: {
                [interactiveAreaSize]: minButtonArea.touchable,
            },
        },
    },

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
});

export const bleedLeft = styleVariants({
    default: {
        marginLeft: `calc(-1 * ${bleedArea.default})`,
    },
    small: {
        marginLeft: `calc(-1 * ${bleedArea.small})`,
    },
});

export const bleedRight = styleVariants({
    default: {
        marginRight: `calc(-1 * ${bleedArea.default})`,
    },
    small: {
        marginRight: `calc(-1 * ${bleedArea.small})`,
    },
});

export const bleedY = styleVariants({
    default: {
        marginTop: `calc(-1 * ${bleedArea.default})`,
        marginBottom: `calc(-1 * ${bleedArea.default})`,
    },
    small: {
        marginTop: `calc(-1 * ${bleedArea.small})`,
        marginBottom: `calc(-1 * ${bleedArea.small})`,
    },
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
        transition: `background-color ${colorTransitionTiming}`,
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
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    transition: `background-color ${colorTransitionTiming}`,

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
        opacity: 1,
        transition: `opacity ${contentTransitionTiming}, transform ${contentTransitionTiming}, color ${colorTransitionTiming}`,
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
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${contentTransitionTiming}, transform ${contentTransitionTiming}, color ${colorTransitionTiming}`,
        color: iconColor,

        selectors: {
            [`${isLoading} &`]: {
                transform: 'translateY(0)',
                opacity: 1,
            },
        },
    },
]);

export const deprecatedIconButtonBase = style([
    sprinkles({
        display: 'inline-block',
    }),
    {
        border: 0,
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
    },
]);
