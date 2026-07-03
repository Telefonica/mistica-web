'use client';

import * as React from 'react';
import classnames from 'classnames';
import * as styles from './pagination.css';
import {Text3} from './text';
import Touchable from './touchable';
import {ButtonLink} from './button';
import {IconButton} from './icon-button';
import {useScreenSize, useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';

export type PaginationProps = {
    totalPages: number;
    currentPage?: number;
    defaultPage?: number;
    onChange?: (page: number) => void;

    hideNavigationControls?: boolean;
    hidePageList?: boolean;

    surroundingPageCount?: number;

    navLeftLabel?: string;
    navRightLabel?: string;

    mode?: 'default' | 'iconOnly';
    disabled?: boolean;

    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

type PageItem = {type: 'page'; page: number; current: boolean};
type EllipsisItem = {type: 'ellipsis'};
type PaginationItem = ExclusifyUnion<PageItem | EllipsisItem>;

const DEFAULT_SURROUNDING_PAGE_COUNT = 1;
const FIRST_PAGE = 1;

export const getPaginationItems = ({
    totalPages,
    currentPage,
    surroundingPageCount = DEFAULT_SURROUNDING_PAGE_COUNT,
    includeBoundaryPages = true,
}: {
    totalPages: number;
    currentPage: number;
    surroundingPageCount?: number;
    includeBoundaryPages?: boolean;
}): Array<PaginationItem> => {
    if (totalPages <= 1) {
        return [];
    }

    const activePage = Math.min(Math.max(currentPage, FIRST_PAGE), totalPages);
    const surroundingCount = Math.max(0, Math.floor(surroundingPageCount));
    const dynamicPageCount = 2 * surroundingCount + 1;

    if (totalPages <= dynamicPageCount) {
        return Array.from({length: totalPages}, (_, index) => {
            const page = index + FIRST_PAGE;
            return {type: 'page', page, current: page === activePage};
        });
    }

    const lastPage = totalPages;
    const createPageItem = (page: number): PaginationItem => ({
        type: 'page',
        page,
        current: page === activePage,
    });
    const createPageRange = (start: number, end: number): Array<PaginationItem> =>
        Array.from({length: Math.max(0, end - start + 1)}, (_, index) => createPageItem(start + index));

    if (!includeBoundaryPages) {
        const rangeStart = Math.max(
            Math.min(activePage - surroundingCount, lastPage - dynamicPageCount),
            FIRST_PAGE + 1
        );
        const rangeEnd = rangeStart + dynamicPageCount - 1;
        const items: Array<PaginationItem> = [];

        if (rangeStart > FIRST_PAGE + 1) {
            items.push({type: 'ellipsis'});
        } else {
            items.push(createPageItem(FIRST_PAGE));
        }

        items.push(...createPageRange(rangeStart, rangeEnd));

        if (rangeEnd < lastPage - 1) {
            items.push({type: 'ellipsis'});
        } else if (rangeEnd < lastPage) {
            items.push(createPageItem(lastPage));
        }

        return items;
    }

    const rangeStart = Math.max(
        Math.min(activePage - surroundingCount, lastPage - dynamicPageCount - 1),
        FIRST_PAGE + 2
    );
    const rangeEnd = Math.min(
        Math.max(activePage + surroundingCount, FIRST_PAGE + dynamicPageCount + 1),
        lastPage - 2
    );

    const items: Array<PaginationItem> = [createPageItem(FIRST_PAGE)];

    if (rangeStart > FIRST_PAGE + 2) {
        items.push({type: 'ellipsis'});
    } else {
        items.push(createPageItem(FIRST_PAGE + 1));
    }

    items.push(...createPageRange(rangeStart, rangeEnd));

    if (rangeEnd < lastPage - 2) {
        items.push({type: 'ellipsis'});
    } else {
        items.push(createPageItem(lastPage - 1));
    }

    items.push(createPageItem(lastPage));

    return items;
};

const PaginationLabel = ({children}: {children: React.ReactNode}): JSX.Element => {
    const {textPresets} = useTheme();

    return (
        <Text3 as="span" weight={textPresets.button.weight} color="currentColor" wordBreak={false}>
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
                                <PaginationLabel>...</PaginationLabel>
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
                                onPress={() => {}}
                                aria-current="page"
                                aria-disabled
                                aria-label={currentPageLabel(item.page)}
                            >
                                <span className={styles.pageContent}>
                                    <PaginationLabel>{item.page}</PaginationLabel>
                                </span>
                            </Touchable>
                        </li>
                    );
                }

                return (
                    <li key={item.page} className={styles.pageListItem}>
                        <Touchable
                            className={classnames(styles.pageButton, styles.pageButtonVariants[variant])}
                            disabled={disabled}
                            aria-label={goToPageLabel(item.page)}
                            onPress={() => onPageClick(item.page)}
                        >
                            <span className={styles.pageContent}>
                                <PaginationLabel>{item.page}</PaginationLabel>
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
    hidePageList: hidePageListProp,
    surroundingPageCount,
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
    const {isMobile} = useScreenSize();
    const hidePageList = hidePageListProp === true;

    if (totalPages <= 1 || (hideNavigationControls && hidePageList)) {
        return null;
    }

    const activePage = Math.min(Math.max(isControlled ? currentPage : internalPage, 1), totalPages);

    const sectionLabel = t(
        texts.paginationSection || tokens.paginationSection,
        String(activePage),
        String(totalPages)
    );
    const resolvedAriaLabel = ariaLabel ? `${sectionLabel}, ${ariaLabel}` : sectionLabel;
    const resolvedPrevLabel = navLeftLabel || texts.paginationPrevPage || t(tokens.paginationPrevPage);
    const resolvedNextLabel = navRightLabel || texts.paginationNextPage || t(tokens.paginationNextPage);
    const resolvedPrevAriaLabel =
        navLeftLabel || texts.paginationPrevPageAriaLabel || t(tokens.paginationPrevPageAriaLabel);
    const resolvedNextAriaLabel =
        navRightLabel || texts.paginationNextPageAriaLabel || t(tokens.paginationNextPageAriaLabel);

    const goToPage = (page: number) => {
        const nextPage = Math.min(Math.max(page, 1), totalPages);

        if (disabled || nextPage === activePage) {
            return;
        }

        if (!isControlled) {
            setInternalPage(nextPage);
        }

        onChange?.(nextPage);
    };

    const isPrevDisabled = activePage <= 1;
    const isNextDisabled = activePage >= totalPages;
    const includeBoundaryPages = !isMobile;
    const items = getPaginationItems({
        totalPages,
        currentPage: activePage,
        surroundingPageCount,
        includeBoundaryPages,
    });

    return (
        <nav
            aria-label={resolvedAriaLabel}
            className={classnames(styles.container, {
                [styles.containerNavOnly]: hidePageList,
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'Pagination')}
        >
            {!hideNavigationControls &&
                (mode === 'iconOnly' ? (
                    <span className={styles.navigationIconButton}>
                        <IconButton
                            small
                            Icon={IconChevronLeftRegular}
                            type="brand"
                            backgroundType="transparent"
                            disabled={disabled || isPrevDisabled}
                            aria-label={resolvedPrevAriaLabel}
                            onPress={() => goToPage(activePage - 1)}
                        />
                    </span>
                ) : (
                    <ButtonLink
                        small
                        className={classnames(
                            styles.navigationButtonLink,
                            styles.navigationButtonLinkVariants[variant]
                        )}
                        disabled={disabled || isPrevDisabled}
                        aria-label={resolvedPrevAriaLabel}
                        onPress={() => goToPage(activePage - 1)}
                        bleedLeft
                        StartIcon={IconChevronLeftRegular}
                    >
                        {resolvedPrevLabel}
                    </ButtonLink>
                ))}

            {!hidePageList && <PageList items={items} disabled={disabled} onPageClick={goToPage} />}
            {!hideNavigationControls &&
                (mode === 'iconOnly' ? (
                    <span className={styles.navigationIconButton}>
                        <IconButton
                            small
                            Icon={IconChevronRightRegular}
                            type="brand"
                            backgroundType="transparent"
                            disabled={disabled || isNextDisabled}
                            aria-label={resolvedNextAriaLabel}
                            onPress={() => goToPage(activePage + 1)}
                        />
                    </span>
                ) : (
                    <ButtonLink
                        small
                        className={classnames(
                            styles.navigationButtonLink,
                            styles.navigationButtonLinkVariants[variant]
                        )}
                        disabled={disabled || isNextDisabled}
                        aria-label={resolvedNextAriaLabel}
                        onPress={() => goToPage(activePage + 1)}
                        bleedRight
                        EndIcon={IconChevronRightRegular}
                    >
                        {resolvedNextLabel}
                    </ButtonLink>
                ))}
        </nav>
    );
};

export default Pagination;
