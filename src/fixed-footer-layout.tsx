'use client';
import * as React from 'react';
import classnames from 'classnames';
import {debounce} from './utils/helpers';
import {isRunningAcceptanceTest} from './utils/platform';
import {
    useBoundingRect,
    useElementDimensions,
    useIsomorphicLayoutEffect,
    useIsWithinIFrame,
    useScreenHeight,
    useScreenSize,
    useTheme,
    useWindowHeight,
} from './hooks';
import {
    addPassiveEventListener,
    getScrollableParentElement,
    getScrollDistanceToBottom,
    hasScroll,
    removePassiveEventListener,
} from './utils/dom';
import {vars} from './skins/skin-contract.css';
import * as styles from './fixed-footer-layout.css';
import {applyCssVars, safeAreaInsetBottom} from './utils/css';
import {useFixedToTopHeight} from './fixed-to-top';

const FOOTER_CANVAS_RATIO = 2;
const getScrollEventTarget = (el: HTMLElement) => (el === document.documentElement ? window : el);

const waitForSwitchTransitionToStart = (fn: () => void) => {
    const timeoutId = setTimeout(fn, 0);
    return {
        cancel: () => clearTimeout(timeoutId),
    };
};

type Props = {
    isFooterVisible?: boolean;
    footer: React.ReactNode;
    footerHeight?: number | string;
    footerBgColor?: string;
    containerBgColor?: string;
    children: React.ReactNode;
    onChangeFooterHeight?: (heightInPx: number) => void;
};

const FixedFooterLayout = ({
    isFooterVisible = true,
    footer,
    footerHeight = 'auto',
    footerBgColor = vars.colors.background,
    containerBgColor = vars.colors.background,
    children,
    onChangeFooterHeight,
}: Props): JSX.Element => {
    const [displayElevation, setDisplayElevation] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {height: contentHeight} = useBoundingRect(containerRef) || {height: 0};
    const {isTabletOrSmaller} = useScreenSize();
    const {platformOverrides} = useTheme();
    const {height: domFooterHeight, ref} = useElementDimensions();
    const isWithinIFrame = useIsWithinIFrame();
    const windowHeight = useWindowHeight();
    const screenHeight = useScreenHeight();
    const hasContentEnoughVSpace =
        windowHeight - domFooterHeight > (isWithinIFrame ? windowHeight : screenHeight) / FOOTER_CANVAS_RATIO;
    const topDistance = useFixedToTopHeight();

    useIsomorphicLayoutEffect(() => {
        onChangeFooterHeight?.(domFooterHeight);
    }, [onChangeFooterHeight, domFooterHeight]);

    React.useEffect(() => {
        /**
         * There is no elevation in desktop devices and we don't display it in acceptance tests or when the
         * content's height is too small, so we avoid unnecesary calculations in these cases.
         */
        if (!isTabletOrSmaller || isRunningAcceptanceTest(platformOverrides) || hasContentEnoughVSpace) {
            return;
        }

        const scrollable = getScrollableParentElement(containerRef.current);

        const shouldDisplayElevation = () =>
            hasScroll(scrollable) && getScrollDistanceToBottom(scrollable) > 1; // This is 1 and not 0 because a weird bug with Safari

        const checkDisplayElevation = debounce(
            () => {
                setDisplayElevation(shouldDisplayElevation());
            },
            50,
            {leading: true, maxWait: 200}
        );

        const transitionAwaiter = waitForSwitchTransitionToStart(checkDisplayElevation);
        const scrollEventTarget = getScrollEventTarget(scrollable);
        addPassiveEventListener(scrollEventTarget, 'resize', checkDisplayElevation);
        addPassiveEventListener(scrollEventTarget, 'scroll', checkDisplayElevation);
        return () => {
            checkDisplayElevation.cancel();
            removePassiveEventListener(scrollEventTarget, 'scroll', checkDisplayElevation);
            removePassiveEventListener(scrollEventTarget, 'resize', checkDisplayElevation);
            transitionAwaiter.cancel();
        };
    }, [
        hasContentEnoughVSpace,
        platformOverrides,
        // `topDistance` and `contentHeight` dependencies are needed to recalculate the elevation state
        topDistance,
        contentHeight,
        isTabletOrSmaller,
    ]);

    const footerIsFixed = hasContentEnoughVSpace;
    const footerHeightStyle = `calc(${safeAreaInsetBottom} + ${domFooterHeight}px)`;

    /**
     * Notes about the background:
     *
     * - If a gradient is used as background color, the end color of the gradient must start at the
     *   top of the fixed footer. That means that the gradient height is "viewable area" minus "footer height".
     *
     * - The content could be scrollable and the gradient must scroll with it, so an additional background is
     *   needed to fill the gap between the gradient and the fixed footer. A fullscreen fixed div does this job.
     *
     * - When there is not enough vertical space, instead of a fixed footer, the footer is placed at the
     *   bottom of the content. In this case, the background size is the same as the content (height: 100%).
     *
     * - A feedback screen could contain a navigation bar. The topDistance is needed to calculate the gradient height.
     */
    const renderBackground = () => {
        return (
            <>
                {footerIsFixed && (
                    <div className={styles.fixedBackgroundLayer} style={{background: footerBgColor}} />
                )}
                <div
                    className={styles.absoluteBackgroundLayer}
                    style={{
                        background: containerBgColor, // this color could be a gradient
                        height: footerIsFixed
                            ? `calc((100vh - ${footerHeightStyle}) - ${topDistance}px)`
                            : `calc(100% - ${topDistance}px)`,
                    }}
                />
            </>
        );
    };

    return (
        <>
            <div
                ref={containerRef}
                className={styles.container}
                style={applyCssVars({
                    [styles.vars.footerHeight]: footerIsFixed
                        ? `calc(${safeAreaInsetBottom} + ${domFooterHeight}px)`
                        : '0px',
                })}
            >
                {renderBackground()}
                {children}
            </div>
            <div
                className={classnames(styles.footer, {
                    [styles.withoutFooter]: !isFooterVisible,
                    [styles.elevated]: displayElevation,
                    [styles.fixedFooter]: footerIsFixed,
                })}
                /**
                 * This style is inline to avoid creating a class that may collide with
                 * other fixed footers during the page animation transition
                 */
                style={{
                    background: isTabletOrSmaller ? footerBgColor : undefined,
                }}
                data-testid={`fixed-footer${isFooterVisible ? '-visible' : '-hidden'}`}
                /**
                 * This hints about the position of the fixed element. Other components could select nodes
                 * with this data attribute to correctly position it while transitioning. For example in
                 * WebApp's PageTransition (see `switch-transition.js` in webapp repo)
                 */
                data-position-fixed="bottom"
            >
                {isFooterVisible && (
                    <aside
                        ref={ref}
                        data-component-name="FixedFooter"
                        style={{
                            height: footerHeight,
                            marginBottom: safeAreaInsetBottom,
                        }}
                    >
                        {footer}
                    </aside>
                )}
            </div>
        </>
    );
};

export default FixedFooterLayout;
