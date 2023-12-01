import {style, createVar, globalStyle, fallbackVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const space = createVar();
const spaceMobile = createVar();
const spaceTablet = createVar();
const spaceDesktop = createVar();

export const vars = {space, spaceMobile, spaceTablet, spaceDesktop};

export const marginInline = style({
    marginTop: `calc(${space} * -1)`,
    marginLeft: `calc(${space} * -1)`,
    '@media': {
        [mq.mobile]: {
            vars: {
                [space]: spaceMobile,
            },
        },
        [mq.tablet]: {
            vars: {
                [space]: fallbackVar(spaceTablet, spaceMobile),
            },
        },
        [mq.desktopOrBigger]: {
            vars: {
                [space]: spaceDesktop,
            },
        },
    },
});

export const flexInline = style({
    justifyContent: space,
});

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

export const wrap = style([
    inline,
    {
        display: 'inline-flex',
        flexWrap: 'wrap',
    },
]);

export const noFullWidth = style([
    inline,
    {
        display: ['inline-flex', 'inline-grid'],
    },
]);

globalStyle(`${marginInline} > div`, {
    marginLeft: space,
    marginTop: space,
});

globalStyle(`${inline} > div:empty`, {
    display: 'none',
});
