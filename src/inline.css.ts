import {style, createVar, globalStyle} from '@vanilla-extract/css';

export const space = createVar();

export const inline = style({
    flexDirection: 'row',
    gridAutoFlow: 'column',
});

export const fullWidth = style([
    inline,
    {
        display: ['flex', 'grid'],
    },
]);

export const noFullWidth = style([
    inline,
    {
        display: ['inline-flex', 'inline-grid'],
    },
]);

globalStyle(`${inline} > div:not(:empty) ~ div:not(:empty)`, {
    marginLeft: space,
});

globalStyle(`${inline} > div:empty`, {
    display: 'none',
});
