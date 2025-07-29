import {createVar, fallbackVar, style, styleVariants} from '@vanilla-extract/css';
import * as mq from './media-queries.css';

const rowMinSize = createVar();
const rowMaxSize = createVar();
const columnMinSize = createVar();
const columnMaxSize = createVar();

const columnGap = {
    desktop: createVar(),
    tablet: createVar(),
    mobile: createVar(),
};

const rowGap = {
    desktop: createVar(),
    tablet: createVar(),
    mobile: createVar(),
};

export const vars = {rowMinSize, rowMaxSize, columnMinSize, columnMaxSize};
export const gapVars = {columnGap, rowGap};

export const grid = style({
    display: 'grid',
    // just in case grid is rendered as <ul>, reset default browser styles
    listStyle: 'none',
    padding: 0,
    margin: 0,
});

export const gap = style({
    columnGap: columnGap.mobile,
    rowGap: rowGap.mobile,

    // Chrome 57-65 support
    gridColumnGap: columnGap.mobile,
    gridRowGap: rowGap.mobile,

    '@media': {
        [mq.tablet]: {
            columnGap: columnGap.tablet,
            rowGap: rowGap.tablet,
            gridColumnGap: columnGap.tablet,
            gridRowGap: rowGap.tablet,
        },

        [mq.desktopOrBigger]: {
            columnGap: columnGap.desktop,
            rowGap: rowGap.desktop,
            gridColumnGap: columnGap.desktop,
            gridRowGap: rowGap.desktop,
        },
    },
});

const cells = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
} as const;

export const gridTemplateColumnsAutoRepeat = style({
    gridTemplateColumns: `repeat(auto-fill, minmax(${fallbackVar(columnMinSize, '0')}, ${fallbackVar(
        columnMaxSize,
        '1fr'
    )}))`,
});

export const gridTemplateRowsAutoRepeat = style({
    gridTemplateRows: `repeat(auto-fill, minmax(${fallbackVar(rowMinSize, '0')}, ${fallbackVar(
        rowMaxSize,
        '1fr'
    )}))`,
});

export const gridTemplateColumns = styleVariants(cells, (value) => ({
    gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))`,
}));

export const gridTemplateRows = styleVariants(cells, (value) => ({
    gridTemplateRows: `repeat(${value}, minmax(0, 1fr))`,
}));

export const gridAutoFlow = styleVariants(
    {
        column: 'column',
        row: 'row',
        'row dense': 'row dense',
        'column dense': 'column dense',
    },
    (value) => ({
        gridAutoFlow: value,
    })
);

export const gridJustifyItems = styleVariants(
    {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
    },
    (value) => ({
        justifyItems: value,
    })
);

export const gridAlignItems = styleVariants(
    {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
    },
    (value) => ({
        alignItems: value,
    })
);

export const gridJustifyContent = styleVariants(
    {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
        'space-between': 'space-between',
        'space-around': 'space-around',
        'space-evenly': 'space-evenly',
    },
    (value) => ({
        justifyContent: value,
    })
);

export const gridAlignContent = styleVariants(
    {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
        'space-between': 'space-between',
        'space-around': 'space-around',
        'space-evenly': 'space-evenly',
    },
    (value) => ({
        alignContent: value,
    })
);

export const fullColumns = style({gridColumn: '1 / -1'});
export const fullRows = style({gridRow: '1 / -1'});

export const spanColumns = styleVariants(cells, (column) => ({
    gridColumn: `span ${column} / span ${column}`,
}));

export const spanRows = styleVariants(cells, (row) => ({
    gridRow: `span ${row} / span ${row}`,
}));

export const columnStart = styleVariants(cells, (column) => ({
    gridColumnStart: column,
}));

export const rowStart = styleVariants(cells, (row) => ({
    gridRowStart: row,
}));

export const justifySelf = styleVariants(
    {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
    },
    (value) => ({
        justifySelf: value,
    })
);

export const alignSelf = styleVariants(
    {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
    },
    (value) => ({
        alignSelf: value,
    })
);
