import {style, globalStyle, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import {buttonPaddingX, borderSize} from './button.css';

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

export const container = style([
    sprinkles({display: 'flex', alignItems: 'center'}),
    {
        margin: -buttonLayoutSpacing / 2, // compensates the buttons margin
        flexWrap: 'wrap',

        ':empty': {
            margin: 0,
        },
    },
]);

export const containerWithTwoButtons = style({});

export const alignVariant = styleVariants({
    // the empty {} is needed because we need vanilla-extract to generate a class for every variant so we
    // can use them in the globalStyle rules below. For some reason, vanilla-extract doesn't generate new
    // classes if we only use sprinkles in the variant definition.
    right: [{}, sprinkles({justifyContent: 'flex-end'})],
    left: [{}, sprinkles({justifyContent: 'flex-start'})],
    center: [{}, sprinkles({justifyContent: 'center'})],
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

const linkBase = style([
    sprinkles({display: 'flex', width: '100%'}),
    {
        margin: buttonLayoutSpacing / 2,
        justifyContent: 'inherit',
    },
]);

globalStyle(`${container} > *:not(${linkBase})`, {
    margin: buttonLayoutSpacing / 2,
});

globalStyle(`${containerWithTwoButtons} > *:not(${linkBase})`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            minWidth: `calc(50% - ${buttonLayoutSpacing}px)`,
        },
    },
});

globalStyle(`${alignVariant['full-width']} > *:not(${linkBase})`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            width: '100%',
        },
    },
});

const bleedLeft = {
    marginLeft: `calc(${buttonLayoutSpacing}px / 2 - (${buttonPaddingX.small} + ${borderSize}))`,
};
const bleedRight = {
    marginRight: `calc(${buttonLayoutSpacing}px / 2 - (${buttonPaddingX.small} + ${borderSize}))`,
};

export const link = style([
    linkBase,
    {
        width: 'auto',
    },
]);

export const linkInNewLine = style([
    linkBase,
    {
        selectors: {
            [`${alignVariant.right} &`]: bleedRight,

            [`${alignVariant.left} &`]: bleedLeft,
            // in desktop, full-width is equivalent to left
            [`${alignVariant['full-width']} &`]: {
                '@media': {
                    [mq.desktopOrBigger]: bleedLeft,
                },
            },
        },
    },
]);
