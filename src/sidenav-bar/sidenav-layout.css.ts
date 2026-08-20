import {style} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import * as mq from '../media-queries.css';

export const DESKTOP_WIDTH = 240;
export const LARGE_DESKTOP_WIDTH = 296;
export const LARGE_DESKTOP_BREAKPOINT = 1920;

// A mobile or tablet sidenav is a top bar, and not a column, so the two regions stack there. The spec
// gives "N/A" for the width of the sidenav on both breakpoints.
export const container = style([
    sprinkles({
        display: 'flex',
    }),
    {
        height: '100%',
        width: '100%',
        minWidth: 0,
        gap: 0,
        boxSizing: 'border-box',

        '@media': {
            [mq.tabletOrSmaller]: {
                flexDirection: 'column',
                height: 'auto',
            },
        },
    },
]);

export const sidenav = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    }),
    {
        flexShrink: 0,
        width: 'auto',
        height: '100%',
        margin: 0,
        padding: 0,

        '@media': {
            [mq.tabletOrSmaller]: {
                width: '100%',
                height: 'auto',
            },
        },
    },
]);

export const content = style([
    sprinkles({
        flex: 1,
        minWidth: 0,
    }),
    {
        height: '100%',
        overflowY: 'auto',
        margin: 0,
        padding: 0,

        '@media': {
            [mq.tabletOrSmaller]: {
                height: 'auto',
                overflowY: 'visible',
            },
        },
    },
]);

export const centeredContainer = style({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const centeredResponsiveContainer = style({
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
});

export const centeredResponsiveLayout = style({
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
});
