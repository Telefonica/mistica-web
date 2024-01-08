import {style, createVar, globalStyle, styleVariants} from '@vanilla-extract/css';

const space = createVar();

export const vars = {space};

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

globalStyle(`${inline} > div`, {
    marginLeft: space,
    marginTop: space,
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
