'use client';
import * as React from 'react';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {useIsInViewport, useIsomorphicLayoutEffect, useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import classNames from 'classnames';
import {useIsInverseOrMediaVariant, ThemeVariant, useThemeVariant} from './theme-variant-context';
import {getPrefixedDataAttributes, listenResize} from './utils/dom';
import {isAndroid, isIos, isRunningAcceptanceTest} from './utils/platform';
import {useDocumentVisibility} from './utils/document-visibility';
import * as styles from './carousel.css';
import * as mediaStyles from './image.css';
import {useDesktopContainerType} from './desktop-container-type-context';
import {VIVO_NEW_SKIN} from './skins/constants';
import {applyCssVars} from './utils/css';
import {ResetResponsiveLayout} from './responsive-layout';
import {IconButton, ToggleIconButton} from './icon-button';
import IconPauseFilled from './generated/mistica-icons/icon-pause-filled';
import IconPlayFilled from './generated/mistica-icons/icon-play-filled';
import IconReloadRegular from './generated/mistica-icons/icon-reload-regular';
import * as tokens from './text-tokens';
import {isClientSide} from './utils/environment';

import type {DesktopContainerType} from './desktop-container-type-context';
import type {ByBreakpoint, DataAttributes} from './utils/types';

const useShouldAutoplay = (
    autoplay: boolean,
    ref: React.RefObject<HTMLElement>
): {isAutoplayEnabled: boolean; shouldAutoplay: boolean; setShouldAutoPlay: (enabled: boolean) => void} => {
    const reducedMotion = isClientSide()
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    const [isAutoplayEnabled, setIsAutoplayEnabled] = React.useState(!!autoplay && !reducedMotion);

    const isDocumentVisible = useDocumentVisibility();
    const isInViewport = useIsInViewport(ref, false);
    return {
        isAutoplayEnabled: isAutoplayEnabled && !!autoplay,
        shouldAutoplay: isInViewport && isDocumentVisible && !!autoplay && isAutoplayEnabled,
        setShouldAutoPlay: setIsAutoplayEnabled,
    };
};

const throwMissingProviderError = () => {
    throw new Error('You must wrap your component with a CarouselContextProvider to use CarouselContext');
};
const defaultBulletProps = {currentIndex: 0, numPages: 0};
const defaultAutoplayProps = {
    isAutoplayEnabled: false,
    isAtLastPage: false,
    onAutoplayChanged: throwMissingProviderError,
};
const defaultPageControlsProps = {
    setShouldAutoplay: throwMissingProviderError,
    prevArrowEnabled: false,
    nextArrowEnabled: false,
};

type GoToPage = (pageIndex: number, animate?: boolean) => void;
type SetIsAutoplayEnabled = (isAutoplayEnabled: boolean) => void;

type PageBulletsProps = {
    currentIndex: number;
    numPages: number | ByBreakpoint<number>;
};

type AutoplayControlProps = {
    isAutoplayEnabled: boolean;
    isAtLastPage: boolean;
    onAutoplayChanged: (autoplay: boolean) => void;
};

type PageControlsProps = {
    setShouldAutoplay: (autoplay: boolean) => void;
    prevArrowEnabled: boolean;
    nextArrowEnabled: boolean;
};

type CarouselControls = {
    goPrev: () => void;
    goNext: () => void;
    goToPage: GoToPage;
    autoplayControlProps: AutoplayControlProps;
    pageControlsProps: PageControlsProps;
    bulletsProps: PageBulletsProps;
};

const CarouselContext = React.createContext<CarouselControls>({
    goPrev: throwMissingProviderError,
    goNext: throwMissingProviderError,
    goToPage: throwMissingProviderError,
    bulletsProps: defaultBulletProps,
    autoplayControlProps: defaultAutoplayProps,
    pageControlsProps: defaultPageControlsProps,
});

const CarouselControlsSetterContext = React.createContext<{
    setGoPrev: (goPrev: () => void) => void;
    setGoNext: (goNext: () => void) => void;
    setGoToPage: (goToPage: GoToPage) => void;
    setBulletsProps: (bulletsProps: PageBulletsProps) => void;
    setAutoplayControlProps: (autoplayControlProps: AutoplayControlProps) => void;
    setPageControlsProps: (pageControlsProps: PageControlsProps) => void;
    setIsAutoplayEnabledSetter: (isAutoplayEnabledSetter: SetIsAutoplayEnabled) => void;
} | null>(null);

export const CarouselContextProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [bulletsProps, setBulletsProps] = React.useState<PageBulletsProps>(defaultBulletProps);
    const [autoplayControlProps, setAutoplayControlProps] =
        React.useState<AutoplayControlProps>(defaultAutoplayProps);
    const [pageControlsProps, setPageControlsProps] =
        React.useState<PageControlsProps>(defaultPageControlsProps);
    const goPrevRef = React.useRef<() => void>(throwMissingProviderError);
    const goNextRef = React.useRef<() => void>(throwMissingProviderError);
    const goToPageRef = React.useRef<GoToPage>(throwMissingProviderError);
    const setIsAutoplayEnabledRef =
        React.useRef<(isAutoplayEnabled: boolean) => void>(throwMissingProviderError);

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
            autoplayControlProps,
            pageControlsProps,
        }),
        [bulletsProps, autoplayControlProps, pageControlsProps]
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
                    setAutoplayControlProps,
                    setPageControlsProps,
                    setIsAutoplayEnabledSetter: (isAutoplayEnabledSetter) => {
                        setIsAutoplayEnabledRef.current = isAutoplayEnabledSetter;
                    },
                }}
            >
                {children}
            </CarouselControlsSetterContext.Provider>
        </CarouselContext.Provider>
    );
};

