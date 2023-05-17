import {assignInlineVars} from '@vanilla-extract/dynamic';
import classNames from 'classnames';
import * as React from 'react';
import * as styles from './grid.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type RowsColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Gap = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

type GridProps = {
    rows?: RowsColumns;
    columns?: RowsColumns;
    gap?: Gap | [Gap, Gap];
    flow?: 'column' | 'row' | 'column dense' | 'row dense';
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    children: React.ReactNode;
    as?: React.ComponentType<any> | string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    (
        {
            rows,
            columns,
            gap = 0,
            flow,
            width,
            height,
            minWidth,
            minHeight,
            children,
            as = 'div',
            dataAttributes,
        },
        ref
    ) => {
        const [columnGap, rowGap] = Array.isArray(gap) ? gap : [gap, gap];

        return React.createElement(
            as,
            {
                ref,
                className: classNames(
                    styles.grid,
                    columns ? styles.gridTemplateColumns[columns] : '',
                    rows ? styles.gridTemplateRows[rows] : '',
                    flow ? styles.gridAutoFlow[flow] : ''
                ),
                style: {
                    width,
                    height,
                    minWidth,
                    minHeight,
                    ...assignInlineVars({
                        [styles.vars.columnGap]: columnGap ? `${columnGap}px` : '',
                        [styles.vars.rowGap]: rowGap ? `${rowGap}px` : '',
                    }),
                },
                ...getPrefixedDataAttributes(dataAttributes),
            },
            children
        );
    }
);

type Span = RowsColumns | 'full';

type GridItemProps = {
    columnStart?: RowsColumns;
    rowStart?: RowsColumns;
    span?: [Span, Span] | Span;
    columnSpan?: Span;
    rowSpan?: Span;
    children?: React.ReactNode;
    as?: React.ComponentType<any> | string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
};

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
    ({rowStart, rowSpan, columnStart, columnSpan, span, children, as = 'div', dataAttributes}, ref) => {
        if (span) {
            if (Array.isArray(span)) {
                columnSpan = span[0];
                rowSpan = span[1];
            } else {
                columnSpan = span;
                rowSpan = span;
            }
        }

        const columnSpanClass = columnSpan
            ? columnSpan === 'full'
                ? styles.fullColumns
                : styles.spanColumns[columnSpan]
            : '';
        const rowSpanClass = rowSpan ? (rowSpan === 'full' ? styles.fullRows : styles.spanRows[rowSpan]) : '';
        const columnStartClass = columnStart ? styles.columnStart[columnStart] : '';
        const rowStartClass = rowStart ? styles.rowStart[rowStart] : '';

        return React.createElement(
            as,
            {
                ref,
                className: classNames(columnSpanClass, rowSpanClass, columnStartClass, rowStartClass),
                ...getPrefixedDataAttributes(dataAttributes),
            },
            children
        );
    }
);
