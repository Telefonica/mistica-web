import {style, createVar, globalStyle, styleVariants} from '@vanilla-extract/css';

const space = createVar();

export const vars = {space};

export const inline = style({
    flexDirection: 'row',
    gridAutoFlow: 'column',
    marginTop: `calc(${space} * -1)`,
    marginLeft: `calc(${space} * -1)`,
});

export const fullWidth = style([
    inline,
    {
        display: ['flex', 'grid'],
    },
]);

export const wrap = style([
    inline,
    {
        display: 'flex',
        flexWrap: 'wrap',
    },
]);

export const noFullWidth = style([
    inline,
    {
        display: ['inline-flex', 'inline-grid'],
    },
]);

globalStyle(`${inline} > div`, {
    marginLeft: space,
    marginTop: space,
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
