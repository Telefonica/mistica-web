import {globalStyle, style} from '@vanilla-extract/css';

export const container = style({
    display: 'grid',
    maxWidth: 212,
});

globalStyle(`${container} > *`, {
    gridArea: '1/1',
});

export const waveFadeOut = style({
    transition: `opacity 1.3s cubic-bezier(0.29, 0, 0.71, 1)`,
    opacity: 0,
});
