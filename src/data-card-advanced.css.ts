import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

export const actions = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    }),
    {flexWrap: 'wrap'},
]);

export const boxed = style([
    sprinkles({display: 'flex'}),
    {
        isolation: 'isolate', // Needed to preserve border-radius with Video component and Safari
    },
]);

export const dataCard = style([
    sprinkles({
        display: 'flex',
        flex: 1,
        paddingBottom: 24,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingTop: 8,
        paddingX: 16,
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
    {
        minHeight: '216px',
    },
]);

const cardActionBase = sprinkles({
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
});

export const cardActionIconButton = sprinkles({
    display: 'flex',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
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

export const TouchableZone = style([
    sprinkles({height: '100%', flex: 1}),
    {display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignContent: 'flex-start'},
]);

export const slots = style([
    sprinkles({
        paddingTop: 16,
        paddingBottom: 24,
    }),
]);

export const footerText = style([
    {
        width: 'auto',
        height: 'auto',

        display: 'flex',
        flex: '1',

        lineClamp: '2',
        boxOrient: 'vertical',

        alignItems: 'center',

        minHeight: '40px',
        maxHeight: '40px',

        overflowY: 'hidden',
        overflowWrap: 'break-word',
    },
]);
