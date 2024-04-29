'use client';
import * as React from 'react';
import classnames from 'classnames';
import Spinner from './spinner';
import {BaseTouchable} from './touchable';
import {useIsInverseVariant} from './theme-variant-context';
import {useForm} from './form-context';
import {pxToRem} from './utils/css';
import {Text, Text2, Text3} from './text';
import Box from './box';
import {getTextFromChildren} from './utils/common';
import {eventActions, eventCategories, eventNames, useTrackingConfig} from './utils/analytics';
import {useTheme} from './hooks';
import {flattenChildren} from './skins/utils';
import * as styles from './button.css';
import {VIVO_NEW_SKIN} from './skins/constants';

import type {TouchableElement} from './touchable';
import type {
    DataAttributes,
    IconProps,
    RendersElement,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';
import type {Location} from 'history';

const renderButtonElement = ({
    content,
    defaultIconSize,
    renderText,
}: {
    content: React.ReactNode;
    defaultIconSize: number;
    renderText: (text: React.ReactNode) => React.ReactNode;
}): React.ReactNode => {
    const childrenArr = flattenChildren(content);
    const length = childrenArr.length;
    const resultChildrenArr: Array<React.ReactNode> = [];
    let accText: Array<React.ReactNode> = [];
    const flushAccText = () => {
        resultChildrenArr.push(
            <React.Fragment key={resultChildrenArr.length}>{renderText(accText)}</React.Fragment>
        );
        accText = [];
    };

    childrenArr.forEach((element, idx) => {
        const isFirstChild = idx === 0;
        const isLastChild = idx === length - 1;

        const isIconElement = React.isValidElement(element);

        if (isIconElement) {
            if (accText.length) {
                flushAccText();
            }
            const sizeInPx = element.props.size ?? defaultIconSize;
            resultChildrenArr.push(
                <div
                    key={resultChildrenArr.length}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: isFirstChild ? 0 : styles.ICON_MARGIN_PX,
                        marginRight: isLastChild ? 0 : styles.ICON_MARGIN_PX,
                    }}
                >
                    {React.cloneElement(element as React.ReactElement<IconProps>, {
                        size: pxToRem(sizeInPx),
                    })}
                </div>
            );
        } else {
            accText.push(element);
            if (isLastChild) {
                flushAccText();
            }
        }
    });
    return resultChildrenArr;
};

const ButtonLinkChevron: React.FC = () => {
    const {skinName} = useTheme();

    // vivo new skin has a different chevron
    if (skinName === VIVO_NEW_SKIN) {
        return (
            <svg width="0.25em" height="0.375em" viewBox="0 0 4 6" fill="none">
                <path
                    d="M3.11111 2.68886L0.735341 0.303827C0.63671 0.215263 0.513388 0.190898 0.405205 0.202848C0.299523 0.214521 0.19613 0.261624 0.121443 0.334577C0.0495715 0.402707 0.00869411 0.507933 0.00125738 0.60783C-0.00659698 0.713337 0.0210362 0.839777 0.121314 0.936392L2.33333 3.07775L0.114057 5.20689L0.110571 5.21056L0.108209 5.21315L0.103815 5.21806C0.0152508 5.31669 -0.0091142 5.44001 0.00283534 5.5482C0.0145086 5.65388 0.0616117 5.75727 0.134565 5.83196C0.202695 5.90383 0.307921 5.94471 0.407818 5.95215C0.513325 5.96 0.639765 5.93237 0.73638 5.83209L3.11111 3.46664C3.32589 3.25186 3.32589 2.90364 3.11111 2.68886Z"
                    fill="currentColor"
                />
            </svg>
        );
    }

    return (
        <svg width="0.5em" height="0.5em" viewBox="0 0 8 8">
            <path
                d="M6.32595 3.46071L3.03801 0.158595L3.03292 0.153747L3.032 0.152903L3.02931 0.150463L3.02848 0.149738L3.02248 0.144353C2.88533 0.021206 2.71386 -0.0126731 2.56343 0.00394249C2.41648 0.0201739 2.27272 0.0856702 2.16886 0.18711C2.06893 0.281844 2.01209 0.42816 2.00175 0.567065C1.99083 0.71377 2.02925 0.889583 2.16869 1.02392L5.24446 4.00145L2.15859 6.96199L2.15375 6.96708L2.1529 6.968L2.15046 6.97069L2.14974 6.97152L2.14435 6.97752C2.02121 7.11467 1.98733 7.28614 2.00394 7.43657C2.02017 7.58352 2.08567 7.72728 2.18711 7.83114C2.28184 7.93107 2.42816 7.98791 2.56706 7.99825C2.71377 8.00917 2.88958 7.97075 3.02392 7.83132L6.32595 4.5422V4.5422C6.6246 4.24355 6.6246 3.75935 6.32595 3.46071V3.46071Z"
                fill="currentColor"
            />
        </svg>
    );
};

