'use client';

import * as React from 'react';
import classnames from 'classnames';
import * as styles from './pagination.css';
import {Text3} from './text';
import {useTheme, useWindowWidth} from './hooks';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';

import type {DataAttributes} from './utils/types';

export type PaginationProps = {
    totalPages: number;
    currentPage?: number;
    defaultPage?: number;
    onChange?: (page: number) => void;

    hideNavigationControls?: boolean;
    hidePageList?: boolean;
    showEllipsis?: boolean;

    dynamicCount?: number;

    navLeftLabel?: string;
    navRightLabel?: string;

    mode?: 'default' | 'iconOnly';
    disabled?: boolean;

    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

type PaginationItem = {type: 'page'; page: number; current: boolean} | {type: 'ellipsis'};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const COMPACT_BREAKPOINT_PX = 375;

const getCompactPaginationItems = (totalPages: number, currentPage: number): Array<PaginationItem> => {
    if (totalPages <= 1) {
        return [];
    }
    const activePage = clamp(currentPage, 1, totalPages);
    const start = Math.max(1, activePage - 1);
    const end = Math.min(totalPages, activePage + 1);
    const items: Array<PaginationItem> = [];
    for (let page = start; page <= end; page++) {
        items.push({type: 'page', page, current: page === activePage});
    }
    return items;
};

export const getPaginationItems = ({
    totalPages,
    currentPage,
    dynamicCount = 3,
    showEllipsis = true,
}: {
    totalPages: number;
    currentPage: number;
    dynamicCount?: number;
    showEllipsis?: boolean;
}): Array<PaginationItem> => {
    if (totalPages <= 1) {
        return [];
    }

    const activePage = clamp(currentPage, 1, totalPages);
    const visibleCount = Math.max(1, Math.floor(dynamicCount));

    if (!showEllipsis || totalPages <= visibleCount + 2) {
        return Array.from({length: totalPages}, (_, index) => {
            const page = index + 1;
            return {type: 'page', page, current: page === activePage};
        });
    }

    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);

    const leftCount = Math.floor((visibleCount - 1) / 2);
    const rightCount = visibleCount - 1 - leftCount;

    let start = activePage - leftCount;
    let end = activePage + rightCount;

    if (start < 2) {
        end += 2 - start;
        start = 2;
    }

    if (end > totalPages - 1) {
        start -= end - (totalPages - 1);
        end = totalPages - 1;
    }

    start = Math.max(2, start);
    end = Math.min(totalPages - 1, end);

    for (let page = start; page <= end; page++) {
        pages.add(page);
    }

    const orderedPages = Array.from(pages).sort((a, b) => a - b);
    const items: Array<PaginationItem> = [];

    orderedPages.forEach((page, index) => {
        const previousPage = orderedPages[index - 1];

        if (previousPage !== undefined) {
            const gap = page - previousPage;

            if (gap === 2) {
                const missingPage = previousPage + 1;
                items.push({
                    type: 'page',
                    page: missingPage,
                    current: missingPage === activePage,
                });
            } else if (gap > 2) {
                items.push({type: 'ellipsis'});
            }
        }

        items.push({
            type: 'page',
            page,
            current: page === activePage,
        });
    });

    return items;
};

type PaginationLabelWeight = 'regular' | 'medium';

const PaginationLabel = ({
    children,
    weight,
}: {
    children: React.ReactNode;
    weight?: PaginationLabelWeight;
}): JSX.Element => {
    const {textPresets} = useTheme();

    return (
        <Text3 as="span" weight={weight ?? textPresets.button.weight} color="currentColor" wordBreak={false}>
            {children}
        </Text3>
    );
};

type PageListProps = {
    items: Array<PaginationItem>;
    disabled?: boolean;
    className?: string;
    onPageClick: (page: number) => void;
};

const PageList = ({items, disabled, className, onPageClick}: PageListProps): JSX.Element => {
    const {texts, t} = useTheme();
    const goToPageLabel = (page: number) =>
        t(texts.paginationGoToPage || tokens.paginationGoToPage, String(page));
    const currentPageLabel = (page: number) =>
        t(texts.paginationCurrentPage || tokens.paginationCurrentPage, String(page));

    return (
        <ol className={classnames(styles.pageList, className)}>
            {items.map((item, index) => {
                if (item.type === 'ellipsis') {
                    return (
                        <li key={`ellipsis-${index}`} className={styles.pageListItem} aria-hidden="true">
                            <span className={styles.ellipsis}>
                                <PaginationLabel weight="medium">...</PaginationLabel>
                            </span>
                        </li>
                    );
                }

                if (item.current) {
                    return (
                        <li key={item.page} className={styles.pageListItem}>
                            <button
                                type="button"
                                className={styles.currentPage}
                                aria-current="page"
                                aria-disabled="true"
                                aria-label={currentPageLabel(item.page)}
                            >
                                <span className={styles.pageContent}>
                                    <PaginationLabel weight="medium">{item.page}</PaginationLabel>
                                </span>
                            </button>
                        </li>
                    );
                }

                return (
                    <li key={item.page} className={styles.pageListItem}>
                        <button
                            type="button"
                            className={styles.pageButton}
                            disabled={disabled}
                            aria-label={goToPageLabel(item.page)}
                            onClick={() => onPageClick(item.page)}
                        >
                            <span className={styles.pageContent}>
                                <PaginationLabel weight="medium">{item.page}</PaginationLabel>
                            </span>
                        </button>
                    </li>
                );
            })}
        </ol>
    );
};

