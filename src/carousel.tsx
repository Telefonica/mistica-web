import * as React from 'react';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import {useIsInViewport, useIsomorphicLayoutEffect, useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import {createUseStyles} from './jss';
import Stack from './stack';
import Touchable from './touchable';
import classNames from 'classnames';
import {useResonsiveLayoutMargin} from './responsive-layout';
import {useIsInverseVariant, ThemeVariant} from './theme-variant-context';
import {applyAlpha} from './utils/color';
import {DisableBorderRadiusProvider} from './image';
import {getPrefixedDataAttributes, listenResize} from './utils/dom';
import {isAndroid} from './utils/platform';
import {useDocumentVisibility} from './utils/document-visibility';
import {useContainerType} from './container-type-context';

import type {ContainerType, DataAttributes} from './utils/types';
import type {Theme} from './theme';

const useShouldAutoplay = (autoplay: boolean, ref: React.RefObject<HTMLElement>): boolean => {
    const isDocumentVisible = useDocumentVisibility();
    const isInViewport = useIsInViewport(ref, false);
    return isInViewport && isDocumentVisible && !!autoplay;
};

const useBulletsStyles = createUseStyles((theme) => ({
    bullet: {
        backgroundColor: ({isInverse}) =>
            isInverse ? applyAlpha(theme.colors.inverse, 0.5) : theme.colors.control,
        width: 8,
        height: 8,
        borderRadius: '50%',
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',

        '&.active': {
            backgroundColor: ({isInverse}) =>
                isInverse ? theme.colors.inverse : theme.colors.controlActivated,
            transform: 'scale(1.25)', // 10px
        },

        [theme.mq.tabletOrSmaller]: {
            width: 4,
            height: 4,
            '&.active': {
                transform: 'scale(1.5)', // 6px
            },
        },
    },
}));

type PageBulletsProps = {
    currentIndex: number;
    numPages: number;
    onPress?: (index: number) => void;
};

export const PageBullets: React.FC<PageBulletsProps> = ({currentIndex, numPages, onPress}) => {
    const isInverse = useIsInverseVariant();
    const classes = useBulletsStyles({isInverse});
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <Inline space={isDesktopOrBigger ? 16 : 8} alignItems="center">
            {Array.from({length: numPages}, (_, i: number) => (
                <Touchable
                    key={i}
                    maybe
                    onPress={isDesktopOrBigger && onPress ? () => onPress(i) : undefined}
                >
                    <div className={classNames(classes.bullet, {active: i === currentIndex})} />
                </Touchable>
            ))}
        </Inline>
    );
};

const hideScrollbar = {
    scrollbarWidth: 'none', // Hide in FF
    '&::-webkit-scrollbar': {
        display: 'none', // Hide in Chrome/Safari
    },
};

const arrowButtonSize = 40;
const arrowButtonStyle = (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: arrowButtonSize,
    height: arrowButtonSize,
    borderRadius: '50%',
    backgroundColor: theme.colors.backgroundContainer,
    border: `1px solid ${theme.colors.border}`,
    transition: 'opacity 0.2s',
    '&[disabled]': {
        opacity: 0,
    },
    // don't show carrousel arrow buttons in touch devices, just regular horizontal scroll
    [theme.mq.touchableOnly]: {
        display: 'none',
    },
});

const arrowButtonSeparation = (containerType: ContainerType, isLargeDesktop: boolean, sideMargin: number) => {
    switch (containerType) {
        case 'mobile-column':
        case 'tablet-column':
            return -sideMargin;
        case 'desktop-wide-column':
            return isLargeDesktop ? -(24 + arrowButtonSize) : -arrowButtonSize / 2;
        default:
            return -arrowButtonSize / 2;
    }
};

