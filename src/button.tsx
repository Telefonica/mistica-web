'use client';
import * as React from 'react';
import classnames from 'classnames';
import Spinner from './spinner';
import {BaseTouchable} from './touchable';
import {useThemeVariant} from './theme-variant-context';
import {useForm} from './form-context';
import {applyCssVars, pxToRem} from './utils/css';
import {Text, Text3} from './text';
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
import type {ExclusifyUnion} from './utils/utility-types';

const ButtonTextRenderer = ({element, small}: {element: React.ReactNode; small?: boolean}) => {
    const {textPresets} = useTheme();
    return small ? (
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
};

const renderButtonElement = ({
    small,
    content,
    defaultIconSize,
}: {
    small?: boolean;
    content: React.ReactNode;
    defaultIconSize: string;
}): React.ReactNode => {
    const childrenArr = flattenChildren(content);
    const length = childrenArr.length;
    const resultChildrenArr: Array<React.ReactNode> = [];
    let accText: Array<React.ReactNode> = [];
    const flushAccText = () => {
        resultChildrenArr.push(
            <React.Fragment key={resultChildrenArr.length}>
                <ButtonTextRenderer element={accText} small={small} />
            </React.Fragment>
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
            const sizeInPx = element.props.size !== undefined ? pxToRem(element.props.size) : defaultIconSize;
            resultChildrenArr.push(
                <div
                    key={resultChildrenArr.length}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: isFirstChild ? 0 : styles.iconMargin,
                        marginRight: isLastChild ? 0 : styles.iconMargin,
                    }}
                >
                    {React.cloneElement(element as React.ReactElement<IconProps>, {
                        size: sizeInPx,
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

const ButtonLinkChevron = () => {
    const {skinName} = useTheme();

    // vivo new skin has a different chevron
    if (skinName === VIVO_NEW_SKIN) {
        return (
            <svg width="0.5em" height="0.5em" viewBox="0 0 8 8" fill="none">
                <path
                    d="M5.11111 3.68886L2.73534 1.30383C2.63671 1.21526 2.51339 1.1909 2.4052 1.20285C2.29952 1.21452 2.19613 1.26162 2.12144 1.33458C2.04957 1.40271 2.00869 1.50793 2.00126 1.60783C1.9934 1.71334 2.02104 1.83978 2.12131 1.93639L4.33333 4.07775L2.11406 6.20689L2.11057 6.21056L2.10821 6.21315L2.10381 6.21806C2.01525 6.31669 1.99089 6.44001 2.00284 6.5482C2.01451 6.65388 2.06161 6.75727 2.13456 6.83196C2.20269 6.90383 2.30792 6.94471 2.40782 6.95215C2.51332 6.96 2.63976 6.93237 2.73638 6.83209L5.11111 4.46664C5.32589 4.25186 5.32589 3.90364 5.11111 3.68886Z"
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
    StartIcon?: (props: IconProps) => JSX.Element;
    EndIcon?: (props: IconProps) => JSX.Element;
    withChevron?: boolean;
}): React.ReactNode => {
    const defaultIconSize = small ? styles.iconSize.small : styles.iconSize.default;
    const spinnerSizeRem = small ? styles.spinnerSize.small : styles.spinnerSize.default;

    const buttonElement = renderButtonElement({
        small,
        content: children,
        defaultIconSize,
    });

    const loadingButtonElement = renderButtonElement({
        small,
        content: loadingText,
        defaultIconSize,
    });

    return (
        <>
            {/* text content */}
            <div aria-hidden={showSpinner ? true : undefined} className={styles.textContent}>
                {StartIcon && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: styles.iconMargin,
                        }}
                        data-testid="startIcon"
                    >
                        <StartIcon size={defaultIconSize} color="currentColor" />
                    </div>
                )}
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    {buttonElement}
                    {withChevron && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: styles.chevronMarginLeft,
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
                            marginLeft: styles.iconMargin,
                        }}
                        data-testid="endIcon"
                    >
                        <EndIcon size={defaultIconSize} color="currentColor" />
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
                              paddingRight: `calc(${styles.iconMargin} + 2 * ${small ? styles.buttonPaddingX.small : styles.buttonPaddingX.default})`,
                          }
                        : undefined
                }
            >
                {loadingButtonElement}
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
                        aria-hidden={!!loadingText}
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
                    <Box paddingLeft={8} dataAttributes={{testid: 'loadingText'}}>
                        {loadingButtonElement}
                    </Box>
                ) : null}
            </div>
        </>
    );
};

