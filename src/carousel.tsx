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

const gap = 8;
const nextSlidePortion = 24;
const mobilePadding = 16;

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
            [theme.mq.largeDesktop]: {
                left: -(24 + arrowButtonSize),
            },
        },
        '&.next': {
            right: -arrowButtonSize / 2,
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
    },
    carousel: {
        display: 'flex',
        overflowX: 'auto',
        minWidth: '100%',
        scrollSnapType: 'x mandatory',
        ...hideScrollbar,
        [theme.mq.tabletOrSmaller]: {
            margin: `0 -${mobilePadding}px`,
        },
    },
    slide: {
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: ({itemsPerPageConfig}) =>
            `calc(${(1 / itemsPerPageConfig.desktop) * 100}% + ${gap / itemsPerPageConfig.desktop}px)`,
        scrollMargin: `-${gap}px`,
        '&:first-child': {
            width: ({itemsPerPageConfig}) =>
                `calc(${(1 / itemsPerPageConfig.desktop) * 100}% - ${
                    (gap * (itemsPerPageConfig.desktop - 1)) / itemsPerPageConfig.desktop
                }px)`,
            scrollMargin: 0,
        },
        [theme.mq.tabletOrSmaller]: {
            scrollMargin: `16px`,
            width: ({itemsPerPageConfig}) =>
                `calc(${(1 / itemsPerPageConfig.mobile) * 100}% - ${
                    nextSlidePortion / itemsPerPageConfig.mobile + 16 / itemsPerPageConfig.mobile
                }px)`,
            '&:first-child': {
                paddingLeft: mobilePadding,
                width: ({itemsPerPageConfig}) =>
                    `calc(${(1 / itemsPerPageConfig.mobile) * 100}% - ${
                        nextSlidePortion / itemsPerPageConfig.mobile +
                        16 / itemsPerPageConfig.mobile -
                        (mobilePadding - gap)
                    }px)`,
            },
            '&:last-child': {
                paddingRight: mobilePadding,
                width: ({itemsPerPageConfig}) =>
                    `calc(${(1 / itemsPerPageConfig.mobile) * 100}% - ${
                        nextSlidePortion / itemsPerPageConfig.mobile +
                        16 / itemsPerPageConfig.mobile -
                        mobilePadding
                    }px)`,
            },
        },
        '&:not(:empty) ~ &:not(:empty)': {
            paddingLeft: gap,
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

const calcPagesCount = (el: HTMLElement) => {
    const pagesCount = Math.ceil(el.scrollWidth / el.clientWidth);
    console.log(
        'pagesCount',
        pagesCount,
        el.scrollWidth / el.clientWidth,
        'scrollWidth',
        el.scrollWidth,
        'clientWidth',
        el.clientWidth,
        'offsetWidth',
        el.offsetWidth
    );
    return pagesCount;
};

const calcPageIndex = (el: HTMLDivElement, pagesCount: number) => {
    const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    const pageIndex = Math.round(scrollRatio * (pagesCount - 1));
    console.log('calcPageIndex', pageIndex, 'scroll ratio', scrollRatio, 'scroll left', el.scrollLeft);
    return pageIndex;
};

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

type Props = {
    items: ReadonlyArray<React.ReactNode>;
    withBullets?: boolean;
    itemsPerPage?: ItemsPerPageProp;
    children?: void;
};

const Carousel: React.FC<Props> = ({items, withBullets, itemsPerPage}) => {
    const itemsPerPageConfig = normalizeItemsPerPage(itemsPerPage);
    const {isDesktopOrBigger} = useScreenSize();
    const {colors} = useTheme();
    const classes = useStyles({itemsPerPageConfig});
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const pagesCount = Math.ceil(
        isDesktopOrBigger
            ? items.length / itemsPerPageConfig.desktop
            : items.length / itemsPerPageConfig.mobile
    );
    // const [pagesCount, setPagesCount] = React.useState(3);
    const [scrollRatio, setScrollRatio] = React.useState(0);
    const [showPrevArrow, setShowPrevArrow] = React.useState(false);
    const [showNextArrow, setShowNextArrow] = React.useState(false);

    React.useEffect(() => {
        if (carouselRef.current) {
            const carouselEl = carouselRef.current;

            const handleCarouselChange = () => {
                console.log('change');
                // const pagesCount = calcPagesCount(carouselEl);
                const {scrollLeft, scrollWidth, clientWidth} = carouselEl;
                const scrollRatio = scrollLeft / (scrollWidth - clientWidth);
                // const pageIndex = calcPageIndex(carouselEl, pagesCount);
                // setPagesCount(pagesCount);

                const scrollRight = scrollWidth - (scrollLeft + clientWidth);
                setShowPrevArrow(scrollLeft !== 0);
                setShowNextArrow(scrollRight !== 0);

                setScrollRatio(scrollRatio);
            };

            handleCarouselChange();

            carouselEl.addEventListener('scroll', handleCarouselChange);
            const mutationObserver = new MutationObserver(handleCarouselChange);
            mutationObserver.observe(carouselEl, {childList: true, attributes: true, subtree: true});
            const resizeObserver = new ResizeObserver(handleCarouselChange);
            resizeObserver.observe(carouselEl);

            return () => {
                carouselEl.removeEventListener('scroll', handleCarouselChange);
                resizeObserver.disconnect();
                mutationObserver.disconnect();
            };
        }
        return () => {};
    }, [pagesCount]);

    const goToPage = (pageIndex: number) => {
        if (carouselRef.current) {
            const carouselEl = carouselRef.current;
            const scroll = pageIndex * (carouselEl.clientWidth + gap);
            console.log('goToPage', pageIndex, 'scroll to', scroll);
            carouselEl.scrollTo({left: scroll, behavior: 'smooth'});
        }
    };

    const goPrev = () => {
        const currentFloorPageIndex = Math.floor(scrollRatio * (pagesCount - 1));
        const pageIndex = scrollRatio * (pagesCount - 1);
        console.log(
            'goPrev scrollRatio',
            scrollRatio,
            'pageIndex',
            pageIndex,
            'currentFloorPageIndex',
            currentFloorPageIndex
        );
        goToPage(currentFloorPageIndex - 1);
    };

    const goNext = () => {
        const currentCeilPageIndex = Math.ceil(scrollRatio * (pagesCount - 1));
        const pageIndex = scrollRatio * (pagesCount - 1);
        console.log(
            'goNext scrollRatio',
            scrollRatio,
            'pageIndex',
            pageIndex,
            'currentCeilPageIndex',
            currentCeilPageIndex
        );
        goToPage(currentCeilPageIndex + 1);
    };

    const bulletSize = isDesktopOrBigger ? 8 : 4;
    const currentBulletSize = isDesktopOrBigger ? 10 : 6;
    const currentPageIndex = Math.floor(scrollRatio * (pagesCount - 1));

    return (
        <Stack space={24}>
            <div className={classes.carouselContainer}>
                {showPrevArrow && (
                    <Touchable
                        className={classNames(classes.arrowButton, 'prev')}
                        aria-label="previous"
                        onPress={goPrev}
                    >
                        <IconChevronLeftRegular />
                    </Touchable>
                )}
                <div className={classes.carousel} ref={carouselRef}>
                    {items.map((item, index) => (
                        <div key={index} className={classes.slide}>
                            {item}
                        </div>
                    ))}
                </div>
                {showNextArrow && (
                    <Touchable
                        className={classNames(classes.arrowButton, 'next')}
                        aria-label="next"
                        onPress={goNext}
                    >
                        <IconChevronRightRegular />
                    </Touchable>
                )}
            </div>
            {withBullets && (
                <div className={classes.bullets}>
                    <Inline space={8} alignItems="center">
                        {Array.from({length: pagesCount}, (_, i: number) => (
                            <Touchable
                                maybe
                                aria-label={`go to slide ${i}`}
                                onPress={isDesktopOrBigger ? () => goToPage(i) : undefined}
                            >
                                <Circle
                                    size={i === currentPageIndex ? currentBulletSize : bulletSize}
                                    backgroundColor={
                                        i === currentPageIndex ? colors.controlActivated : colors.control
                                    }
                                />
                            </Touchable>
                        ))}
                    </Inline>
                </div>
            )}
        </Stack>
    );
};

export default Carousel;
