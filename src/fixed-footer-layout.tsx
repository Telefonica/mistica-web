'use client';
import * as React from 'react';
import classnames from 'classnames';
import {debounce} from './utils/helpers';
import {isRunningAcceptanceTest} from './utils/platform';
import {
    useBoundingRect,
    useElementDimensions,
    useIsomorphicLayoutEffect,
    useScreenSize,
    useTheme,
    useWindowSize,
} from './hooks';
import {
    addPassiveEventListener,
    getScrollableParentElement,
    getScrollDistanceToBottom,
    hasScroll,
    removePassiveEventListener,
} from './utils/dom';
import {Portal} from './portal';
import {vars} from './skins/skin-contract.css';
import * as styles from './fixed-footer-layout.css';
import {applyCssVars, safeAreaInsetBottom} from './utils/css';
import {useFixedToTopHeight} from './fixed-to-top';
import {useOverScrollColor} from './overscroll-color-context';

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
    footerRole?: string;
    containerBgColor?: string;
    children: React.ReactNode;
    onChangeFooterHeight?: (heightInPx: number) => void;
};

const MIN_AVAILABLE_HEIGHT_FOR_FIXED = 200;

const FixedFooterLayout = ({
    isFooterVisible = true,
    footer,
    footerHeight = 'auto',
    footerBgColor = vars.colors.background,
    footerRole,
    containerBgColor = vars.colors.background,
    children,
    onChangeFooterHeight,
}: Props): JSX.Element => {
    const [displayElevation, setDisplayElevation] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {height: contentHeight} = useBoundingRect(containerRef) || {height: 0};
    const {isTabletOrSmaller} = useScreenSize();
    const {platformOverrides} = useTheme();
    // include margins to take into account marginBottom: safe-area-inset-bottom
    const {height: domFooterHeight, ref} = useElementDimensions({includeMargins: true});
    const {visualHeight} = useWindowSize();
    const topDistance = useFixedToTopHeight();
    const availableHeight = visualHeight - topDistance - domFooterHeight;
    const isFooterFixed = availableHeight > MIN_AVAILABLE_HEIGHT_FOR_FIXED;
    const {topColor = footerBgColor} = useOverScrollColor();
    const {height: gradientHeight, ref: gradientRef} = useElementDimensions();

    useIsomorphicLayoutEffect(() => {
        onChangeFooterHeight?.(domFooterHeight);
    }, [onChangeFooterHeight, domFooterHeight]);

    React.useEffect(() => {
        /**
         * There is no elevation in desktop devices and we don't display it in acceptance tests or when the
         * content's height is too small, so we avoid unnecesary calculations in these cases.
         */
        if (!isTabletOrSmaller || isRunningAcceptanceTest(platformOverrides) || !isFooterFixed) {
            setDisplayElevation(false);
            return;
        }

        const scrollable = getScrollableParentElement(containerRef.current);

        const shouldDisplayElevation = () =>
            hasScroll(scrollable) && getScrollDistanceToBottom(scrollable) > topDistance + 1; // This is 1 and not 0 because a weird bug with Safari

        const checkDisplayElevation = debounce(
            () => {
                setDisplayElevation(shouldDisplayElevation());
            },
            50,
            {leading: true, maxWait: 100}
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
        platformOverrides,
        isTabletOrSmaller,
        isFooterFixed,
        // `topDistance` and `contentHeight` dependencies are needed to recalculate the elevation state
        topDistance,
        contentHeight,
    ]);

    /**
     * Diagram of the layout:
     * https://excalidraw.com/#json=No0s6LB7QO735nv-wGIEP,9OOuqiaFInbtr1YjMm4g4Q
     */
    const renderBackground = () => {
        return (
            <Portal className={styles.portal}>
                <div
                    className={styles.fixedBackgroundLayer}
                    style={{
                        background: `linear-gradient(180deg, ${topColor} 50%, ${footerBgColor} 50% 100%)`,
                    }}
                />
                <div
                    ref={gradientRef}
                    className={styles.absoluteBackgroundLayer}
                    style={{
                        background: containerBgColor, // this color could be a gradient
                        top: topDistance - 1, // -1 because the navigationbar could have a 1px transparent background
                        bottom: isFooterFixed ? domFooterHeight : 'unset',
                        height: isFooterFixed ? 'unset' : contentHeight,
                    }}
                />

                <div
                    className={styles.absoluteBackgroundLayer}
                    style={{
                        background: footerBgColor,
                        top: gradientHeight + topDistance - 1,
                        height: `calc(${contentHeight}px - ${gradientHeight}px)`,
                    }}
                />
            </Portal>
        );
    };

    return (
        <>
            <div
                ref={containerRef}
                className={styles.container}
                style={applyCssVars({
                    [styles.vars.footerHeight]: isFooterFixed ? `${domFooterHeight}px` : '0px',
                })}
            >
                {renderBackground()}
                {children}
            </div>
            {isFooterVisible && isFooterFixed && (
                /**
                 * This style is added to the `html` element to prevent the footer
                 * from covering the focus of elements when there is overflow.
                 */
                <style>{`html {scroll-padding-bottom: ${domFooterHeight}px}`}</style>
            )}
            <div
                className={classnames(styles.footer, {
                    [styles.withoutFooter]: !isFooterVisible,
                    [styles.elevated]: displayElevation,
                    [styles.fixedFooter]: isFooterFixed,
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
                    <div
                        role={footerRole}
                        ref={ref}
                        data-component-name="FixedFooter"
                        data-testid="FixedFooter"
                        style={{
                            height: footerHeight,
                            marginBottom: safeAreaInsetBottom,
                        }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </>
    );
};

export default FixedFooterLayout;
