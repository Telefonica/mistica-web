import {style, createVar, globalStyle} from '@vanilla-extract/css';

const space = createVar();

export const vars = {space};

export const marginStack = style({});

globalStyle(`${marginStack} > div:not(:empty) ~ div:not(:empty)`, {
    marginTop: space,
});

export const flexStack = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: space,
});

globalStyle(`${flexStack} > div:empty`, {
    display: 'none',
});
