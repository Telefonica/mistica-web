import {createVar, fallbackVar, globalStyle, style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';
import {vars as responsiveLayoutVars} from './responsive-layout.css';

const responsiveLayoutSideMargin = fallbackVar(responsiveLayoutVars.sideMargin, '0px');

const maxHeight = createVar();

export const vars = {maxHeight};

export const table = style({
    borderCollapse: 'separate',
    borderSpacing: 0,
    position: 'relative',
});

export const fullWidth = style({minWidth: '100%'});

// In mobile, we have 2 rendering modes: horizontal scroll, or collapsed rows. In collapsed rows mode, every row is rendered as a card
export const collapsedRowsInMobile = style({});

export const hiddenHeadersInMobile = style({});
export const hiddenHeadersInDesktop = style({});

const BOXED_PADDING_Y_DESKTOP = 8;

export const boxed = style({
    padding: '0 16px',
    paddingBottom: BOXED_PADDING_Y_DESKTOP,
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingBottom: 0,
            selectors: {
                [`${collapsedRowsInMobile}&`]: {
                    padding: 0,
                },
            },
        },
    },
});

const baseTextAlign = style({
    selectors: {
        [`${collapsedRowsInMobile} &`]: {
            '@media': {
                [mq.tabletOrSmaller]: {
                    textAlign: 'initial',
                },
            },
        },
    },
});

export const cellTextAlign = styleVariants({
    left: [baseTextAlign, {textAlign: 'left'}],
    right: [baseTextAlign, {textAlign: 'right'}],
    center: [baseTextAlign, {textAlign: 'center'}],
});

export const scrollContainer = style({
    overflowY: 'auto',
    maxHeight,
    maxWidth: '100%',
    width: 'fit-content',

    selectors: {
        [`${collapsedRowsInMobile}&`]: {
            '@media': {
                [mq.tabletOrSmaller]: {
                    minWidth: '100%', // always render the table fullWidth in mobile
                    // revert styles
                    overflow: 'visible',
                    maxHeight: 'none',
                    maxWidth: 'none',
                    width: 'auto',
                },
            },
        },
    },
});

export const scrollOverResponsiveLayout = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'flex',
            boxSizing: 'content-box', // because we need the padding to be included in the width (we need width: fit-content + paddings)
            margin: `0 calc(${responsiveLayoutSideMargin} * -1)`,
            padding: `0 ${responsiveLayoutSideMargin}`,
        },
    },
});

export const verticalAlign = styleVariants({
    top: {verticalAlign: 'top'},
    middle: {verticalAlign: 'middle'},
});

export const actionsHeaderText = style({
    position: 'absolute',
    top: -9999,
    left: -9999,
});

export const actionsTableCell = style({});
export const topActions = style({});

// we can only apply sticky head to boxed tables, because non-boxed tables don't have a background
globalStyle(`${boxed} thead`, {
    position: 'sticky',
    top: 0,
    background: skinVars.colors.backgroundContainer,
    // render on top of the table rows
    zIndex: 1,
});

const ROW_MIN_HEIGHT = 56;

globalStyle(`${table} th, ${table} td`, {
    borderBottom: `1px solid ${skinVars.colors.divider}`,
    padding: '16px 12px',
    height: ROW_MIN_HEIGHT, // height behaves like a min-height in table layout
});

globalStyle(`${boxed} thead th`, {
    '@media': {
        [mq.desktopOrBigger]: {
            paddingTop: 16 + BOXED_PADDING_Y_DESKTOP,
        },
    },
});

globalStyle(`${table} tbody tr:last-child td, ${table} tbody tr:last-child th`, {
    borderBottom: 'none',
});

globalStyle(
    `${collapsedRowsInMobile}, ${collapsedRowsInMobile} thead, ${collapsedRowsInMobile} tbody, ${collapsedRowsInMobile} th, ${collapsedRowsInMobile} td, ${collapsedRowsInMobile} tr`,
    {
        '@media': {
            [mq.tabletOrSmaller]: {
                display: 'block',
            },
        },
    }
);

globalStyle(`${collapsedRowsInMobile} tr`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            // Using flexbox so we can move the row's header to the top of the row
            display: 'flex',
            flexDirection: 'column',
        },
    },
});

export const collapsedRowHeaderItem = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            order: -1,
        },
    },
});

export const mobileCellHeading = style({
    paddingBottom: 4,
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'none',
        },
    },
});

export const collapsedRowTitle = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            fontWeight: skinVars.textPresets.cardTitle.weight,
            paddingBottom: 8,
        },
    },
});

globalStyle(`${collapsedRowsInMobile} tbody td, ${collapsedRowsInMobile} tbody th`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            verticalAlign: 'initial',
            border: 'none',
            height: 'auto', // reset min-height
            padding: '0 0 8px 0',
        },
        [mq.desktopOrBigger]: {
            marginRight: 0, // remove right space occupied by actions
        },
    },
});

globalStyle(`${table} tbody th`, {
    // Weight in th is bold if not specified, and we don't want this in the table's body
    fontWeight: 'inherit',
});

export const rowFirstItem = style({});
export const rowLastItem = style({});
export const rowLastCollapsedItem = style({});

globalStyle(`${table} ${rowFirstItem}`, {
    paddingLeft: 0,
});

globalStyle(`${table} ${rowLastItem}`, {
    paddingRight: 0,
});

globalStyle(`${collapsedRowsInMobile} ${rowLastCollapsedItem}`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingBottom: 0,
        },
    },
});

globalStyle(`${collapsedRowsInMobile} tbody tr`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            padding: '16px 0',
        },
    },
});

globalStyle(`${collapsedRowsInMobile} tbody tr:not(:last-child)`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            borderBottom: `1px solid ${skinVars.colors.divider}`,
        },
    },
});

globalStyle(`${collapsedRowsInMobile}${boxed} tbody tr`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            border: `1px solid ${skinVars.colors.border}`,
            background: skinVars.colors.backgroundContainer,
            borderRadius: skinVars.borderRadii.container,
            padding: '24px 16px',
            marginBottom: 16,
        },
    },
});

globalStyle(`${collapsedRowsInMobile}${boxed} tbody tr:last-child`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            marginBottom: 0,
        },
    },
});

// Hide headers from UI. Dont use display: none for screen readers
globalStyle(`${hiddenHeadersInDesktop} thead tr`, {
    '@media': {
        [mq.desktopOrBigger]: {
            position: 'absolute',
            top: -9999,
            left: -9999,
        },
    },
});

globalStyle(`${hiddenHeadersInMobile} thead tr`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            position: 'absolute',
            top: -9999,
            left: -9999,
        },
    },
});

// In collapse-rows mode, we don't render actions as a table cell in mobile
globalStyle(`${collapsedRowsInMobile} ${actionsTableCell}`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'none',
        },
    },
});

// In collapse-rows mode, we don't render top actions in desktop
globalStyle(`${collapsedRowsInMobile} ${topActions}`, {
    display: 'none',
    '@media': {
        [mq.tabletOrSmaller]: {
            display: 'block',
        },
    },
});
