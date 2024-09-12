import {style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';
import * as buttonStyles from './button.css';

const buttonLayoutSpacing = '16px';
const buttonLinkPadding = {
    default: `calc(${buttonStyles.buttonPaddingX.default} + ${buttonStyles.borderSize})`,
    small: `calc(${buttonStyles.buttonPaddingX.small} + ${buttonStyles.borderSize})`,
};

export const inline = style([
    sprinkles({display: 'inline-flex', alignItems: 'center', flexDirection: 'row'}),
    {
        flexWrap: 'wrap',
    },
]);

export const centerInMobile = style({
    '@media': {
        [mq.mobile]: {
            justifyContent: 'center',
        },
    },
});

export const centerInTablet = style({
    '@media': {
        [mq.tablet]: {
            justifyContent: 'center',
        },
    },
});

export const centerInDesktop = style({
    '@media': {
        [mq.desktopOrBigger]: {
            justifyContent: 'center',
        },
    },
});

export const container = style({
    marginTop: `-${buttonLayoutSpacing}`,
    marginLeft: `calc(-1 * (${buttonLayoutSpacing} + ${buttonLinkPadding.default}))`,

    selectors: {
        [`&:has(${buttonStyles.smallLink})`]: {
            marginLeft: `calc(-1 * (${buttonLayoutSpacing} + ${buttonLinkPadding.small}))`,
        },
    },
});

export const containerWithSmallLink = style({
    marginTop: `-${buttonLayoutSpacing}`,
    marginLeft: `calc(-1 * (${buttonLayoutSpacing} + ${buttonLinkPadding.small}))`,
});

export const buttons = style({
    marginLeft: buttonLinkPadding.default,
    selectors: {
        [`${container}:has(${buttonStyles.smallLink}) &`]: {
            marginLeft: buttonLinkPadding.small,
        },
    },
});

export const buttonsWithSmallLink = style({
    marginLeft: buttonLinkPadding.small,
});

export const buttonChild = style({
    marginTop: buttonLayoutSpacing,
    marginLeft: buttonLayoutSpacing,
});