export const useCarouselContext = (): CarouselControls => React.useContext(CarouselContext);
export const CarouselContextConsumer = CarouselContext.Consumer;

export const PageBullets = ({currentIndex, numPages}: PageBulletsProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const {isTablet, isDesktopOrBigger} = useScreenSize();
    const pagesCount =
        typeof numPages === 'number'
            ? numPages
            : isDesktopOrBigger
              ? numPages.desktop
              : isTablet
                ? numPages.tablet ?? numPages.mobile
                : numPages.mobile;

    const getClassNames = (bulletIndex: number) => {
        const classNames: {[key: string]: boolean} = {};

        if (isInverse) {
            classNames[currentIndex === bulletIndex ? styles.bulletActiveInverse : styles.bulletInverse] =
                true;
        } else {
            classNames[currentIndex === bulletIndex ? styles.bulletActive : styles.bullet] = true;
        }

        if (currentIndex === bulletIndex) {
            classNames[styles.bulletActiveSizing] = true;
            return classNames;
        }

        const distanceToCurrent = Math.abs(bulletIndex - currentIndex);

        if (pagesCount <= styles.VISIBLE_BULLETS || distanceToCurrent === 1) {
            classNames[styles.bulletInactiveSizing] = true;
            return classNames;
        }

        const isFirstOrLastItemActive = currentIndex === 0 || currentIndex === pagesCount - 1;

        if (isFirstOrLastItemActive) {
            classNames[styles.bulletInactiveSizing] = distanceToCurrent === 2;
            classNames[styles.bulletInactiveMediumSizing] = distanceToCurrent === 3;
            classNames[styles.bulletInactiveSmallSizing] = distanceToCurrent > 3;

            return classNames;
        }

        classNames[styles.bulletInactiveMediumSizing] = distanceToCurrent === 2;
        classNames[styles.bulletInactiveSmallSizing] = distanceToCurrent > 2;

        return classNames;
    };

    const getLeftOffsetPosition = (bulletIndex: number) => {
        if (currentIndex + 2 < styles.VISIBLE_BULLETS) {
            return bulletIndex;
        }

        if (pagesCount - currentIndex + 1 < styles.VISIBLE_BULLETS) {
            return bulletIndex - (pagesCount - styles.VISIBLE_BULLETS);
        }

        return bulletIndex - (currentIndex - 2);
    };

    return (
        <div
            {...getPrefixedDataAttributes({'component-name': 'PageBullets', testid: 'PageBullets'})}
            className={classNames(styles.bulletsScrollableContainerBase, {
                [styles.bulletsScrollableContainer]: pagesCount > styles.VISIBLE_BULLETS,
            })}
        >
            {Array.from({length: pagesCount}, (_, i: number) => {
                const bulletLeftOffsetPosition = getLeftOffsetPosition(i);

                return (
                    <div
                        className={classNames(
                            {
                                [styles.scrollableBullet]: pagesCount > styles.VISIBLE_BULLETS,
                            },
                            typeof numPages === 'number'
                                ? {[styles.bulletButton]: true, [styles.bulletVisibility]: i < numPages}
                                : {
                                      [styles.bulletButton]: true,
                                      [styles.bulletVisibilityMobile]: i < numPages.mobile,
                                      [styles.bulletVisibilityTablet]:
                                          i < (numPages.tablet ?? numPages.mobile),
                                      [styles.bulletVisibilityDesktop]: i < numPages.desktop,
                                  }
                        )}
                        key={i}
                        style={{
                            ...applyCssVars({
                                [styles.vars.desktopBulletLeftPosition]:
                                    `${bulletLeftOffsetPosition * styles.LARGE_BULLET_FULL_SIZE}px`,
                                [styles.vars.mobileBulletLeftPosition]:
                                    `${bulletLeftOffsetPosition * styles.SMALL_BULLET_FULL_SIZE}px`,
                            }),
                        }}
                    >
                        <div className={classNames(getClassNames(i))} />
                    </div>
                );
            })}
        </div>
    );
};

