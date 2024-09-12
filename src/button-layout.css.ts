import {style, globalStyle, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import * as buttonStyles from './button.css';

const buttonLayoutSpacing = '16px';
const buttonLinkPadding = {
    default: `calc(${buttonStyles.buttonPaddingX.default} + ${buttonStyles.borderSize})`,
    small: `calc(${buttonStyles.buttonPaddingX.small} + ${buttonStyles.borderSize})`,
};

export const container = style([
    sprinkles({display: 'flex', alignItems: 'center'}),
    {
        margin: `calc(-1 * ${buttonLayoutSpacing} / 2)`, // compensates the buttons margin
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
        margin: `calc(${buttonLayoutSpacing} / 2)`,
        justifyContent: 'inherit',
    },
]);

globalStyle(`${container} > *:not(${linkBase})`, {
    margin: `calc(${buttonLayoutSpacing} / 2)`,
});

globalStyle(`${containerWithTwoButtons} > *:not(${linkBase})`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            minWidth: `calc(50% - ${buttonLayoutSpacing})`,
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

export const link = style([
    linkBase,
    {
        width: 'auto',
    },
]);

export const linkInNewLine = styleVariants({
    center: [linkBase],
    left: [
        linkBase,
        style({
            marginLeft: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.default})`,
            selectors: {
                [`&:has(${buttonStyles.smallLink})`]: {
                    marginLeft: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.small})`,
                },
            },
        }),
    ],
    right: [
        linkBase,
        style({
            marginRight: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.default})`,
            selectors: {
                [`&:has(${buttonStyles.smallLink})`]: {
                    marginRight: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.small})`,
                },
            },
        }),
    ],
    'full-width': [
        linkBase,
        style({
            selectors: {
                // in desktop, full-width is equivalent to left
                [`${alignVariant['full-width']} &`]: {
                    '@media': {
                        [mq.desktopOrBigger]: {
                            marginLeft: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.default})`,
                        },
                    },
                },

                [`${alignVariant['full-width']}:has(${buttonStyles.smallLink}) &`]: {
                    '@media': {
                        [mq.desktopOrBigger]: {
                            marginLeft: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.small})`,
                        },
                    },
                },
            },
        }),
    ],
});

export const smallLinkInNewLine = styleVariants({
    center: [linkBase],
    left: [
        linkBase,
        style({
            marginLeft: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.small})`,
        }),
    ],
    right: [
        linkBase,
        style({
            marginRight: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.small})`,
        }),
    ],
    'full-width': [
        linkBase,
        style({
            selectors: {
                // in desktop, full-width is equivalent to left
                [`${alignVariant['full-width']} &`]: {
                    '@media': {
                        [mq.desktopOrBigger]: {
                            marginLeft: `calc(${buttonLayoutSpacing} / 2 - ${buttonLinkPadding.small})`,
                        },
                    },
                },
            },
        }),
    ],
});
