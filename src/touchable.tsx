'use client';
import * as React from 'react';
import classnames from 'classnames';
import ScreenReaderOnly from './screen-reader-only';
import * as classes from './touchable.css';
import {useTheme} from './hooks';
import {isInsideNovumNativeApp} from './utils/platform';
import {ENTER, SPACE} from './utils/keys';
import {getPrefixedDataAttributes} from './utils/dom';
import {redirect} from './utils/browser';
import * as tokens from './text-tokens';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, TrackingEvent} from './utils/types';
import type {Location} from 'history';

export type PressHandler = (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;

interface CommonProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    'aria-label'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-checked'?: 'true' | 'false' | boolean;
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false' | boolean;
    'aria-haspopup'?: 'true' | 'false' | 'menu' | 'dialog' | boolean;
    'aria-hidden'?: 'true' | 'false' | boolean;
    'aria-selected'?: 'true' | 'false' | boolean;
    'aria-labelledby'?: string;
    'aria-live'?: 'polite' | 'off' | 'assertive';
    'aria-current'?: React.AriaAttributes['aria-current'];
    'aria-description'?: string;
    'aria-describedby'?: string;
    /** IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate */
    role?: string;
    type?: 'button' | 'submit';
    tabIndex?: number;
    as?: 'a';
    stopPropagation?: boolean;
}

type OnPressProps = {
    onPress: PressHandler;
};

type HrefProps = {
    href: string;
    newTab?: boolean;
    loadOnTop?: boolean;
    onNavigate?: () => void | Promise<void>;
};

type ToProps = {
    to: string | Location;
    newTab?: boolean;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    onNavigate?: () => void | Promise<void>;
};

type SubmitProps = {
    type: 'submit';
    formId?: string;
    onPress?: PressHandler;
};

export type AlwaysTouchableComponentProps = ExclusifyUnion<OnPressProps | HrefProps | ToProps> &
    Pick<
        CommonProps,
        | 'trackingEvent'
        | 'dataAttributes'
        | 'role'
        | 'aria-label'
        | 'aria-labelledby'
        | 'aria-description'
        | 'aria-describedby'
        | 'aria-current'
    >;

export type TouchableComponentProps<Props> = ExclusifyUnion<
    Props | (OnPressProps & Props) | (HrefProps & Props) | (ToProps & Props)
> &
    Pick<
        CommonProps,
        | 'trackingEvent'
        | 'dataAttributes'
        | 'role'
        | 'aria-label'
        | 'aria-labelledby'
        | 'aria-description'
        | 'aria-describedby'
        | 'aria-current'
    >;

type Maybe<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K> & {maybe: true};

export type TouchableProps = ExclusifyUnion<
    | OnPressProps
    | HrefProps
    | ToProps
    | Maybe<OnPressProps, 'onPress'>
    | Maybe<HrefProps, 'href'>
    | Maybe<ToProps, 'to'>
    | SubmitProps
> &
    CommonProps;

export type TouchableElement = HTMLDivElement | HTMLAnchorElement | HTMLButtonElement;