const renderButtonContent = ({
    showSpinner,
    children,
    small,
    loadingText,
    shouldRenderSpinner,
    setShouldRenderSpinner,
    renderText,
    textContentStyle,
    StartIcon,
    EndIcon,
    withChevron,
}: {
    showSpinner: boolean;
    children: React.ReactNode;
    small?: boolean;
    loadingText?: string;
    shouldRenderSpinner: boolean;
    setShouldRenderSpinner: (value: boolean) => void;
    renderText: (text: React.ReactNode) => React.ReactNode;
    textContentStyle?: string;
    StartIcon?: React.FC<IconProps>;
    EndIcon?: React.FC<IconProps>;
    withChevron?: boolean;
}): React.ReactNode => {
    const defaultIconSize = small ? styles.SMALL_ICON_SIZE : styles.ICON_SIZE;
    const spinnerSizeRem = pxToRem(small ? styles.SMALL_SPINNER_SIZE : styles.SPINNER_SIZE);

    return (
        <>
            {/* text content */}
            <div aria-hidden={showSpinner ? true : undefined} className={textContentStyle}>
                {StartIcon && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: styles.ICON_MARGIN_PX,
                        }}
                    >
                        <StartIcon size={pxToRem(defaultIconSize)} color="currentColor" />
                    </div>
                )}
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    {renderButtonElement({
                        content: children,
                        defaultIconSize,
                        renderText,
                    })}
                    {withChevron && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: styles.CHEVRON_MARGIN_LEFT_LINK,
                            }}
                        >
                            <ButtonLinkChevron />
                        </div>
                    )}
                </div>
                {EndIcon && !withChevron && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: styles.ICON_MARGIN_PX,
                        }}
                    >
                        <EndIcon size={pxToRem(defaultIconSize)} color="currentColor" />
                    </div>
                )}
            </div>

            {/* the following div won't be visible (see loadingFiller class), this is used to force the button width */}
            <div
                className={styles.loadingFiller}
                aria-hidden
                style={
                    loadingText
                        ? {
                              paddingLeft: spinnerSizeRem,
                              paddingRight:
                                  styles.ICON_MARGIN_PX +
                                  2 * (small ? styles.X_SMALL_PADDING_PX : styles.X_PADDING_PX),
                          }
                        : undefined
                }
            >
                {renderButtonElement({content: loadingText, defaultIconSize, renderText})}
            </div>

            {/* loading content */}
            <div
                aria-hidden={showSpinner ? undefined : true}
                className={styles.loadingContent}
                onTransitionEnd={() => {
                    if (showSpinner !== shouldRenderSpinner) {
                        setShouldRenderSpinner(showSpinner);
                    }
                }}
            >
                {shouldRenderSpinner ? (
                    <Spinner
                        rolePresentation={!!loadingText}
                        color="currentcolor"
                        delay="0s"
                        size={spinnerSizeRem}
                    />
                ) : (
                    <div
                        style={{
                            display: 'inline-block',
                            width: spinnerSizeRem,
                            height: spinnerSizeRem,
                        }}
                    />
                )}
                {loadingText ? (
                    <Box paddingLeft={8}>
                        {renderButtonElement({content: loadingText, defaultIconSize, renderText})}
                    </Box>
                ) : null}
            </div>
        </>
    );
};

type ButtonType = 'primary' | 'secondary' | 'danger';

interface CommonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    small?: boolean;
    showSpinner?: boolean;
    loadingText?: string;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false' | boolean;
    'aria-haspopup'?: 'true' | 'false' | 'menu' | 'dialog' | boolean;
    tabIndex?: number;
    StartIcon?: React.FC<IconProps>;
    EndIcon?: React.FC<IconProps>;
    /** IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate */
    role?: string;
}

