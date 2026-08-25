import {style} from '@vanilla-extract/css';
import {sprinkles} from '../sprinkles.css';
import * as mq from '../media-queries.css';

// A mobile or tablet sidenav is a top bar, and not a column, so the two regions stack there. The spec
// gives "N/A" for the width of the sidenav on both breakpoints.
// The layout does not own a scroll region: the document scrolls, and the rail sticks to the top of the
// viewport (see `sidenav`). A single, isolated `overflow: auto` content region has no keyboard access when
// its content holds no focusable element, so axe reports `scrollable-region-focusable`. Every other page
// layout of the repo scrolls the document as well.
export const container = style([
    sprinkles({
        display: 'flex',
    }),
    {
        width: '100%',
        minWidth: 0,
        gap: 0,
        boxSizing: 'border-box',

        '@media': {
            [mq.tabletOrSmaller]: {
                flexDirection: 'column',
            },
        },
    },
]);

// The rail sticks to the top of the viewport and keeps the height of the viewport, so it stays in place
// while the document scrolls the content beside it. `alignSelf: flex-start` stops the flex row from
// stretching the rail to the height of a tall content column, which would leave the sticky rail with no
// room to travel. On tablet or smaller the rail is a top bar that stacks above the content, so it flows
// with the document instead.
export const sidenav = style([
    sprinkles({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    }),
    {
        flexShrink: 0,
        width: 'auto',
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        margin: 0,
        padding: 0,
        // Firefox keeps a cached layer for a sticky column and does not always invalidate its right edge
        // when a child changes: toggling the boxed border leaves the 1px edge half painted until the next
        // repaint. A dedicated compositor layer makes Firefox repaint the column as one unit and removes the
        // artifact. The only fixed descendant (the collapsed panel) renders through a Portal, so this
        // layer does not change its containing block.
        willChange: 'transform',

        '@media': {
            [mq.tabletOrSmaller]: {
                position: 'static',
                width: '100%',
                height: 'auto',
                alignSelf: 'auto',
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
        margin: 0,
        padding: 0,
    },
]);

export const centeredResponsiveLayout = style({
    display: 'flex',
    flexDirection: 'column',
});
