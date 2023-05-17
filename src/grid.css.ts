import {createVar, style, styleVariants} from '@vanilla-extract/css';

const rowGap = createVar();
const columnGap = createVar();

export const vars = {rowGap, columnGap};

export const grid = style({
    display: 'grid',
    columnGap,
    rowGap,
    // Chrome 57-65 support:
    gridColumnGap: columnGap,
    gridRowGap: rowGap,
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
