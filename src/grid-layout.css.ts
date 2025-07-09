import {createVar, fallbackVar, globalStyle, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

export const desktopSmallColumn = style({});
export const desktopMediumColumn = style({});
export const desktopLargeColumn = style({});

const verticalSpace = createVar();

const collapsedGrid = {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridColumnGap: 16,
    gap: fallbackVar(verticalSpace, '0px'),
};

export const grid = style({
    display: 'grid',
    '@media': {
        [mq.largeDesktop]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridColumnGap: 24,
        },
        [mq.desktop]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridColumnGap: 24,
        },
        [mq.tablet]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridColumnGap: 16,
        },
        [mq.mobile]: collapsedGrid,
    },
});

export const collapsedInTablet = style({
    '@media': {
        [mq.tablet]: collapsedGrid,
    },
});

const colSpan = createVar();
export const span = style({
    '@media': {
        [mq.desktopOrBigger]: {
            gridColumn: `span ${colSpan}`,
        },
        [mq.tablet]: {
            gridColumn: `span ${colSpan}`,
        },
        [mq.mobile]: {
            gridColumn: 'span 1',
        },
    },
});

globalStyle(`${collapsedInTablet} ${span}`, {
    '@media': {
        [mq.tablet]: {
            gridColumn: 'span 1',
        },
    },
});

export const vars = {colSpan, verticalSpace};
