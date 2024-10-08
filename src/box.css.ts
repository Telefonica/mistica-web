import {createVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const paddingTop = {
    desktop: createVar(),
    tablet: createVar(),
    mobile: createVar(),
};

const paddingBottom = {
    desktop: createVar(),
    tablet: createVar(),
    mobile: createVar(),
};

const paddingLeft = {
    desktop: createVar(),
    tablet: createVar(),
    mobile: createVar(),
};

const paddingRight = {
    desktop: createVar(),
    tablet: createVar(),
    mobile: createVar(),
};

export const vars = {paddingTop, paddingBottom, paddingLeft, paddingRight};

export const box = style({
    paddingTop: paddingTop.mobile,
    paddingBottom: paddingBottom.mobile,
    paddingLeft: paddingLeft.mobile,
    paddingRight: paddingRight.mobile,

    '@media': {
        [mq.tablet]: {
            paddingTop: paddingTop.tablet,
            paddingBottom: paddingBottom.tablet,
            paddingLeft: paddingLeft.tablet,
            paddingRight: paddingRight.tablet,
        },

        [mq.desktopOrBigger]: {
            paddingTop: paddingTop.desktop,
            paddingBottom: paddingBottom.desktop,
            paddingLeft: paddingLeft.desktop,
            paddingRight: paddingRight.desktop,
        },
    },
});
