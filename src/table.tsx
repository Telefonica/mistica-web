import * as React from 'react';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './table.css';
import {vars} from './skins/skin-contract.css';
import {Text1, Text2} from './text';
import {InternalBoxed} from './boxed';
import classNames from 'classnames';
import Box from './box';
import {applyCssVars} from './utils/css';
import Inline from './inline';
import {IconButton, ToggleIconButton} from './icon-button';
import {iconContainerSize, iconSize} from './icon-button.css';
import {TableActionsHeader} from './table-actions-header';
import TableCellText from './table-cell-text';

import type {CardAction} from './card-internal';
import type {DataAttributes} from './utils/types';

const TOP_ACTIONS_PADDING = {
    default: '8px',
    boxed: '16px',
};

const BORDER_SIZE = '1px';

type TextAlign = 'left' | 'right' | 'center';
type VerticalAlign = 'top' | 'middle';

type TableProps = {
    heading?: Array<React.ReactNode>;
    content?: Array<
        | Array<React.ReactNode>
        | {cells: Array<React.ReactNode>; actions: ReadonlyArray<CardAction | React.ReactElement>}
    >;
    boxed?: boolean;
    emptyCase?: React.ReactNode;
    /**
     * In mobile, the table will be scrollable horizontally by default. Alternatively, you can set it to 'collapse-rows', which will
     * render every row as a card
     */
    responsive?: 'scroll' | 'collapse-rows';
    columnTextAlign?: Array<TextAlign> | TextAlign;
    rowVerticalAlign?: VerticalAlign;
    columnWidth?: Array<number | string>;
    /**
     * By default, the table expands to all the available width, if you want the table to have the minimum width to fit the rows content, set fullWidth to false.
     * It's ignored in mobile
     */
    fullWidth?: boolean;
    /**
     * Limits the height of the table and the content will have vertical scroll.
     * It's ignored in mobile when responsive move is 'collapse-rows'
     */
    maxHeight?: number | string;
    /**
     * When rendering the table inside a responsive layout, you can enable this prop to make the table scrollable over the layout paddings
     */
    scrollOverResponsiveLayout?: boolean;
    /**
     * Used to hide headers from UI. Screen readers will still recognize them when reading an element from the table.
     */
    hideHeaders?: boolean | 'desktop' | 'mobile';
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    rowHeaderIndex?: number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};

const CellActionIconButton = (props: CardAction) => {
    // We render IconButton if Icon prop was passed. Otherwise, ToggleIconButton will be used
    return props.Icon ? (
        <IconButton
            {...props}
            aria-label={props.label}
            small
            type="neutral"
            backgroundType="transparent"
            bleedY
        />
    ) : (
        <ToggleIconButton
            {...props}
            checkedProps={{
                ...props.checkedProps,
                'aria-label': props.checkedProps.label,
                type: 'brand',
                backgroundType: 'solid',
            }}
            uncheckedProps={{
                ...props.uncheckedProps,
                'aria-label': props.uncheckedProps.label,
                type: 'neutral',
                backgroundType: 'transparent',
            }}
            small
            bleedY
        />
    );
};

