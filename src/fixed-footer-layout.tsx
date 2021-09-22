import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import {createUseStyles} from './jss';
import {isRunningAcceptanceTest} from './utils/platform';
import {useElementDimensions, useIsomorphicLayoutEffect, useScreenSize, useTheme} from './hooks';
import {addPassiveEventListener, removePassiveEventListener} from './utils/dom';
import {useTopDistance} from './fixed-to-top';

const getScrollDistanceToBottom = () => document.body.scrollHeight - window.innerHeight - window.scrollY;

const waitForSwitchTransitionToStart = (fn: () => void) => {
    const timeoutId = setTimeout(fn, 0);
    return {
        cancel: () => clearTimeout(timeoutId),
    };
};

// this high zIndex is needed because the fixed footer must be displayed over
// the bottom navbar from movistar.es in mobile
const Z_INDEX = 25;

const useStyles = createUseStyles((theme) => ({
    footer: {
        width: '100%',
    },

    shadow: {},

    withoutFooter: {
        display: 'none',
    },

    containerSmall: {
        paddingBottom: ({height}) => height,
        backgroundColor: ({containerBgColor}) => containerBgColor || theme.colors.background,
        minHeight: ({topDistance}) => `calc(100vh - ${topDistance}px)`,
    },

    [theme.mq.tabletOrSmaller]: {
        footer: {
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: Z_INDEX,
        },
        shadow: {
            boxShadow: '0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
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
    const [displayShadow, setDisplayShadow] = React.useState(false);
    const childrenRef = React.useRef<HTMLDivElement>(null);
    const {isTabletOrSmaller} = useScreenSize();
    const {platformOverrides} = useTheme();
    const {height: realHeight, ref} = useElementDimensions();
    const {colors} = useTheme();
    const topDistance = useTopDistance();

    useIsomorphicLayoutEffect(() => {
        onChangeFooterHeight?.(realHeight);
    }, [onChangeFooterHeight, realHeight]);

    React.useEffect(() => {
        const shouldDisplayShadow = () => {
            if (isRunningAcceptanceTest(platformOverrides)) {
                return false;
            }
            const {current: childrenContainer} = childrenRef;
            if (childrenContainer) {
                const top = childrenContainer.getBoundingClientRect().top;
                // If content is larger than available space i.e. has scroll, then check if is scrolled to bottom
                if (childrenContainer.offsetHeight + top > window.innerHeight) {
                    return getScrollDistanceToBottom() > 1; // This is 1 and not 0 because a weird bug with Safari
                }
            }
            return false;
        };

        const checkDisplayShadow = debounce(
            () => {
                setDisplayShadow(shouldDisplayShadow());
            },
            50,
            {leading: true}
        );

        const transitionAwaiter = waitForSwitchTransitionToStart(checkDisplayShadow);
        addPassiveEventListener(window, 'resize', checkDisplayShadow);
        addPassiveEventListener(window, 'scroll', checkDisplayShadow);
        return () => {
            checkDisplayShadow.cancel();
            removePassiveEventListener(window, 'scroll', checkDisplayShadow);
            removePassiveEventListener(window, 'resize', checkDisplayShadow);
            transitionAwaiter.cancel();
        };
    }, [children, childrenRef, platformOverrides]);

    const classes = useStyles({footerBgColor, containerBgColor, height: realHeight, topDistance});

    return (
        <>
            <div ref={childrenRef} className={classnames({[classes.containerSmall]: isTabletOrSmaller})}>
                {children}
            </div>
            <div
                ref={ref}
                className={classnames(classes.footer, {
                    [classes.withoutFooter]: !isFooterVisible,
                    [classes.shadow]: displayShadow,
                })}
                // this style is inline to avoid creating a class that may collide with
                // other fixed footers during the page animation transition
                style={{background: isTabletOrSmaller ? footerBgColor || colors.background : undefined}}
                data-testid={`fixed-footer${isFooterVisible ? '-visible' : '-hidden'}`}
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