type CarouselPageControlsProps = PageControlsProps & {
    bleedLeft?: boolean;
    bleedRight?: boolean;
    goPrev: () => void;
    goNext: () => void;
    pagesCount?: number;
    currentPageIndex?: number;
};

export const CarouselPageControls = ({
    bleedLeft,
    bleedRight,
    goPrev,
    goNext,
    setShouldAutoplay,
    prevArrowEnabled,
    nextArrowEnabled,
    pagesCount,
    currentPageIndex,
}: CarouselPageControlsProps): JSX.Element => {
    const {texts, t} = useTheme();
    const variant = useThemeVariant();
    const prevPageNumberText =
        prevArrowEnabled && pagesCount !== undefined && currentPageIndex !== undefined
            ? `, ${t(texts.carouselPageNumber || tokens.carouselPageNumber, currentPageIndex, pagesCount)}`
            : '';
    const nextPageNumberText =
        nextArrowEnabled && pagesCount !== undefined && currentPageIndex !== undefined
            ? `, ${t(
                  texts.carouselPageNumber || tokens.carouselPageNumber,
                  currentPageIndex + 2,
                  pagesCount
              )}`
            : '';
    return (
        <Inline space={variant === 'media' ? 16 : 8}>
            <IconButton
                Icon={IconChevronLeftRegular}
                aria-label={(texts.carouselPrevButton || t(tokens.carouselPrevButton)) + prevPageNumberText}
                type="neutral"
                backgroundType={variant === 'media' ? 'transparent' : 'soft'}
                small
                bleedLeft={bleedLeft}
                onPress={() => {
                    goPrev();
                    setShouldAutoplay(false);
                }}
                disabled={!prevArrowEnabled}
            />
            <IconButton
                Icon={IconChevronRightRegular}
                aria-label={(texts.carouselNextButton || t(tokens.carouselNextButton)) + nextPageNumberText}
                type="neutral"
                backgroundType={variant === 'media' ? 'transparent' : 'soft'}
                small
                bleedRight={bleedRight}
                onPress={() => {
                    goNext();
                    setShouldAutoplay(false);
                }}
                disabled={!nextArrowEnabled}
            />
        </Inline>
    );
};

type CarouselAutoplayControlProps = AutoplayControlProps & {
    bleedLeft?: boolean;
    bleedRight?: boolean;
};