export interface ToButtonProps extends CommonProps {
    to: string | Location;
    fullPageOnWebView?: boolean;
    submit?: undefined;
    fake?: undefined;
    onPress?: undefined;
    href?: undefined;
    onNavigate?: () => void | Promise<void>;
}
export interface OnPressButtonProps extends CommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;
    submit?: undefined;
    fake?: undefined;
    to?: undefined;
    href?: undefined;
    onNavigate?: undefined;
}
export interface HrefButtonProps extends CommonProps {
    href: string;
    newTab?: boolean;
    loadOnTop?: boolean;
    submit?: undefined;
    fake?: undefined;
    onPress?: undefined;
    to?: undefined;
    onNavigate?: () => void | Promise<void>;
}
export interface FakeButtonProps extends CommonProps {
    fake: true;
    submit?: undefined;
    onPress?: undefined;
    to?: undefined;
    href?: undefined;
    onNavigate?: undefined;
}
export interface SubmitButtonProps extends CommonProps {
    submit: true;
    to?: undefined;
    fake?: undefined;
    onPress?: undefined;
    href?: undefined;
    onNavigate?: undefined;
}

export type ButtonProps =
    | FakeButtonProps
    | SubmitButtonProps
    | ToButtonProps
    | OnPressButtonProps
    | HrefButtonProps;

const Button = React.forwardRef<TouchableElement, ButtonProps & {type: ButtonType}>((props, ref) => {
    const {textPresets} = useTheme();
    const {eventFormat} = useTrackingConfig();
    const {formStatus, formId} = useForm();
    const isInverse = useIsInverseVariant();
    const {loadingText} = props;
    const isSubmitButton = !!props.submit;
    const isFormSending = formStatus === 'sending';
    const [isOnPressPromiseResolving, setIsOnPressPromiseResolving] = React.useState(false);

    const showSpinner = props.showSpinner || (isFormSending && isSubmitButton) || isOnPressPromiseResolving;

    // This state is needed to not render the spinner when hidden (because it causes high CPU usage
    // specially in iPhone). But we want the spinner to be visible during the show/hide animation.
    // * When showSpinner prop is true, state is changed immediately.
    // * When the transition ends this state is updated again if needed
    const [shouldRenderSpinner, setShouldRenderSpinner] = React.useState(!!showSpinner);

    React.useEffect(() => {
        if (showSpinner && !shouldRenderSpinner) {
            setShouldRenderSpinner(true);
        }
    }, [showSpinner, shouldRenderSpinner, formStatus]);

    const createDefaultTrackingEvent = (): TrackingEvent => {
        if (eventFormat === 'google-analytics-4') {
            return {
                name: eventNames.userInteraction,
                component_type: `${props.type}_button`,
                component_copy: getTextFromChildren(props.children),
            };
        } else {
            return {
                category: eventCategories.userInteraction,
                action: `${props.type}_button_tapped`,
                label: getTextFromChildren(props.children),
            };
        }
    };

    const renderText = (element: React.ReactNode) =>
        props.small ? (
            <Text
                size={14}
                lineHeight={20}
                weight={textPresets.button.weight}
                truncate={1}
                color="inherit"
                as="div"
            >
                {element}
            </Text>
        ) : (
            <Text3 weight={textPresets.button.weight} truncate={1} color="inherit" as="div">
                {element}
            </Text3>
        );

    const commonProps = {
        ref,
        className: classnames(
            isInverse ? styles.inverseButtonVariants[props.type] : styles.buttonVariants[props.type],
            props.className,
            {
                [styles.small]: props.small,
                [styles.isLoading]: showSpinner,
            }
        ),
        style: {cursor: props.fake ? 'pointer' : undefined, ...props.style},
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: props.dataAttributes,
        'aria-label': props['aria-label'],
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        'aria-haspopup': props['aria-haspopup'],
        tabIndex: props.tabIndex,
        children: renderButtonContent({
            showSpinner,
            shouldRenderSpinner,
            setShouldRenderSpinner,
            children: props.children,
            loadingText,
            small: props.small,
            renderText,
            textContentStyle: styles.textContent,
            StartIcon: props.StartIcon,
            EndIcon: props.EndIcon,
        }),
        disabled: props.disabled || showSpinner || isFormSending,
        role: props.role,
    };

    if (process.env.NODE_ENV !== 'production') {
        if (props.to === '' || props.href === '') {
            throw Error('to or href props are empty strings');
        }
    }

    if (props.fake) {
        return <BaseTouchable maybe {...commonProps} role="presentation" aria-hidden="true" />;
    }

    if (props.submit) {
        // using empty onPress handler so it gets rendered as a button
        return <BaseTouchable type="submit" formId={formId} onPress={() => {}} {...commonProps} />;
    }

    if (props.onPress) {
        return (
            <BaseTouchable
                {...commonProps}
                onPress={(e) => {
                    const result = props.onPress(e);
                    if (result) {
                        setIsOnPressPromiseResolving(true);
                        result.finally(() => setIsOnPressPromiseResolving(false));
                    }
                }}
            />
        );
    }

    if (props.to || props.to === '') {
        return (
            <BaseTouchable
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                onNavigate={props.onNavigate}
            />
        );
    }

    if (props.href || props.href === '') {
        return (
            <BaseTouchable
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
                loadOnTop={props.loadOnTop}
                onNavigate={props.onNavigate}
            />
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // this cannot happen
        throw Error('Bad button props');
    }

    return null;
});

type ButtonLinkType = 'default' | 'danger';

interface ButtonLinkCommonProps {
    children: React.ReactNode;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    showSpinner?: boolean;
    loadingText?: string;
    StartIcon?: React.FC<IconProps>;
    EndIcon?: React.FC<IconProps>;
    bleedLeft?: boolean;
    bleedRight?: boolean;
    bleedY?: boolean;
    'aria-label'?: string;
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false' | boolean;
    'aria-haspopup'?: 'true' | 'false' | 'menu' | 'dialog' | boolean;
    /** IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate */
    role?: string;
}

interface ButtonLinkOnPressProps extends ButtonLinkCommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;
    to?: undefined;
    href?: undefined;
    onNavigate?: undefined;
}

