import {style, createVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const mobileSize = createVar();
const desktopSize = createVar();
const mobileLineHeight = createVar();
const desktopLineHeight = createVar();
const lineClamp = createVar();

export const vars = {
    mobileSize,
    desktopSize,
    mobileLineHeight,
    desktopLineHeight,
    lineClamp,
};

export const withWordBreak = style({
    overflowWrap: 'anywhere',
    '@supports': {
        'not (overflow-wrap: anywhere)': {
            // "overflow-wrap: anywhere" is not supported in Safari
            // "word-break: break-word" has the same effect as "word-break: normal" and "overflow-wrap: anywhere",
            // regardless of the actual value of the overflow-wrap property.
            wordBreak: 'break-word',
        },
    },
});

export const withoutWordBreak = style({
    overflowWrap: 'inherit',
    '@supports': {
        'not (overflow-wrap: anywhere)': {
            wordBreak: 'inherit',
        },
    },
});

export const text = style({
    fontSize: desktopSize,
    lineHeight: desktopLineHeight,

    '@media': {
        [mq.tabletOrSmaller]: {
            lineHeight: mobileLineHeight,
            fontSize: mobileSize,
        },
    },
});

export const truncate = style({
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: lineClamp,
    lineClamp,
    WebkitBoxOrient: 'vertical',
    boxOrient: 'vertical',
});

export const truncateToOneLine = style([
    truncate,
    {
        wordBreak: 'break-all',
        '@supports': {
            '(overflow-wrap: anywhere)': {
                overflowWrap: 'anywhere',
                wordBreak: 'break-all',
            },
        },
    },
]);

export const truncateToMoreThanOneLine = style([
    truncate,
    {
        wordBreak: 'break-word',
        '@supports': {
            '(overflow-wrap: anywhere)': {
                overflowWrap: 'anywhere',
                wordBreak: 'normal',
            },
        },
    },
]);
