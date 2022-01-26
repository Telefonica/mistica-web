import * as React from 'react';
import classnames from 'classnames';
import ScreenReaderOnly from './screen-reader-only';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import {isInsideNovumNativeApp} from './utils/platform';
import {ENTER, SPACE} from './utils/key-codes';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, TrackingEvent} from './utils/types';
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
        color: 'inherit',
        verticalAlign: 'bottom', // required to remove bottom gap when rendered as inline-block div
        fontFamily: 'inherit',
        overflow: 'visible',
        appearance: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'block',
        userSelect: 'none',
        backgroundColor: 'transparent',
        padding: 0,
        textAlign: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        width: '100%',
        '&::-moz-focus-inner': {
            padding: 0,
            border: 'none',
        },
        '&[disabled]': {
            cursor: 'default',
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
    /** @deprecated use ref */
    elementRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>;
    style?: React.CSSProperties;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    'aria-label'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-checked'?: 'true' | 'false' | boolean;
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false' | boolean;
    'aria-hidden'?: 'true' | 'false' | boolean;
    'aria-selected'?: 'true' | 'false' | boolean;
    'aria-labelledby'?: string;
    'aria-live'?: 'polite' | 'off' | 'assertive';
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
    formId?: string;
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
    formId?: string;
}

export type Props = PropsHref | PropsTo | PropsOnPress | PropsMaybeHref | PropsMaybeTo | PropsMaybeOnPress;

const Touchable = React.forwardRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement, Props>(
    (props, ref) => {
        const {texts, analytics, platformOverrides, Link, useHrefDecorator} = useTheme();
        const hrefDecorator = useHrefDecorator();
        const classes = useStyles();
        const isClicked = React.useRef(false);
        let trackingEvents: ReadonlyArray<TrackingEvent> = [];
        if (props.trackingEvent) {
            if (Array.isArray(props.trackingEvent)) {
                trackingEvents = props.trackingEvent;
            } else {
                trackingEvents = [props.trackingEvent as TrackingEvent];
            }
        }

        const children = props.children;

        const commonProps = {
            className: classnames(classes.touchable, props.className),
            disabled: props.disabled,
            style: props.style,
            role: props.role,
            'aria-checked': props['aria-checked'],
            'aria-controls': props['aria-controls'],
            'aria-expanded': props['aria-expanded'],
            'aria-hidden': props['aria-hidden'],
            'aria-selected': props['aria-selected'],
            'aria-live': props['aria-live'],
            tabIndex: props.tabIndex,
            ...getPrefixedDataAttributes(props.dataAttributes),
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
                return hrefDecorator(props.href);
            }
            if (props.to && props.fullPageOnWebView) {
                if (typeof props.to === 'string') {
                    return props.to;
                }
                return props.to.pathname ?? '';
            }
            return '';
        };

        const trackEvent = () => Promise.all(trackingEvents.map((event) => analytics.logEvent(event)));

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
            if (!trackingEvents.length) {
                onPress(event);
                return;
            }

            trackOnce(() => onPress(event));
        };

        const handleHrefClick = (event: React.MouseEvent<HTMLElement>) => {
            if (!trackingEvents.length) {
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

        if (
            !!props.href ||
            (props.to && props.fullPageOnWebView && isInsideNovumNativeApp(platformOverrides))
        ) {
            return (
                <a
                    {...commonProps}
                    aria-label={props['aria-label']}
                    aria-labelledby={props['aria-labelledby']}
                    onClick={handleHrefClick}
                    onKeyDown={handleKeyDown}
                    href={props.disabled ? undefined : getHref()}
                    target={openNewTab ? '_blank' : undefined}
                    rel={openNewTab ? 'noopener noreferrer' : undefined}
                    ref={ref as React.RefObject<HTMLAnchorElement>}
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
                    aria-label={props['aria-label']}
                    aria-labelledby={props['aria-labelledby']}
                    innerRef={(props.elementRef as React.RefObject<HTMLAnchorElement>) ?? ref}
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
                    // this "form" attribute is useful when the form's submit button
                    // is located outside the <form> element, for example if you use
                    // a ButtonFixedFooter layout inside a form with the submit
                    // button located at the footer, which is redered using a Portal
                    form={type === 'submit' && props.formId ? props.formId : undefined}
                    aria-label={props['aria-label']}
                    aria-labelledby={props['aria-labelledby']}
                    type={type}
                    ref={(props.elementRef as React.RefObject<HTMLButtonElement>) ?? ref}
                    onClick={handleButtonClick}
                >
                    {children}
                </button>
            );
        }

        return (
            <div
                {...commonProps}
                ref={(props.elementRef as React.RefObject<HTMLDivElement>) ?? ref}
                className={classnames(commonProps.className, classes.notTouchable)}
            >
                {children}
            </div>
        );
    }
);

export default Touchable;
