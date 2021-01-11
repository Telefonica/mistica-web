import * as React from 'react';
import classnames from 'classnames';
import Spinner from './spinner';
import Touchable from './touchable';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {applyAlpha} from './utils/color';
import {useForm} from './form-context';
import {pxToRem} from './utils/css';

import type {TrackingEvent} from './utils/types';
import type {Location} from 'history';
import type {Theme} from './theme';
import {Box, Text6, Text7} from '.';

export const BUTTON_MIN_WIDTH = 156;

const transitionTiming = '0.3s cubic-bezier(0.77, 0, 0.175, 1)';

const commonClasses = () => ({
    button: {
        display: 'inline-block',
        position: 'relative',
        width: 'auto',
        minWidth: BUTTON_MIN_WIDTH,
        textAlign: 'center',
        border: '1.5px solid transparent',
        borderRadius: 4,
        overflow: 'hidden',
        '&:hover': {
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
        borderWidth: 1.5,
    },
    loadingContent: {
        display: 'inline-flex',
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
    },
    textContent: {
        padding: '10.5px 14.5px', // height 48 = (padding: 10.5 * 2) + (border: 1.5 * 2) + (lineHeight: 24)
        opacity: 1,
        transition: `opacity ${transitionTiming}, transform ${transitionTiming}`,
        '$small &': {
            padding: '4.5px 6.5px', // height 32 = (padding: 4.5 * 2) + (border: 1.5 * 2) + (lineHeight: 20)
        },
        '& svg': {
            marginRight: 8,
            verticalAlign: 'bottom',
            height: '100%',
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

const usePrimaryButtonStyles = createUseStyles((theme) => ({
    ...commonClasses(),
    light: {
        color: theme.colors.buttonPrimaryText,
        backgroundColor: theme.colors.buttonPrimaryBackground,

        '&:enabled:active': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundSelected,
        },
        '&[disabled]:not($isLoading)': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundDisabled,
        },

        // Next media queries were added in each button style, because a pair of bugs in mobile devices (related to: https://jira.tuenti.io/jira/browse/APPS-1882):
        // - When tapping on a button that takes you to next screen and then go back to the previous one, button still have the focus styles
        // - Same behavior if you do long press on the button

        // What these media queries do, is:
        // - Make sure that in FF hover still has it's proper styles
        // - Media query with "coarse" (mobile), avoids that in devices that have coarse implemented, focus style doesn't get stuck

        // Must be always declared for Firefox
        '&:hover': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundHover,
            '@media (pointer: coarse)': {
                // Revert hover background in touch devices
                backgroundColor: theme.colors.buttonPrimaryBackground,
            },
        },
    },
    inverse: {
        color: theme.colors.textButtonPrimaryInverse,
        backgroundColor: theme.colors.buttonPrimaryBackgroundInverse,

        '&:enabled:active': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundInverseSelected,
            color: theme.colors.textButtonPrimaryInverseSelected,
        },
        '&[disabled]:not($isLoading)': {
            backgroundColor: theme.colors.buttonPrimaryBackgroundInverseDisabled,
            color: theme.colors.textButtonPrimaryInverseDisabled,
        },

        '&:hover': {
            color: theme.colors.textButtonPrimaryInverseSelected,
            backgroundColor: theme.colors.buttonPrimaryBackgroundInverseSelected,
            '@media (pointer: coarse)': {
                color: theme.colors.textButtonPrimaryInverse,
                backgroundColor: theme.colors.buttonPrimaryBackgroundInverse,
            },
        },
    },
}));

const buttonSecondaryLightStyle = (theme: Theme) => ({
    color: theme.colors.buttonSecondaryText,
    backgroundColor: theme.colors.buttonSecondaryBackground,
    borderColor: theme.colors.buttonSecondaryBorder,
});

const buttonSecondaryHoverLightStyle = (theme: Theme) => ({
    color: theme.colors.buttonSecondaryTextSelected,
    borderColor: theme.colors.buttonSecondaryBorderSelected,
});

const useSecondaryButtonStyles = createUseStyles((theme) => ({
    ...commonClasses(),
    light: {
        ...buttonSecondaryLightStyle(theme),

        '&:enabled:active': {
            ...buttonSecondaryHoverLightStyle(theme),
        },
        '&[disabled]:not($isLoading)': {
            color: theme.colors.buttonSecondaryTextDisabled,
            borderColor: theme.colors.buttonSecondaryBorderDisabled,
        },
        '&:hover': {
            ...buttonSecondaryHoverLightStyle(theme),
            '@media (pointer: coarse)': {
                ...buttonSecondaryLightStyle(theme),
            },
        },
    },
    inverse: {
        borderColor: theme.colors.buttonSecondaryBorderInverse,
        color: theme.colors.textButtonSecondaryInverse,

        '&:enabled:active': {
            borderColor: theme.colors.buttonSecondaryBorderInverseSelected,
            color: theme.colors.textButtonSecondaryInverseSelected,
        },
        '&[disabled]:not($isLoading)': {
            color: theme.colors.textButtonSecondaryInverseDisabled,
            borderColor: theme.colors.buttonSecondaryBorderInverseDisabled,
        },

        '&:hover': {
            borderColor: theme.colors.buttonSecondaryBorderInverseSelected,
            color: theme.colors.textButtonSecondaryInverseSelected,
            '@media (pointer: coarse)': {
                borderColor: theme.colors.buttonSecondaryBorderInverse,
                color: theme.colors.textButtonSecondaryInverse,
            },
        },
    },
}));

const dangerButtonStyles = (theme: Theme) => ({
    color: theme.colors.buttonPrimaryText,
    backgroundColor: theme.colors.buttonDangerBackground,

    '&:enabled:active': {
        backgroundColor: theme.colors.buttonDangerBackgroundSelected,
    },
    '&[disabled]:not($isLoading)': {
        backgroundColor: theme.colors.buttonDangerBackgroundDisabled,
    },

    '&:hover': {
        backgroundColor: theme.colors.buttonDangerBackgroundHover,
        '@media (pointer: coarse)': {
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

interface CommonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    small?: boolean;
    showSpinner?: boolean;
    loadingText?: string;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    'data-testid'?: string;
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

const Button: React.FC<ButtonProps & {classes: ReturnType<typeof usePrimaryButtonStyles>}> = (props) => {
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

    const spinnerSize = pxToRem(props.small ? 16 : 24);

    const renderText = (text: React.ReactNode) =>
        props.small ? (
            <Text7 medium truncate={1} color="inherit" as="div">
                {text}
            </Text7>
        ) : (
            <Text6 medium truncate={1} color="inherit" as="div">
                {text}
            </Text6>
        );

    const commonProps = {
        className: classnames(classes.button, props.className, {
            [classes.small]: props.small,
            [classes.inverse]: isInverse,
            [classes.light]: !isInverse,
            [classes.isLoading]: showSpinner,
        }),
        style: {cursor: props.fake ? 'pointer' : undefined, ...props.style},
        trackingEvent: props.trackingEvent,
        'data-testid': props['data-testid'],
        'aria-controls': props['aria-controls'],
        'aria-expanded': props['aria-expanded'],
        tabIndex: props.tabIndex,
        children: (
            <>
                {/* text content */}
                <div aria-hidden={showSpinner ? true : undefined} className={classes.textContent}>
                    {renderText(props.children)}
                    {/* the following div won't be visible (see loadingFiller class), it is used to set the button width */}
                    <div
                        className={classes.loadingFiller}
                        style={{
                            paddingLeft: `calc(${spinnerSize} + 10px)`,
                            paddingRight: props.small ? 20 : 32,
                        }}
                    >
                        {renderText(loadingText)}
                    </div>
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
                            size={spinnerSize}
                        />
                    ) : (
                        <div style={{display: 'inline-block', width: spinnerSize, height: spinnerSize}} />
                    )}
                    {loadingText ? <Box paddingLeft={8}>{renderText(loadingText)}</Box> : null}
                </div>
            </>
        ),
        disabled: props.disabled || showSpinner || isFormSending,
        role: 'button',
    };

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

    if (props.to) {
        return <Touchable {...commonProps} to={props.to} fullPageOnWebView={props.fullPageOnWebView} />;
    }

    if (props.href) {
        return <Touchable {...commonProps} href={props.href} newTab={props.newTab} />;
    }

    // this cannot happen
    throw Error('Bad button props');
};

const useButtonLinkStyles = createUseStyles((theme) => ({
    link: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        width: 'auto',
        padding: `5px 6px`,
        textAlign: 'center',
        fontWeight: 500,
        borderRadius: 4,
        overflow: 'hidden',
        transition: `background-color ${transitionTiming}, color ${transitionTiming}`,
        color: theme.colors.textLink,
        '&:enabled:active': {
            backgroundColor: theme.colors.buttonLinkBackgroundSelected,
        },
        '&:hover': {
            backgroundColor: theme.colors.buttonLinkBackgroundSelected,
            '@media (pointer: coarse)': {
                backgroundColor: 'initial',
            },
        },
    },
    inverse: {
        color: theme.colors.textPrimaryInverse,
        '&:enabled:active': {
            backgroundColor: applyAlpha(theme.colors.buttonLinkBackgroundSelected, 0.2),
        },
        '&:hover': {
            backgroundColor: applyAlpha(theme.colors.buttonLinkBackgroundSelected, 0.2),
            '@media (pointer: coarse)': {
                backgroundColor: 'initial',
            },
        },
    },
    aligned: {marginLeft: -8},
}));

interface ButtonLinkCommonProps {
    children: React.ReactNode;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    'data-testid'?: string;
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

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
    const classes = useButtonLinkStyles();
    const isInverse = useIsInverseVariant();
    const commonProps = {
        className: classnames(classes.link, {
            [classes.inverse]: isInverse,
            [classes.aligned]: props.aligned,
        }),
        trackingEvent: props.trackingEvent,
        'data-testid': props['data-testid'],
        children: (
            <Text7 medium color="inherit">
                {props.children}
            </Text7>
        ),
    };

    if (props.onPress) {
        return <Touchable {...commonProps} onPress={props.onPress} />;
    }

    if (props.to) {
        return <Touchable {...commonProps} to={props.to} fullPageOnWebView={props.fullPageOnWebView} />;
    }

    if (props.href) {
        return <Touchable {...commonProps} href={props.href} newTab={props.newTab} />;
    }

    // this cannot happen
    throw Error('Bad button props');
};

export const ButtonPrimary: React.FC<ButtonProps> = (props) => {
    const classes = usePrimaryButtonStyles();
    return <Button {...props} classes={classes} />;
};

export const ButtonSecondary: React.FC<ButtonProps> = (props) => {
    const classes = useSecondaryButtonStyles();
    return <Button {...props} classes={classes} />;
};

export const ButtonDanger: React.FC<ButtonProps> = (props) => {
    const classes = useDangerButtonStyles();
    return <Button {...props} classes={classes} />;
};

export type ButtonElement =
    | React.ReactElement<typeof ButtonPrimary>
    | React.ReactElement<typeof ButtonSecondary>
    | React.ReactElement<typeof ButtonDanger>;
