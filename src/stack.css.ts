import {style, createVar, globalStyle, fallbackVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const space = createVar();
const spaceMobile = createVar();
const spaceTablet = createVar();
const spaceDesktop = createVar();

export const vars = {space, spaceMobile, spaceTablet, spaceDesktop};

export const marginStack = style({
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
