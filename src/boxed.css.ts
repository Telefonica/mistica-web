import {createVar, style} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import * as mq from './media-queries.css';

const width = createVar();
const height = createVar();
const minHeight = createVar();
const maxWidth = createVar();
const minWidth = createVar();

export const vars = {width, height, minHeight, maxWidth, minWidth};

export const boxed = style({
    width,
    height,
    minHeight,
    maxWidth,
    minWidth,
});

export const boxBorder = sprinkles({
    border: 'regular',
});

export const desktopOnly = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            border: 'none',
            borderRadius: 0,
            background: 'initial',
            width: 'auto',
            height: 'auto',
            minHeight: 'auto',
            maxWidth: 'auto',
            minWidth: 'auto',
        },
    },
});
