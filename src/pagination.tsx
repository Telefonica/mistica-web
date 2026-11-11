'use client';

import * as React from 'react';
import classnames from 'classnames';
import * as styles from './pagination.css';
import {Text3} from './text';
import Touchable from './touchable';
import {ButtonLink} from './button';
import {IconButton} from './icon-button';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import IconChevronLeftRegular from '@telefonica/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from '@telefonica/mistica-icons/icon-chevron-right-regular';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars as skinVars} from './skins/skin-contract.css';
import * as tokens from './text-tokens';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes} from './utils/types';
import type {NonDeprecatedVariant} from './theme-variant-context';

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

type Visibility = 'desktop' | 'mobile' | 'any';
type ResponsivePaginationItem = ExclusifyUnion<
    {type: 'page'; page: number; current: boolean} | {type: 'ellipsis'}
> & {visibility: Visibility};

const DEFAULT_SURROUNDING_PAGE_COUNT = 1;
const FIRST_PAGE = 1;
const DESKTOP_BOUNDARY_SLOT_COUNT = 4;
const MOBILE_BOUNDARY_SLOT_COUNT = 2;

const getVisibility = (desktop: boolean, mobile: boolean): Visibility =>
    desktop && mobile ? 'any' : desktop ? 'desktop' : 'mobile';

/**
 * Creates one ordered list with viewport-specific visibility for pages and ellipses.
 * With 20 pages and current page 10, desktop shows [1, ..., 9, 10, 11, ..., 20]
 * and mobile shows [..., 9, 10, 11, ...]; only pages 1 and 20 are desktop-only.
 */
