import {style, createVar, globalStyle, styleVariants} from '@vanilla-extract/css';

const space = createVar();

export const vars = {space};

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

export const justifyVariants = styleVariants({
    between: {
        justifyContent: 'space-between',
    },
    around: {
        justifyContent: 'space-around',
    },
    evenly: {
        justifyContent: 'space-evenly',
    },
});
