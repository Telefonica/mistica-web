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

const BOXED_PADDING_Y_DESKTOP = 8;

export const boxed = style({
    padding: '0 16px',
    paddingBottom: BOXED_PADDING_Y_DESKTOP,
    '@media': {
        [mq.tabletOrSmaller]: {
            padding: '0 8px',
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

// we can only apply sticky head to boxed tables, because non-boxed tables don't have a background
globalStyle(`${boxed} thead`, {
    position: 'sticky',
    top: 0,
    background: skinVars.colors.backgroundContainer,
});

const ROW_MIN_HEIGHT = 56;

globalStyle(`${table} th, ${table} td`, {
    borderBottom: `1px solid ${skinVars.colors.divider}`,
    padding: '16px 12px',
    height: ROW_MIN_HEIGHT, // height behaves like a min-height in table layout
});

globalStyle(`${boxed} th`, {
    '@media': {
        [mq.desktopOrBigger]: {
            paddingTop: 16 + BOXED_PADDING_Y_DESKTOP,
        },
    },
});

globalStyle(`${table} th:first-child, ${table} td:first-child`, {
    paddingLeft: 0,
});

globalStyle(`${table} th:last-child, ${table} td:last-child`, {
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
            height: 'auto', // reset min-height
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
