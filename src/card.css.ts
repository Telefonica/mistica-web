import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, alignItems: 'flex-end'}),
    {marginTop: 16},
]);

export const boxed = sprinkles({display: 'flex', width: '100%', height: '100%'});

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

const snapCardTouchableBase = sprinkles({display: 'flex', height: '100%'});

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