export const Pagination = ({
    totalPages,
    currentPage,
    defaultPage = 1,
    onChange,
    hideNavigationControls = false,
    hidePageList = false,
    showEllipsis = true,
    dynamicCount = 3,
    navLeftLabel,
    navRightLabel,
    mode = 'default',
    disabled = false,
    dataAttributes,
    'aria-label': ariaLabel,
}: PaginationProps): JSX.Element | null => {
    const isControlled = currentPage !== undefined;
    const [internalPage, setInternalPage] = React.useState(defaultPage);
    const {texts, t} = useTheme();
    const windowWidth = useWindowWidth();
    const isCompact = windowWidth > 0 && windowWidth < COMPACT_BREAKPOINT_PX;

    const sectionLabel = t(
        texts.paginationSection || tokens.paginationSection,
        String(clamp(isControlled ? currentPage : internalPage, 1, totalPages)),
        String(totalPages)
    );
    const resolvedAriaLabel = ariaLabel ? `${sectionLabel}, ${ariaLabel}` : sectionLabel;
    const resolvedPrevLabel = navLeftLabel || texts.paginationPrevPage || t(tokens.paginationPrevPage);
    const resolvedNextLabel = navRightLabel || texts.paginationNextPage || t(tokens.paginationNextPage);
    const resolvedPrevAriaLabel =
        navLeftLabel || texts.paginationPrevPageAriaLabel || t(tokens.paginationPrevPageAriaLabel);
    const resolvedNextAriaLabel =
        navRightLabel || texts.paginationNextPageAriaLabel || t(tokens.paginationNextPageAriaLabel);

    if (totalPages <= 1 || (hideNavigationControls && hidePageList)) {
        return null;
    }

    const activePage = clamp(isControlled ? currentPage : internalPage, 1, totalPages);

    const goToPage = (page: number) => {
        const nextPage = clamp(page, 1, totalPages);

        if (disabled || nextPage === activePage) {
            return;
        }

        if (!isControlled) {
            setInternalPage(nextPage);
        }

        onChange?.(nextPage);
    };

    const items = isCompact
        ? getCompactPaginationItems(totalPages, activePage)
        : getPaginationItems({
              totalPages,
              currentPage: activePage,
              dynamicCount,
              showEllipsis,
          });

    const isPrevDisabled = activePage <= 1;
    const isNextDisabled = activePage >= totalPages;

    return (
        <nav
            aria-label={resolvedAriaLabel}
            className={classnames(isCompact ? styles.containerCompact : styles.container, {
                [styles.containerNavOnly]: hidePageList && !isCompact,
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'Pagination')}
        >
            {!hideNavigationControls && (
                <button
                    type="button"
                    className={classnames(styles.navigationButton, {
                        [styles.navigationButtonIconOnly]: mode === 'iconOnly',
                    })}
                    disabled={disabled}
                    aria-disabled={isPrevDisabled || undefined}
                    aria-label={resolvedPrevAriaLabel}
                    onClick={isPrevDisabled ? undefined : () => goToPage(activePage - 1)}
                >
                    <IconChevronLeftRegular size={20} color="currentColor" />
                    {mode === 'default' && (
                        <span className={styles.navigationLabel}>
                            <PaginationLabel>{resolvedPrevLabel}</PaginationLabel>
                        </span>
                    )}
                </button>
            )}

            {!hidePageList && <PageList items={items} disabled={disabled} onPageClick={goToPage} />}
            {!hideNavigationControls && (
                <button
                    type="button"
                    className={classnames(styles.navigationButton, {
                        [styles.navigationButtonIconOnly]: mode === 'iconOnly',
                    })}
                    disabled={disabled}
                    aria-disabled={isNextDisabled || undefined}
                    aria-label={resolvedNextAriaLabel}
                    onClick={isNextDisabled ? undefined : () => goToPage(activePage + 1)}
                >
                    {mode === 'default' && (
                        <span className={styles.navigationLabel}>
                            <PaginationLabel>{resolvedNextLabel}</PaginationLabel>
                        </span>
                    )}
                    <IconChevronRightRegular size={20} color="currentColor" />
                </button>
            )}
        </nav>
    );
};

export default Pagination;