type ButtonType = 'primary' | 'secondary' | 'danger' | 'link' | 'linkDanger';

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
    'aria-labelledby'?: string;
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false' | boolean;
    'aria-haspopup'?: 'true' | 'false' | 'menu' | 'dialog' | boolean;
    'aria-current'?: React.AriaAttributes['aria-current'];
    'aria-description'?: string;
    'aria-describedby'?: string;
    tabIndex?: number;
    StartIcon?: (props: IconProps) => JSX.Element;
    EndIcon?: (props: IconProps) => JSX.Element;
    /** IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate */
    role?: string;
}

interface ToButtonProps extends CommonProps {
    to: string | Location;
    newTab?: boolean;
    fullPageOnWebView?: boolean;
    onNavigate?: () => void | Promise<void>;
}
interface OnPressButtonProps extends CommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;
}
interface HrefButtonProps extends CommonProps {
    href: string;
    newTab?: boolean;
    loadOnTop?: boolean;
    onNavigate?: () => void | Promise<void>;
}
interface FakeButtonProps extends CommonProps {
    fake: true;
}
interface SubmitButtonProps extends CommonProps {
    submit: true;
}

type ButtonProps = ExclusifyUnion<
    FakeButtonProps | SubmitButtonProps | ToButtonProps | OnPressButtonProps | HrefButtonProps
>;

type ButtonLinkProps = ExclusifyUnion<
    FakeButtonProps | ToButtonProps | OnPressButtonProps | HrefButtonProps
> & {
    bleedLeft?: boolean;
    bleedRight?: boolean;
    bleedY?: boolean;
};

const BaseButton = React.forwardRef<
    TouchableElement,
    ExclusifyUnion<ButtonProps | ButtonLinkProps> & {
        buttonType: ButtonType;
        withChevron?: boolean;
    }
