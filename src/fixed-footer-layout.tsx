import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import {createUseStyles} from './jss';
import {isRunningAcceptanceTest} from './utils/platform';
import {useElementDimensions, useIsomorphicLayoutEffect, useScreenSize, useTheme} from './hooks';
import {
    addPassiveEventListener,
    getScrollableParentElement,
    getScrollDistanceToBottom,
    hasScroll,
    removePassiveEventListener,
} from './utils/dom';

const getScrollEventTarget = (el: HTMLElement) => (el === document.documentElement ? window : el);

const waitForSwitchTransitionToStart = (fn: () => void) => {
    const timeoutId = setTimeout(fn, 0);
    return {
        cancel: () => clearTimeout(timeoutId),
    };
};

const useStyles = createUseStyles((theme) => ({
    footer: {
        width: '100%',
    },

    elevated: {backgroundColor: theme.colors.backgroundContainer},

    withoutFooter: {
        display: 'none',
    },

    containerSmall: {
        paddingBottom: ({height}) => height,
        backgroundColor: ({containerBgColor}) => containerBgColor || theme.colors.background,
    },

    [theme.mq.tabletOrSmaller]: {
        footer: {
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 1,
        },
        elevated: {
            boxShadow: '0 -3px 8px 0 rgba(0, 0, 0, 0.15)',
        },
    },
}));

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
    const {height: realHeight, ref} = useElementDimensions();
    const {colors} = useTheme();

    useIsomorphicLayoutEffect(() => {
        onChangeFooterHeight?.(realHeight);
    }, [onChangeFooterHeight, realHeight]);

    React.useEffect(() => {
        const scrollable = getScrollableParentElement(containerRef.current);

        const shouldDisplayElevation = () => {
            if (isRunningAcceptanceTest(platformOverrides)) {
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
            {leading: true}
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
    }, [children, containerRef, platformOverrides]);

    const classes = useStyles({footerBgColor, containerBgColor, height: realHeight});

    return (
        <>
            <div ref={containerRef} className={classnames({[classes.containerSmall]: isTabletOrSmaller})}>
                {children}
            </div>
            <div
                ref={ref}
                className={classnames(classes.footer, {
                    [classes.withoutFooter]: !isFooterVisible,
                    [classes.elevated]: displayElevation,
                })}
                /**
                 * This style is inline to avoid creating a class that may collide with
                 * other fixed footers during the page animation transition
                 */
                
                data-testid={`fixed-footer${isFooterVisible ? '-visible' : '-hidden'}`}
                /**
                 * This hints about the position of the fixed element. Other components could select nodes
                 * with this data attribute to correctly position it while transitioning. For example in
                 * WebApp's PageTransition (see `switch-transition.js` in webapp repo)
                 */
                data-position-fixed="bottom"
            >
                {isFooterVisible && (
                    <aside style={{height: footerHeight, marginBottom: 'env(safe-area-inset-bottom)'}}>
                        {footer}
                    </aside>
                )}
            </div>
        </>
    );
};

export default FixedFooterLayout;
