import {createVar, fallbackVar, style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

export const verticalSpace = createVar();
export const grid = style({
    display: 'grid',
    '@media': {
        [mq.largeDesktop]: {
            gridColumnGap: 24,
            gridTemplateColumns: 'repeat(12, 1fr)',
        },
        [mq.desktop]: {
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridColumnGap: 16,
        },
        [mq.tabletOrSmaller]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridColumnGap: 16,
            gap: fallbackVar(verticalSpace, '0px'),
        },
    },
});

export const colSpan = createVar();
export const span = style({
    '@media': {
        [mq.desktopOrBigger]: {
            gridColumn: `span ${colSpan}`,
        },
        [mq.tabletOrSmaller]: {
            gridColumn: 'span 1',
        },
    },
});
