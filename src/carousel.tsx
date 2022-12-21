import * as React from 'react';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {useIsInViewport, useIsomorphicLayoutEffect, useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import Stack from './stack';
import {BaseTouchable} from './touchable';
import classNames from 'classnames';
import {useIsInverseVariant, ThemeVariant} from './theme-variant-context';
import {DisableBorderRadiusProvider} from './image';
import {getPrefixedDataAttributes, listenResize} from './utils/dom';
import {isAndroid} from './utils/platform';
import {useDocumentVisibility} from './utils/document-visibility';
import * as styles from './carousel.css';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {sprinkles} from './sprinkles.css';
import {DesktopContainerType, useDesktopContainerType} from './desktop-container-type-context';

import type {DataAttributes} from './utils/types';

const useShouldAutoplay = (autoplay: boolean, ref: React.RefObject<HTMLElement>): boolean => {
    const isDocumentVisible = useDocumentVisibility();
    const isInViewport = useIsInViewport(ref, false);
    return isInViewport && isDocumentVisible && !!autoplay;
};

type PageBulletsProps = {
    currentIndex: number;
    numPages: number;
    onPress?: (index: number) => void;
};

export const PageBullets: React.FC<PageBulletsProps> = ({currentIndex, numPages, onPress}) => {
    const isInverse = useIsInverseVariant();
    const {isDesktopOrBigger} = useScreenSize();
    const getClassName = (index: number) => {
        const isActive = index === currentIndex;
        if (isInverse) {
            return isActive ? styles.bulletActiveInverse : styles.bulletInverse;
        } else {
            return isActive ? styles.bulletActive : styles.bullet;
        }
    };

    return (
        <Inline
            space={isDesktopOrBigger ? 16 : 8}
            alignItems="center"
            dataAttributes={{'component-name': 'PageBullets'}}
        >
            {Array.from({length: numPages}, (_, i: number) => (
                <BaseTouchable
                    className={sprinkles({
                        display: 'block',
                        padding: 0,
                        border: 'none',
                        background: 'transparent',
                    })}
                    key={i}
                    maybe
                    onPress={isDesktopOrBigger && onPress ? () => onPress(i) : undefined}
                >
                    <div className={getClassName(i)} />
                </BaseTouchable>
            ))}
        </Inline>
    );
};

type DesktopItemsPerPage = {small?: number; medium?: number; large?: number} | number;
type ItemsPerPageProp = {mobile?: number; tablet?: number; desktop?: DesktopItemsPerPage} | number;

const selectDesktopItemsPerPage = (
    containerType: DesktopContainerType,
    defaultItemsPerPage: {small: number; medium: number; large: number},
    itemsPerPage?: DesktopItemsPerPage
): number => {
    if (!itemsPerPage) {
        return defaultItemsPerPage[containerType];
    }
    if (typeof itemsPerPage === 'number') {
        return itemsPerPage;
    }
    return itemsPerPage[containerType] || defaultItemsPerPage[containerType];
};

const normalizeItemsPerPage = (
    desktopContainerType: DesktopContainerType,
    itemsPerPage?: ItemsPerPageProp
): {
    mobile: number;
    tablet: number;
    desktop: number;
} => {
    const defaultItemsPerPage = {mobile: 1, tablet: 2, desktop: {small: 1, medium: 2, large: 3}};
    if (!itemsPerPage) {
        return {
            ...defaultItemsPerPage,
            desktop: selectDesktopItemsPerPage(desktopContainerType, defaultItemsPerPage.desktop),
        };
    }

    if (typeof itemsPerPage === 'number') {
        return {
            mobile: itemsPerPage,
            tablet: itemsPerPage,
            desktop: itemsPerPage,
        };
    }

    const itemsPerPageDesktop = selectDesktopItemsPerPage(
        desktopContainerType,
        defaultItemsPerPage.desktop,
        itemsPerPage.desktop
    );

    return {
        ...defaultItemsPerPage,
        ...itemsPerPage,
        desktop: itemsPerPageDesktop,
    };
};

type MobilePageOffset = number | {prev: number; next: number};

const normalizeMobilePageOffset = (
    mobilePageOffset?: MobilePageOffset
): {
    next: number | undefined;
    prev: number | undefined;
} => {
    if (typeof mobilePageOffset === 'number' || mobilePageOffset === undefined) {
        return {
            next: mobilePageOffset,
            prev: mobilePageOffset,
        };
    }
    return mobilePageOffset;
};

const calcPagesScrollPositions = (itemsScrollPosition: ReadonlyArray<number>, numPages: number) => {
    if (itemsScrollPosition.length === 0) {
        return [];
    }

    const itemsPerPage = Math.ceil(itemsScrollPosition.length / numPages);
    const pagesScrollPositions = [];
    for (let i = 0; i < itemsScrollPosition.length; i += itemsPerPage) {
        pagesScrollPositions.push(itemsScrollPosition[i]);
    }
    pagesScrollPositions[pagesScrollPositions.length - 1] =
        itemsScrollPosition[itemsScrollPosition.length - itemsPerPage];

    return pagesScrollPositions;
};

const calcCurrentPageIndex = (scrollPosition: number, pagesScrollPositions: ReadonlyArray<number>) => {
    const middlePageScrollPositions = [];
    for (let i = 0; i < pagesScrollPositions.length; i++) {
        if (i === 0) {
            middlePageScrollPositions.push(pagesScrollPositions[0]);
        } else {
            middlePageScrollPositions.push((pagesScrollPositions[i] + pagesScrollPositions[i - 1]) / 2);
        }
    }
    for (let i = middlePageScrollPositions.length - 1; i >= 0; i--) {
        if (scrollPosition - middlePageScrollPositions[i] >= -1) {
            return i;
        }
    }
    return 0;
};

const DEFAULT_AUTOPLAY_TIME = 5000;

type BaseCarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    itemStyle?: React.CSSProperties;
    itemClassName?: string;
    withBullets?: boolean;
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    initialActiveItem?: number;
    itemsPerPage?: ItemsPerPageProp;
    /** scrolls one page by default */
    itemsToScroll?: number;
    /** @deprecated number of pixels to show for the next/prev page in mobile */
    mobilePageOffset?: MobilePageOffset;
    /** If true, scroll snap doesn't apply and the user has a free scroll */
    free?: boolean;
    gap?: number;
    /** centered mode only applies to mobile. It includes a horizontal padding of half of the size of an item to show the items centered */
    centered?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;
    children?: void;
};

