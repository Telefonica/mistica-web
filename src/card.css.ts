import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 16},
]);

export const boxed = style([
    sprinkles({display: 'flex', position: 'relative'}),
    {
        isolation: 'isolate', // Needed to preserve border-radius with Video component and Safari
    },
]);

export const touchableContainer = style({});

export const touchable = style({
    display: 'flex',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
    padding: 0,
    border: 'none',
    background: 'transparent',
});

const touchableCardOverlayBase = style({
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    backgroundColor: 'transparent',
});

export const touchableCardOverlay = style([
    touchableCardOverlayBase,
    {
        '@media': {
            [mq.supportsHover]: {
                transition: 'all 0.1s',
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: vars.colors.backgroundContainerHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: vars.colors.backgroundContainerPressed,
                    },
                },
            },
        },
    },
]);

export const touchableCardOverlayInverse = style([
    touchableCardOverlayBase,
    {
        '@media': {
            [mq.supportsHover]: {
                transition: 'all 0.1s',
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: vars.colors.backgroundContainerBrandHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: vars.colors.backgroundContainerBrandPressed,
                    },
                },
            },
        },
    },
]);

export const touchableCardOverlayMedia = style([
    touchableCardOverlayBase,
    {
        '@media': {
            [mq.supportsHover]: {
                transition: 'all 0.1s',
                selectors: {
                    [`${touchableContainer}:hover &`]: {
                        backgroundColor: vars.colors.coverBackgroundHover,
                    },
                    [`${touchable}:active &`]: {
                        backgroundColor: vars.colors.coverBackgroundPressed,
                    },
                },
            },
        },
    },
]);

export const mediaCard = sprinkles({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
});

export const mediaCardContent = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        position: 'relative',
        paddingX: 16,
        paddingTop: 16,
        paddingBottom: 24,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    {
        zIndex: 3,
        '@media': {
            [mq.desktopOrBigger]: {
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 24,
                paddingBottom: 32,
            },
        },
    },
]);

export const dataCard = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        position: 'relative',
        paddingY: 24,
        paddingX: 16,
        flexDirection: 'column',
        width: '100%',
    }),
    {
        zIndex: 2,
        '@media': {
            [mq.desktopOrBigger]: {
                paddingTop: 32,
                paddingBottom: 32,
                paddingLeft: 24,
                paddingRight: 24,
            },
        },
    },
]);

export const snapCard = style([
    sprinkles({
        display: 'flex',
        position: 'relative',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        flex: 1,
    }),
    {
        minHeight: 80,
        minWidth: 104,
        zIndex: 2,
        '@media': {
            [mq.desktopOrBigger]: {
                padding: 24,
            },
        },
    },
]);

const snapCardTouchableBase = sprinkles({
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: 0,
    border: 'none',
    background: 'transparent',
});

export const snapCardTouchableHover = style([
    snapCardTouchableBase,
    {
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    backgroundColor: vars.colors.backgroundAlternative,
                },
            },
        },
    },
]);

export const snapCardTouchableHoverTransparent = style([
    snapCardTouchableBase,
    {
        display: 'flex',
        height: '100%',

        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    backgroundColor: 'transparent',
                },
            },
        },
    },
]);

export const displayCardContainer = sprinkles({
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
});

export const displayCardContent = style({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
    zIndex: 2,
});

export const displayCardBackground = style({
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    zIndex: 0,
});

export const displayCardGradient = style({
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 29.02%, rgba(0, 0, 0, 0.7) 100%)`,
});

export const cardActionIconButton = sprinkles({
    display: 'flex',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
});

const cardActionBase = sprinkles({
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
});

export const cardAction = style([
    cardActionBase,
    {
        background: vars.colors.backgroundContainer,
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: vars.colors.backgroundContainerHover,
                },
                ':active': {
                    background: vars.colors.backgroundContainerPressed,
                },
            },
        },
    },
]);

export const cardActionInverse = style([
    cardActionBase,
    {
        background: vars.colors.backgroundContainerBrand,
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: vars.colors.backgroundContainerBrandHover,
                },
                ':active': {
                    background: vars.colors.backgroundContainerBrandPressed,
                },
            },
        },
    },
]);

export const cardActionMedia = style([
    cardActionBase,
    {
        backgroundColor: applyAlpha(vars.rawColors.inverse, 0.7),
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    backgroundColor: applyAlpha(vars.rawColors.inverse, 0.9),
                },
                ':active': {
                    backgroundColor: applyAlpha(vars.rawColors.inverse, 1.0),
                },
            },
        },
    },
]);

export const videoAction = style([
    cardActionBase,
    {
        background: applyAlpha('#000000', 0.4),
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: applyAlpha('#000000', 0.6),
                },
            },
        },
    },
]);
