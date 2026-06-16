'use client';

import * as React from 'react';
import classnames from 'classnames';
import * as styles from './pagination.css';
import {Text3} from './text';
import Touchable from './touchable';
import {ButtonLink} from './button';
import {useScreenSize, useTheme} from './hooks';
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

    maxPages?: number;

    navLeftLabel?: string;
    navRightLabel?: string;

    mode?: 'default' | 'iconOnly';
    disabled?: boolean;

    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

type PaginationItem = {type: 'page'; page: number; current: boolean} | {type: 'ellipsis'};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const getPaginationItems = ({
    totalPages,
    currentPage,
    maxPages = 3,
    showEllipsis = true,
}: {
    totalPages: number;
    currentPage: number;
    maxPages?: number;
    showEllipsis?: boolean;
}): Array<PaginationItem> => {
    if (totalPages <= 1) {
        return [];
    }

    const activePage = clamp(currentPage, 1, totalPages);
    const visibleCount = Math.max(1, Math.floor(maxPages));

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

    return orderedPages.flatMap<PaginationItem>((page, index) => {
        const previousPage = orderedPages[index - 1];
        const filler: Array<PaginationItem> = [];

        if (previousPage !== undefined) {
            const gap = page - previousPage;
            if (gap === 2) {
                const missingPage = previousPage + 1;
                filler.push({
                    type: 'page',
                    page: missingPage,
                    current: missingPage === activePage,
                });
            } else if (gap > 2) {
                filler.push({type: 'ellipsis'});
            }
        }

        return [...filler, {type: 'page', page, current: page === activePage}];
    });
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

const TILE_STYLE: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
};

const PageList = ({items, disabled, className, onPageClick}: PageListProps): JSX.Element => {
    const {texts, t} = useTheme();
    const goToPageLabel = (page: number) =>
        t(texts.paginationGoToPage || tokens.paginationGoToPage, String(page));
    const currentPageLabel = (page: number) =>
        t(texts.paginationCurrentPage || tokens.paginationCurrentPage, String(page));
    const currentIndex = items.findIndex((i) => i.type === 'page' && i.current);
    const isFullOnly = (index: number) => currentIndex !== -1 && Math.abs(index - currentIndex) > 1;

    return (
        <ol className={classnames(styles.pageList, className)}>
            {items.map((item, index) => {
                const liClassName = classnames(styles.pageListItem, {
                    [styles.fullOnlyItem]: isFullOnly(index),
                });
                const ellipsisLiClassName = classnames(styles.pageListItemEllipsis, {
                    [styles.fullOnlyItem]: isFullOnly(index),
                });

                if (item.type === 'ellipsis') {
                    return (
                        <li
                            key={`ellipsis-${index}`}
                            className={ellipsisLiClassName}
                            aria-hidden="true"
                        >
                            <span className={styles.ellipsis}>
                                <PaginationLabel weight="medium">...</PaginationLabel>
                            </span>
                        </li>
                    );
                }

                if (item.current) {
                    return (
                        <li key={item.page} className={liClassName}>
                            <Touchable
                                className={styles.currentPage}
                                style={TILE_STYLE}
                                onPress={() => {}}
                                aria-current="page"
                                aria-disabled
                                aria-label={currentPageLabel(item.page)}
                            >
                                <span className={styles.pageContent}>
                                    <PaginationLabel weight="medium">{item.page}</PaginationLabel>
                                </span>
                            </Touchable>
                        </li>
                    );
                }

                return (
                    <li key={item.page} className={liClassName}>
                        <Touchable
                            className={styles.pageButton}
                            style={TILE_STYLE}
                            disabled={disabled}
                            aria-label={goToPageLabel(item.page)}
                            onPress={() => onPageClick(item.page)}
                        >
                            <span className={styles.pageContent}>
                                <PaginationLabel weight="medium">{item.page}</PaginationLabel>
                            </span>
                        </Touchable>
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
    maxPages = 3,
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
    const {isTabletOrSmaller} = useScreenSize();
    const showNavLabel = mode === 'default' && !isTabletOrSmaller;

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

    const items = getPaginationItems({
        totalPages,
        currentPage: activePage,
        maxPages,
        showEllipsis,
    });

    const isPrevDisabled = activePage <= 1;
    const isNextDisabled = activePage >= totalPages;

    return (
        <nav
            aria-label={resolvedAriaLabel}
            className={classnames(styles.container, {
                [styles.containerNavOnly]: hidePageList,
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'Pagination')}
        >
            {!hideNavigationControls && (
                <ButtonLink
                    small
                    disabled={disabled || isPrevDisabled}
                    aria-label={resolvedPrevAriaLabel}
                    onPress={() => goToPage(activePage - 1)}
                    StartIcon={IconChevronLeftRegular}
                >
                    {showNavLabel ? resolvedPrevLabel : ''}
                </ButtonLink>
            )}

            {!hidePageList && <PageList items={items} disabled={disabled} onPageClick={goToPage} />}
            {!hideNavigationControls && (
                <ButtonLink
                    small
                    disabled={disabled || isNextDisabled}
                    aria-label={resolvedNextAriaLabel}
                    onPress={() => goToPage(activePage + 1)}
                    EndIcon={IconChevronRightRegular}
                >
                    {showNavLabel ? resolvedNextLabel : ''}
                </ButtonLink>
            )}
        </nav>
    );
};

export default Pagination;
