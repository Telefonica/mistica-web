import {createVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

const buttonLayoutSpacing = '16px';
const buttonLinkPadding = createVar();

export const vars = {buttonLinkPadding};

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
    marginLeft: `calc(-1 * ${buttonLayoutSpacing})`,
});

export const buttonChild = style({
    marginTop: buttonLayoutSpacing,
    marginLeft: buttonLayoutSpacing,
});
