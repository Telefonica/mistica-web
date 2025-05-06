import {style, createVar, globalStyle, fallbackVar} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const space = createVar();
const spaceMobile = createVar();
const spaceTablet = createVar();
const spaceDesktop = createVar();

const verticalSpace = createVar();
const verticalSpaceMobile = createVar();
const verticalSpaceTablet = createVar();
const verticalSpaceDesktop = createVar();

export const vars = {
    space,
    spaceMobile,
    spaceTablet,
    spaceDesktop,
    verticalSpace,
    verticalSpaceMobile,
    verticalSpaceTablet,
    verticalSpaceDesktop,
};

export const marginInline = style({
    marginTop: `calc(${verticalSpace} * -1)`,
    marginLeft: `calc(${space} * -1)`,
    '@media': {
        [mq.mobile]: {
            vars: {
                [space]: spaceMobile,
                [verticalSpace]: verticalSpaceMobile,
            },
        },
        [mq.tablet]: {
            vars: {
                [space]: fallbackVar(spaceTablet, spaceMobile),
                [verticalSpace]: fallbackVar(verticalSpaceTablet, verticalSpaceMobile),
            },
        },
        [mq.desktopOrBigger]: {
            vars: {
                [space]: spaceDesktop,
                [verticalSpace]: verticalSpaceDesktop,
            },
        },
    },
});

/**
 * https://caniuse.com/flexbox-gap
 * chrome 84; safari 14.1
 */
const supportsFlexGap = '(display: flex) and (gap: 0px)';

export const inline = style({
    pointerEvents: 'none', // to prevent negative margins from affecting clickable areas
    gridAutoFlow: 'column',
    marginTop: `calc(${fallbackVar(verticalSpace, space)} * -1)`,
    marginLeft: `calc(${space} * -1)`,
    '@supports': {
        [supportsFlexGap]: {
            margin: 0, // restore
            pointerEvents: 'auto', // restore
            flexDirection: 'row',
            gap: space,
            rowGap: fallbackVar(verticalSpace, space),
        },
    },
});

export const fullWidth = style({
    /**
     * @deprecated - this should be "flex"
     * Once changed, the usages that depend on this behavior should be migrated to use <Grid>
     * See "inline-cases" private story
     */
    display: ['flex', 'grid'],
});

export const wrap = style({
    display: 'inline-flex',
    flexWrap: 'wrap',
});

export const noFullWidth = style({
    display: ['inline-flex', 'inline-grid'],
});

export const stringSpace = style({
    display: ['flex', 'grid'],
    justifyContent: space,
});

export const stringSpaceWithWrap = style({
    // if we use display: grid, the content doesn't wrap
    display: 'flex',
    justifyContent: space,
});

globalStyle(`${marginInline} > div`, {
    marginLeft: space,
    marginTop: fallbackVar(verticalSpace, space),
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
