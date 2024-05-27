import * as React from 'react';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './table.css';
import {vars} from './skins/skin-contract.css';
import {Text1, Text2} from './text';
import {InternalBoxed} from './boxed';
import classNames from 'classnames';
import Box from './box';
import {applyCssVars} from './utils/css';
import ResponsiveLayout, {ResetResponsiveLayout} from './responsive-layout';

import type {DataAttributes} from './utils/types';

type TextAlign = 'left' | 'right' | 'center';
type VerticalAlign = 'top' | 'middle';

type TableProps = {
    heading: Array<string>;
    content?: Array<Array<React.ReactNode>>;
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
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
};

export const Table = React.forwardRef(
    (
        {
            dataAttributes,
            heading,
            content,
            boxed,
            responsive,
            fullWidth = true,
            maxHeight,
            emptyCase,
            columnTextAlign,
            rowVerticalAlign = 'middle',
            columnWidth,
            ...otherProps
        }: TableProps,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const getColumnTextAlign = (column: number) => {
            const defaultTextAlign = 'left';
            if (columnTextAlign) {
                if (Array.isArray(columnTextAlign)) {
                    return columnTextAlign[column] ?? defaultTextAlign;
                }
                return columnTextAlign;
            }
            return defaultTextAlign;
        };

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
                                style={{width: columnWidth?.[idx]}}
                            >
                                {header}
                            </th>
                        ))}
                    </Text1>
                </thead>
                <tbody>
                    {content && content.length ? (
                        content.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row.map((cell, idx) => (
                                    <td key={idx} className={styles.verticalAlign[rowVerticalAlign]}>
                                        {/**
                                         * In collapsedRowsMode, we render the row heading text before every cell content, except for the first cell
                                         * of every row, which is rendered with a medium weight font, as it's the row title.
                                         * */}
                                        {idx !== 0 && collapsedRowsMode && (
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
                                                        [styles.collapsedRowTittle]:
                                                            idx === 0 && collapsedRowsMode,
                                                    }
                                                )}
                                            >
                                                {cell}
                                            </div>
                                        </Text2>
                                    </td>
                                ))}
                            </tr>
                        ))
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

        const scrollContainerStyles = {
            className: classNames(styles.scrollContainer, {
                [styles.collapsedRowsInMobile]: collapsedRowsMode,
                [styles.fullWidth]: fullWidth,
            }),
            style: applyCssVars({
                [styles.vars.maxHeight]:
                    typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight ?? 'auto',
            }),
        };

        if (boxed) {
            return (
                <InternalBoxed
                    desktopOnly={collapsedRowsMode}
                    width="fit-content"
                    maxWidth="100%"
                    minWidth={fullWidth ? '100%' : 'auto'}
                    ref={ref}
                    dataAttributes={{'component-name': 'Table', ...dataAttributes}}
                >
                    <div {...scrollContainerStyles}>
                        <Box
                            paddingX={{desktop: 16, mobile: collapsedRowsMode ? 0 : 8}}
                            paddingY={{desktop: 8, mobile: 0}}
                        >
                            {table}
                        </Box>
                    </div>
                </InternalBoxed>
            );
        }

        return (
            <ResetResponsiveLayout>
                <div
                    ref={ref}
                    {...getPrefixedDataAttributes(dataAttributes, 'Table')}
                    {...scrollContainerStyles}
                >
                    <ResponsiveLayout>{table}</ResponsiveLayout>
                </div>
            </ResetResponsiveLayout>
        );
    }
);
