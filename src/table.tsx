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
import {iconContainerSize} from './icon-button.css';

import type {CardAction} from './card';
import type {DataAttributes} from './utils/types';

type TextAlign = 'left' | 'right' | 'center';
type VerticalAlign = 'top' | 'middle';

type TableProps = {
    heading?: Array<React.ReactNode>;
    content?: Array<
        Array<React.ReactNode> | {cells: Array<React.ReactNode>; actions: ReadonlyArray<CardAction>}
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
     * by default, the table expands to all the available width, if you want the table to have the minimum width to fit the rows content, set fullWidth to false.
     * It's ignored in mobile
     */
    fullWidth?: boolean;
    /**
     * Limits the height of the table and the content will have vertical scroll.
     * It's ignored in mobile when responsive move is 'collapse-rows'
     */
    maxHeight?: number | string;
    /**
     * when rendering the table inside a responsive layout, you can enable this prop to make the table scrollable over the layout paddings
     */
    scrollOverResponsiveLayout?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};

const CellActionIconButton = (props: CardAction) => {
    // we render IconButton if Icon prop was passed. Otherwise, ToggleIconButton will be used
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
            scrollOverResponsiveLayout,
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

        const hasActionsColumn =
            !!content && content.some((row) => !Array.isArray(row) && row.actions.length > 0);

        const collapsedRowsMode = responsive === 'collapse-rows';
        const table = (
            <table
                className={classNames(styles.table, {
                    [styles.boxed]: boxed,
                    [styles.collapsedRowsInMobile]: collapsedRowsMode,
                    [styles.fullWidth]: fullWidth,
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
                                        styles.verticalAlign[rowVerticalAlign]
                                    )}
                                    style={{minWidth: columnWidth?.[idx], width: columnWidth?.[idx]}}
                                >
                                    {header}
                                </th>
                            ))}
                            {hasActionsColumn && <th />}
                        </Text1>
                    </thead>
                )}
                <tbody>
                    {content.length > 0 ? (
                        content.map((row, rowIdx) => {
                            const rowCells = !Array.isArray(row) ? row.cells : row;
                            const rowActions = !Array.isArray(row) ? row.actions ?? [] : [];

                            return (
                                <tr key={rowIdx}>
                                    {rowCells.map((cell, idx) => (
                                        <td key={idx} className={styles.verticalAlign[rowVerticalAlign]}>
                                            {/**
                                             * In collapsedRowsMode, we render the row heading text before every cell content, except for the first cell
                                             * of every row, which is rendered with a medium weight font, as it's the row title.
                                             * */}
                                            {idx !== 0 && collapsedRowsMode && heading[idx] && (
                                                // this is aria-hidden because screen readers already read the column heading from the th
                                                <div className={styles.mobileCellHeading} aria-hidden>
                                                    <Text1 medium color={vars.colors.textSecondary}>
                                                        {heading[idx]}
                                                    </Text1>
                                                </div>
                                            )}

                                            <Text2
                                                as="div"
                                                weight={idx === 0 && collapsedRowsMode ? 'medium' : 'regular'}
                                                wordBreak={false}
                                            >
                                                <div
                                                    className={classNames(
                                                        styles.cellTextAlign[getColumnTextAlign(idx)],
                                                        {
                                                            [styles.collapsedRowTitle]:
                                                                idx === 0 && collapsedRowsMode,
                                                        }
                                                    )}
                                                >
                                                    {cell}
                                                </div>
                                            </Text2>
                                        </td>
                                    ))}

                                    {rowActions.length > 0 ? (
                                        <td
                                            className={styles.verticalAlign[rowVerticalAlign]}
                                            align="right"
                                            style={{
                                                // buttons + inline space + cell left padding
                                                width: `calc(${iconContainerSize.small} * ${
                                                    rowActions.length
                                                } + 16px * ${rowActions.length - 1} + 12px)`,
                                            }}
                                        >
                                            <Inline space={16}>
                                                {rowActions.map((action) => (
                                                    <CellActionIconButton {...action} />
                                                ))}
                                            </Inline>
                                        </td>
                                    ) : (
                                        hasActionsColumn && <td />
                                    )}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={heading.length}>
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
