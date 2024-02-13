import {createVar, style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

const background = createVar();
const backgroundHover = createVar();
const backgroundActive = createVar();
const iconColor = createVar();

export const vars = {iconColor, background, backgroundHover, backgroundActive};

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
            [iconColor]: skinVars.colors.textButtonSecondary,
        },
    },
    'brand-soft-inverse': {
        vars: {
            [background]: skinVars.colors.backgroundContainerBrandOverInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textButtonSecondaryInverse,
        },
    },
    'brand-soft-alternative': {
        vars: {
            [background]: skinVars.colors.brandLow,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textButtonSecondary,
        },
    },

    'brand-default-default': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textButtonSecondary,
        },
    },
    'brand-default-inverse': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.textButtonSecondaryInverse,
        },
    },
    'brand-default-alternative': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.textButtonSecondary,
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

    'neutral-default-default': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.neutralHigh,
        },
    },
    'neutral-default-inverse': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerBrandHover,
            [backgroundActive]: skinVars.colors.backgroundContainerBrandPressed,
            [iconColor]: skinVars.colors.inverse,
        },
    },
    'neutral-default-alternative': {
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

    'danger-default-default': {
        vars: {
            [background]: 'transparent',
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },
    'danger-default-inverse': {
        vars: {
            [background]: skinVars.colors.buttonLinkDangerBackgroundInverse,
            [backgroundHover]: skinVars.colors.backgroundContainerHover,
            [backgroundActive]: skinVars.colors.backgroundContainerPressed,
            [iconColor]: skinVars.colors.error,
        },
    },
    'danger-default-alternative': {
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

const transitionTiming = '0.1s ease-in-out';
const minButtonArea = {
    pointer: '24px',
    touchable: '48px',
};

const iconContainerSize = {
    default: '3rem',
    small: '2rem',
};

export const iconSize = {
    default: '1.5rem',
    small: '1.25rem',
};

const pointerArea = {
    default: `calc(max(${minButtonArea.pointer}, ${iconContainerSize.default}))`,
    small: `calc(max(${minButtonArea.pointer}, ${iconContainerSize.small}))`,
};

const touchableArea = {
    default: `calc(max(${minButtonArea.touchable}, ${iconContainerSize.default}))`,
    small: `calc(max(${minButtonArea.touchable}, ${iconContainerSize.small}))`,
};

const pointerBleedArea = {
    default: `calc(-1 * (${pointerArea.default} - ${iconSize.default}) / 2)`,
    small: `calc(-1 * (${pointerArea.small} - ${iconSize.small}) / 2)`,
};

const touchableBleedArea = {
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
            width: pointerArea.default,
            height: pointerArea.default,
            '@media': {
                [mq.touchableOnly]: {
                    width: touchableArea.default,
                    height: touchableArea.default,
                },
            },
        },
    ],
    small: [
        baseButtonContainer,
        {
            width: pointerArea.small,
            height: pointerArea.small,
            '@media': {
                [mq.touchableOnly]: {
                    width: touchableArea.small,
                    height: touchableArea.small,
                },
            },
        },
    ],
});

export const bleedLeft = styleVariants({
    default: {
        marginLeft: `calc(-1 * ${pointerBleedArea.default})`,
        '@media': {
            [mq.touchableOnly]: {
                marginLeft: `calc(-1 * ${touchableBleedArea.default})`,
            },
        },
    },
    small: {
        marginLeft: `calc(-1 * ${pointerBleedArea.small})`,
        '@media': {
            [mq.touchableOnly]: {
                marginLeft: `calc(-1 * ${touchableBleedArea.small})`,
            },
        },
    },
});

export const bleedRight = styleVariants({
    default: {
        marginRight: `calc(-1 * ${pointerBleedArea.default})`,
        '@media': {
            [mq.touchableOnly]: {
                marginLeft: `calc(-1 * ${touchableBleedArea.default})`,
            },
        },
    },
    small: {
        marginRight: `calc(-1 * ${pointerBleedArea.small})`,
        '@media': {
            [mq.touchableOnly]: {
                marginLeft: `calc(-1 * ${touchableBleedArea.small})`,
            },
        },
    },
});

export const bleedY = styleVariants({
    default: {
        marginTop: `calc(-1 * ${pointerBleedArea.default})`,
        marginBottom: `calc(-1 * ${pointerBleedArea.default})`,
        '@media': {
            [mq.touchableOnly]: {
                marginTop: `calc(-1 * ${touchableBleedArea.default})`,
                marginBottom: `calc(-1 * ${touchableBleedArea.default})`,
            },
        },
    },
    small: {
        marginTop: `calc(-1 * ${pointerBleedArea.small})`,
        marginBottom: `calc(-1 * ${pointerBleedArea.small})`,
        '@media': {
            [mq.touchableOnly]: {
                marginTop: `calc(-1 * ${touchableBleedArea.small})`,
                marginBottom: `calc(-1 * ${touchableBleedArea.small})`,
            },
        },
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
        transition: `background-color ${transitionTiming}`,
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