const RawTouchable = React.forwardRef<TouchableElement, TouchableProps>((props, ref) => {
    const {texts, analytics, platformOverrides, Link, useHrefDecorator, t} = useTheme();
    const hrefDecorator = useHrefDecorator();
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
        className: props.className,
        id: props.id,
        disabled: props.disabled,
        style: props.style,
        role: props.role,
        tabIndex: props.tabIndex,
        'aria-hidden': props['aria-hidden'],
        'aria-live': props['aria-live'],
        ...getPrefixedDataAttributes(props.dataAttributes, 'Touchable'),
    };

    // aria props that we want to apply to both <a> and <button> elements, not applicable to <div>
    const touchableAriaProps = {
        'aria-checked': props['aria-checked'],
        'aria-disabled': props.disabled ? true : undefined,
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        'aria-haspopup': props['aria-haspopup'],
        'aria-selected': props['aria-selected'],
        'aria-current': props['aria-current'],
        'aria-label': props['aria-label'],
        'aria-labelledby': props['aria-labelledby'],
        'aria-description': props['aria-description'],
        'aria-describedby': props['aria-describedby'],
    };

    const type = props.type ? props.type : 'button';

    const openNewTab = !!props.newTab;
    const openInCurrentPage = props.href?.startsWith('#');
    const loadOnTop = !openNewTab && !!props.href && !!props.loadOnTop;

    const stopPropagationIfNeeded = (event: React.MouseEvent<HTMLElement>) => {
        if (props.stopPropagation) {
            event.stopPropagation();
        }
    };

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
        stopPropagationIfNeeded(event);
        // synchronously execute handler when no tracking is needed
        if (!trackingEvents.length) {
            onPress(event);
            return;
        }

        trackOnce(() => onPress(event));
    };

    const handleHrefClick = (event: React.MouseEvent<HTMLElement>) => {
        stopPropagationIfNeeded(event);

        const hasOnNavigate = !!(props.href && props.onNavigate);

        if (!trackingEvents.length && !hasOnNavigate) {
            return; // let the browser handle the href
        }
        event.preventDefault();

        Promise.resolve(hasOnNavigate ? props.onNavigate?.() : undefined).finally(() => {
            trackOnce(() => redirect(getHref(), openNewTab, loadOnTop));
        });
    };

    const handleToClick = (event: React.MouseEvent<HTMLElement>) => {
        stopPropagationIfNeeded(event);
        if (props.to && props.onNavigate) {
            props.onNavigate();
        }
        trackEvent();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === ENTER || event.key === SPACE) {
            event.preventDefault();
            event.currentTarget.click();
        }
    };

    const renderScreenReaderOnlyHint = () => {
        return openNewTab ? (
            <ScreenReaderOnly>
                <span>{texts.linkOpensInNewTab || t(tokens.linkOpensInNewTab)}</span>
            </ScreenReaderOnly>
        ) : openInCurrentPage ? (
            <ScreenReaderOnly>
                <span>{texts.linkOpensInCurrentPage || t(tokens.linkOpensInCurrentPage)}</span>
            </ScreenReaderOnly>
        ) : null;
    };

    if (!!props.href || (props.to && props.fullPageOnWebView && isInsideNovumNativeApp(platformOverrides))) {
        return (
            <a
                {...commonProps}
                {...touchableAriaProps}
                onClick={handleHrefClick}
                onKeyDown={handleKeyDown}
                href={props.disabled ? undefined : getHref()}
                target={(() => {
                    if (openNewTab) return '_blank';
                    if (loadOnTop) return '_top';
                    return undefined;
                })()}
                rel={openNewTab ? 'noopener noreferrer' : undefined}
                ref={ref as React.RefObject<HTMLAnchorElement>}
            >
                {children}
                {renderScreenReaderOnlyHint()}
            </a>
        );
    }

    if (props.to) {
        return (
            <Link
                {...commonProps}
                {...touchableAriaProps}
                target={props.newTab ? '_blank' : undefined}
                innerRef={ref as React.RefObject<HTMLAnchorElement>}
                to={props.disabled ? '' : props.to}
                replace={props.replace}
                onClick={handleToClick}
                onKeyDown={handleKeyDown}
            >
                {children}
                {renderScreenReaderOnlyHint()}
            </Link>
        );
    }

    if (props.onPress) {
        const elementType = props.as ?? 'button';
        const role = commonProps.role ?? (props.as === 'a' ? 'button' : undefined);
        return React.createElement(elementType, {
            ...commonProps,
            ...touchableAriaProps,
            role,
            // When an <a/> is rendered without an href value, the element is not accesible
            // by keyboard (using tab key). We add a fictional href to "#" to avoid this.
            href: elementType === 'a' ? '#' : undefined,
            // this "form" attribute is useful when the form's submit button
            // is located outside the <form> element, for example if you use
            // a ButtonFixedFooter layout inside a form with the submit
            // button located at the footer, which is redered using a Portal
            form: type === 'submit' && props.formId ? props.formId : undefined,
            type,
            ref: ref as React.RefObject<HTMLButtonElement>,
            onClick: (e: React.MouseEvent<HTMLElement>) => {
                // prevent navigating to fictional "#" if element is rendered as <a/>
                if (elementType === 'a') {
                    e.preventDefault();
                }
                handleButtonClick(e);
            },
            children,
        });
    }

    return (
        <div
            {...commonProps}
            ref={ref as React.RefObject<HTMLDivElement>}
            className={classnames(commonProps.className, classes.notTouchable)}
        >
            {children}
        </div>
    );
});

const Touchable = React.forwardRef<TouchableElement, TouchableProps>((props, ref) => {
    return <RawTouchable {...props} className={classnames(classes.touchable, props.className)} ref={ref} />;
});

// Used internally by Mística's components to avoid styles collisions
export const BaseTouchable = React.forwardRef<TouchableElement, TouchableProps & {resetMargin?: boolean}>(
    ({resetMargin = true, ...props}, ref) => {
        return (
            <RawTouchable
                {...props}
                className={classnames(classes.base, props.className, {[classes.marginReset]: resetMargin})}
                ref={ref}
            />
        );
    }
);

export default Touchable;
