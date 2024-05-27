import {createVar, globalStyle, style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';
import {vars as skinVars} from './skins/skin-contract.css';

const maxHeight = createVar();

export const vars = {maxHeight};

export const table = style({
    borderCollapse: 'separate',
    borderSpacing: 0,
    position: 'relative',
    '@media': {
        [mq.tabletOrSmaller]: {
            minWidth: '100%', // always render the table fullWidth in mobile
        },
    },
});

export const fullWidth = style({minWidth: '100%'});
export const boxed = style({});

// In mobile, we have 2 rendering modes: horizontal scroll, or collapsed rows. In collapsed rows mode, every row is rendered as a card
export const collapsedRowsInMobile = style({});

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
                    // revert styles
                    overflow: 'visible',
                    maxHeight: 'auto',
                    maxWidth: 'auto',
                    width: 'auto',
                },
            },
        },
    },
});

// we can only apply sticky head to boxed tables, because non-boxed tables don't have a background
globalStyle(`${boxed} thead`, {
    position: 'sticky',
    top: 0,
    background: skinVars.colors.backgroundContainer,
});

globalStyle(`${table} th, ${table} td`, {
    borderBottom: `1px solid ${skinVars.colors.divider}`,
    padding: '16px 12px',
    minHeight: 56,
    verticalAlign: 'middle',
});

globalStyle(`${table}:not(${boxed}) th:first-child, ${table}:not(${boxed}) td:first-child`, {
    paddingLeft: 0,
});

globalStyle(`${table}:not(${boxed}) th:last-child, ${table}:not(${boxed}) td:last-child`, {
    paddingRight: 0,
});

globalStyle(`${table} tr:last-child td`, {
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

export const mobileCellHeading = style({
    paddingBottom: 4,
    '@media': {
        [mq.desktopOrBigger]: {
            display: 'none',
        },
    },
});

export const collapsedRowTittle = style({
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingBottom: 8,
        },
        [mq.desktopOrBigger]: {
            // revert the medium weight to regular in desktop
            fontWeight: 400,
        },
    },
});

globalStyle(`${collapsedRowsInMobile} tbody td`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            verticalAlign: 'initial',
            border: 'none',
            minHeight: 0,
            padding: '0 0 8px 0',
        },
    },
});

globalStyle(`${collapsedRowsInMobile} tbody td:last-child`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingBottom: '0',
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

globalStyle(`${collapsedRowsInMobile} tbody tr:first-child`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingTop: 0,
        },
    },
});

globalStyle(`${collapsedRowsInMobile} tbody tr:last-child`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            paddingBottom: 0,
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
            padding: 16,
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

// hide thead in mobile when collapse-rows responsive mode is active. Dont use display: none for screen readers
globalStyle(`${collapsedRowsInMobile} thead tr`, {
    '@media': {
        [mq.tabletOrSmaller]: {
            position: 'absolute',
            top: -9999,
            left: -9999,
        },
    },
});
