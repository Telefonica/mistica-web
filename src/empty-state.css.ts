import {style, createVar, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {sprinkles} from './sprinkles.css';
import * as skin from './skins/skin-contract.css';

const backgroundColor = createVar();

export const vars = {backgroundColor};

export const container = style([
    sprinkles({
        display: 'flex',
        background: 'transparent',
    }),
    {
        flexDirection: 'column-reverse',

        '@media': {
            [mq.tabletOrSmaller]: {
                border: 'none',
                maxWidth: 368,
            },
            [mq.desktopOrBigger]: {
                borderRadius: skin.vars.borderRadii.legacyDisplay,
                flexDirection: 'row',
                overflow: 'hidden',
                backgroundColor,
            },
        },
    },
]);

export const contentVariants = styleVariants({
    default: {
        marginTop: 0,
        '@media': {
            [mq.desktopOrBigger]: {
                margin: 64,
            },
        },
    },
    largeImage: {
        marginTop: 24,
        '@media': {
            [mq.desktopOrBigger]: {
                margin: 64,
            },
        },
    },
});

export const largeImageContainer = style({
    '@media': {
        [mq.desktopOrBigger]: {
            position: 'absolute',
            height: '100%',
        },
    },
});

export const largeImage = style([
    sprinkles({
        height: '100%',
    }),
    {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '@media': {
            [mq.desktopOrBigger]: {
                backgroundSize: 'contain',
                backgroundPosition: 'bottom right',
            },
        },
    },
]);

export const assetContainer = style([
    sprinkles({
        width: 64,
        height: 64,
    }),
    {
        '@media': {
            [mq.desktopOrBigger]: {
                width: 80,
                height: 80,
            },
        },
    },
]);

export const smallImage = style([
    sprinkles({
        display: 'block', // to avoid letter's descenders bottom space
    }),
    {
        height: 112,

        '@media': {
            [mq.desktopOrBigger]: {
                height: 128,
            },
        },
    },
]);

export const border = sprinkles({
    border: 'regular',
});

export const inverseBorder = style({
    border: `1px solid ${skin.vars.colors.backgroundContainer}`,
});