const getResponsivePaginationItems = ({
    totalPages,
    currentPage,
    surroundingPageCount = DEFAULT_SURROUNDING_PAGE_COUNT,
}: {
    totalPages: number;
    currentPage: number;
    surroundingPageCount?: number;
}): Array<ResponsivePaginationItem> => {
    if (totalPages <= 1) {
        return [];
    }

    const activePage = Math.min(Math.max(currentPage, FIRST_PAGE), totalPages);
    const surroundingCount = Math.min(Math.max(Math.floor(surroundingPageCount), 0), totalPages);
    const dynamicPageCount = 2 * surroundingCount + 1;
    const createPageRange = (start: number, end: number): Array<number> =>
        Array.from({length: Math.max(0, end - start + 1)}, (_, index) => start + index);

    const desktopRangeStart = Math.max(
        Math.min(activePage - surroundingCount, totalPages - dynamicPageCount - 1),
        FIRST_PAGE + 2
    );
    const desktopRangeEnd = Math.min(
        Math.max(activePage + surroundingCount, FIRST_PAGE + dynamicPageCount + 1),
        totalPages - 2
    );
    const desktopPages = new Set(
        totalPages <= dynamicPageCount + DESKTOP_BOUNDARY_SLOT_COUNT
            ? createPageRange(FIRST_PAGE, totalPages)
            : [
                  FIRST_PAGE,
                  ...(desktopRangeStart > FIRST_PAGE + 2 ? [] : [FIRST_PAGE + 1]),
                  ...createPageRange(desktopRangeStart, desktopRangeEnd),
                  ...(desktopRangeEnd < totalPages - 2 ? [] : [totalPages - 1]),
                  totalPages,
              ]
    );

    const mobileRangeStart = Math.max(
        Math.min(activePage - surroundingCount, totalPages - dynamicPageCount),
        FIRST_PAGE + 1
    );
    const mobileRangeEnd = mobileRangeStart + dynamicPageCount - 1;
    const mobilePages = new Set(
        totalPages <= dynamicPageCount + MOBILE_BOUNDARY_SLOT_COUNT
            ? createPageRange(FIRST_PAGE, totalPages)
            : [
                  ...(mobileRangeStart > FIRST_PAGE + 1 ? [] : [FIRST_PAGE]),
                  ...createPageRange(mobileRangeStart, mobileRangeEnd),
                  ...(mobileRangeEnd < totalPages - 1 ? [] : [totalPages]),
              ]
    );

    const items: Array<ResponsivePaginationItem> = [];
    let lastDesktopPage = FIRST_PAGE - 1;
    let lastMobilePage = FIRST_PAGE - 1;
    let hasDesktopEllipsis = false;
    let hasMobileEllipsis = false;

    for (const page of [...new Set([...desktopPages, ...mobilePages])].sort((a, b) => a - b)) {
        const isDesktop = desktopPages.has(page);
        const isMobile = mobilePages.has(page);
        const needsDesktopEllipsis: boolean =
            !hasDesktopEllipsis && (!isDesktop || page > lastDesktopPage + 1);
        const needsMobileEllipsis: boolean = !hasMobileEllipsis && (!isMobile || page > lastMobilePage + 1);

        if ((isDesktop && needsDesktopEllipsis) || (isMobile && needsMobileEllipsis)) {
            items.push({
                type: 'ellipsis',
                visibility: getVisibility(needsDesktopEllipsis, needsMobileEllipsis),
            });
            hasDesktopEllipsis ||= needsDesktopEllipsis;
            hasMobileEllipsis ||= needsMobileEllipsis;
        }
        items.push({
            type: 'page',
            page,
            current: page === activePage,
            visibility: getVisibility(isDesktop, isMobile),
        });
        if (isDesktop) {
            lastDesktopPage = page;
            hasDesktopEllipsis = false;
        }
        if (isMobile) {
            lastMobilePage = page;
            hasMobileEllipsis = false;
        }
    }

    const needsDesktopEllipsis = lastDesktopPage < totalPages && !hasDesktopEllipsis;
    const needsMobileEllipsis = lastMobilePage < totalPages && !hasMobileEllipsis;
    if (needsDesktopEllipsis || needsMobileEllipsis) {
        items.push({type: 'ellipsis', visibility: getVisibility(needsDesktopEllipsis, needsMobileEllipsis)});
    }
    return items;
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const PaginationLabel = ({children}: {children: React.ReactNode}): JSX.Element => {
    return (
        <Text3 as="span" medium color="currentColor" wordBreak={false}>
            {children}
        </Text3>
    );
};

const getEllipsisColor = (variant: NonDeprecatedVariant): string => {
    switch (variant) {
        case 'brand':
            return skinVars.colors.textButtonSecondaryBrand;
        case 'negative':
            return skinVars.colors.textButtonSecondaryNegative;
        default:
            return skinVars.colors.textSecondary;
    }
};

type PageListProps = {
    items: Array<ResponsivePaginationItem>;
    disabled?: boolean;
    onPageClick: (page: number) => void;
};

const PageList = ({items, disabled, onPageClick}: PageListProps): JSX.Element => {
    const {texts, t} = useTheme();
    const variant = useThemeVariant();
    const goToPageLabel = (page: number) =>
        t(texts.paginationGoToPage || tokens.paginationGoToPage, String(page));
    const currentPageLabel = (page: number) =>
        t(texts.paginationCurrentPage || tokens.paginationCurrentPage, String(page));

    return (
        <ol className={styles.pageList}>
            {items.map((item, index) => {
                const className = classnames(styles.pageListItem, styles.itemVisibility[item.visibility]);
                if (item.type === 'ellipsis') {
                    return (
                        <li key={`ellipsis-${index}`} className={className} aria-hidden="true">
                            <Text3 as="span" medium color={getEllipsisColor(variant)} wordBreak={false}>
                                ...
                            </Text3>
                        </li>
                    );
                }

                if (item.current) {
                    return (
                        <li key={item.page} className={className}>
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
                    <li key={item.page} className={className}>
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
    hidePageList = false,
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

    if (totalPages <= 1 || (hideNavigationControls && hidePageList)) {
        return null;
    }

    const activePage = clamp(isControlled ? currentPage : internalPage, FIRST_PAGE, totalPages);

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
        const nextPage = clamp(page, FIRST_PAGE, totalPages);

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
    const items = getResponsivePaginationItems({
        totalPages,
        currentPage: activePage,
        surroundingPageCount,
    });

    return (
        <nav
            aria-label={resolvedAriaLabel}
            className={classnames(styles.container, {
                [styles.containerNavOnly]: hidePageList,
            })}
            {...getPrefixedDataAttributes({testid: 'Pagination', ...dataAttributes})}
        >
            {!hideNavigationControls &&
                (mode === 'iconOnly' ? (
                    <IconButton
                        small
                        Icon={IconChevronLeftRegular}
                        type="brand"
                        backgroundType="transparent"
                        disabled={disabled || isPrevDisabled}
                        aria-label={resolvedPrevAriaLabel}
                        onPress={() => goToPage(activePage - 1)}
                        bleedLeft
                    />
                ) : (
                    <ButtonLink
                        small
                        className={styles.navigationButtonLinkVariants[variant]}
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
                        small
                        Icon={IconChevronRightRegular}
                        type="brand"
                        backgroundType="transparent"
                        disabled={disabled || isNextDisabled}
                        aria-label={resolvedNextAriaLabel}
                        onPress={() => goToPage(activePage + 1)}
                        bleedRight
                    />
                ) : (
                    <ButtonLink
                        small
                        className={styles.navigationButtonLinkVariants[variant]}
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
