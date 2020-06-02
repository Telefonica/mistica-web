// @flow
import * as React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import {createUseStyles} from './jss';
import {getIosVersion, isRunningAcceptanceTest} from './utils/platform';
import compareVersion from 'semver-compare';
import {useScreenSize} from './hooks';

// $FlowFixMe
const getScrollDistanceToBottom = () => document.body.scrollHeight - window.innerHeight - window.scrollY;

/**
 * Detect passive event listeners support
 * @see passiveeventlisteners.js at https://github.com/Modernizr/Modernizr/
 */
let supportsPassive = false;
try {
    const opts = Object.defineProperty({}, 'passive', {
        get() {
            supportsPassive = true;
        },
    });
    // $FlowFixMe
    window.addEventListener('test', null, opts);
} catch (e) {
    // does not support passive event listeners :(
}

const addPassiveEventListener = (el: EventTarget, eventName: string, listener: (any) => void): void =>
    el.addEventListener(eventName, listener, supportsPassive ? {passive: true} : false);

const removePassiveEventListener = (el: EventTarget, eventName: string, listener: (any) => void): void =>
    el.removeEventListener(eventName, listener, supportsPassive ? {passive: true} : false);

const waitForSwitchTransitionToStart = (fn: () => void) => {
    const timeoutId = setTimeout(fn, 0);
    return {
        cancel: () => clearTimeout(timeoutId),
    };
};

const useStyles = createUseStyles((theme) => ({
    footer: {
        width: '100%',
        // JSS warns here if we use a nested function value
        background: ({isMobile, footerBgColor}) =>
            isMobile ? footerBgColor || theme.colors.background : undefined,
    },

    shadow: {},

    withoutFooter: {
        display: 'none',
    },

    containerMobile: {
        paddingBottom: ({height}) => height,
        backgroundColor: ({containerBgColor}) => containerBgColor || theme.colors.background,
    },

    [theme.mq.mobile]: {
        footer: {
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 1,
        },
        shadow: {
            boxShadow: '0 -1px 2px 0 rgba(0, 0, 0, 0.2)',
            zIndex: 1,
        },
    },
}));

type Props = {
    isFooterVisible?: boolean,
    footer: React.Node,
    footerHeight?: number,
    footerBgColor?: string,
    containerBgColor?: string,
    children: React.Node,
};

const canHaveNotch = () => compareVersion(getIosVersion(), '11.4.0') >= 0; // https://caniuse.com/#search=env

const FixedFooterLayout = ({
    isFooterVisible = true,
    footer,
    footerHeight = 80,
    footerBgColor,
    containerBgColor,
    children,
}: Props): React.Node => {
    const [displayShadow, setDisplayShadow] = React.useState(false);
    const childrenRef = React.useRef();
    const {isMobile} = useScreenSize();

    React.useEffect(() => {
        const shouldDisplayShadow = () => {
            if (isRunningAcceptanceTest()) {
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
    }, [children, childrenRef]);

    const heightWithNotchInset = canHaveNotch()
        ? `calc(${footerHeight}px + env(safe-area-inset-bottom))`
        : footerHeight;
    const height = isFooterVisible ? heightWithNotchInset : 0;

    const classes = useStyles({footerBgColor, containerBgColor, height, isMobile});

    return (
        <>
            <div ref={childrenRef} className={classnames({[classes.containerMobile]: isMobile})}>
                {children}
            </div>
            <div
                className={classnames(classes.footer, {
                    [classes.withoutFooter]: !isFooterVisible,
                    [classes.shadow]: displayShadow,
                })}
                style={{height, paddingBottom: isFooterVisible ? 'env(safe-area-inset-bottom)' : 0}}
                data-testid={`fixed-footer${isFooterVisible ? '-visible' : '-hidden'}`}
            >
                {footer}
            </div>
        </>
    );
};

export default FixedFooterLayout;
