'use client';
import * as React from 'react';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {useIsInViewport, useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import {BaseTouchable} from './touchable';
import classNames from 'classnames';
import {useIsInverseOrMediaVariant, ThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes, listenResize} from './utils/dom';
import {isAndroid, isIos, isRunningAcceptanceTest} from './utils/platform';
import {useDocumentVisibility} from './utils/document-visibility';
import * as styles from './carousel.css';
import * as mediaStyles from './image.css';
import {useDesktopContainerType} from './desktop-container-type-context';
import {VIVO_NEW_SKIN} from './skins/constants';
import {applyCssVars} from './utils/css';
import {ResetResponsiveLayout} from './responsive-layout';

import type {DesktopContainerType} from './desktop-container-type-context';
import type {ByBreakpoint, DataAttributes} from './utils/types';

const useShouldAutoplay = (autoplay: boolean, ref: React.RefObject<HTMLElement>): boolean => {
    const isDocumentVisible = useDocumentVisibility();
    const isInViewport = useIsInViewport(ref, false);
    return isInViewport && isDocumentVisible && !!autoplay;
};

type PageBulletsProps = {
    currentIndex: number;
    numPages: number | ByBreakpoint<number>;
    onPress?: (index: number) => void;
};

export const PageBullets = ({currentIndex, numPages, onPress}: PageBulletsProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const {isDesktopOrBigger} = useScreenSize();
    const getClassName = (index: number) => {
        const isActive = index === currentIndex;
        if (isInverse) {
            return isActive ? styles.bulletActiveInverse : styles.bulletInverse;
        } else {
            return isActive ? styles.bulletActive : styles.bullet;
        }
    };

    const maxNumPages =
        typeof numPages === 'number'
            ? numPages
            : Math.max(numPages.mobile, numPages.tablet ?? numPages.mobile, numPages.desktop);

    return (
        <Inline space={0} alignItems="center" dataAttributes={{'component-name': 'PageBullets'}}>
            {Array.from({length: maxNumPages}, (_, i: number) => (
                <BaseTouchable
                    className={classNames(
                        typeof numPages === 'number'
                            ? styles.bulletButton
                            : {
                                  [styles.bulletButtonMobile]: i < numPages.mobile,
                                  [styles.bulletButtonTablet]: i < (numPages.tablet ?? numPages.mobile),
                                  [styles.bulletButtonDesktop]: i < numPages.desktop,
                              }
                    )}
                    style={i === 0 ? {paddingLeft: 0} : {}}
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

const throwMissingProviderError = () => {
    throw new Error('You must wrap your component with a CarouselContextProvider to use CarouselContext');
};
const defaultGoPrev = throwMissingProviderError;
const defaultGoNext = throwMissingProviderError;
const defaultGoToPage = throwMissingProviderError;
const defaultBulletProps = {currentIndex: 0, numPages: 0};

type GoToPage = (pageIndex: number, animate?: boolean) => void;
type CarouselControls = {
    goPrev: () => void;
    goNext: () => void;
    goToPage: GoToPage;
    bulletsProps: PageBulletsProps;
};

const CarouselContext = React.createContext<CarouselControls>({
    goPrev: defaultGoPrev,
    goNext: defaultGoNext,
    goToPage: defaultGoToPage,
    bulletsProps: defaultBulletProps,
});

const CarouselControlsSetterContext = React.createContext<{
    setGoPrev: (goPrev: () => void) => void;
    setGoNext: (goNext: () => void) => void;
    setGoToPage: (goToPage: GoToPage) => void;
    setBulletsProps: (bulletsProps: PageBulletsProps) => void;
} | null>(null);

export const CarouselContextProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [bulletsProps, setBulletsProps] = React.useState<PageBulletsProps>(defaultBulletProps);
    const goPrevRef = React.useRef<() => void>(defaultGoPrev);
    const goNextRef = React.useRef<() => void>(defaultGoNext);
    const goToPageRef = React.useRef<GoToPage>(defaultGoToPage);

    const controls = React.useMemo<CarouselControls>(
        () => ({
            goPrev: () => {
                goPrevRef.current();
            },
            goNext: () => {
                goNextRef.current();
            },
            goToPage: (pageIndex, animate = true) => {
                goToPageRef.current(pageIndex, animate);
            },
            bulletsProps,
        }),
        [bulletsProps]
    );

    return (
        <CarouselContext.Provider value={controls}>
            <CarouselControlsSetterContext.Provider
                value={{
                    setGoPrev: (goPrev) => {
                        goPrevRef.current = goPrev;
                    },
                    setGoNext: (goNext) => {
                        goNextRef.current = goNext;
                    },
                    setGoToPage: (goToPage) => {
                        goToPageRef.current = goToPage;
                    },
                    setBulletsProps,
                }}
            >
                {children}
            </CarouselControlsSetterContext.Provider>
        </CarouselContext.Provider>
    );
};

export const useCarouselContext = (): CarouselControls => React.useContext(CarouselContext);
export const CarouselContextConsumer = CarouselContext.Consumer;

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

const calcPagesScrollPositions = (itemsScrollPosition: Array<number>, numPages: number) => {
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

const calcCurrentPageIndex = (scrollPosition: number, pagesScrollPositions: Array<number>) => {
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
    mobilePageOffset?: 'regular' | 'large';
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

const BaseCarousel = ({
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
}: BaseCarouselProps): JSX.Element => {
    const {texts, platformOverrides, skinName} = useTheme();

    const desktopContainerType = useDesktopContainerType();
    const itemsPerPageConfig = normalizeItemsPerPage(desktopContainerType || 'large', itemsPerPage);

    const {isDesktopOrBigger, isTablet} = useScreenSize();
    const mobileOrTabletItemsPerPage = isTablet ? itemsPerPageConfig.tablet : itemsPerPageConfig.mobile;
    const itemsPerPageFloor = Math.max(
        Math.floor(isDesktopOrBigger ? itemsPerPageConfig.desktop : mobileOrTabletItemsPerPage),
        1
    );

    const carouselRef = React.useRef<HTMLDivElement>(null);

    const pagesCountMobile = Math.ceil(items.length / Math.max(Math.floor(itemsPerPageConfig.mobile), 1));
    const pagesCountTablet = Math.ceil(items.length / Math.max(Math.floor(itemsPerPageConfig.tablet), 1));
    const pagesCountDesktop = Math.ceil(items.length / Math.max(Math.floor(itemsPerPageConfig.desktop), 1));
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

    React.useEffect(() => {
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

    const pageInitialized = React.useRef<boolean>(!initialActiveItem);
    const lastPageIndex = React.useRef<number>(0);

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

            if (!pageInitialized.current) {
                pageInitialized.current = shownItemIndexes.includes(initialActiveItem || 0);
            } else if (lastPageIndex.current !== currentPageIndex) {
                onPageChange({pageIndex: currentPageIndex, shownItemIndexes});
            }

            lastPageIndex.current = currentPageIndex;
        }
    }, [currentPageIndex, items.length, itemsPerPageFloor, initialActiveItem, onPageChange]);

    const controlsSetter = React.useContext(CarouselControlsSetterContext);

    const bulletsProps = React.useMemo(
        () => ({
            currentIndex: currentPageIndex,
            numPages: {
                mobile: pagesCountMobile,
                tablet: pagesCountTablet,
                desktop: pagesCountDesktop,
            },
        }),
        [currentPageIndex, pagesCountDesktop, pagesCountMobile, pagesCountTablet]
    );

    React.useEffect(() => {
        if (controlsSetter) {
            controlsSetter.setGoPrev(goPrev);
            controlsSetter.setGoNext(goNext);
            controlsSetter.setGoToPage(goToPage);
            controlsSetter.setBulletsProps(bulletsProps);
        }
    }, [controlsSetter, goNext, goPrev, bulletsProps, goToPage]);

    let bullets: React.ReactNode = null;

    if (renderBullets) {
        bullets = renderBullets({numPages: pagesCount, currentIndex: currentPageIndex, onPress: goToPage});
    } else if (withBullets) {
        bullets = <PageBullets {...bulletsProps} onPress={goToPage} />;
    }

    const largePageOffset = '64px';
    const vivoNewMobilePageOffset = '36px';

    return (
        <div {...getPrefixedDataAttributes({'component-name': 'Carousel', ...dataAttributes})}>
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
                        [styles.carouselWithScrollMobile]: pagesCountMobile > 1,
                        [styles.carouselWithScrollTablet]: pagesCountTablet > 1,
                    })}
                    style={{
                        ...applyCssVars({
                            [styles.vars.itemsPerPageDesktop]: String(itemsPerPageConfig.desktop),
                            [styles.vars.itemsPerPageTablet]: String(itemsPerPageConfig.tablet),
                            [styles.vars.itemsPerPageMobile]: String(itemsPerPageConfig.mobile),
                            ...(mobilePageOffset === 'large'
                                ? {[styles.vars.mobilePageOffset]: largePageOffset}
                                : skinName === VIVO_NEW_SKIN
                                  ? {[styles.vars.mobilePageOffset]: vivoNewMobilePageOffset}
                                  : {}),
                            ...(gap !== undefined ? {[styles.vars.gap]: String(gap)} : {}),
                        }),
                        scrollSnapType: free ? 'initial' : 'x mandatory',

                        // Hack to fix https://jira.tid.es/browse/NOVUMCC-8988
                        // there is a webkit rendering bug that causes a half pixel white line to appear at
                        // the bottom of the scrollable area in retina displays when it has a height with
                        // decimals. This extra padding avoids that line to partially cover the carousel
                        // slides border:
                        paddingBottom:
                            isIos(platformOverrides) && !isRunningAcceptanceTest(platformOverrides)
                                ? 0.5
                                : undefined,
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
            {bullets && (
                <div
                    className={classNames(
                        styles.carouselBullets,
                        // when renderBullets is provided, we let the consumer decide if the bullets should be hidden
                        !renderBullets && {
                            [styles.noCarouselBulletsDesktop]: pagesCountDesktop <= 1,
                            [styles.noCarouselBulletsTablet]: pagesCountTablet <= 1,
                            [styles.noCarouselBulletsMobile]: pagesCountMobile <= 1,
                        }
                    )}
                >
                    {bullets}
                </div>
            )}
        </div>
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
    mobilePageOffset?: 'regular' | 'large';
    /** If true, scroll snap doesn't apply and the user has a free scroll */
    free?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;

    children?: void;
};

/**
 * This is a workaround for a bug that happens when rendering a carousel in a webview inside a hidden tab (eg. Explore).
 * The webview has a width of 0 when it's hidden, and the carousel doesn't render correctly when it's first shown.
 * This hook forces the carousel to re-render when the webview is shown, by adding a key to the carousel component.
 *
 * This workaround gets executed only once, when the webview with changes from 0 to another value and then it removes the listener.
 * Related issue: https://jira.tid.es/browse/WEB-1644
 */
const useWorkaroundForZeroWidthWebView = () => {
    const [key, setKey] = React.useState(1);
    React.useEffect(() => {
        const handler = () => {
            if (window.innerWidth !== 0) {
                setKey((k) => k + 1);
                window.removeEventListener('resize', handler);
            }
        };
        // Set the listener only when the webview has zero width
        if (window.innerWidth === 0) {
            window.addEventListener('resize', handler);
        }
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);
    return key;
};

export const Carousel = (props: CarouselProps): JSX.Element => {
    const key = useWorkaroundForZeroWidthWebView();
    return <BaseCarousel {...props} key={key} />;
};

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

export const CenteredCarousel = ({
    items,
    itemStyle,
    itemClassName,
    withBullets,
    renderBullets,
    initialActiveItem,
    onPageChange,
    dataAttributes,
}: CenteredCarouselProps): JSX.Element => {
    const key = useWorkaroundForZeroWidthWebView();
    return (
        <BaseCarousel
            key={key}
            items={items}
            itemStyle={itemStyle}
            itemClassName={itemClassName}
            itemsPerPage={{mobile: 1, tablet: 1, desktop: 3}}
            centered
            itemsToScroll={1}
            gap={0}
            withBullets={withBullets}
            renderBullets={renderBullets}
            initialActiveItem={initialActiveItem}
            onPageChange={onPageChange}
            dataAttributes={dataAttributes}
        />
    );
};

type SlideshowProps = {
    items: ReadonlyArray<React.ReactNode>;
    withBullets?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    initialPageIndex?: number;
    onPageChange?: (newPageIndex: number) => void;
    dataAttributes?: DataAttributes;
    inverseBullets?: boolean;

    children?: void;
};

/**
 * This context is used internally to let other components (Hero) now if they are rendered inside a Slideshow
 * to make some tweaks in the UI
 */
const SlideshowContext = React.createContext<{withBullets: boolean} | undefined>(undefined);

export const useSlideshowContext = (): {withBullets: boolean} | undefined =>
    React.useContext(SlideshowContext);

export const Slideshow = ({
    items,
    withBullets,
    autoplay,
    initialPageIndex = 0,
    onPageChange,
    dataAttributes,
    inverseBullets = true,
}: SlideshowProps): JSX.Element => {
    const {texts, platformOverrides} = useTheme();
    const controlsSetter = React.useContext(CarouselControlsSetterContext);

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

    const goToPage = React.useCallback(
        (pageIndex: number, animate = true) => {
            const carouselEl = carouselRef.current;
            if (carouselEl) {
                carouselEl.scrollTo({
                    left: carouselEl.clientWidth * pageIndex,
                    behavior: animate ? 'smooth' : 'auto',
                });
            }
        },
        [carouselRef]
    );

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

    const pageInitialized = React.useRef(false);
    const lastPageIndex = React.useRef(0);

    React.useEffect(() => {
        if (onPageChange) {
            if (!pageInitialized.current) {
                pageInitialized.current = initialPageIndex === currentIndex;
            } else if (lastPageIndex.current !== currentIndex) {
                onPageChange(currentIndex);
            }
        }

        lastPageIndex.current = currentIndex;
    }, [currentIndex, initialPageIndex, onPageChange]);

    React.useEffect(() => {
        const carouselEl = carouselRef.current;
        if (initialPageIndex !== undefined && carouselEl && !pageInitialized.current) {
            carouselEl.scrollTo({left: carouselEl.clientWidth * initialPageIndex});
        }
    }, [initialPageIndex]);

    const bulletsProps = React.useMemo<PageBulletsProps>(
        () => ({
            currentIndex,
            numPages: items.length,
        }),
        [currentIndex, items.length]
    );

    React.useEffect(() => {
        if (controlsSetter) {
            controlsSetter.setGoPrev(goPrev);
            controlsSetter.setGoNext(goNext);
            controlsSetter.setGoToPage(goToPage);
            controlsSetter.setBulletsProps(bulletsProps);
        }
    }, [controlsSetter, goNext, goPrev, bulletsProps, goToPage]);

    return (
        <SlideshowContext.Provider value={{withBullets: !!withBullets}}>
            <ResetResponsiveLayout skipDesktop>
                <div
                    className={classNames(styles.slideshowContainer, {
                        [styles.slideshowWithBullets]: !!withBullets,
                    })}
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
                    <div style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}>
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
                    </div>
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
                        <ThemeVariant isInverse={inverseBullets}>
                            <div className={styles.slideshowBullets}>
                                <PageBullets {...bulletsProps} />
                            </div>
                        </ThemeVariant>
                    )}
                </div>
            </ResetResponsiveLayout>
        </SlideshowContext.Provider>
    );
};
