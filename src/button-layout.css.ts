import {style, createVar, globalStyle} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

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
    marginLeft: buttonLayoutSpacing / 2 - 6,
});

export const container = style([
    sprinkles({display: 'flex'}),
    {
        flexWrap: 'wrap-reverse',
        margin: -buttonLayoutSpacing / 2,

        ':empty': {
            margin: 0,
        },
    },
]);

export const fullWidthContainer = style([
    sprinkles({display: 'flex'}),
    {
        flexWrap: 'wrap-reverse',
        margin: -buttonLayoutSpacing / 2,

        ':empty': {
            margin: 0,
        },
    },
]);

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