const defaultTextAlign = 'left';
export const Table = React.forwardRef(
    (
        {
            dataAttributes,
            heading = [],
            content = [],
            boxed,
            responsive,
            fullWidth = true,
            maxHeight,
            emptyCase,
            columnTextAlign = defaultTextAlign,
            rowVerticalAlign = 'middle',
            columnWidth,
            hideHeaders,
            scrollOverResponsiveLayout,
            rowHeaderIndex,
            ...otherProps
        }: TableProps,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const getColumnTextAlign = (column: number) => {
            if (Array.isArray(columnTextAlign)) {
                return columnTextAlign[column] ?? defaultTextAlign;
            }
            return columnTextAlign;
        };

        const collapsedRowsMode = responsive === 'collapse-rows';
        const hideHeadersInMobile = hideHeaders === true || hideHeaders === 'mobile';
        const hideHeadersInDesktop = hideHeaders === true || hideHeaders === 'desktop';

        const hasActionsColumn = content.some((row) => !Array.isArray(row) && row.actions.length > 0);

        const table = (
            <table
                className={classNames(styles.table, {
                    [styles.boxed]: boxed,
                    [styles.collapsedRowsInMobile]: collapsedRowsMode,
                    [styles.fullWidth]: fullWidth,
                    [styles.hiddenHeadersInDesktop]: hideHeadersInDesktop,
                    [styles.hiddenHeadersInMobile]: hideHeadersInMobile || collapsedRowsMode,
                })}
                aria-label={otherProps['aria-label']}
                aria-labelledby={otherProps['aria-labelledby']}
                aria-describedby={otherProps['aria-describedby']}
            >
                {heading.length > 0 && (
                    <thead>
                        <Text1
                            as="tr"
                            medium
                            transform="uppercase"
                            color={vars.colors.textSecondary}
                            wordBreak={false}
                        >
                            {heading.map((header, idx) => (
                                <th
                                    scope="col"
                                    key={idx}
                                    className={classNames(
                                        styles.cellTextAlign[getColumnTextAlign(idx)],
                                        styles.verticalAlign[rowVerticalAlign],
                                        {
                                            [styles.rowFirstItem]: idx === 0,
                                            [styles.rowLastItem]:
                                                idx === heading.length - 1 && !hasActionsColumn,
                                        }
                                    )}
                                    style={{minWidth: columnWidth?.[idx], width: columnWidth?.[idx]}}
                                >
                                    {header}
                                </th>
                            ))}
                            {hasActionsColumn && <TableActionsHeader />}
                        </Text1>
                    </thead>
                )}
                <tbody>
                    {content.length > 0 ? (
                        content.map((row, rowIdx) => {
                            const rowCells = !Array.isArray(row) ? row.cells : row;
                            const rowActionsList = !Array.isArray(row) ? row.actions ?? [] : [];

                            const actions = (
                                <Inline space={16}>
                                    {rowActionsList.map((action, index) => {
                                        if ('Icon' in action || 'checkedProps' in action) {
                                            // action is a CellAction object
                                            return <CellActionIconButton key={index} {...action} />;
                                        }
                                        // action is a React.ReactElement
                                        return <React.Fragment key={index}>{action}</React.Fragment>;
                                    })}
                                </Inline>
                            );

                            // buttons + inline space
                            const actionsElementWidth = rowActionsList.length
                                ? `calc(${iconContainerSize.small} * ${rowActionsList.length} + 16px * ${
                                      rowActionsList.length - 1
                                  })`
                                : '0px';

                            return (
                                // Add position relative because in collapse-rows mode, actions are positioned absolutely in the row
                                <tr key={rowIdx} style={{position: 'relative'}}>
                                    {rowCells.map((cell, idx) => {
                                        const isCollapsedRowsLastItem =
                                            rowHeaderIndex === rowCells.length - 1
                                                ? idx === rowCells.length - 2 || rowCells.length === 1
                                                : idx === rowCells.length - 1;

                                        const CellComponent = idx === rowHeaderIndex ? 'th' : 'td';

                                        return (
                                            <CellComponent
                                                key={idx}
                                                className={classNames(
                                                    styles.verticalAlign[rowVerticalAlign],
                                                    {
                                                        [styles.rowFirstItem]: idx === 0,
                                                        [styles.rowLastItem]:
                                                            idx === rowCells.length - 1 && !hasActionsColumn,
                                                        [styles.rowLastCollapsedItem]:
                                                            isCollapsedRowsLastItem && collapsedRowsMode,
                                                        [styles.collapsedRowHeaderItem]:
                                                            idx === rowHeaderIndex && collapsedRowsMode,
                                                    }
                                                )}
                                                style={{
                                                    // add space between top actions and content
                                                    marginRight:
                                                        collapsedRowsMode && rowActionsList.length
                                                            ? `calc(${actionsElementWidth} + 8px)`
                                                            : undefined,
                                                }}
                                                scope={idx === rowHeaderIndex ? 'row' : undefined}
                                            >
                                                {/**
                                                 * In collapsedRowsMode, we render the row heading text before every cell content, except for the first cell
                                                 * of every row, which is rendered with a medium weight font, as it's the row title.
                                                 * */}
                                                {idx !== rowHeaderIndex &&
                                                    collapsedRowsMode &&
                                                    heading[idx] &&
                                                    !hideHeadersInMobile && (
                                                        // this is aria-hidden because screen readers already read the column heading from the th
                                                        <div className={styles.mobileCellHeading} aria-hidden>
                                                            <Text1 medium color={vars.colors.textSecondary}>
                                                                {heading[idx]}
                                                            </Text1>
                                                        </div>
                                                    )}

                                                <TableCellText
                                                    isCollapsedRowTitle={
                                                        idx === rowHeaderIndex && collapsedRowsMode
                                                    }
                                                >
                                                    <div
                                                        className={classNames(
                                                            styles.cellTextAlign[getColumnTextAlign(idx)],
                                                            {
                                                                [styles.collapsedRowTitle]:
                                                                    idx === rowHeaderIndex &&
                                                                    collapsedRowsMode,
                                                            }
                                                        )}
                                                    >
                                                        {cell}
                                                    </div>
                                                </TableCellText>
                                            </CellComponent>
                                        );
                                    })}

                                    {rowActionsList.length > 0 ? (
                                        <td
                                            className={classNames(
                                                styles.verticalAlign[rowVerticalAlign],
                                                styles.actionsTableCell,
                                                styles.rowLastItem,
                                                {
                                                    [styles.rowFirstItem]: rowCells.length === 0,
                                                }
                                            )}
                                            align="right"
                                            // add cell's left padding
                                            style={{width: `calc(${actionsElementWidth} + 12px)`}}
                                        >
                                            {actions}
                                        </td>
                                    ) : (
                                        hasActionsColumn && <td className={styles.actionsTableCell} />
                                    )}

                                    {/**
                                     * mistica.css styles are usually not loaded for unit tests in projects that use Mistica.
                                     * The row's top actions are hidden by using display: none, but if mistica.css is not used,
                                     * the buttons will be rendered twice. This can cause issues when using functions like
                                     * queryBy/findBy, because of finding multiple buttons with the same name.
                                     * In order to avoid this issue, we don't render the copy of actions in test environment.
                                     */}
                                    {process.env.NODE_ENV !== 'test' &&
                                        collapsedRowsMode &&
                                        rowActionsList.length > 0 && (
                                            <td
                                                className={styles.topActions}
                                                style={{
                                                    position: 'absolute',
                                                    top: `calc(${
                                                        boxed
                                                            ? TOP_ACTIONS_PADDING.boxed
                                                            : TOP_ACTIONS_PADDING.default
                                                    } - ${BORDER_SIZE} + (${iconContainerSize.small} - ${
                                                        iconSize.small
                                                    }) / 2)`,
                                                    right: boxed
                                                        ? `calc(${TOP_ACTIONS_PADDING.boxed} - ${BORDER_SIZE})`
                                                        : 0,
                                                    width: actionsElementWidth,
                                                }}
                                            >
                                                {actions}
                                            </td>
                                        )}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={heading.length}
                                className={classNames({[styles.rowLastCollapsedItem]: collapsedRowsMode})}
                            >
                                {typeof emptyCase === 'string' ? (
                                    <Box paddingY={56}>
                                        <Text2 regular textAlign="center" as="div">
                                            {emptyCase}
                                        </Text2>
                                    </Box>
                                ) : (
                                    emptyCase
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

        const getScrollContainerStyles = (overResponsiveLayout = false) => {
            return {
                className: classNames(styles.scrollContainer, {
                    [styles.scrollOverResponsiveLayout]: overResponsiveLayout,
                    [styles.collapsedRowsInMobile]: collapsedRowsMode,
                    [styles.fullWidth]: fullWidth,
                }),
                style: applyCssVars({
                    [styles.vars.maxHeight]:
                        typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight ?? 'auto',
                }),
            };
        };

        if (boxed) {
            return (
                <InternalBoxed
                    desktopOnly={collapsedRowsMode}
                    width="fit-content"
                    maxWidth="100%"
                    minWidth={{
                        desktop: fullWidth ? '100%' : 'auto',
                        mobile: collapsedRowsMode ? '100%' : fullWidth ? '100%' : 'auto',
                    }}
                    ref={ref}
                    dataAttributes={{'component-name': 'Table', ...dataAttributes}}
                >
                    <div {...getScrollContainerStyles()}>{table}</div>
                </InternalBoxed>
            );
        }

        return (
            <div
                ref={ref}
                {...getPrefixedDataAttributes(dataAttributes, 'Table')}
                {...getScrollContainerStyles(scrollOverResponsiveLayout)}
            >
                {table}
            </div>
        );
    }
);