const BaseCarousel: React.FC<BaseCarouselProps> = ({
    items,
    itemStyle,
    itemClassName,
    withBullets,
    renderBullets,
    initialActiveItem,
    itemsPerPage,
    itemsToScroll,
    mobilePageOffset,
    gap,
    free,
    centered,
    autoplay,
    onPageChange,
    dataAttributes,
}) => {
    const {texts, platformOverrides} = useTheme();

    const desktopContainerType = useDesktopContainerType();
    const itemsPerPageConfig = normalizeItemsPerPage(desktopContainerType || 'large', itemsPerPage);

    const {isDesktopOrBigger, isMobile} = useScreenSize();
    const mobileOrTabletItemsPerPage = isMobile ? itemsPerPageConfig.mobile : itemsPerPageConfig.tablet;
    const itemsPerPageFloor = Math.max(
        Math.floor(isDesktopOrBigger ? itemsPerPageConfig.desktop : mobileOrTabletItemsPerPage),
        1
    );

    const mobilePageOffsetConfig = normalizeMobilePageOffset(mobilePageOffset);

    const carouselRef = React.useRef<HTMLDivElement>(null);

    const pagesCount = Math.ceil(items.length / itemsPerPageFloor);
    const [{scrollLeft, scrollRight}, setScroll] = React.useState({scrollLeft: 0, scrollRight: 0});
    const [itemScrollPositions, setItemScrollPositions] = React.useState<Array<number>>([]);

    const pagesScrollPositions = React.useMemo(
        () => calcPagesScrollPositions(itemScrollPositions, pagesCount),
        [itemScrollPositions, pagesCount]
    );
    const scrollPositions = itemsToScroll
        ? calcPagesScrollPositions(itemScrollPositions, Math.ceil(items.length / itemsToScroll))
        : pagesScrollPositions;

    const showNextArrow = scrollRight !== 0;
    const showPrevArrow = scrollLeft !== 0;

    useIsomorphicLayoutEffect(() => {
        if (carouselRef.current) {
            const carouselEl = carouselRef.current;

            const handleCarouselChange = () => {
                const {scrollWidth, clientWidth} = carouselEl;
                const scrollLeft = Math.round(carouselEl.scrollLeft);

                const scrollRight = Math.round(scrollWidth - (scrollLeft + clientWidth));

                setScroll({scrollLeft, scrollRight});
            };

            const calcItemScrollPositions = () => {
                const maxScroll = carouselEl.scrollWidth - carouselEl.clientWidth;

                setItemScrollPositions(
                    Array.from(carouselEl.querySelectorAll('[data-item]')).map((itemEl, idx) => {
                        if (idx === items.length - 1) {
                            return maxScroll;
                        }
                        const offsetLeft = (itemEl as HTMLElement).offsetLeft;
                        const scrollMargin = parseInt(getComputedStyle(itemEl).scrollMargin);
                        const scrollPosition =
                            centered && !isDesktopOrBigger ? offsetLeft - itemEl.clientWidth / 2 : offsetLeft;
                        return Math.min(scrollPosition - scrollMargin - carouselEl.offsetLeft, maxScroll);
                    })
                );
            };

            handleCarouselChange();
            calcItemScrollPositions();

            carouselEl.addEventListener('scroll', handleCarouselChange);
            const unlistenResize = listenResize(carouselEl, () => {
                handleCarouselChange();
                calcItemScrollPositions();
            });

            return () => {
                carouselEl.removeEventListener('scroll', handleCarouselChange);
                unlistenResize();
            };
        }
        return () => {};
    }, [
        itemsPerPageConfig.desktop,
        itemsPerPageConfig.tablet,
        itemsPerPageConfig.mobile,
        mobilePageOffsetConfig.next,
        mobilePageOffsetConfig.prev,
        pagesCount,
        gap,
        centered,
        isDesktopOrBigger,
        items.length,
    ]);

    const goToPage = React.useCallback(
        (pageIndex: number, animate = true) => {
            const carouselEl = carouselRef.current;
            if (carouselEl) {
                const scroll = pagesScrollPositions[pageIndex];
                carouselEl.scrollTo({left: scroll, behavior: animate ? 'smooth' : 'auto'});
            }
        },
        [pagesScrollPositions]
    );

    const goPrev = React.useCallback(() => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            const {scrollLeft} = carouselEl;
            const prevPageScrollPosition = [...scrollPositions]
                .reverse()
                .find((pos) => pos - scrollLeft < -1);
            carouselEl.scrollTo({left: prevPageScrollPosition, behavior: 'smooth'});
        }
    }, [scrollPositions]);

    const goNext = React.useCallback(() => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            const {scrollLeft} = carouselEl;
            const nextPageScrollPosition = scrollPositions.find((pos) => pos - scrollLeft > 1);
            carouselEl.scrollTo({left: nextPageScrollPosition, behavior: 'smooth'});
        }
    }, [scrollPositions]);

    const shouldAutoplay = useShouldAutoplay(!!autoplay, carouselRef);

    React.useEffect(() => {
        if (initialActiveItem !== undefined) {
            goToPage(Math.floor(initialActiveItem / itemsPerPageFloor), false);
        }
    }, [initialActiveItem, goToPage, itemsPerPageFloor]);

    React.useEffect(() => {
        if (shouldAutoplay && autoplay) {
            const time = typeof autoplay === 'boolean' ? DEFAULT_AUTOPLAY_TIME : autoplay.time;
            const loop = typeof autoplay === 'object' && autoplay.loop;
            const interval = setInterval(() => {
                if (scrollRight !== 0) {
                    goNext();
                } else if (loop) {
                    carouselRef.current?.scrollTo({left: 0, behavior: 'smooth'});
                }
            }, time);
            return () => clearInterval(interval);
        }
    }, [autoplay, goNext, scrollRight, shouldAutoplay]);

    const currentPageIndex = calcCurrentPageIndex(scrollLeft, pagesScrollPositions);

    React.useEffect(() => {
        if (onPageChange) {
            const lastShownItemIndex = Math.min(
                (currentPageIndex + 1) * itemsPerPageFloor - 1,
                items.length - 1
            );
            const shownItemIndexes = [];
            for (let i = 0; i < itemsPerPageFloor; i++) {
                const idx = lastShownItemIndex - i;
                if (idx >= 0) {
                    shownItemIndexes.unshift(idx);
                }
            }
            onPageChange({pageIndex: currentPageIndex, shownItemIndexes});
        }
    }, [currentPageIndex, items.length, itemsPerPageFloor, onPageChange]);

    let bullets: React.ReactNode = null;

    if (renderBullets) {
        bullets = renderBullets({numPages: pagesCount, currentIndex: currentPageIndex, onPress: goToPage});
    } else if (withBullets) {
        bullets = pagesCount > 1 && (
            <PageBullets numPages={pagesCount} currentIndex={currentPageIndex} onPress={goToPage} />
        );
    }

    return (
        <Stack space={24} dataAttributes={{'component-name': 'Carousel', ...dataAttributes}}>
            <div className={styles.carouselContainer}>
                <ThemeVariant isInverse={false}>
                    <BaseTouchable
                        className={styles.carouselPrevArrowButton}
                        aria-label={texts.carouselPrevButton}
                        onPress={goPrev}
                        disabled={!showPrevArrow}
                    >
                        <IconChevronLeftRegular />
                    </BaseTouchable>
                </ThemeVariant>
                <div
                    className={classNames(styles.carousel, {
                        [styles.centeredCarousel]: centered,
                        [styles.carouselWithScroll]: pagesCount > 1,
                    })}
                    style={{
                        ...assignInlineVars({
                            [styles.vars.itemsPerPageDesktop]: String(itemsPerPageConfig.desktop),
                            [styles.vars.itemsPerPageTablet]: String(itemsPerPageConfig.tablet),
                            [styles.vars.itemsPerPageMobile]: String(itemsPerPageConfig.mobile),
                            [styles.vars.mobilePageOffsetNext]: mobilePageOffsetConfig.next
                                ? `${mobilePageOffsetConfig.next}px`
                                : '',
                            [styles.vars.mobilePageOffsetPrev]: mobilePageOffsetConfig.prev
                                ? `${mobilePageOffsetConfig.prev}px`
                                : '',
                            ...(gap !== undefined ? {[styles.vars.gap]: String(gap)} : {}),
                        }),
                        scrollSnapType: free ? 'initial' : 'x mandatory',
                    }}
                    ref={carouselRef}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(styles.carouselItem, itemClassName)}
                            style={{
                                ...itemStyle,
                                scrollSnapStop: isAndroid(platformOverrides) ? 'always' : 'normal',
                            }}
                            data-item
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <ThemeVariant isInverse={false}>
                    <BaseTouchable
                        className={styles.carouselNextArrowButton}
                        aria-label={texts.carouselNextButton}
                        onPress={goNext}
                        disabled={!showNextArrow}
                    >
                        <IconChevronRightRegular />
                    </BaseTouchable>
                </ThemeVariant>
            </div>
            {bullets && <div className={styles.carouselBullets}>{bullets}</div>}
        </Stack>
    );
};

type CarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    itemStyle?: React.CSSProperties;
    itemClassName?: string;
    withBullets?: boolean;
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    initialActiveItem?: number;
    itemsPerPage?: ItemsPerPageProp;
    /** scrolls one page by default */
    itemsToScroll?: number;
    /** number of pixels to show for the next/prev page in mobile */
    mobilePageOffset?: MobilePageOffset;
    /** If true, scroll snap doesn't apply and the user has a free scroll */
    free?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;

    children?: void;
};

export const Carousel: React.FC<CarouselProps> = (props) => <BaseCarousel {...props} />;

type CenteredCarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    itemStyle?: React.CSSProperties;
    itemClassName?: string;
    withBullets?: boolean;
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    initialActiveItem?: number;
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;

    children?: void;
};

export const CenteredCarousel: React.FC<CenteredCarouselProps> = ({
    items,
    itemStyle,
    itemClassName,
    withBullets,
    renderBullets,
    initialActiveItem,
    onPageChange,
    dataAttributes,
}) => (
    <BaseCarousel
        items={items}
        itemStyle={itemStyle}
        itemClassName={itemClassName}
        itemsPerPage={{mobile: 1, tablet: 1, desktop: 3}}
        centered
        itemsToScroll={1}
        mobilePageOffset={0}
        gap={0}
        withBullets={withBullets}
        renderBullets={renderBullets}
        initialActiveItem={initialActiveItem}
        onPageChange={onPageChange}
        dataAttributes={dataAttributes}
    />
);

