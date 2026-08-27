import {style, createVar, fallbackVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

import type {ComplexStyleRule} from '@vanilla-extract/css';

const mobileSize = createVar();
const desktopSize = createVar();
const mobileLineHeight = createVar();
const desktopLineHeight = createVar();
const mobileLetterSpacing = createVar();
const desktopLetterSpacing = createVar();
const lineClamp = createVar();

export const vars = {
    mobileSize,
    desktopSize,
    mobileLineHeight,
    desktopLineHeight,
    mobileLetterSpacing,
    desktopLetterSpacing,
    lineClamp,
};

export const withWordBreak = style({
    overflowWrap: 'anywhere',
    wordBreak: ['keep-all', 'auto-phrase'],
} as ComplexStyleRule);

export const withoutWordBreak = style({
    overflowWrap: 'inherit',
    '@supports': {
        'not (overflow-wrap: anywhere)': {
            wordBreak: 'inherit',
        },
    },
});

export const text = style({
    margin: 0, // Needed to reset the default browser margin that adds to p, h1, h2... elements.
    fontSize: desktopSize,
    lineHeight: desktopLineHeight,
    letterSpacing: fallbackVar(desktopLetterSpacing, 'normal'),
    textSizeAdjust: '100%',
    WebkitTextSizeAdjust: '100%',

    '@media': {
        [mq.tabletOrSmaller]: {
            lineHeight: mobileLineHeight,
            fontSize: mobileSize,
            letterSpacing: fallbackVar(mobileLetterSpacing, 'normal'),
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

export const truncateToOneLine = style({
    wordBreak: 'break-all',
});
