import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 16},
]);

export const boxed = sprinkles({display: 'flex'});

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
        paddingX: 16,
        paddingTop: 16,
        paddingBottom: 24,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    {
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
        paddingY: 24,
        paddingX: 16,
        flexDirection: 'column',
        width: '100%',
    }),
    {
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
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        flex: 1,
    }),
    {
        minHeight: 80,
        minWidth: 104,

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

export const displayCard = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    {
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
]);

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
                    background: vars.colors.backgroundAlternative,
                },
            },
        },
    },
]);

export const cardActionInverse = style([
    cardActionBase,
    {
        background: applyAlpha(vars.rawColors.backgroundContainer, 0.7),
        transition: 'background-color 0.2s ease-in-out',
        '@media': {
            [mq.supportsHover]: {
                ':hover': {
                    background: applyAlpha(vars.rawColors.backgroundContainer, 0.9),
                },
            },
        },
    },
]);
