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
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars as skinVars} from './skins/skin-contract.css';
import * as tokens from './text-tokens';
import {getResponsivePaginationItems} from './utils/pagination';

import type {ResponsivePaginationItem} from './utils/pagination';
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

const FIRST_PAGE = 1;
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
