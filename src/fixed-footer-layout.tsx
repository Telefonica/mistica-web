import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import {isRunningAcceptanceTest} from './utils/platform';
import {
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
import * as styles from './fixed-footer-layout.css';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {isServerSide} from './utils/environment';

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

const FixedFooterLayout: React.FC<Props> = ({
    isFooterVisible = true,
    footer,
    footerHeight = 'auto',
    footerBgColor,
    containerBgColor,
    children,
    onChangeFooterHeight,
}) => {
    const [displayElevation, setDisplayElevation] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {isTabletOrSmaller} = useScreenSize();
    const {platformOverrides} = useTheme();
    const {height: realFooterHeight, ref} = useElementDimensions();
    const isWithinIFrame = useIsWithinIFrame();
    const windowHeight = useWindowHeight();
    const screenHeight = useScreenHeight();
    const hasContentEnoughVSpace =
        windowHeight - realFooterHeight >
        (isWithinIFrame ? windowHeight : screenHeight) / FOOTER_CANVAS_RATIO;

    useIsomorphicLayoutEffect(() => {
        onChangeFooterHeight?.(realFooterHeight);
    }, [onChangeFooterHeight, realFooterHeight]);

    React.useEffect(() => {
        const scrollable = getScrollableParentElement(containerRef.current);

        const shouldDisplayElevation = () => {
            if (isRunningAcceptanceTest(platformOverrides)) {
                return false;
            }

            if (!hasContentEnoughVSpace) {
                return false;
            }

            if (hasScroll(scrollable)) {
                return getScrollDistanceToBottom(scrollable) > 1; // This is 1 and not 0 because a weird bug with Safari
            }

            return false;
        };

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
    }, [hasContentEnoughVSpace, platformOverrides]);

    const isContentWithScroll =
        !isServerSide() && hasScroll(getScrollableParentElement(containerRef.current));

    const isFixedFooter = hasContentEnoughVSpace || !isContentWithScroll;

    return (
        <>
            <div
                ref={containerRef}
                className={styles.container}
                style={assignInlineVars({
                    [styles.vars.backgroundColor]: containerBgColor ?? '',
                    [styles.vars.footerHeight]: isFixedFooter ? `${realFooterHeight}px` : '0px',
                })}
            >
                {children}
            </div>
            <div
                className={classnames(styles.footer, {
                    [styles.withoutFooter]: !isFooterVisible,
                    [styles.elevated]: displayElevation,
                    [styles.fixedFooter]: isFixedFooter,
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
                            marginBottom: 'env(safe-area-inset-bottom)',
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
