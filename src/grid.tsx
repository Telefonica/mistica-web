import classNames from 'classnames';
import * as React from 'react';
import * as styles from './grid.css';
import {applyCssVars} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {ByBreakpoint, DataAttributes} from './utils/types';

type RowsColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Gap = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

const getAutoRepeatVars = (rows?: RowsColumns | AutoFillConfig, columns?: RowsColumns | AutoFillConfig) => {
    const autoRepeatVars: Record<string, string> = {};

    const normalizeMinSize = (size: string | number): string => {
        if (typeof size === 'number') {
            return `min(${size}px, 100%)`;
        }
        return size;
    };

    const normalizeMaxSize = (size: string | number): string => {
        if (typeof size === 'number') {
            return `${size}px`;
        }
        return size;
    };

    if (rows && typeof rows !== 'number') {
        if (typeof rows.minSize !== 'undefined') {
            autoRepeatVars[styles.vars.rowMinSize] = normalizeMinSize(rows.minSize);
        }
        if (typeof rows.maxSize !== 'undefined') {
            autoRepeatVars[styles.vars.rowMaxSize] = normalizeMaxSize(rows.maxSize);
        }
    }

    if (columns && typeof columns !== 'number') {
        if (typeof columns.minSize !== 'undefined') {
            autoRepeatVars[styles.vars.columnMinSize] = normalizeMinSize(columns.minSize);
        }
        if (typeof columns.maxSize !== 'undefined') {
            autoRepeatVars[styles.vars.columnMaxSize] = normalizeMaxSize(columns.maxSize);
        }
    }
    return autoRepeatVars;
};

type AutoFillConfig = {
    minSize?: string | number;
    /**
     * default: 1fr
     */
    maxSize?: string | number;
};

type GridProps = {
    rows?: RowsColumns | AutoFillConfig;
    columns?: RowsColumns | AutoFillConfig;
    gap?: ByBreakpoint<Gap> | [ByBreakpoint<Gap>, ByBreakpoint<Gap>];
    flow?: 'column' | 'row' | 'column dense' | 'row dense';
    justifyItems?: 'start' | 'end' | 'center' | 'stretch';
    alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    justifyContent?:
        | 'start'
        | 'end'
        | 'center'
        | 'stretch'
        | 'space-around'
        | 'space-between'
        | 'space-evenly';
    alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
    height?: string | number;
    minHeight?: string | number;
    children: React.ReactNode;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
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
            justifyItems,
            alignItems,
            justifyContent,
            alignContent,
            height,
            minHeight,
            children,
            as = 'div',
            role,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            dataAttributes,
        },
        ref
    ) => {
        const [columnGap, rowGap] = Array.isArray(gap) ? gap : [gap, gap];

        const columnGapValues =
            typeof columnGap === 'object'
                ? columnGap
                : {mobile: columnGap, tablet: columnGap, desktop: columnGap};

        const rowGapValues =
            typeof rowGap === 'object' ? rowGap : {mobile: rowGap, tablet: rowGap, desktop: rowGap};

        const applyGapVars = (
            vars: (typeof styles.gapVars)[keyof typeof styles.gapVars],
            values: {mobile: Gap; tablet?: Gap; desktop: Gap}
        ) => {
            return applyCssVars({
                [vars.mobile]: `${values.mobile}px`,
                [vars.tablet]: `${values.tablet ?? values.mobile}px`,
                [vars.desktop]: `${values.desktop}px`,
            });
        };

        return React.createElement(
            as,
            {
                ref,
                className: classNames(
                    styles.grid,
                    styles.gap,
                    columns
                        ? typeof columns === 'number'
                            ? styles.gridTemplateColumns[columns]
                            : styles.gridTemplateColumnsAutoRepeat
                        : '',
                    rows
                        ? typeof rows === 'number'
                            ? styles.gridTemplateRows[rows]
                            : styles.gridTemplateRowsAutoRepeat
                        : '',
                    flow ? styles.gridAutoFlow[flow] : '',
                    justifyItems ? styles.gridJustifyItems[justifyItems] : '',
                    alignItems ? styles.gridAlignItems[alignItems] : '',
                    justifyContent ? styles.gridJustifyContent[justifyContent] : '',
                    alignContent ? styles.gridAlignContent[alignContent] : ''
                ),
                style: {
                    height,
                    minHeight,
                    ...applyGapVars(styles.gapVars.columnGap, columnGapValues),
                    ...applyGapVars(styles.gapVars.rowGap, rowGapValues),
                    ...applyCssVars({
                        ...getAutoRepeatVars(rows, columns),
                    }),
                },
                ...getPrefixedDataAttributes(dataAttributes),
                // role="list" is needed in <ul> for accessibility in Safari+VoiceOver. See: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility
                role: role ?? (as === 'ul' ? 'list' : undefined),
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledby,
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
    justifySelf?: 'start' | 'end' | 'center' | 'stretch';
    alignSelf?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    children?: React.ReactNode;
    as?: React.ComponentType<any> | string;
    order?: number;
    role?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
};

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
    (
        {
            rowStart,
            rowSpan,
            columnStart,
            columnSpan,
            span,
            justifySelf,
            alignSelf,
            children,
            as = 'div',
            order,
            role,
            dataAttributes,
        },
        ref
    ) => {
        if (span) {
            if (Array.isArray(span)) {
                columnSpan = span[0];
                rowSpan = span[1];
            } else {
                columnSpan = span;
                rowSpan = span;
            }
        }

        return React.createElement(
            as,
            {
                ref,
                className: classNames(
                    columnSpan
                        ? columnSpan === 'full'
                            ? styles.fullColumns
                            : styles.spanColumns[columnSpan]
                        : '',
                    rowSpan ? (rowSpan === 'full' ? styles.fullRows : styles.spanRows[rowSpan]) : '',
                    columnStart ? styles.columnStart[columnStart] : '',
                    rowStart ? styles.rowStart[rowStart] : '',
                    justifySelf ? styles.justifySelf[justifySelf] : '',
                    alignSelf ? styles.alignSelf[alignSelf] : ''
                ),
                style: {
                    order,
                },
                role,
                ...getPrefixedDataAttributes(dataAttributes),
            },
            children
        );
    }
);