type SlideshowProps = {
    items: ReadonlyArray<React.ReactNode>;
    withBullets?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    onPageChange?: (newPageIndex: number) => void;
    dataAttributes?: DataAttributes;

    children?: void;
};

export const Slideshow: React.FC<SlideshowProps> = ({
    items,
    withBullets,
    autoplay,
    onPageChange,
    dataAttributes,
}) => {
    const {texts, platformOverrides} = useTheme();

    const carouselRef = React.useRef<HTMLDivElement>(null);

    const [{scrollLeft, scrollRight}, setScroll] = React.useState({scrollLeft: 0, scrollRight: 0});

    const goPrev = React.useCallback(() => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            carouselEl.scrollBy({left: -carouselEl.clientWidth, behavior: 'smooth'});
        }
    }, []);

    const goNext = React.useCallback(() => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            carouselEl.scrollBy({left: carouselEl.clientWidth, behavior: 'smooth'});
        }
    }, []);

    const showNextArrow = scrollRight !== 0;
    const showPrevArrow = scrollLeft !== 0;
    const currentIndex = carouselRef.current
        ? Math.floor((scrollLeft + carouselRef.current.clientWidth / 2) / carouselRef.current.clientWidth)
        : 0;

    React.useLayoutEffect(() => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            const handleCarouselChange = () => {
                const {scrollWidth, clientWidth} = carouselEl;
                const scrollLeft = Math.round(carouselEl.scrollLeft);
                const scrollRight = Math.round(scrollWidth - (scrollLeft + clientWidth));
                setScroll({scrollLeft, scrollRight});
            };

            handleCarouselChange();

            carouselEl.addEventListener('scroll', handleCarouselChange);
            const unlistenResize = listenResize(carouselEl, handleCarouselChange);

            return () => {
                carouselEl.removeEventListener('scroll', handleCarouselChange);
                unlistenResize();
            };
        }
    }, [items.length]);

    const shouldAutoplay = useShouldAutoplay(!!autoplay, carouselRef);

    React.useEffect(() => {
        if (shouldAutoplay && autoplay) {
            const time = typeof autoplay === 'boolean' ? DEFAULT_AUTOPLAY_TIME : autoplay.time;
            const loop = typeof autoplay === 'object' && autoplay.loop;
            const interval = setInterval(() => {
                if (scrollRight !== 0) {
                    goNext();
                } else if (loop) {
                    carouselRef.current?.scrollTo({left: 0, behavior: 'smooth'});
                }
            }, time);
            return () => clearInterval(interval);
        }
    }, [autoplay, goNext, scrollRight, shouldAutoplay]);

    React.useEffect(() => {
        if (onPageChange) {
            onPageChange(currentIndex);
        }
    }, [currentIndex, onPageChange]);

    return (
        <div
            className={styles.slideshowContainer}
            {...getPrefixedDataAttributes(dataAttributes, 'SlideShow')}
        >
            <ThemeVariant isInverse={false}>
                <BaseTouchable
                    className={styles.slideshowPrevArrowButton}
                    aria-label={texts.carouselPrevButton}
                    onPress={goPrev}
                    disabled={!showPrevArrow}
                >
                    <IconChevronLeftRegular />
                </BaseTouchable>
            </ThemeVariant>
            <DisableBorderRadiusProvider>
                <div className={styles.slideshow} ref={carouselRef}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={styles.slideshowItem}
                            style={{
                                scrollSnapStop: isAndroid(platformOverrides) ? 'always' : 'normal',
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </DisableBorderRadiusProvider>
            <ThemeVariant isInverse={false}>
                <BaseTouchable
                    className={styles.slideshowNextArrowButton}
                    aria-label={texts.carouselNextButton}
                    onPress={goNext}
                    disabled={!showNextArrow}
                >
                    <IconChevronRightRegular />
                </BaseTouchable>
            </ThemeVariant>
            {withBullets && items.length > 1 && (
                <ThemeVariant isInverse>
                    <div className={styles.slideshowBullets}>
                        <PageBullets numPages={items.length} currentIndex={currentIndex} />
                    </div>
                </ThemeVariant>
            )}
        </div>
    );
};
