import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

const width = createVar();
const height = createVar();
const minHeight = createVar();
const maxWidth = createVar();
const minWidth = createVar();
const mobile = {
    width: createVar(),
    height: createVar(),
    minHeight: createVar(),
    maxWidth: createVar(),
    minWidth: createVar(),
};
const tablet = {
    width: createVar(),
    height: createVar(),
    minHeight: createVar(),
    maxWidth: createVar(),
    minWidth: createVar(),
};
const desktop = {
    width: createVar(),
    height: createVar(),
    minHeight: createVar(),
    maxWidth: createVar(),
    minWidth: createVar(),
};
const background = createVar();
const borderRadius = createVar();

export const vars = {
    width,
    height,
    minHeight,
    maxWidth,
    minWidth,
    mobile,
    tablet,
    desktop,
    background,
    borderRadius,
};

export const boxed = style({
    width,
    height,
    minHeight,
    maxWidth,
    minWidth,
    background,
    borderRadius,

    '@media': {
        [mq.mobile]: {
            vars: {
                [width]: mobile.width,
                [height]: mobile.height,
                [minHeight]: mobile.minHeight,
                [maxWidth]: mobile.maxWidth,
                [minWidth]: mobile.minWidth,
            },
        },
        [mq.tablet]: {
            vars: {
                [width]: fallbackVar(tablet.width, mobile.width),
                [height]: fallbackVar(tablet.height, mobile.height),
                [minHeight]: fallbackVar(tablet.minHeight, mobile.minHeight),
                [maxWidth]: fallbackVar(tablet.maxWidth, mobile.maxWidth),
                [minWidth]: fallbackVar(tablet.minWidth, mobile.minWidth),
            },
        },
        [mq.desktopOrBigger]: {
            vars: {
                [width]: desktop.width,
                [height]: desktop.height,
                [minHeight]: desktop.minHeight,
                [maxWidth]: desktop.maxWidth,
                [minWidth]: desktop.minWidth,
            },
        },
    },
});

export const overflowHidden = sprinkles({overflow: 'hidden'});

export const boxBorder = sprinkles({
    border: 'regular',
});

export const desktopOnly = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            border: 'none',
            borderRadius: 0,
            background: 'initial',
        },
        [mq.mobile]: {
            vars: {
                [width]: fallbackVar(mobile.width, 'auto'),
                [height]: fallbackVar(mobile.height, 'auto'),
                [minHeight]: fallbackVar(mobile.minHeight, 'auto'),
                [maxWidth]: fallbackVar(mobile.maxWidth, 'none'),
                [minWidth]: fallbackVar(mobile.minWidth, 'auto'),
            },
        },
        [mq.tablet]: {
            vars: {
                [width]: fallbackVar(tablet.width, mobile.width, 'auto'),
                [height]: fallbackVar(tablet.height, mobile.height, 'auto'),
                [minHeight]: fallbackVar(tablet.minHeight, mobile.minHeight, 'auto'),
                [maxWidth]: fallbackVar(tablet.maxWidth, mobile.maxWidth, 'none'),
                [minWidth]: fallbackVar(tablet.minWidth, mobile.minWidth, 'auto'),
            },
        },
        [mq.desktopOrBigger]: {
            vars: {
                [width]: fallbackVar(desktop.width, 'auto'),
                [height]: fallbackVar(desktop.height, 'auto'),
                [minHeight]: fallbackVar(desktop.minHeight, 'auto'),
                [maxWidth]: fallbackVar(desktop.maxWidth, 'none'),
                [minWidth]: fallbackVar(desktop.minWidth, 'auto'),
            },
        },
    },
});

export const noBorder = sprinkles({
    border: 'none',
});
