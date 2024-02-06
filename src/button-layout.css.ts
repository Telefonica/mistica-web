import {style, globalStyle, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {PADDING_X_LINK} from './button.css';

const buttonLayoutSpacing = 16;

export const margins = style({
    margin: '16px 0',
    padding: '0 16px',

    '@media': {
        [mq.tabletOrSmaller]: {
            padding: 0,
            margin: 16,
        },
    },
});

const linkBase = style([
    {
        margin: buttonLayoutSpacing / 2,
        justifyContent: 'inherit',
        '@media': {
            [mq.desktopOrBigger]: {
                flexDirection: 'row-reverse',
            },
        },
    },
    sprinkles({display: 'flex', width: '100%'}),
]);

export const link = style([
    linkBase,
    {
        '@media': {
            [mq.desktopOrBigger]: {
                width: 'auto',
            },
        },
    },
]);

export const linkWithTwoButtons = linkBase;

export const linkAlignment = style({
    '@media': {
        [mq.desktopOrBigger]: {
            marginLeft: buttonLayoutSpacing / 2 - PADDING_X_LINK,
        },
    },
});

export const baseContainer = style([
    sprinkles({display: 'flex', alignItems: 'center'}),
    {
        flexWrap: 'wrap-reverse',
        margin: -buttonLayoutSpacing / 2,

        ':empty': {
            margin: 0,
        },
    },
]);

export const container = style({});
export const fullWidthContainer = style({});

globalStyle(`${container} > *:not(${linkBase})`, {
    margin: buttonLayoutSpacing / 2,
    '@media': {
        [mq.tabletOrSmaller]: {
            minWidth: `calc(50% - ${buttonLayoutSpacing}px)`,
        },
    },
});

globalStyle(`${fullWidthContainer} > *:not(${linkBase})`, {
    margin: buttonLayoutSpacing / 2,
    '@media': {
        [mq.tabletOrSmaller]: {
            width: `calc(100% - ${buttonLayoutSpacing}px)`,
        },
    },
});

export const alignVariant = styleVariants({
    right: [
        sprinkles({justifyContent: 'flex-end'}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-start',
                },
            },
        },
    ],
    left: [
        sprinkles({justifyContent: 'flex-start'}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                },
            },
        },
    ],
    center: [
        sprinkles({justifyContent: 'center'}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    flexDirection: 'row-reverse',
                },
            },
        },
    ],
    'full-width': [
        sprinkles({justifyContent: 'center'}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                },
            },
        },
    ],
});

export const alignMoreThanOneChildren = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            justifyContent: 'center',
        },
    },
});