>((props, ref) => {
    const {eventFormat} = useTrackingConfig();
    const {formStatus, formId} = useForm();
    const variant = useThemeVariant();
    const {loadingText} = props;
    const isSubmitButton = !!props.submit;
    const isFormSending = formStatus === 'sending';
    const {isDarkMode} = useTheme();
    const [isOnPressPromiseResolving, setIsOnPressPromiseResolving] = React.useState(false);

    const showSpinner = props.showSpinner || (isFormSending && isSubmitButton) || isOnPressPromiseResolving;
    const showChevron =
        props.withChevron ?? (props.buttonType.startsWith('link') && (!!props.href || !!props.to));

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
        let component_type;
        let action;

        switch (props.buttonType) {
            case 'link':
                component_type = 'link';
                action = eventActions.linkTapped;
                break;
            case 'linkDanger':
                component_type = 'danger_link';
                action = eventActions.linkTapped;
                break;
            default:
                component_type = `${props.buttonType}_button`;
                action = `${props.buttonType}_button_tapped`;
                break;
        }

        if (eventFormat === 'google-analytics-4') {
            return {
                name: eventNames.userInteraction,
                component_type,
                component_copy: getTextFromChildren(props.children),
            };
        } else {
            return {
                category: eventCategories.userInteraction,
                action,
                label: getTextFromChildren(props.children),
            };
        }
    };

    const minWidthProps = props.buttonType.startsWith('link') ? styles.linkMinWidth : styles.buttonMinWidth;
    const finalType =
        props.buttonType === 'linkDanger' && isDarkMode && variant === 'inverse'
            ? 'linkDangerDark'
            : props.buttonType;

    const commonProps = {
        ref,
        className: classnames(
            variant === 'media'
                ? styles.mediaButtonVariants[finalType]
                : variant === 'inverse'
                  ? styles.inverseButtonVariants[finalType]
                  : styles.buttonVariants[finalType],
            props.className,
            {
                [styles.small]: props.small,
                [styles.isLoading]: showSpinner,
            }
        ),
        style: {
            ...applyCssVars({
                [styles.buttonVars.minWidth]: props.small ? minWidthProps.small : minWidthProps.default,
            }),

            /**
             * Setting bleed classes with style to override the margin:0 set by the Touchable component.
             * If we set it using className, it may not work depending on the order in which the styles are applied.
             */
            ...(props.bleedLeft
                ? {
                      marginLeft: `calc(-1 * (${styles.borderSize} + ${props.small ? styles.buttonPaddingX.small : styles.buttonPaddingX.default}))`,
                  }
                : undefined),
            ...(props.bleedRight
                ? {
                      marginRight: `calc(-1 * (${styles.borderSize} + ${props.small ? styles.buttonPaddingX.small : styles.buttonPaddingX.default}))`,
                  }
                : undefined),
            ...(props.bleedY
                ? {
                      marginTop: `calc(-1 * (${styles.borderSize} + ${props.small ? styles.buttonPaddingY.small : styles.buttonPaddingY.default}))`,
                      marginBottom: `calc(-1 * (${styles.borderSize} + ${props.small ? styles.buttonPaddingY.small : styles.buttonPaddingY.default}))`,
                  }
                : undefined),

            cursor: props.fake ? 'pointer' : undefined,
            ...props.style,
        },
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: props.dataAttributes,
        'aria-label': props['aria-label'],
        'aria-labelledby': props['aria-labelledby'],
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        'aria-haspopup': props['aria-haspopup'],
        'aria-current': props['aria-current'],
        'aria-description': props['aria-description'],
        'aria-describedby': props['aria-describedby'],
        tabIndex: props.tabIndex,
        children: renderButtonContent({
            showSpinner,
            shouldRenderSpinner,
            setShouldRenderSpinner,
            children: props.children,
            loadingText,
            small: props.small,
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

    if (props.fake) {
        return <BaseTouchable maybe {...commonProps} />;
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
                newTab={props.newTab}
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

export const ButtonLink = React.forwardRef<
    TouchableElement,
    ButtonLinkProps & {
        withChevron?: boolean;
    }
>(({dataAttributes, className, ...props}, ref) => {
    return (
        <BaseButton
            dataAttributes={{'component-name': 'ButtonLink', testid: 'ButtonLink', ...dataAttributes}}
            className={classnames(className, {[styles.smallLink]: props.small})}
            {...props}
            ref={ref}
            buttonType="link"
        />
    );
});

export const ButtonLinkDanger = React.forwardRef<TouchableElement, ButtonLinkProps>(
    ({dataAttributes, className, ...props}, ref) => {
        return (
            <BaseButton
                dataAttributes={{
                    'component-name': 'ButtonLinkDanger',
                    testid: 'ButtonLinkDanger',
                    ...dataAttributes,
                }}
                className={classnames(className, {[styles.smallLink]: props.small})}
                {...props}
                withChevron={false}
                ref={ref}
                buttonType="linkDanger"
            />
        );
    }
);

export const ButtonPrimary = React.forwardRef<TouchableElement, ButtonProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <BaseButton
                dataAttributes={{
                    'component-name': 'ButtonPrimary',
                    testid: 'ButtonPrimary',
                    ...dataAttributes,
                }}
                {...props}
                ref={ref}
                buttonType="primary"
            />
        );
    }
);

export const ButtonSecondary = React.forwardRef<TouchableElement, ButtonProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <BaseButton
                dataAttributes={{
                    'component-name': 'ButtonSecondary',
                    testid: 'ButtonSecondary',
                    ...dataAttributes,
                }}
                {...props}
                ref={ref}
                buttonType="secondary"
            />
        );
    }
);

export const ButtonDanger = React.forwardRef<TouchableElement, ButtonProps>(
    ({dataAttributes, ...props}, ref) => {
        return (
            <BaseButton
                dataAttributes={{'component-name': 'ButtonDanger', testid: 'ButtonDanger', ...dataAttributes}}
                {...props}
                ref={ref}
                buttonType="danger"
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
