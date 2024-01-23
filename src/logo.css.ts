import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const size = createVar();
const sizeMobile = createVar();
const sizeTablet = createVar();
const sizeDesktop = createVar();
export const vars = {size, sizeMobile, sizeTablet, sizeDesktop};

export const svg = style({
    height: size,
    '@media': {
        [mq.mobile]: {
            vars: {
                [size]: sizeMobile,
            },
        },
        [mq.tablet]: {
            vars: {
                [size]: fallbackVar(sizeTablet, sizeMobile),
            },
        },
        [mq.desktopOrBigger]: {
            vars: {
                [size]: sizeDesktop,
            },
        },
    },
});

export const logoContainer = style({
    maxWidth: 'max-content',
});
