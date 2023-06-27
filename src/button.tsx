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

const ButtonLinkChevron: React.FC = () => (
    <svg width="8" height="20" viewBox="0 0 8 20" fill="none">
        <path
            d="M6.32595 11.0107L3.03801 7.7086L3.03292 7.70375L3.032 7.70291L3.02931 7.70047L3.02848 7.69974L3.02248 7.69436C2.88533 7.57121 2.71386 7.53733 2.56343 7.55395C2.41648 7.57018 2.27272 7.63567 2.16886 7.73711C2.06893 7.83185 2.01209 7.97816 2.00175 8.11707C1.99083 8.26377 2.02925 8.43959 2.16869 8.57393L5.24446 11.5515L2.15859 14.512L2.15375 14.5171L2.1529 14.518L2.15046 14.5207L2.14974 14.5215L2.14435 14.5275C2.02121 14.6647 1.98733 14.8361 2.00394 14.9866C2.02017 15.1335 2.08567 15.2773 2.18711 15.3811C2.28184 15.4811 2.42816 15.5379 2.56706 15.5483C2.71377 15.5592 2.88958 15.5208 3.02392 15.3813L6.32595 12.0922C6.6246 11.7936 6.6246 11.3094 6.32595 11.0107Z"
            fill="currentColor"
        />
    </svg>
);

const renderButtonContent = ({
    showSpinner,
    children,
    small,
    loadingText,
    shouldRenderSpinner,
    setShouldRenderSpinner,
    renderText,
    textContentStyle,
    startIcon,
    endIcon,
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
    startIcon?: React.ReactElement<IconProps>;
    endIcon?: React.ReactElement<IconProps>;
    withChevron?: boolean;
}): React.ReactNode => {
    const defaultIconSize = small ? styles.SMALL_ICON_SIZE : styles.ICON_SIZE;
    const spinnerSizeRem = pxToRem(small ? styles.SMALL_SPINNER_SIZE : styles.SPINNER_SIZE);

    return (
        <>
            {/* text content */}
            <div aria-hidden={showSpinner ? true : undefined} className={textContentStyle}>
                {startIcon && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: styles.ICON_MARGIN_PX,
                        }}
                    >
                        {React.cloneElement(startIcon, {
                            size: pxToRem(startIcon.props.size || defaultIconSize),
                        })}
                    </div>
                )}
                {renderButtonElement({
                    content: children,
                    defaultIconSize,
                    renderText,
                })}
                {endIcon && !withChevron && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: styles.ICON_MARGIN_PX,
                        }}
                    >
                        {React.cloneElement(endIcon, {
                            size: pxToRem(endIcon.props.size || defaultIconSize),
                        })}
                    </div>
                )}
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
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false';
    tabIndex?: number;
    startIcon?: React.ReactElement<IconProps>;
    endIcon?: React.ReactElement<IconProps>;
}

export interface ToButtonProps extends CommonProps {
    to: string | Location;
    fullPageOnWebView?: boolean;
    submit?: undefined;
    fake?: undefined;
    onPress?: undefined;
    href?: undefined;
}
export interface OnPressButtonProps extends CommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;
    submit?: undefined;
    fake?: undefined;
    to?: undefined;
    href?: undefined;
}
export interface HrefButtonProps extends CommonProps {
    href: string;
    newTab?: boolean;
    loadOnTop?: boolean;
    submit?: undefined;
    fake?: undefined;
    onPress?: undefined;
    to?: undefined;
}
export interface FakeButtonProps extends CommonProps {
    fake: true;
    submit?: undefined;
    onPress?: undefined;
    to?: undefined;
    href?: undefined;
}
export interface SubmitButtonProps extends CommonProps {
    submit: true;
    to?: undefined;
    fake?: undefined;
    onPress?: undefined;
    href?: undefined;
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
            isInverse ? styles.inverseVariants[props.type] : styles.variants[props.type],
            props.className,
            {
                [styles.small]: props.small,
                [styles.isLoading]: showSpinner,
            }
        ),
        style: {cursor: props.fake ? 'pointer' : undefined, ...props.style},
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: props.dataAttributes,
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
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
            startIcon: props.startIcon,
            endIcon: props.endIcon,
        }),
        disabled: props.disabled || showSpinner || isFormSending,
        role: 'button',
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
        return <BaseTouchable {...commonProps} to={props.to} fullPageOnWebView={props.fullPageOnWebView} />;
    }

    if (props.href || props.href === '') {
        return (
            <BaseTouchable
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
                loadOnTop={props.loadOnTop}
            />
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // this cannot happen
        throw Error('Bad button props');
    }

    return null;
});

interface ButtonLinkCommonProps {
    children: React.ReactNode;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    aligned?: boolean;
    showSpinner?: boolean;
    loadingText?: string;
    startIcon?: React.ReactElement<IconProps>;
    endIcon?: React.ReactElement<IconProps>;
}
interface ButtonLinkOnPressProps extends ButtonLinkCommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;
    to?: undefined;
    href?: undefined;
}
interface ButtonLinkHrefProps extends ButtonLinkCommonProps {
    href: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    noChevron?: boolean;
}
interface ButtonLinkToProps extends ButtonLinkCommonProps {
    to: string;
    fullPageOnWebView?: boolean;
    onPress?: undefined;
    href?: undefined;
    noChevron?: boolean;
}

export type ButtonLinkProps = ButtonLinkOnPressProps | ButtonLinkHrefProps | ButtonLinkToProps;

export const ButtonLink = React.forwardRef<TouchableElement, ButtonLinkProps>((props, ref) => {
    const {formStatus} = useForm();
    const isInverse = useIsInverseVariant();
    const {analytics, textPresets} = useTheme();

    const {loadingText} = props;
    const isFormSending = formStatus === 'sending';
    const [isOnPressPromiseResolving, setIsOnPressPromiseResolving] = React.useState(false);

    const showSpinner = props.showSpinner || isOnPressPromiseResolving;

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
        if (analytics.eventFormat === 'google-analytics-4') {
            return {
                name: eventNames.userInteraction,
                component_type: 'link',
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

    const commonProps = {
        className: classnames(styles.link, {
            [styles.inverseLink]: isInverse,
            [styles.alignedLink]: props.aligned,
            [styles.isLoading]: showSpinner,
        }),
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: {'component-name': 'ButtonLink', ...props.dataAttributes},
        children: renderButtonContent({
            showSpinner,
            shouldRenderSpinner,
            setShouldRenderSpinner,
            children: props.children,
            loadingText,
            small: true,
            renderText,
            textContentStyle: styles.textContentLink,
            startIcon: props.startIcon,
            endIcon: props.endIcon,
            withChevron: (!!props.to || !!props.href) && !props.noChevron,
        }),
        disabled: props.disabled || showSpinner || isFormSending,
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
            />
        );
    }

    if (props.href || props.href === '') {
        return <BaseTouchable ref={ref} {...commonProps} href={props.href} newTab={props.newTab} />;
    }

    if (process.env.NODE_ENV !== 'production') {
        // this cannot happen
        throw Error('Bad button props');
    }

    return null;
});

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