export const CarouselAutoplayControl = ({
    isAutoplayEnabled,
    isAtLastPage,
    onAutoplayChanged,
    bleedLeft = false,
    bleedRight = false,
}: CarouselAutoplayControlProps): JSX.Element => {
    const {texts, t} = useTheme();
    return (
        <ToggleIconButton
            checkedProps={{
                Icon: IconPauseFilled,
                type: 'neutral',
                'aria-label': texts.carouselPauseAutoplay || t(tokens.carouselPauseAutoplay),
            }}
            uncheckedProps={{
                Icon: isAtLastPage ? IconReloadRegular : IconPlayFilled,
                type: 'neutral',
                'aria-label': isAtLastPage
                    ? texts.carouselReloadAutoplay || t(tokens.carouselReloadAutoplay)
                    : texts.carouselEnableAutoplay || t(tokens.carouselEnableAutoplay),
            }}
            small
            bleedLeft={bleedLeft}
            bleedRight={bleedRight}
            onChange={onAutoplayChanged}
            checked={isAutoplayEnabled}
        />
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
    /**
     * @deprecated use CarouselContextProvider and CarouselContextConsumer to provide bullets props to custom bullets component.
     * See an example here: https://mistica-web.vercel.app/?path=/story/components-carousels-carousel--with-carousel-context
     */
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
    withControls?: boolean;
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;
    children?: void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
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
    withControls = true,
    onPageChange,
    dataAttributes,
    'aria-label': ariaLabelProp,
    'aria-labelledby': ariaLabelledByProp,
}: BaseCarouselProps): JSX.Element => {
    const {platformOverrides, skinName, texts, t} = useTheme();

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

    // ScrollRight is initialized to 1 to avoid the next arrow being disabled when the carousel is first rendered.
    // This is required to make the SSR test pass, and taking advantage of the fact that this is the base case (having more than one page)
    const [{scrollLeft, scrollRight}, setScroll] = React.useState({scrollLeft: 0, scrollRight: 1});

    const [itemScrollPositions, setItemScrollPositions] = React.useState<Array<number>>([]);

    const pagesScrollPositions = React.useMemo(
        () => calcPagesScrollPositions(itemScrollPositions, pagesCount),
        [itemScrollPositions, pagesCount]
    );
    const scrollPositions = itemsToScroll
        ? calcPagesScrollPositions(itemScrollPositions, Math.ceil(items.length / itemsToScroll))
        : pagesScrollPositions;

    const nextArrowEnabled = scrollRight !== 0;
    const prevArrowEnabled = scrollLeft !== 0;

    const {isAutoplayEnabled, shouldAutoplay, setShouldAutoPlay} = useShouldAutoplay(!!autoplay, carouselRef);

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

    React.useEffect(() => {
        if (initialActiveItem !== undefined) {
            goToPage(Math.floor(initialActiveItem / itemsPerPageFloor), false);
        }
    }, [initialActiveItem, goToPage, itemsPerPageFloor]);

    const hasAutoplayLoop = (typeof autoplay === 'object' && autoplay.loop) || false;

    const interactionDetectorRef = React.useRef<{interacting: boolean; left: number}>({
        interacting: false,
        left: 0,
    });

    React.useEffect(() => {
        if (shouldAutoplay && autoplay) {
            const time = typeof autoplay === 'boolean' ? DEFAULT_AUTOPLAY_TIME : autoplay.time;
            const interval = setInterval(() => {
                if (!interactionDetectorRef.current.interacting) {
                    if (scrollRight !== 0) {
                        goNext();
                    } else if (hasAutoplayLoop) {
                        carouselRef.current?.scrollTo({left: 0, behavior: 'smooth'});
                    }
                }
            }, time);
            return () => clearInterval(interval);
        }
    }, [autoplay, goNext, scrollRight, shouldAutoplay, hasAutoplayLoop]);

    const currentPageIndex = calcCurrentPageIndex(scrollLeft, pagesScrollPositions);

    const INTERACTION_DETECTOR_THRESHOLD = 20; // pixels

    React.useEffect(() => {
        if (currentPageIndex === pagesCount - 1 && !hasAutoplayLoop) {
            setShouldAutoPlay(false);
        }
    }, [currentPageIndex, pagesCount, setShouldAutoPlay, hasAutoplayLoop]);

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
    const autoplayControlProps = React.useMemo(
        () => ({
            isAutoplayEnabled,
            isAtLastPage: currentPageIndex === pagesCount - 1,
            onAutoplayChanged: setShouldAutoPlay,
        }),
        [isAutoplayEnabled, currentPageIndex, pagesCount, setShouldAutoPlay]
    );
    const pageControlsProps = React.useMemo(
        () => ({
            setShouldAutoplay: setShouldAutoPlay,
            prevArrowEnabled,
            nextArrowEnabled,
        }),
        [setShouldAutoPlay, prevArrowEnabled, nextArrowEnabled]
    );

    React.useEffect(() => {
        if (controlsSetter) {
            controlsSetter.setGoPrev(goPrev);
            controlsSetter.setGoNext(goNext);
            controlsSetter.setGoToPage(goToPage);
            controlsSetter.setBulletsProps(bulletsProps);
            controlsSetter.setAutoplayControlProps(autoplayControlProps);
            controlsSetter.setPageControlsProps(pageControlsProps);
            controlsSetter.setIsAutoplayEnabledSetter(setShouldAutoPlay);
        }
    }, [
        controlsSetter,
        goNext,
        goPrev,
        bulletsProps,
        autoplayControlProps,
        pageControlsProps,
        goToPage,
        prevArrowEnabled,
        nextArrowEnabled,
        autoplay,
        isAutoplayEnabled,
        setShouldAutoPlay,
    ]);

    let bullets: React.ReactNode = null;

    if (renderBullets) {
        bullets = renderBullets({numPages: pagesCount, currentIndex: currentPageIndex});
    } else if (withBullets) {
        bullets = <PageBullets {...bulletsProps} />;
    }

    const largePageOffset = '64px';
    const vivoNewMobilePageOffset = '36px';

    const bulletsContainer = (
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
    );

    return (
        <div
            {...getPrefixedDataAttributes({
                'component-name': 'Carousel',
                testid: 'Carousel',
                ...dataAttributes,
            })}
            className={styles.carouselComponentContainer}
            role="region"
            aria-label={
                ariaLabelProp
                    ? `${ariaLabelProp}, ${texts.carouselRegion || t(tokens.carouselRegion)}`
                    : undefined
            }
            aria-labelledby={ariaLabelProp ? undefined : ariaLabelledByProp}
        >
            <div
                className={classNames(styles.carouselControlsVisibility, {
                    [styles.carouselControlsVisibilityMobile]: pagesCountMobile > 1,
                    [styles.carouselControlsVisibilityTablet]: pagesCountTablet > 1,
                    [styles.carouselControlsVisibilityDesktop]: pagesCountDesktop > 1,
                })}
            >
                {withControls ? (
                    <Inline space="between" alignItems="center" className={styles.carouselControlsContainer}>
                        {!!autoplay && (
                            <div className={styles.carouselAutoplayControlContainer}>
                                <CarouselAutoplayControl
                                    isAutoplayEnabled={isAutoplayEnabled}
                                    isAtLastPage={currentPageIndex === pagesCount - 1}
                                    onAutoplayChanged={(autoplayEnabled: boolean) => {
                                        if (!nextArrowEnabled && autoplayEnabled) {
                                            goToPage(0);
                                        }
                                        setShouldAutoPlay(autoplayEnabled);
                                    }}
                                />
                            </div>
                        )}
                        {bulletsContainer}
                        <div className={styles.carouselPagesControlsContainer}>
                            <CarouselPageControls
                                goNext={goNext}
                                goPrev={goPrev}
                                setShouldAutoplay={setShouldAutoPlay}
                                prevArrowEnabled={prevArrowEnabled}
                                nextArrowEnabled={nextArrowEnabled}
                                pagesCount={pagesCount}
                                currentPageIndex={currentPageIndex}
                            />
                        </div>
                    </Inline>
                ) : (
                    bullets && (
                        <Inline space="around" className={styles.carouselControlsContainer}>
                            {bulletsContainer}
                        </Inline>
                    )
                )}
            </div>
            <div className={styles.carouselContainer}>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <div
                    className={classNames(styles.carousel, {
                        [styles.centeredCarousel]: centered,
                        [styles.carouselWithScrollMobile]: pagesCountMobile > 1,
                        [styles.carouselWithScrollTablet]: pagesCountTablet > 1,
                    })}
                    role="list"
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
                    onTouchStart={(e) => {
                        interactionDetectorRef.current.left = e.currentTarget.scrollLeft;
                        interactionDetectorRef.current.interacting = true;
                    }}
                    onTouchEnd={(e) => {
                        interactionDetectorRef.current.interacting = false;
                        if (
                            Math.abs(e.currentTarget.scrollLeft - interactionDetectorRef.current.left) >
                            INTERACTION_DETECTOR_THRESHOLD
                        ) {
                            setShouldAutoPlay(false);
                        }
                    }}
                    onKeyDown={() => {
                        setShouldAutoPlay(false);
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(styles.carouselItem, itemClassName)}
                            style={{
                                ...itemStyle,
                                scrollSnapStop: isAndroid(platformOverrides) ? 'always' : 'normal',
                            }}
                            role="listitem"
                            data-item
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

type CarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    itemStyle?: React.CSSProperties;
    itemClassName?: string;
    withBullets?: boolean;
    /**
     * @deprecated use CarouselContextProvider and CarouselContextConsumer to provide bullets props to custom bullets component.
     * See an example here: https://mistica-web.vercel.app/?path=/story/components-carousels-carousel--with-carousel-context
     */
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    initialActiveItem?: number;
    itemsPerPage?: ItemsPerPageProp;
    /** scrolls one page by default */
    itemsToScroll?: number;
    mobilePageOffset?: 'regular' | 'large';
    /** If true, scroll snap doesn't apply and the user has a free scroll */
    free?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    withControls?: boolean;
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;

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
    withControls?: boolean;
    /**
     * @deprecated use CarouselContextProvider and CarouselContextConsumer to provide bullets props to custom bullets component.
     * See an example here: https://mistica-web.vercel.app/?path=/story/components-carousels-carousel--with-carousel-context
     */
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    initialActiveItem?: number;
    onPageChange?: (newPageInfo: {pageIndex: number; shownItemIndexes: Array<number>}) => void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;

    children?: void;
};

export const CenteredCarousel = ({
    items,
    itemStyle,
    itemClassName,
    withBullets,
    renderBullets,
    withControls = true,
    initialActiveItem,
    onPageChange,
    dataAttributes,
    'aria-label': ariaLabelProp,
    'aria-labelledby': ariaLabelledByProp,
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
            withControls={withControls}
            initialActiveItem={initialActiveItem}
            onPageChange={onPageChange}
            dataAttributes={dataAttributes}
            aria-label={ariaLabelProp}
            aria-labelledby={ariaLabelledByProp}
        />
    );
};

type SlideshowProps = {
    items: ReadonlyArray<React.ReactNode>;
    withBullets?: boolean;
    autoplay?: boolean | {time: number; loop?: boolean};
    initialPageIndex?: number;
    withControls?: boolean;
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
    withControls = true,
    autoplay,
    initialPageIndex = 0,
    onPageChange,
    dataAttributes,
    inverseBullets = true,
}: SlideshowProps): JSX.Element => {
    const {platformOverrides} = useTheme();
    const controlsSetter = React.useContext(CarouselControlsSetterContext);

    const carouselRef = React.useRef<HTMLDivElement>(null);

    // ScrollRight is initialized to 1 to avoid the next arrow being disabled when the carousel is first rendered.
    // This is required to make the SSR test pass, and taking advantage of the fact that this is the base case (having more than one page)
    const [{scrollLeft, scrollRight}, setScroll] = React.useState({scrollLeft: 0, scrollRight: 1});
    const nextArrowEnabled = scrollRight !== 0;
    const prevArrowEnabled = scrollLeft !== 0;

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

    const currentIndex = carouselRef.current
        ? Math.floor((scrollLeft + carouselRef.current.clientWidth / 2) / carouselRef.current.clientWidth)
        : 0;

    useIsomorphicLayoutEffect(() => {
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

    const {isAutoplayEnabled, shouldAutoplay, setShouldAutoPlay} = useShouldAutoplay(!!autoplay, carouselRef);

    const hasAutoplayLoop = (typeof autoplay === 'object' && autoplay.loop) || false;

    React.useEffect(() => {
        if (shouldAutoplay && autoplay) {
            const time = typeof autoplay === 'boolean' ? DEFAULT_AUTOPLAY_TIME : autoplay.time;
            const interval = setInterval(() => {
                if (scrollRight !== 0) {
                    goNext();
                } else if (hasAutoplayLoop) {
                    carouselRef.current?.scrollTo({left: 0, behavior: 'smooth'});
                }
            }, time);
            return () => clearInterval(interval);
        }
    }, [autoplay, goNext, scrollRight, shouldAutoplay, hasAutoplayLoop]);

    React.useEffect(() => {
        if (currentIndex === items.length - 1 && !hasAutoplayLoop) {
            setShouldAutoPlay(false);
        }
    }, [currentIndex, items.length, setShouldAutoPlay, hasAutoplayLoop]);

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

    const bulletsContainer = withBullets && (
        <div className={styles.slideshowBulletsContainer}>
            <ThemeVariant variant={inverseBullets ? 'inverse' : 'default'}>
                <PageBullets {...bulletsProps} />
            </ThemeVariant>
        </div>
    );

    const onlyControls = !withBullets && !autoplay;

    return (
        <SlideshowContext.Provider value={{withBullets: !!withBullets}}>
            <ResetResponsiveLayout skipDesktop>
                <div
                    className={classNames(styles.slideshowContainer, {
                        [styles.slideshowWithBullets]: !!withBullets,
                    })}
                    {...getPrefixedDataAttributes(dataAttributes, 'SlideShow')}
                >
                    {items.length > 1 &&
                        (withControls ? (
                            <ThemeVariant variant="media">
                                <Inline
                                    space={onlyControls ? 0 : 'between'}
                                    alignItems="center"
                                    className={classNames(styles.slideshowControlsContainer, {
                                        [styles.slideshowControlsContainerSingleItem]: onlyControls,
                                    })}
                                >
                                    {!!autoplay && (
                                        <div className={styles.slideshowAutoplayControlContainer}>
                                            <CarouselAutoplayControl
                                                isAutoplayEnabled={isAutoplayEnabled}
                                                isAtLastPage={currentIndex === items.length - 1}
                                                onAutoplayChanged={(autoplayEnabled: boolean) => {
                                                    if (
                                                        currentIndex === items.length - 1 &&
                                                        autoplayEnabled
                                                    ) {
                                                        goToPage(0);
                                                    }
                                                    setShouldAutoPlay(autoplayEnabled);
                                                }}
                                            />
                                        </div>
                                    )}
                                    {bulletsContainer}
                                    <CarouselPageControls
                                        goNext={goNext}
                                        goPrev={goPrev}
                                        setShouldAutoplay={setShouldAutoPlay}
                                        prevArrowEnabled={prevArrowEnabled}
                                        nextArrowEnabled={nextArrowEnabled}
                                        pagesCount={items.length}
                                        currentPageIndex={currentIndex}
                                    />
                                </Inline>
                            </ThemeVariant>
                        ) : (
                            withBullets && (
                                <Inline space="around" className={styles.slideshowControlsContainer}>
                                    {bulletsContainer}
                                </Inline>
                            )
                        ))}
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
                </div>
            </ResetResponsiveLayout>
        </SlideshowContext.Provider>
    );
};
