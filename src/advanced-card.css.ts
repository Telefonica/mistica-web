import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {vars} from './skins/skin-contract.css';
import {applyAlpha} from './utils/color';

export const actions = style([
    sprinkles({display: 'flex', flex: 1, justifyContent: 'space-between'}),
    {marginTop: 16},
]);

export const footerText = style([
    {
        height: '40px',
        width: '100%',
        flex: '1',
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
    },
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
        paddingTop: 8,
        paddingBottom: 24,
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
