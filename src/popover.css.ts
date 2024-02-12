import {style} from '@vanilla-extract/css';

const CONTENT_PADDING = 16;
const BORDER_SIZE = 1;

export const content = style({
    padding: CONTENT_PADDING - BORDER_SIZE,
});
