'use client';

import * as React from 'react';
import classnames from 'classnames';
import * as styles from './pagination.css';
import {Text3} from './text';
import Touchable from './touchable';
import {ButtonLink} from './button';
import {IconButton} from './icon-button';
import {useElementDimensions, useIsomorphicLayoutEffect, useScreenSize, useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {getPrefixedDataAttributes, listenResize} from './utils/dom';
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

const MOBILE_PAGE_ITEM_SIZE = 48;
const DESKTOP_PAGE_ITEM_SIZE = 32;
const MOBILE_PAGE_LIST_GAP = 4;
const DESKTOP_PAGE_LIST_GAP = 8;
const MOBILE_CONTAINER_GAP = 4;
const DESKTOP_CONTAINER_GAP = 8;

const getPageListWidth = (items: number, itemSize: number, gap: number): number =>
    items <= 0 ? 0 : items * itemSize + (items - 1) * gap;

const getTruncatedItemsCount = ({
    surroundingPageCount,
    includeBoundaryPages,
}: {
    surroundingPageCount: number;
    includeBoundaryPages: boolean;
}): number => 2 * surroundingPageCount + (includeBoundaryPages ? 5 : 3);

const getAutoSurroundingPageCount = ({
    totalPages,
    availableWidth,
    itemSize,
    gap,
    includeBoundaryPages,
}: {
    totalPages: number;
    availableWidth: number;
    itemSize: number;
    gap: number;
    includeBoundaryPages: boolean;
}): number | undefined => {
    if (availableWidth <= 0 || getPageListWidth(totalPages, itemSize, gap) <= availableWidth) {
        return undefined;
    }

    for (let count = totalPages; count >= 0; count--) {
        const items = Math.min(
            totalPages,
            getTruncatedItemsCount({surroundingPageCount: count, includeBoundaryPages})
        );

        if (getPageListWidth(items, itemSize, gap) <= availableWidth) {
            return count;
        }
    }

    return 0;
};

export const getPaginationItems = ({
    totalPages,
    currentPage,
    surroundingPageCount,
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

    const activePage = Math.min(Math.max(currentPage, 1), totalPages);
    const surroundingCount = Math.max(0, Math.floor(surroundingPageCount ?? totalPages));
    const visibleCount = 2 * surroundingCount + 1;

    if (surroundingPageCount === undefined || totalPages <= visibleCount) {
        return Array.from({length: totalPages}, (_, index) => {
            const page = index + 1;
            return {type: 'page', page, current: page === activePage};
        });
    }

    const boundaryCount = includeBoundaryPages ? 1 : 0;
    const leftCount = Math.floor((visibleCount - 1) / 2);
    const rightCount = visibleCount - 1 - leftCount;
    const createPageItem = (page: number): PaginationItem => ({
        type: 'page',
        page,
        current: page === activePage,
    });
    const createPageRange = (start: number, end: number): Array<PaginationItem> =>
        Array.from({length: Math.max(0, end - start + 1)}, (_, index) => createPageItem(start + index));

    if (!includeBoundaryPages) {
        const rangeStart = Math.max(Math.min(activePage - leftCount, totalPages - visibleCount), 2);
        const rangeEnd = Math.min(rangeStart + visibleCount - 1, totalPages);
        const items: Array<PaginationItem> = [];

        if (rangeStart > 2) {
            items.push({type: 'ellipsis'});
        } else {
            items.push(...createPageRange(1, rangeStart - 1));
        }

        items.push(...createPageRange(rangeStart, rangeEnd));

        if (rangeEnd < totalPages - 1) {
            items.push({type: 'ellipsis'});
        } else {
            items.push(...createPageRange(rangeEnd + 1, totalPages));
        }

        return items;
    }

    const startPages = createPageRange(1, Math.min(boundaryCount, totalPages));
    const endPages = createPageRange(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);
    const siblingsStart = Math.max(
        Math.min(activePage - leftCount, totalPages - boundaryCount - visibleCount),
        boundaryCount + 2
    );
    const siblingsEnd = Math.min(
        Math.max(activePage + rightCount, boundaryCount + visibleCount + 1),
        totalPages - boundaryCount - 1
    );

    const items: Array<PaginationItem> = [...startPages];

    if (siblingsStart > boundaryCount + 2) {
        items.push({type: 'ellipsis'});
    } else if (boundaryCount + 1 < totalPages - boundaryCount) {
        items.push(createPageItem(boundaryCount + 1));
    }

    items.push(...createPageRange(siblingsStart, siblingsEnd));

    if (siblingsEnd < totalPages - boundaryCount - 1) {
        items.push({type: 'ellipsis'});
    } else if (totalPages - boundaryCount > boundaryCount) {
        items.push(createPageItem(totalPages - boundaryCount));
    }

    items.push(...endPages);

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

const TILE_STYLE = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
} as const;

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
    const {isMobile, isDesktopOrBigger} = useScreenSize();
    const hidePageList = hidePageListProp === true;
    const [containerElement, setContainerElement] = React.useState<HTMLElement | null>(null);
    const [availableWidth, setAvailableWidth] = React.useState(0);
    const {width: prevControlWidth, ref: prevControlRef} = useElementDimensions();
    const {width: nextControlWidth, ref: nextControlRef} = useElementDimensions();

    useIsomorphicLayoutEffect(() => {
        const parentElement = containerElement?.parentElement;

        if (!parentElement) {
            setAvailableWidth(0);
            return;
        }

        setAvailableWidth(parentElement.clientWidth);

        return listenResize(parentElement, ([entry]) => {
            setAvailableWidth(entry.contentRect.width);
        });
    }, [containerElement]);

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
    const itemSize = isDesktopOrBigger ? DESKTOP_PAGE_ITEM_SIZE : MOBILE_PAGE_ITEM_SIZE;
    const pageListGap = isDesktopOrBigger ? DESKTOP_PAGE_LIST_GAP : MOBILE_PAGE_LIST_GAP;
    const containerGap = isDesktopOrBigger ? DESKTOP_CONTAINER_GAP : MOBILE_CONTAINER_GAP;
    const pageListAvailableWidth =
        hideNavigationControls || hidePageList
            ? availableWidth
            : availableWidth - prevControlWidth - nextControlWidth - 2 * containerGap;
    const resolvedSurroundingPageCount =
        surroundingPageCount ??
        getAutoSurroundingPageCount({
            totalPages,
            availableWidth: pageListAvailableWidth,
            itemSize,
            gap: pageListGap,
            includeBoundaryPages,
        });
    const items = getPaginationItems({
        totalPages,
        currentPage: activePage,
        surroundingPageCount: resolvedSurroundingPageCount,
        includeBoundaryPages,
    });

    return (
        <nav
            ref={setContainerElement}
            aria-label={resolvedAriaLabel}
            className={classnames(styles.container, {
                [styles.containerNavOnly]: hidePageList,
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'Pagination')}
        >
            {!hideNavigationControls &&
                (mode === 'iconOnly' ? (
                    <IconButton
                        ref={prevControlRef}
                        Icon={IconChevronLeftRegular}
                        type="brand"
                        backgroundType="transparent"
                        disabled={disabled || isPrevDisabled}
                        aria-label={resolvedPrevAriaLabel}
                        onPress={() => goToPage(activePage - 1)}
                    />
                ) : (
                    <ButtonLink
                        ref={prevControlRef}
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
                    <IconButton
                        ref={nextControlRef}
                        Icon={IconChevronRightRegular}
                        type="brand"
                        backgroundType="transparent"
                        disabled={disabled || isNextDisabled}
                        aria-label={resolvedNextAriaLabel}
                        onPress={() => goToPage(activePage + 1)}
                    />
                ) : (
                    <ButtonLink
                        ref={nextControlRef}
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
