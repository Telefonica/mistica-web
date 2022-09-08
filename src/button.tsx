import * as React from 'react';
import classnames from 'classnames';
import Spinner from './spinner';
import Touchable from './touchable';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {useForm} from './form-context';
import {pxToRem} from './utils/css';
import {Text, Text2, Text3} from './text';
import Box from './box';
import {getTextFromChildren} from './utils/common';
import {eventActions, eventCategories, eventNames, useTrackingConfig} from './utils/analytics';
import {useTheme} from './hooks';

import type {DataAttributes, RendersElement, RendersNullableElement, TrackingEvent} from './utils/types';
import type {Location} from 'history';
import type {Theme} from './theme';

export const BUTTON_MIN_WIDTH = 136;

const transitionTiming = '0.3s cubic-bezier(0.77, 0, 0.175, 1)';

const BORDER_PX = 1.5;
const ICON_MARGIN_PX = 8;
const X_PADDING_PX = 16 - BORDER_PX;
const Y_PADDING_PX = 12 - BORDER_PX;
const X_SMALL_PADDING_PX = 12 - BORDER_PX;
const Y_SMALL_PADDING_PX = 6 - BORDER_PX;
const SMALL_ICON_SIZE = 20;
const ICON_SIZE = 24;

const commonClasses = () => ({
    button: {
        display: 'inline-block',
        position: 'relative',
        width: 'auto',
        minWidth: BUTTON_MIN_WIDTH,
        border: `${BORDER_PX}px solid transparent`,
        borderRadius: 4,
        overflow: 'hidden',
        '&:hover:not([disabled])': {
            transition: `background-color ${transitionTiming}, color ${transitionTiming}, border-color ${transitionTiming}`,
        },
    },
    loadingFiller: {
        display: 'block',
        height: 0,
        opacity: 0,
        overflow: 'hidden',
    },
    small: {
        minWidth: 104,
    },
    loadingContent: {
        display: 'inline-flex',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: X_PADDING_PX,
        right: X_PADDING_PX,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        '$small &': {
            left: X_SMALL_PADDING_PX,
            right: X_SMALL_PADDING_PX,
        },
    },
    textContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${Y_PADDING_PX}px ${X_PADDING_PX}px`, // height 48
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        '$small &': {
            padding: `${Y_SMALL_PADDING_PX}px ${X_SMALL_PADDING_PX}px`, // height 32
        },
        '& svg': {
            display: 'block',
        },
    },
    isLoading: {
        '& $textContent': {
            transform: 'translateY(-2rem)',
            opacity: 0,
        },
        '& $loadingContent': {
            transform: 'translateY(0)',
            opacity: 1,
        },
    },
});

const disabledStyle = {opacity: 0.5};

const usePrimaryButtonStyles = createUseStyles((theme) => ({
    ...commonClasses(),
    light: {
        color: theme.colors.textButtonPrimary,
        backgroundColor: theme.colors.buttonPrimaryBackground,

        '&:enabled:active': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundSelected,
        },
        '&[disabled]:not($isLoading)': disabledStyle,

        // Next media queries were added in each button style, because a pair of bugs in mobile devices (related to: https://jira.tuenti.io/jira/browse/APPS-1882):
        // - When tapping on a button that takes you to next screen and then go back to the previous one, button still have the focus styles
        // - Same behavior if you do long press on the button

        // What these media queries do, is:
        // - Make sure that in FF hover still has it's proper styles
        // - Media query with "coarse" (mobile), avoids that in devices that have coarse implemented, focus style doesn't get stuck

        // Must be always declared for Firefox
        '&:hover:not([disabled])': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundHover,
            [theme.mq.touchableOnly]: {
                // Revert hover background in touch devices
                backgroundColor: theme.colors.buttonPrimaryBackground,
            },
        },
    },
    inverse: {
        color: theme.colors.textButtonPrimaryInverse,
        backgroundColor: theme.colors.buttonPrimaryBackgroundInverse,

        '&:enabled:active': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundSelectedInverse,
            color: theme.colors.textButtonPrimaryInverseSelected,
        },
        '&[disabled]:not($isLoading)': disabledStyle,

        '&:hover:not([disabled])': {
            color: theme.colors.textButtonPrimaryInverseSelected,
            backgroundColor: theme.colors.buttonPrimaryBackgroundSelectedInverse,
            [theme.mq.touchableOnly]: {
                color: theme.colors.textButtonPrimaryInverse,
                backgroundColor: theme.colors.buttonPrimaryBackgroundInverse,
            },
        },
    },
}));

const buttonSecondaryLightStyle = (theme: Theme) => ({
    color: theme.colors.textButtonSecondary,
    backgroundColor: 'transparent',
    borderColor: theme.colors.buttonSecondaryBackground,
});

const buttonSecondaryHoverLightStyle = (theme: Theme) => ({
    color: theme.colors.textButtonSecondarySelected,
    borderColor: theme.colors.buttonSecondaryBackgroundSelected,
});

const useSecondaryButtonStyles = createUseStyles((theme) => ({
    ...commonClasses(),
    light: {
        ...buttonSecondaryLightStyle(theme),

        '&:enabled:active': {
            ...buttonSecondaryHoverLightStyle(theme),
        },
        '&[disabled]:not($isLoading)': disabledStyle,
        '&:hover:not([disabled])': {
            ...buttonSecondaryHoverLightStyle(theme),
            [theme.mq.touchableOnly]: {
                ...buttonSecondaryLightStyle(theme),
            },
        },
    },
    inverse: {
        borderColor: theme.colors.buttonSecondaryBorderInverse,
        color: theme.colors.textButtonSecondaryInverse,

        '&:enabled:active': {
            borderColor: theme.colors.buttonSecondaryBorderSelectedInverse,
            color: theme.colors.textButtonSecondaryInverseSelected,
        },
        '&[disabled]:not($isLoading)': disabledStyle,

        '&:hover:not([disabled])': {
            borderColor: theme.colors.buttonSecondaryBorderSelectedInverse,
            color: theme.colors.textButtonSecondaryInverseSelected,
            [theme.mq.touchableOnly]: {
                borderColor: theme.colors.buttonSecondaryBorderInverse,
                color: theme.colors.textButtonSecondaryInverse,
            },
        },
    },
}));

const dangerButtonStyles = (theme: Theme) => ({
    color: theme.colors.textButtonPrimary,
    backgroundColor: theme.colors.buttonDangerBackground,

    '&:enabled:active': {
        backgroundColor: theme.colors.buttonDangerBackgroundSelected,
    },
    '&[disabled]:not($isLoading)': {
        opacity: 0.5,
    },

    '&:hover:not([disabled])': {
        backgroundColor: theme.colors.buttonDangerBackgroundHover,
        [theme.mq.touchableOnly]: {
            // Revert hover background in touch devices
            backgroundColor: theme.colors.buttonDangerBackground,
        },
    },
});

const useDangerButtonStyles = createUseStyles((theme) => ({
    ...commonClasses(),
    light: dangerButtonStyles(theme),
    inverse: dangerButtonStyles(theme),
}));

const renderButtonContent = ({
    content,
    defaultIconSize,
    renderText,
}: {
    content: React.ReactNode;
    defaultIconSize: number;
    renderText: (text: React.ReactNode) => React.ReactNode;
}): React.ReactNode => {
    const length = React.Children.count(content);
    const childrenArr = React.Children.toArray(content);
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

        const isIconElement =
            React.isValidElement(element) &&
            typeof element.type !== 'string' &&
            element.type.name?.startsWith('Icon'); // all mistica icons start with Icon prefix

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
                        marginLeft: isFirstChild ? 0 : ICON_MARGIN_PX,
                        marginRight: isLastChild ? 0 : ICON_MARGIN_PX,
                    }}
                >
                    {React.cloneElement(element, {size: pxToRem(sizeInPx)})}
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
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined;
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

const Button: React.FC<
    ButtonProps & {classes: ReturnType<typeof usePrimaryButtonStyles>; type: ButtonType}
> = (props) => {
    const {eventFormat} = useTrackingConfig();
    const {formStatus, formId} = useForm();
    const isInverse = useIsInverseVariant();
    const {classes, loadingText} = props;
    const isSubmitButton = !!props.submit;
    const isFormSending = formStatus === 'sending';

    const showSpinner = props.showSpinner || (isFormSending && isSubmitButton);

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

    const defaultIconSize = props.small ? SMALL_ICON_SIZE : ICON_SIZE;
    const spinnerSizeRem = pxToRem(defaultIconSize);

    const renderText = (element: React.ReactNode) =>
        props.small ? (
            <Text size={14} lineHeight={20} weight="medium" truncate={1} color="inherit" as="div">
                {element}
            </Text>
        ) : (
            <Text3 medium truncate={1} color="inherit" as="div">
                {element}
            </Text3>
        );

    const commonProps = {
        className: classnames(classes.button, props.className, {
            [classes.small]: props.small,
            [classes.inverse]: isInverse,
            [classes.light]: !isInverse,
            [classes.isLoading]: showSpinner,
        }),
        style: {cursor: props.fake ? 'pointer' : undefined, ...props.style},
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: props.dataAttributes,
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        tabIndex: props.tabIndex,
        children: (
            <>
                {/* text content */}
                <div aria-hidden={showSpinner ? true : undefined} className={classes.textContent}>
                    {renderButtonContent({
                        content: props.children,
                        defaultIconSize,
                        renderText,
                    })}
                </div>

                {/* the following div won't be visible (see loadingFiller class), this is used to force the button width */}
                <div
                    className={classes.loadingFiller}
                    aria-hidden
                    style={{
                        paddingLeft: spinnerSizeRem,
                        paddingRight: ICON_MARGIN_PX + 2 * (props.small ? X_SMALL_PADDING_PX : X_PADDING_PX),
                    }}
                >
                    {renderButtonContent({content: loadingText, defaultIconSize, renderText})}
                </div>

                {/* loading content */}
                <div
                    aria-hidden={showSpinner ? undefined : true}
                    className={classes.loadingContent}
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
                            style={{display: 'inline-block', width: spinnerSizeRem, height: spinnerSizeRem}}
                        />
                    )}
                    {loadingText ? (
                        <Box paddingLeft={8}>
                            {renderButtonContent({content: loadingText, defaultIconSize, renderText})}
                        </Box>
                    ) : null}
                </div>
            </>
        ),
        disabled: props.disabled || showSpinner || isFormSending,
        role: 'button',
    };

    if (process.env.NODE_ENV !== 'production') {
        if (props.to === '' || props.href === '') {
            throw Error('to or href props are empty strings');
        }
    }

    if (props.fake) {
        return <Touchable maybe {...commonProps} role="presentation" aria-hidden="true" />;
    }

    if (props.submit) {
        // using empty onPress handler so it gets rendered as a button
        return <Touchable type="submit" formId={formId} onPress={() => {}} {...commonProps} />;
    }

    if (props.onPress) {
        return <Touchable {...commonProps} onPress={props.onPress} />;
    }

    if (props.to || props.to === '') {
        return <Touchable {...commonProps} to={props.to} fullPageOnWebView={props.fullPageOnWebView} />;
    }

    if (props.href || props.href === '') {
        return (
            <Touchable {...commonProps} href={props.href} newTab={props.newTab} loadOnTop={props.loadOnTop} />
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // this cannot happen
        throw Error('Bad button props');
    }

    return null;
};

const useButtonLinkStyles = createUseStyles((theme) => {
    const paddingY = 6;
    const paddingX = 12;
    return {
        link: {
            display: 'inline-block',
            width: 'auto',
            padding: `${paddingY}px ${paddingX}px`,
            fontWeight: 500,
            borderRadius: 4,
            overflow: 'hidden',
            transition: `background-color ${transitionTiming}, color ${transitionTiming}`,
            color: theme.colors.textLink,
            '&:enabled:active': {
                backgroundColor: theme.colors.buttonLinkBackgroundSelected,
            },
            '&:hover:not([disabled])': {
                backgroundColor: theme.colors.buttonLinkBackgroundSelected,
                [theme.mq.touchableOnly]: {
                    backgroundColor: 'initial',
                },
            },
            '&[disabled]': disabledStyle,
        },
        textContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
                display: 'block',
            },
        },
        inverse: {
            color: theme.colors.textLinkInverse,
            '&:enabled:active': {
                backgroundColor: theme.colors.buttonLinkBackgroundSelectedInverse,
            },
            '&:hover:not([disabled])': {
                backgroundColor: theme.colors.buttonLinkBackgroundSelectedInverse,
                [theme.mq.touchableOnly]: {
                    backgroundColor: 'initial',
                },
            },
        },
        aligned: {marginLeft: -paddingX},
    };
});

interface ButtonLinkCommonProps {
    children: React.ReactNode;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    aligned?: boolean;
}
interface ButtonLinkOnPressProps extends ButtonLinkCommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void;
    to?: undefined;
    href?: undefined;
}
interface ButtonLinkHrefProps extends ButtonLinkCommonProps {
    href: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
}
interface ButtonLinkToProps extends ButtonLinkCommonProps {
    to: string;
    fullPageOnWebView?: boolean;
    onPress?: undefined;
    href?: undefined;
}

export type ButtonLinkProps = ButtonLinkOnPressProps | ButtonLinkHrefProps | ButtonLinkToProps;

export const ButtonLink = React.forwardRef<
    HTMLDivElement | HTMLAnchorElement | HTMLButtonElement,
    ButtonLinkProps
>((props, ref) => {
    const {formStatus} = useForm();
    const classes = useButtonLinkStyles();
    const isInverse = useIsInverseVariant();
    const {analytics} = useTheme();

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
        <Text2 medium truncate={1} color="inherit">
            {element}
        </Text2>
    );

    const commonProps = {
        className: classnames(classes.link, {
            [classes.inverse]: isInverse,
            [classes.aligned]: props.aligned,
        }),
        trackingEvent: props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined),
        dataAttributes: props.dataAttributes,
        children: (
            <div className={classes.textContent}>
                {renderButtonContent({content: props.children, defaultIconSize: SMALL_ICON_SIZE, renderText})}
            </div>
        ),
        disabled: props.disabled || formStatus === 'sending',
    };

    if (process.env.NODE_ENV !== 'production') {
        if (props.to === '' || props.href === '') {
            throw Error('to or href props are empty strings');
        }
    }

    if (props.onPress) {
        return <Touchable ref={ref} {...commonProps} onPress={props.onPress} />;
    }

    if (props.to || props.to === '') {
        return (
            <Touchable ref={ref} {...commonProps} to={props.to} fullPageOnWebView={props.fullPageOnWebView} />
        );
    }

    if (props.href || props.href === '') {
        return <Touchable ref={ref} {...commonProps} href={props.href} newTab={props.newTab} />;
    }

    if (process.env.NODE_ENV !== 'production') {
        // this cannot happen
        throw Error('Bad button props');
    }

    return null;
});

export const ButtonPrimary: React.FC<ButtonProps> = (props) => {
    const classes = usePrimaryButtonStyles();
    return <Button {...props} classes={classes} type="primary" />;
};

export const ButtonSecondary: React.FC<ButtonProps> = (props) => {
    const classes = useSecondaryButtonStyles();
    return <Button {...props} classes={classes} type="secondary" />;
};

export const ButtonDanger: React.FC<ButtonProps> = (props) => {
    const classes = useDangerButtonStyles();
    return <Button {...props} classes={classes} type="danger" />;
};

export type ButtonElement =
    | RendersElement<typeof ButtonPrimary>
    | RendersElement<typeof ButtonSecondary>
    | RendersElement<typeof ButtonDanger>;

export type NullableButtonElement =
    | RendersNullableElement<typeof ButtonPrimary>
    | RendersNullableElement<typeof ButtonSecondary>
    | RendersNullableElement<typeof ButtonDanger>;
