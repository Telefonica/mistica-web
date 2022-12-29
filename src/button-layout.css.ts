import {style, createVar, globalStyle, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {PADDING_Y_LINK} from './button.css';

const buttonWidth = createVar();

export const vars = {buttonWidth};

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

export const link = style([
    sprinkles({display: 'flex', width: '100%'}),
    {
        margin: buttonLayoutSpacing / 2,
        justifyContent: 'inherit',
    },
]);

export const linkAlignment = style({
    '@media': {
        [mq.desktopOrBigger]: {
            marginLeft: buttonLayoutSpacing / 2 - PADDING_Y_LINK,
        },
    },
});

export const baseContainer = style([
    sprinkles({display: 'flex'}),
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
export const noButtonWidth = style({});

globalStyle(`${container} > *:not(${link})`, {
    minWidth: buttonWidth, // needed to override button.css value
    width: `calc(50% - ${buttonLayoutSpacing}px)`,
    margin: buttonLayoutSpacing / 2,

    '@media': {
        [mq.desktopOrBigger]: {
            width: buttonWidth,
        },
    },
});

globalStyle(`${fullWidthContainer} > *:not(${link})`, {
    minWidth: buttonWidth, // needed to override button.css value
    width: `calc(100% - ${buttonLayoutSpacing}px)`,
    margin: buttonLayoutSpacing / 2,

    '@media': {
        [mq.desktopOrBigger]: {
            width: buttonWidth,
        },
    },
});

globalStyle(`${noButtonWidth} > *:not(${link})`, {
    minWidth: 'auto', // needed to override button.css value
    width: 'auto',
    margin: buttonLayoutSpacing / 2,
});

export const alignVariant = styleVariants({
    right: [sprinkles({justifyContent: 'flex-end'})],
    left: [sprinkles({justifyContent: 'flex-start'})],
    center: [sprinkles({justifyContent: 'center'})],
    'full-width': [
        sprinkles({justifyContent: 'center'}),
        {
            '@media': {
                [mq.desktopOrBigger]: {
                    justifyContent: 'flex-start',
                },
            },
        },
    ],
});

export const alignMoreThanOneChildred = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            justifyContent: 'center',
        },
    },
});