const useStyles = createUseStyles((theme) => ({
    carouselContainer: {
        // This value is a workaround to solve an issue when the page is rendered in a hidden webview
        // in that case the window size is reported as 0 and the scroll snap is placed at the wrong slide
        minWidth: 64,
        position: 'relative',
    },
    arrowButton: {
        ...arrowButtonStyle(theme),
        position: 'absolute',
        zIndex: 1,
        top: `calc(50% - ${arrowButtonSize / 2}px)`,
        '&.prev': {
            left: ({containerType, isLargeDesktop, sideMargin}) =>
                arrowButtonSeparation(containerType, isLargeDesktop, sideMargin),
        },
        '&.next': {
            right: ({containerType, isLargeDesktop, sideMargin}) =>
                arrowButtonSeparation(containerType, isLargeDesktop, sideMargin),
        },
    },
    hasScroll: {},
    centered: {},
    carousel: {
        display: 'flex',
        overflowX: 'auto',
        minWidth: '100%',
        scrollSnapType: ({free}) => (free ? 'initial' : 'x mandatory'),
        ...hideScrollbar,
        [theme.mq.tabletOrSmaller]: {
            '&$hasScroll': {
                margin: ({sideMargin}) => `0 -${sideMargin}px`,
            },
            '&$centered::before, &$centered::after': {
                content: '""',
                flexShrink: 0,
                display: 'block',
                width: '25%',
            },
        },
    },
    item: {
        scrollSnapStop: isAndroid(theme.platformOverrides) ? 'always' : 'normal',
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: ({itemsPerPageConfig, gap}) =>
            `calc(${100 / itemsPerPageConfig.desktop}% + ${gap / itemsPerPageConfig.desktop}px)`,
        scrollMargin: ({gap}) => `-${gap}px`,
        '&:first-child': {
            width: ({itemsPerPageConfig, gap}) =>
                // prettier-ignore
                `calc(${100 / itemsPerPageConfig.desktop}% - ${(gap * (itemsPerPageConfig.desktop - 1)) / itemsPerPageConfig.desktop}px)`,
            scrollMargin: 0,
        },
        [theme.mq.tabletOrSmaller]: {
            width: ({itemsPerPageConfig, gap}) =>
                `calc(${100 / itemsPerPageConfig.mobile}% + ${gap / itemsPerPageConfig.mobile}px)`,
            '&:first-child': {
                width: ({itemsPerPageConfig, gap}) =>
                    // prettier-ignore
                    `calc(${100 / itemsPerPageConfig.mobile}% - ${(gap * (itemsPerPageConfig.mobile - 1)) / itemsPerPageConfig.mobile}px)`,
            },

            scrollSnapAlign: 'start',
            scrollMargin: ({mobilePageOffsetConfig}) => `${mobilePageOffsetConfig.prev}px`,

            '$hasScroll:not($centered) &': {
                width: ({itemsPerPageConfig, mobilePageOffsetConfig, gap}) =>
                    // prettier-ignore
                    `calc(${100 / itemsPerPageConfig.mobile}% - ${(mobilePageOffsetConfig.next + mobilePageOffsetConfig.prev + gap) / itemsPerPageConfig.mobile}px)`,
                '&:first-child': {
                    paddingLeft: ({sideMargin}) => sideMargin,
                    width: ({itemsPerPageConfig, mobilePageOffsetConfig, gap, sideMargin}) =>
                        // prettier-ignore
                        `calc(${100 / itemsPerPageConfig.mobile}% - ${(mobilePageOffsetConfig.next + mobilePageOffsetConfig.prev + gap) / itemsPerPageConfig.mobile + gap - sideMargin}px)`,
                },
                '&:last-child': {
                    paddingRight: ({sideMargin}) => sideMargin,
                    width: ({itemsPerPageConfig, mobilePageOffsetConfig, gap, sideMargin}) =>
                        // prettier-ignore
                        `calc(${100 / itemsPerPageConfig.mobile}% - ${(mobilePageOffsetConfig.next + mobilePageOffsetConfig.prev + gap) / itemsPerPageConfig.mobile - sideMargin}px)`,
                },
            },

            '$centered &': {
                width: () => '50%',
                scrollSnapAlign: 'center',
                scrollMargin: () => 0,
            },
        },
        '&:not(:empty) ~ &:not(:empty)': {
            paddingLeft: ({gap}) => gap,
        },
        '&:empty': {
            display: 'none',
        },
    },
    bullets: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

type ItemsPerPageProp = {mobile?: number; desktop?: number} | number;

const normalizeItemsPerPage = (itemsPerPage?: ItemsPerPageProp): {mobile: number; desktop: number} => {
    const defaultItemsPerPage = {mobile: 1, desktop: 3};
    if (!itemsPerPage) {
        return defaultItemsPerPage;
    }
    if (typeof itemsPerPage === 'number') {
        return {
            mobile: itemsPerPage,
            desktop: itemsPerPage,
        };
    }
    return {
        ...defaultItemsPerPage,
        ...itemsPerPage,
    };
};

type MobilePageOffset = number | {prev: number; next: number};

const normalizeMobilePageOffset = (mobilePageOffset: MobilePageOffset): {next: number; prev: number} => {
    if (typeof mobilePageOffset === 'number') {
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
    itemsPerPage?: ItemsPerPageProp;
    /** scrolls one page by default */
    itemsToScroll?: number;
    /** number of pixels to show for the next/prev page in mobile */
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
    itemsPerPage,
    itemsToScroll,
    mobilePageOffset = 16,
    gap: gapProp,
    free,
    centered,
    autoplay,
    onPageChange,
    dataAttributes,
}) => {
    const {texts} = useTheme();
    const containerType = useContainerType();
    const itemsPerPageConfig = normalizeItemsPerPage(itemsPerPage);
    const mobilePageOffsetConfig = normalizeMobilePageOffset(mobilePageOffset);
    const {isDesktopOrBigger, isLargeDesktop} = useScreenSize();
    const gap: number = gapProp ?? (isDesktopOrBigger ? 16 : 8);
    const sideMargin = useResonsiveLayoutMargin();
    const classes = useStyles({
        itemsPerPageConfig,
        mobilePageOffsetConfig,
        free,
        gap,
        sideMargin,
        containerType,
        isLargeDesktop,
    });
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const itemsPerPageFloor = isDesktopOrBigger
        ? Math.floor(itemsPerPageConfig.desktop)
        : Math.floor(itemsPerPageConfig.mobile);
    const pagesCount = Math.ceil(items.length / itemsPerPageFloor);
    const [{scrollLeft, scrollRight}, setScroll] = React.useState({scrollLeft: 0, scrollRight: 0});
    const [itemScrollPositions, setItemScrollPositions] = React.useState<Array<number>>([]);

    const pagesScrollPositions = calcPagesScrollPositions(itemScrollPositions, pagesCount);
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

                const getItemScrollMargin = (itemIndex: number) => {
                    if (centered) {
                        return 0;
                    }
                    if (itemIndex === 0) {
                        return 0;
                    }
                    if (isDesktopOrBigger) {
                        return -gap;
                    }
                    return mobilePageOffsetConfig.prev;
                };

                setItemScrollPositions(
                    Array.from(carouselEl.querySelectorAll('[data-item]')).map((itemEl, idx) => {
                        if (idx === items.length - 1) {
                            return maxScroll;
                        }
                        const offsetLeft = (itemEl as HTMLElement).offsetLeft;
                        const scrollMargin = getItemScrollMargin(idx);
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
        itemsPerPageConfig.mobile,
        mobilePageOffsetConfig.next,
        mobilePageOffsetConfig.prev,
        pagesCount,
        gap,
        centered,
        isDesktopOrBigger,
        sideMargin,
        items.length,
    ]);

    const goToPage = React.useCallback(
        (pageIndex: number) => {
            const carouselEl = carouselRef.current;
            if (carouselEl) {
                const scroll = pagesScrollPositions[pageIndex];
                carouselEl.scrollTo({left: scroll, behavior: 'smooth'});
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
        <Stack space={24} dataAttributes={dataAttributes}>
            <div className={classes.carouselContainer}>
                <ThemeVariant isInverse={false}>
                    <Touchable
                        className={classNames(classes.arrowButton, 'prev')}
                        aria-label={texts.carouselPrevButton}
                        onPress={goPrev}
                        disabled={!showPrevArrow}
                    >
                        <IconChevronLeftRegular />
                    </Touchable>
                </ThemeVariant>
                <div
                    className={classNames(classes.carousel, {
                        [classes.centered]: centered,
                        [classes.hasScroll]: pagesCount > 1,
                    })}
                    ref={carouselRef}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(classes.item, itemClassName)}
                            style={itemStyle}
                            data-item
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <ThemeVariant isInverse={false}>
                    <Touchable
                        className={classNames(classes.arrowButton, 'next')}
                        aria-label={texts.carouselNextButton}
                        onPress={goNext}
                        disabled={!showNextArrow}
                    >
                        <IconChevronRightRegular />
                    </Touchable>
                </ThemeVariant>
            </div>
            {bullets && <div className={classes.bullets}>{bullets}</div>}
        </Stack>
    );
};

type CarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    itemStyle?: React.CSSProperties;
    itemClassName?: string;
    withBullets?: boolean;
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
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
    onPageChange,
    dataAttributes,
}) => (
    <BaseCarousel
        items={items}
        itemStyle={itemStyle}
        itemClassName={itemClassName}
        itemsPerPage={{mobile: 1, desktop: 3}}
        centered
        itemsToScroll={1}
        mobilePageOffset={0}
        gap={0}
        withBullets={withBullets}
        renderBullets={renderBullets}
        onPageChange={onPageChange}
        dataAttributes={dataAttributes}
    />
);

const useSlideshowStyles = createUseStyles((theme) => ({
    slideshowContainer: {
        position: 'relative',
    },
    slideshow: {
        display: 'flex',
        overflowX: 'auto',
        minWidth: '100%',
        scrollSnapType: 'x mandatory',
        ...hideScrollbar,
        [theme.mq.tabletOrSmaller]: {
            margin: ({sideMargin}) => `0 -${sideMargin}px`,
        },
    },
    item: {
        width: '100%',
        scrollSnapStop: isAndroid(theme.platformOverrides) ? 'always' : 'normal',
        scrollSnapAlign: 'start',
        flexShrink: 0,
    },
    arrowButton: {
        ...arrowButtonStyle(theme),
        border: 'none',
        position: 'absolute',
        zIndex: 1,
        top: `calc(50% - ${arrowButtonSize / 2}px)`,
        '&.prev': {
            left: 24,
            [theme.mq.tabletOrSmaller]: {
                left: 0,
            },
        },
        '&.next': {
            right: 24,
            [theme.mq.tabletOrSmaller]: {
                right: 0,
            },
        },
    },
    bullets: {
        position: 'absolute',
        bottom: 24,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
}));

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
    const {texts} = useTheme();
    const sideMargin = useResonsiveLayoutMargin();
    const classes = useSlideshowStyles({sideMargin});

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
        <div className={classes.slideshowContainer} {...getPrefixedDataAttributes(dataAttributes)}>
            <ThemeVariant isInverse={false}>
                <Touchable
                    className={classNames(classes.arrowButton, 'prev')}
                    aria-label={texts.carouselPrevButton}
                    onPress={goPrev}
                    disabled={!showPrevArrow}
                >
                    <IconChevronLeftRegular />
                </Touchable>
            </ThemeVariant>
            <DisableBorderRadiusProvider>
                <div className={classes.slideshow} ref={carouselRef}>
                    {items.map((item, index) => (
                        <div key={index} className={classes.item}>
                            {item}
                        </div>
                    ))}
                </div>
            </DisableBorderRadiusProvider>
            <ThemeVariant isInverse={false}>
                <Touchable
                    className={classNames(classes.arrowButton, 'next')}
                    aria-label={texts.carouselNextButton}
                    onPress={goNext}
                    disabled={!showNextArrow}
                >
                    <IconChevronRightRegular />
                </Touchable>
            </ThemeVariant>
            {withBullets && items.length > 1 && (
                <ThemeVariant isInverse>
                    <div className={classes.bullets}>
                        <PageBullets numPages={items.length} currentIndex={currentIndex} />
                    </div>
                </ThemeVariant>
            )}
        </div>
    );
};
