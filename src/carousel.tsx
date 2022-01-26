import * as React from 'react';
import IconChevronLeftRegular from './generated/mistica-icons/icon-chevron-left-regular';
import IconChevronRightRegular from './generated/mistica-icons/icon-chevron-right-regular';
import Circle from './circle';
import {useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import {createUseStyles} from './jss';
import Stack from './stack';
import Touchable from './touchable';
import classNames from 'classnames';
import {useResonsiveLayoutMargin} from './responsive-layout';

type PageBulletsProps = {
    currentIndex: number;
    numPages: number;
    onPress?: (index: number) => void;
};

export const PageBullets: React.FC<PageBulletsProps> = ({currentIndex, numPages, onPress}) => {
    const {colors} = useTheme();
    const {isDesktopOrBigger} = useScreenSize();
    const bulletSize = isDesktopOrBigger ? 8 : 4;
    const currentBulletSize = isDesktopOrBigger ? 10 : 6;
    return (
        <Inline space={8} alignItems="center">
            {Array.from({length: numPages}, (_, i: number) => (
                <Touchable
                    key={i}
                    // TODO: define copy and translations for this aria label
                    aria-label={`Go to page ${i}`}
                    maybe
                    onPress={isDesktopOrBigger && onPress ? () => onPress(i) : undefined}
                >
                    <Circle
                        size={i === currentIndex ? currentBulletSize : bulletSize}
                        backgroundColor={i === currentIndex ? colors.controlActivated : colors.control}
                    />
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

const useStyles = createUseStyles((theme) => ({
    carouselContainer: {
        position: 'relative',
    },
    arrowButton: {
        position: 'absolute',
        zIndex: 1,
        '&.prev': {
            left: -arrowButtonSize / 2,
            [theme.mq.tabletOrSmaller]: {
                left: ({sideMargin}) => -sideMargin,
            },
            [theme.mq.largeDesktop]: {
                left: -(24 + arrowButtonSize),
            },
        },
        '&.next': {
            right: -arrowButtonSize / 2,
            [theme.mq.tabletOrSmaller]: {
                right: ({sideMargin}) => -sideMargin,
            },
            [theme.mq.largeDesktop]: {
                right: -(24 + arrowButtonSize),
            },
        },
        top: `calc(50% - ${arrowButtonSize / 2}px)`,
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
        '@media (pointer: coarse)': {
            display: 'none',
        },
    },
    carousel: {
        display: 'flex',
        overflowX: 'auto',
        minWidth: '100%',
        scrollSnapType: ({free}) => (free ? 'initial' : 'x mandatory'),
        ...hideScrollbar,
        [theme.mq.tabletOrSmaller]: {
            margin: ({sideMargin}) => `0 -${sideMargin}px`,
            '&::before, &::after': {
                content: '""',
                flexShrink: 0,
                display: 'block',
                width: ({centered}) => (centered ? '25%' : 0),
            },
        },
    },
    slide: {
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: ({itemsPerPageConfig, gap}) =>
            `calc(${100 / itemsPerPageConfig.desktop}% + ${gap / itemsPerPageConfig.desktop}px)`,
        scrollMargin: ({gap}) => `-${gap}px`,
        '&:first-child': {
            width: ({itemsPerPageConfig, gap}) =>
                `calc(${100 / itemsPerPageConfig.desktop}% - ${
                    (gap * (itemsPerPageConfig.desktop - 1)) / itemsPerPageConfig.desktop
                }px)`,
            scrollMargin: 0,
        },
        [theme.mq.tabletOrSmaller]: {
            scrollSnapAlign: ({centered}) => (centered ? 'center' : 'start'),
            scrollMargin: ({mobilePageOffsetConfig}) => `${mobilePageOffsetConfig.prev}px`,
            width: ({itemsPerPageConfig, mobilePageOffsetConfig, gap}) =>
                `calc(${100 / itemsPerPageConfig.mobile}% - ${
                    (mobilePageOffsetConfig.next + mobilePageOffsetConfig.prev + gap) /
                    itemsPerPageConfig.mobile
                }px)`,
            '&:first-child': {
                paddingLeft: ({centered, sideMargin}) => (centered ? 0 : sideMargin),
                width: ({itemsPerPageConfig, mobilePageOffsetConfig, gap, centered, sideMargin}) =>
                    `calc(${100 / itemsPerPageConfig.mobile}% - ${
                        (mobilePageOffsetConfig.next + mobilePageOffsetConfig.prev + gap) /
                            itemsPerPageConfig.mobile +
                        gap -
                        (centered ? 0 : sideMargin)
                    }px)`,
            },
            '&:last-child': {
                paddingRight: ({sideMargin}) => sideMargin,
                width: ({itemsPerPageConfig, mobilePageOffsetConfig, gap, centered, sideMargin}) =>
                    `calc(${100 / itemsPerPageConfig.mobile}% - ${
                        (mobilePageOffsetConfig.next + mobilePageOffsetConfig.prev + gap) /
                            itemsPerPageConfig.mobile -
                        (centered ? 0 : sideMargin)
                    }px)`,
            },
            '.centered &': {
                width: () => '50%',
                paddingLeft: () => 0,
                paddingRight: () => 0,
                scrollSnapAlign: () => 'center',
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

    console.log('clacPagesScrollPositions', itemsScrollPosition, numPages, pagesScrollPositions);
    return pagesScrollPositions;
};

const calcCurrentPageIndex = (scrollPosition: number, pagesScrollPositions: ReadonlyArray<number>) => {
    for (let i = pagesScrollPositions.length - 1; i >= 0; i--) {
        if (scrollPosition - pagesScrollPositions[i] >= -1) {
            return i;
        }
    }
    return 0;
};

type BaseCarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
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

    children?: void;
};

const BaseCarousel: React.FC<BaseCarouselProps> = ({
    items,
    withBullets,
    renderBullets,
    itemsPerPage,
    itemsToScroll,
    mobilePageOffset = 16,
    gap = 8,
    free,
    centered,
}) => {
    const itemsPerPageConfig = normalizeItemsPerPage(itemsPerPage);
    const mobilePageOffsetConfig = normalizeMobilePageOffset(mobilePageOffset);
    const {isDesktopOrBigger} = useScreenSize();
    const sideMargin = useResonsiveLayoutMargin();
    const classes = useStyles({itemsPerPageConfig, mobilePageOffsetConfig, free, gap, centered, sideMargin});
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const pagesCount = Math.ceil(
        isDesktopOrBigger
            ? items.length / Math.floor(itemsPerPageConfig.desktop)
            : items.length / Math.floor(itemsPerPageConfig.mobile)
    );
    const [{scrollLeft, scrollRight}, setScroll] = React.useState({scrollLeft: 0, scrollRight: 0});
    const [itemScrollPositions, setItemScrollPositions] = React.useState<Array<number>>([]);

    const pagesScrollPositions = calcPagesScrollPositions(itemScrollPositions, pagesCount);
    const scrollPositions = itemsToScroll
        ? calcPagesScrollPositions(itemScrollPositions, Math.ceil(items.length / itemsToScroll))
        : pagesScrollPositions;

    const showNextArrow = scrollRight !== 0;
    const showPrevArrow = scrollLeft !== 0;

    React.useLayoutEffect(() => {
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
                    Array.from(carouselEl.querySelectorAll('[data-slide]')).map((child) => {
                        const offsetLeft = (child as HTMLElement).offsetLeft;
                        const scrollMargin = Number(getComputedStyle(child).scrollMargin.replace('px', ''));
                        const scrollPosition =
                            centered && !isDesktopOrBigger ? offsetLeft - child.clientWidth / 2 : offsetLeft;
                        return Math.min(scrollPosition - scrollMargin - carouselEl.offsetLeft, maxScroll);
                    })
                );
            };

            handleCarouselChange();
            calcItemScrollPositions();

            carouselEl.addEventListener('scroll', handleCarouselChange);
            const mutationObserver = new MutationObserver(handleCarouselChange);
            mutationObserver.observe(carouselEl, {childList: true, attributes: true, subtree: true});
            const resizeObserver = new ResizeObserver(() => {
                handleCarouselChange();
                calcItemScrollPositions();
            });
            resizeObserver.observe(carouselEl);

            return () => {
                carouselEl.removeEventListener('scroll', handleCarouselChange);
                resizeObserver.disconnect();
                mutationObserver.disconnect();
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
    ]);

    const goToPage = (pageIndex: number) => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            const scroll = pagesScrollPositions[pageIndex];
            carouselEl.scrollTo({left: scroll, behavior: 'smooth'});
        }
    };

    const goPrev = () => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            const {scrollLeft} = carouselEl;
            const prevPageScrollPosition = [...scrollPositions]
                .reverse()
                .find((pos) => pos - scrollLeft < -1);
            console.log('scrollLeft', scrollLeft, 'prevScrollPosition', prevPageScrollPosition);
            carouselEl.scrollTo({left: prevPageScrollPosition, behavior: 'smooth'});
        }
    };

    const goNext = () => {
        const carouselEl = carouselRef.current;
        if (carouselEl) {
            const {scrollLeft} = carouselEl;
            const nextPageScrollPosition = scrollPositions.find((pos) => pos - scrollLeft > 1);
            console.log('scrollLeft', scrollLeft, 'nextPageScrollPosition', nextPageScrollPosition);
            carouselEl.scrollTo({left: nextPageScrollPosition, behavior: 'smooth'});
        }
    };

    const currentPageIndex = calcCurrentPageIndex(scrollLeft, pagesScrollPositions);

    let bullets: React.ReactNode = null;

    if (renderBullets) {
        bullets = renderBullets({numPages: pagesCount, currentIndex: currentPageIndex, onPress: goToPage});
    } else if (withBullets) {
        bullets = <PageBullets numPages={pagesCount} currentIndex={currentPageIndex} onPress={goToPage} />;
    }

    return (
        <Stack space={24}>
            <div className={classes.carouselContainer}>
                <Touchable
                    className={classNames(classes.arrowButton, 'prev')}
                    aria-label="previous"
                    onPress={goPrev}
                    disabled={!showPrevArrow}
                >
                    <IconChevronLeftRegular />
                </Touchable>
                <div className={classNames(classes.carousel, {centered})} ref={carouselRef}>
                    {items.map((item, index) => (
                        <div key={index} className={classes.slide} data-slide>
                            {item}
                        </div>
                    ))}
                </div>
                <Touchable
                    className={classNames(classes.arrowButton, 'next')}
                    aria-label="next"
                    onPress={goNext}
                    disabled={!showNextArrow}
                >
                    <IconChevronRightRegular />
                </Touchable>
            </div>
            {bullets && <div className={classes.bullets}>{bullets}</div>}
        </Stack>
    );
};

type CarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    withBullets?: boolean;
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    itemsPerPage?: ItemsPerPageProp;
    /** scrolls one page by default */
    itemsToScroll?: number;
    /** number of pixels to show for the next/prev page in mobile */
    mobilePageOffset?: MobilePageOffset;
    /** If true, scroll snap doesn't apply and the user has a free scroll */
    free?: boolean;

    children?: void;
};

export const Carousel: React.FC<CarouselProps> = (props) => <BaseCarousel {...props} />;

type CenteredCarouselProps = {
    items: ReadonlyArray<React.ReactNode>;
    withBullets?: boolean;
    renderBullets?: (bulletsProps: PageBulletsProps) => React.ReactNode;
    children?: void;
};

export const CenteredCarousel: React.FC<CenteredCarouselProps> = ({items, withBullets, renderBullets}) => (
    <BaseCarousel
        items={items}
        itemsPerPage={{mobile: 1, desktop: 3}}
        centered
        itemsToScroll={1}
        mobilePageOffset={0}
        gap={0}
        withBullets={withBullets}
        renderBullets={renderBullets}
    />
);