interface ButtonLinkHrefProps extends ButtonLinkCommonProps {
    href: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    onNavigate?: () => void | Promise<void>;
}

interface ButtonLinkToProps extends ButtonLinkCommonProps {
    to: string;
    fullPageOnWebView?: boolean;
    onPress?: undefined;
    href?: undefined;
    onNavigate?: () => void | Promise<void>;
}

export type ButtonLinkProps = ButtonLinkOnPressProps | ButtonLinkHrefProps | ButtonLinkToProps;

const BaseButtonLink = React.forwardRef<
    TouchableElement,
    ButtonLinkProps & {type: ButtonLinkType; withChevron?: boolean}
>(({type, ...props}, ref) => {
    const {formStatus} = useForm();
    const isInverse = useIsInverseVariant();
    const {textPresets} = useTheme();
    const {eventFormat} = useTrackingConfig();
    const {isDarkMode} = useTheme();

    const {loadingText} = props;
    const isFormSending = formStatus === 'sending';
    const [isOnPressPromiseResolving, setIsOnPressPromiseResolving] = React.useState(false);

    const showSpinner = props.showSpinner || isOnPressPromiseResolving;
    const showChevron = props.withChevron ?? (!!props.href || !!props.to);

    // This state is needed to not render the spinner when hidden (because it causes high CPU usage
    // specially in iPhone). But we want the spinner to be visible during the show/hide animation.
    // * When showSpinner prop is true, state is changed immediately.
    // * When the transition ends this state is updated again if needed
    const [shouldRenderSpinner, setShouldRenderSpinner] = React.useState(!!showSpinner);

    React.useEffect(() => {
        if (showSpinner && !shouldRenderSpinner) {
            setShouldRenderSpinner(true);
        }
    }, [showSpinner, shouldRenderSpinner, formStatus]);

    const createDefaultTrackingEvent = (): TrackingEvent => {
        if (eventFormat === 'google-analytics-4') {
            return {
                name: eventNames.userInteraction,
                component_type: type === 'danger' ? 'danger_link' : 'link',
                component_copy: getTextFromChildren(props.children),
            };
        } else {
            return {
                category: eventCategories.userInteraction,
                action: eventActions.linkTapped,
                label: getTextFromChildren(props.children),
            };
        }
    };

    const renderText = (element: React.ReactNode) => (
        <Text2 weight={textPresets.button.weight} truncate={1} color="inherit">
            {element}
        </Text2>
    );

    const finalType = type === 'danger' && isDarkMode && isInverse ? 'dangerDark' : type;

    const commonProps = {
        className: classnames(
            isInverse ? styles.inverseLinkVariants[finalType] : styles.linkVariants[finalType],
            {
                [styles.isLoading]: showSpinner,
            }
        ),
        /**
         * Setting bleed classes with style to override the margin:0 set by the Touchable component.
         * If we set it using className, it may not work depending on the order in which the styles are applied.
         */
        style: {
            ...(props.bleedLeft ? {marginLeft: -styles.PADDING_X_LINK} : undefined),
            ...(props.bleedRight ? {marginRight: -styles.PADDING_X_LINK} : undefined),
            ...(props.bleedY
                ? {marginTop: -styles.PADDING_Y_LINK, marginBottom: -styles.PADDING_Y_LINK}
                : undefined),
        },
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: props.dataAttributes,
        'aria-label': props['aria-label'],
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        'aria-haspopup': props['aria-haspopup'],
        children: renderButtonContent({
            showSpinner,
            shouldRenderSpinner,
            setShouldRenderSpinner,
            children: props.children,
            loadingText,
            small: true,
            renderText,
            textContentStyle: styles.textContentLink,
            StartIcon: props.StartIcon,
            EndIcon: props.EndIcon,
            withChevron: showChevron,
        }),
        disabled: props.disabled || showSpinner || isFormSending,
        role: props.role,
    };

    if (process.env.NODE_ENV !== 'production') {
        if (props.to === '' || props.href === '') {
            throw Error('to or href props are empty strings');
        }
    }

    if (props.onPress) {
        return (
            <BaseTouchable
                ref={ref}
                {...commonProps}
                onPress={(e) => {
                    const result = props.onPress(e);
                    if (result) {
                        setIsOnPressPromiseResolving(true);
                        result.finally(() => setIsOnPressPromiseResolving(false));
                    }
                }}
            />
        );
    }

    if (props.to || props.to === '') {
        return (
            <BaseTouchable
                ref={ref}
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                onNavigate={props.onNavigate}
            />
        );
    }

    if (props.href || props.href === '') {
        return (
            <BaseTouchable
                ref={ref}
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
                onNavigate={props.onNavigate}
            />
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // this cannot happen
        throw Error('Bad button props');
    }

    return null;
});

export const ButtonLink = React.forwardRef<
    TouchableElement,
    ButtonLinkProps & {
        withChevron?: boolean;
    }
>(({dataAttributes, ...props}, ref) => {
    return (
        <BaseButtonLink
            dataAttributes={{'component-name': 'ButtonLink', ...dataAttributes}}
            {...props}
            ref={ref}
            type="default"
        />
    );
});

export const ButtonLinkDanger = React.forwardRef<TouchableElement, ButtonLinkProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <BaseButtonLink
                dataAttributes={{'component-name': 'ButtonLinkDanger', ...dataAttributes}}
                {...props}
                withChevron={false}
                ref={ref}
                type="danger"
            />
        );
    }
);

export const ButtonPrimary = React.forwardRef<TouchableElement, ButtonProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <Button
                dataAttributes={{'component-name': 'ButtonPrimary', ...dataAttributes}}
                {...props}
                ref={ref}
                type="primary"
            />
        );
    }
);

export const ButtonSecondary = React.forwardRef<TouchableElement, ButtonProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <Button
                dataAttributes={{'component-name': 'ButtonSecondary', ...dataAttributes}}
                {...props}
                ref={ref}
                type="secondary"
            />
        );
    }
);

export const ButtonDanger = React.forwardRef<TouchableElement, ButtonProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <Button
                dataAttributes={{'component-name': 'ButtonDanger', ...dataAttributes}}
                {...props}
                ref={ref}
                type="danger"
            />
        );
    }
);

export type ButtonElement =
    | RendersElement<typeof ButtonPrimary>
    | RendersElement<typeof ButtonSecondary>
    | RendersElement<typeof ButtonDanger>;

export type NullableButtonElement =
    | RendersNullableElement<typeof ButtonPrimary>
    | RendersNullableElement<typeof ButtonSecondary>
    | RendersNullableElement<typeof ButtonDanger>;
