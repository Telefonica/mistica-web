import * as React from 'react';
import classnames from 'classnames';
import ScreenReaderOnly from './screen-reader-only';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import {isInsideNovumNativeApp} from './utils/platform';
import {Link} from 'react-router-dom';
import {ENTER, SPACE} from './utils/key-codes';

import type {TrackingEvent} from './utils/types';
import type {Location} from 'history';

const redirect = (url: string, external = false): void => {
    if (external) {
        window.open(url, '_blank');
    } else {
        document.location.href = url;
    }
};

const useStyles = createUseStyles(() => ({
    touchable: {
        verticalAlign: 'bottom', // required to remove bottom gap when rendered as inline-block div
        fontFamily: 'inherit',
        display: 'block',
        overflow: 'visible',
        appearance: 'none',
        border: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        backgroundColor: 'transparent',
        padding: 0,
        textAlign: 'inherit',
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',
        '&::-moz-focus-inner': {
            padding: 0,
            border: 'none',
        },
        '&[disabled]': {
            cursor: 'auto',
            pointerEvents: 'none',
        },
        '&:active, &:hover': {
            textDecoration: 'none',
        },
    },

    notTouchable: {
        cursor: 'auto',
    },
}));

export type PressHandler = (event: React.MouseEvent<HTMLElement>) => void;

interface CommonProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    elementRef?: React.RefObject<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>;
    style?: React.CSSProperties;
    trackingEvent?: TrackingEvent;
    label?: string;
    'data-testid'?: string;
    'aria-checked'?: 'true' | 'false';
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false';
    'aria-hidden'?: 'true' | 'false';
    'aria-selected'?: 'true' | 'false';
    role?: string;
    type?: 'button' | 'submit';
    tabIndex?: number;
}

/*
 * We are using "href", "to" and "onPress" as union discriminant.
 * this way we can know the type of the union by checking that property
 * See https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export interface PropsHref extends CommonProps {
    href: string;
    newTab?: boolean;
    to?: undefined;
    onPress?: undefined;
}
export interface PropsOnPress extends CommonProps {
    onPress: PressHandler;
    href?: undefined;
    to?: undefined;
}
export interface PropsTo extends CommonProps {
    to: string | Location;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
}
export interface PropsMaybeHref extends CommonProps {
    maybe: true;
    href?: string;
    newTab?: boolean;
    to?: undefined;
    onPress?: undefined;
}
export interface PropsMaybeTo extends CommonProps {
    maybe: true;
    to?: string | Location;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
}
export interface PropsMaybeOnPress extends CommonProps {
    maybe: true;
    onPress?: PressHandler;
    href?: undefined;
    to?: undefined;
}

type Props = PropsHref | PropsTo | PropsOnPress | PropsMaybeHref | PropsMaybeTo | PropsMaybeOnPress;

const Touchable: React.FC<Props> = (props) => {
    const {texts, analytics, platformOverrides} = useTheme();
    const classes = useStyles();
    const isClicked = React.useRef(false);

    const children = props.children;

    const commonProps = {
        className: classnames(classes.touchable, props.className),
        disabled: props.disabled,
        style: props.style,
        role: props.role,
        'data-testid': props['data-testid'],
        'aria-checked': props['aria-checked'],
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        'aria-hidden': props['aria-hidden'],
        'aria-selected': props['aria-selected'],
        tabIndex: props.tabIndex,
    };

    const type = props.type ? props.type : 'button';

    const openNewTab = !!props.href && !!props.newTab;

    const onPress = (event: React.MouseEvent<HTMLElement>) => {
        if (props.onPress) {
            props.onPress(event);
        }
    };

    const getHref = (): string => {
        if (props.href) {
            return props.href;
        }
        if (props.to && props.fullPageOnWebView) {
            if (typeof props.to === 'string') {
                return props.to;
            }
            return props.to.pathname ?? '';
        }
        return '';
    };

    const trackEvent = () =>
        props.trackingEvent ? analytics.logEvent(props.trackingEvent) : Promise.resolve();

    const trackOnce = (callback: () => void) => {
        if (isClicked.current) return;
        isClicked.current = true;

        trackEvent().finally(() => {
            isClicked.current = false;
            callback();
        });
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        // synchronously execute handler when no tracking is needed
        if (!props.trackingEvent) {
            onPress(event);
            return;
        }

        trackOnce(() => onPress(event));
    };

    const handleHrefClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!props.trackingEvent) {
            return; // leave the browser handle the href
        }

        event.preventDefault();
        trackOnce(() => redirect(getHref(), openNewTab));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            event.preventDefault();
            event.currentTarget.click();
        }
    };

    if (!!props.href || (props.to && props.fullPageOnWebView && isInsideNovumNativeApp(platformOverrides))) {
        return (
            <a
                {...commonProps}
                aria-label={props.label}
                onClick={handleHrefClick}
                onKeyDown={handleKeyDown}
                href={props.disabled ? '' : getHref()}
                target={openNewTab ? '_blank' : undefined}
                rel={openNewTab ? 'noopener noreferrer' : undefined}
            >
                {children}
                {openNewTab && (
                    <ScreenReaderOnly>
                        <span>{texts.linkOpensInNewTab}</span>
                    </ScreenReaderOnly>
                )}
            </a>
        );
    }

    if (props.to) {
        return (
            <Link
                {...commonProps}
                aria-label={props.label}
                innerRef={props.elementRef as React.RefObject<HTMLAnchorElement>}
                to={props.disabled ? '' : props.to}
                replace={props.replace}
                onClick={trackEvent}
                onKeyDown={handleKeyDown}
            >
                {children}
            </Link>
        );
    }

    if (props.onPress) {
        return (
            <button
                {...commonProps}
                aria-label={props.label}
                type={type}
                ref={props.elementRef as React.RefObject<HTMLButtonElement>}
                onClick={handleButtonClick}
            >
                {children}
            </button>
        );
    }

    return (
        <div
            {...commonProps}
            ref={props.elementRef as React.RefObject<HTMLDivElement>}
            className={classnames(commonProps.className, classes.notTouchable)}
        >
            {children}
        </div>
    );
};

export default Touchable;
