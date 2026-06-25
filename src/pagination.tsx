'use client';

import * as React from 'react';
import classnames from 'classnames';
import * as styles from './pagination.css';
import {Text3} from './text';
import Touchable from './touchable';
import {ButtonLink} from './button';
import {useScreenSize, useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
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

const validatePositivePageNumber = (name: string, value: number | undefined) => {
    if (process.env.NODE_ENV !== 'production' && value !== undefined && value < 1) {
        throw Error(`Pagination: ${name} must be greater than or equal to 1`);
    }
};

export const getPaginationItems = ({
    totalPages,
    currentPage,
    maxPages,
    showEllipsis = true,
    includeBoundaryPages = true,
}: {
    totalPages: number;
    currentPage: number;
    maxPages?: number;
    showEllipsis?: boolean;
    includeBoundaryPages?: boolean;
}): Array<PaginationItem> => {
    validatePositivePageNumber('totalPages', totalPages);
    validatePositivePageNumber('currentPage', currentPage);
    validatePositivePageNumber('maxPages', maxPages);

    if (totalPages <= 1) {
        return [];
    }

    const activePage = clamp(currentPage, 1, totalPages);
    const defaultMaxPages = includeBoundaryPages ? 5 : 3;
    const minVisibleCount = includeBoundaryPages ? 1 : 3;
    const visibleCount = Math.max(minVisibleCount, Math.floor(maxPages ?? defaultMaxPages));

    if (!includeBoundaryPages) {
        if (!showEllipsis || totalPages <= visibleCount) {
            return Array.from({length: totalPages}, (_, index) => {
                const page = index + 1;
                return {type: 'page', page, current: page === activePage};
            });
        }

        const leftCount = Math.floor((visibleCount - 1) / 2);
        const start = clamp(activePage - leftCount, 1, totalPages - visibleCount + 1);
        const end = start + visibleCount - 1;
        const items: Array<PaginationItem> = [];

        if (start > 1) {
            items.push({type: 'ellipsis'});
        }

        for (let page = start; page <= end; page++) {
            items.push({type: 'page', page, current: page === activePage});
        }

        if (end < totalPages) {
            items.push({type: 'ellipsis'});
        }

        return items;
    }

    if (!showEllipsis || totalPages <= visibleCount) {
        return Array.from({length: totalPages}, (_, index) => {
            const page = index + 1;
            return {type: 'page', page, current: page === activePage};
        });
    }

    const leftCount = Math.floor((visibleCount - 1) / 2);
    const rightCount = visibleCount - 1 - leftCount;

    let start = activePage - leftCount;
    let end = activePage + rightCount;

    if (start < 1) {
        end += 1 - start;
        start = 1;
    }

    if (end > totalPages) {
        start -= end - totalPages;
        end = totalPages;
    }

    start = Math.max(1, start);
    end = Math.min(totalPages, end);

    const items: Array<PaginationItem> = [];

    if (start > 1) {
        items.push({type: 'page', page: 1, current: activePage === 1});

        if (start === 3) {
            items.push({type: 'page', page: 2, current: activePage === 2});
        } else if (start > 3) {
            items.push({type: 'ellipsis'});
        }
    }

    for (let page = start; page <= end; page++) {
        items.push({type: 'page', page, current: page === activePage});
    }

    if (end < totalPages) {
        if (end === totalPages - 2) {
            items.push({type: 'page', page: totalPages - 1, current: activePage === totalPages - 1});
        } else if (end < totalPages - 2) {
            items.push({type: 'ellipsis'});
        }

        items.push({type: 'page', page: totalPages, current: activePage === totalPages});
    }

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

const TILE_STYLE: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
};

const PageList = ({items, disabled, className, onPageClick}: PageListProps): JSX.Element => {
    const {texts, t} = useTheme();
    const variant = useThemeVariant();
    const goToPageLabel = (page: number) =>
        t(texts.paginationGoToPage || tokens.paginationGoToPage, String(page));
    const currentPageLabel = (page: number) =>
        t(texts.paginationCurrentPage || tokens.paginationCurrentPage, String(page));

    return (
        <ol className={classnames(styles.pageList, className)}>
            {items.map((item, index) => {
                if (item.type === 'ellipsis') {
                    return (
                        <li
                            key={`ellipsis-${index}`}
                            className={classnames(
                                styles.pageListItemEllipsis,
                                styles.ellipsisVariants[variant]
                            )}
                            aria-hidden="true"
                        >
                            <span className={classnames(styles.ellipsis, styles.ellipsisVariants[variant])}>
                                <PaginationLabel weight="medium">...</PaginationLabel>
                            </span>
                        </li>
                    );
                }

                if (item.current) {
                    return (
                        <li key={item.page} className={styles.pageListItem}>
                            <Touchable
                                className={classnames(
                                    styles.currentPage,
                                    styles.currentPageVariants[variant]
                                )}
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
                    <li key={item.page} className={styles.pageListItem}>
                        <Touchable
                            className={classnames(styles.pageButton, styles.pageButtonVariants[variant])}
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
    maxPages,
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
    const variant = useThemeVariant();
    const {isTabletOrSmaller} = useScreenSize();
    const showNavLabel = mode === 'default' && !isTabletOrSmaller;

    validatePositivePageNumber('totalPages', totalPages);
    validatePositivePageNumber('currentPage', currentPage);
    validatePositivePageNumber('defaultPage', defaultPage);
    validatePositivePageNumber('maxPages', maxPages);

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
        includeBoundaryPages: !isTabletOrSmaller,
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
                    className={classnames(
                        styles.navigationButtonLink,
                        styles.navigationButtonLinkVariants[variant]
                    )}
                    disabled={disabled || isPrevDisabled}
                    aria-label={resolvedPrevAriaLabel}
                    onPress={() => goToPage(activePage - 1)}
                    StartIcon={IconChevronLeftRegular}
                >
                    {showNavLabel && mode !== 'iconOnly' ? resolvedPrevLabel : ''}
                </ButtonLink>
            )}

            {!hidePageList && <PageList items={items} disabled={disabled} onPageClick={goToPage} />}
            {!hideNavigationControls && (
                <ButtonLink
                    className={classnames(
                        styles.navigationButtonLink,
                        styles.navigationButtonLinkVariants[variant]
                    )}
                    disabled={disabled || isNextDisabled}
                    aria-label={resolvedNextAriaLabel}
                    onPress={() => goToPage(activePage + 1)}
                    EndIcon={IconChevronRightRegular}
                >
                    {showNavLabel && mode !== 'iconOnly' ? resolvedNextLabel : ''}
                </ButtonLink>
            )}
        </nav>
    );
};

export default Pagination;
