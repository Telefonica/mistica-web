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

/**
 * https://caniuse.com/flexbox-gap
 * chrome 84; safari 14.1
 */
const supportsFlexGap = '(display: flex) and (gap: 0px)';

export const inline = style({
    pointerEvents: 'none', // to prevent negative margins from affecting clickable areas
    gridAutoFlow: 'column',
    marginTop: `calc(${space} * -1)`,
    marginLeft: `calc(${space} * -1)`,
    '@supports': {
        [supportsFlexGap]: {
            margin: 0, // restore
            pointerEvents: 'auto', // restore
            display: 'inline-flex',
            flexDirection: 'row',
            gap: space,
        },
    },
});

export const fullWidth = style([
    inline,
    {
        display: ['flex', 'grid'],
        '@supports': {
            [supportsFlexGap]: {
                display: 'flex',
            },
        },
    },
]);

export const wrap = style([
    inline,
    {
        flexWrap: 'wrap',
    },
]);

export const noFullWidth = style([
    inline,
    {
        display: ['inline-flex', 'inline-grid'],
        '@supports': {
            [supportsFlexGap]: {
                display: 'inline-flex',
            },
        },
    },
]);

globalStyle(`${marginInline} > div`, {
    marginLeft: space,
    marginTop: space,
});

globalStyle(`${inline} > div`, {
    pointerEvents: 'auto', // restore pointer events for children
    // Hack to fix https://jira.tid.es/browse/WEB-1683
    // In iOS the inline component sometimes cuts the last line of the content
    paddingBottom: 1,
    '@supports': {
        [supportsFlexGap]: {
            padding: 0, // restore
            // negative gap is not supported in flexbox, so we use negative margins instead
            margin: `0 0 0 calc(min(${space}, 0px))`,
        },
    },
});

globalStyle(`${inline} > div:first-child`, {
    marginLeft: space,
    '@supports': {
        [supportsFlexGap]: {
            marginLeft: 0,
        },
    },
});

globalStyle(`${inline} > div:empty`, {
    display: 'none',
});
