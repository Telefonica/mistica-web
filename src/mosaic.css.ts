import {style} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const GRID_GAP_DESKTOP = 16;
const GRID_GAP_MOBILE = 8;

/** Aspect ratio = 1/1 */
export const squareContainer = style({
    width: '100%',
    position: 'relative',
    ':before': {
        float: 'left',
        content: '""',
        paddingTop: '100%',
    },
    ':after': {
        display: 'block',
        content: '""',
        clear: 'both',
    },
});

/** Aspect ratio = 2/1, but considering the grip gap */
export const singleItemRowContainer = style({
    width: '100%',
    position: 'relative',
    ':before': {
        float: 'left',
        content: '""',
        paddingTop: `calc(50% - ${GRID_GAP_DESKTOP / 2}px)`,
    },
    ':after': {
        display: 'block',
        content: '""',
        clear: 'both',
    },

    '@media': {
        [mq.tabletOrSmaller]: {
            ':before': {
                float: 'left',
                content: '""',
                paddingTop: `calc(50% - ${GRID_GAP_MOBILE / 2}px)`,
            },
        },
    },
});

/** Aspect ratio = 2/3, but considering the grip gap */
export const fourItemsContainer = style({
    width: '100%',
    position: 'relative',
    ':before': {
        float: 'left',
        content: '""',
        paddingTop: `calc(150% + ${GRID_GAP_DESKTOP / 2}px)`,
    },
    ':after': {
        display: 'block',
        content: '""',
        clear: 'both',
    },

    '@media': {
        [mq.tabletOrSmaller]: {
            ':before': {
                float: 'left',
                content: '""',
                paddingTop: `calc(150% + ${GRID_GAP_MOBILE / 2}px)`,
            },
        },
    },
});
