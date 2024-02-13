'use client';
import * as React from 'react';
import {BaseTouchable} from './touchable';
import * as styles from './icon-button.css';
import classNames from 'classnames';
import Spinner from './spinner';
import {useThemeVariant} from './theme-variant-context';
import {applyCssVars} from './utils/css';
import {vars} from './skins/skin-contract.css';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps, TrackingEvent} from './utils/types';

interface HrefProps {
    href: string;
    newTab?: boolean;
}

interface ToProps {
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
}

interface OnPressProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | undefined | Promise<void>;
}

interface MaybeProps {
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
}

interface BaseOldProps {
    /** @deprecated */
    children?: React.ReactNode;
    /** @deprecated */
    className?: string;
    disabled?: boolean;
    /** @deprecated */
    icon?: string;
    /** @deprecated */
    iconSize?: number;
    /** @deprecated */
    backgroundColor?: string;
    /** @deprecated */
    size?: number | string;
    /** @deprecated */
    style?: React.CSSProperties;
    /** @deprecated */
    'aria-live'?: 'polite' | 'off' | 'assertive';

    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    newTab?: boolean;
    'aria-label'?: string;
}

type OldProps = BaseOldProps & ExclusifyUnion<HrefProps | ToProps | OnPressProps | MaybeProps>;

const ICON_SIZE_1 = 24;

const getButtonStyle = (
    backgroundUrl: string | undefined,
    size: string | number,
    backgroundColor: string,
    iconSize: number | undefined,
    disabled: boolean | undefined
): React.CSSProperties => {
    const normalizedIconSize = iconSize ? `${iconSize}px ${iconSize}px` : '100% 100%';
    return {
        padding: 0,
        backgroundColor,
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'initial',
        backgroundSize: normalizedIconSize,
        cursor: disabled ? 'default' : 'pointer',
        height: size,
        width: size,
        verticalAlign: 'middle',
        textAlign: 'center',
    };
};

/*
 * Examples:
 *
 * IconButton with image url:
 *
 *     <IconButton icon="http://my.image.jpg" aria-label="label" />
 *
 * IconButton with SVG component as icon. Child ignored if `icon` prop is set. Only one child is accepted!
 *
 *     <IconButton aria-label="label">
 *         <MySvgIconComponent />
 *     </IconButton />
 *
 */
const RawOldIconButton: React.FC<OldProps> = (props) => {
    const {icon, children} = props;
    const commonProps = {
        className: props.className || '',
        disabled: props.disabled,
        style: props.style,
        trackingEvent: props.trackingEvent,
        'aria-live': props['aria-live'],
        dataAttributes: {'component-name': 'IconButton', ...props.dataAttributes},
    };

    if (props.href) {
        return (
            <BaseTouchable
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
                aria-label={props['aria-label']}
            >
                {!icon && React.Children.only(children)}
            </BaseTouchable>
        );
    }
    if (props.to) {
        return (
            <BaseTouchable
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                replace={props.replace}
                aria-label={props['aria-label']}
            >
                {!icon && React.Children.only(children)}
            </BaseTouchable>
        );
    }

    if (props.onPress) {
        return (
            <BaseTouchable
                {...commonProps}
                onPress={(event) => {
                    event.stopPropagation();
                    props.onPress(event);
                }}
                aria-label={props['aria-label']}
            >
                {!icon && React.Children.only(children)}
            </BaseTouchable>
        );
    }

    return (
        <BaseTouchable {...commonProps} maybe>
            {!icon && React.Children.only(children)}
        </BaseTouchable>
    );
};

const iconButtonTokens = {
    brand: {
        solid: {
            default: {
                background: vars.colors.buttonPrimaryBackground,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.textButtonPrimary,
            },
            inverse: {
                background: vars.colors.buttonPrimaryBackgroundInverse,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.textButtonPrimaryInverse,
            },
            alternative: {
                background: vars.colors.buttonPrimaryBackground,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.textButtonPrimary,
            },
        },

        soft: {
            default: {
                background: vars.colors.brandLow,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.textButtonSecondary,
            },
            inverse: {
                background: vars.colors.backgroundContainerBrandOverInverse,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.textButtonSecondaryInverse,
            },
            alternative: {
                background: vars.colors.brandLow,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.textButtonSecondary,
            },
        },

        default: {
            default: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.textButtonSecondary,
            },
            inverse: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.textButtonSecondaryInverse,
            },
            alternative: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.textButtonSecondary,
            },
        },
    },

    neutral: {
        solid: {
            default: {
                background: vars.colors.neutralHigh,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.neutralLow,
            },
            inverse: {
                background: vars.colors.inverse,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: 'black',
            },
            alternative: {
                background: vars.colors.neutralHigh,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.neutralLow,
            },
        },

        soft: {
            default: {
                background: vars.colors.neutralLow,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.neutralHigh,
            },
            inverse: {
                background: vars.colors.backgroundContainerBrandOverInverse,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.textButtonSecondaryInverse,
            },
            alternative: {
                background: vars.colors.neutralLowAlternative,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.textButtonSecondary,
            },
        },

        default: {
            default: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.neutralHigh,
            },
            inverse: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.inverse,
            },
            alternative: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.neutralHigh,
            },
        },
    },

    danger: {
        solid: {
            default: {
                background: vars.colors.buttonDangerBackground,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.inverse,
            },
            inverse: {
                background: vars.colors.buttonDangerBackground,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.inverse,
            },
            alternative: {
                background: vars.colors.buttonDangerBackground,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.inverse,
            },
        },

        soft: {
            default: {
                background: vars.colors.errorLow,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.error,
            },
            inverse: {
                background: vars.colors.buttonLinkDangerBackgroundInverse,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.error,
            },
            alternative: {
                background: vars.colors.errorLow,
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.error,
            },
        },

        default: {
            default: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.error,
            },
            inverse: {
                background: vars.colors.buttonLinkDangerBackgroundInverse,
                backgroundHover: vars.colors.backgroundContainerBrandHover,
                backgroundActive: vars.colors.backgroundContainerBrandPressed,
                icon: vars.colors.error,
            },
            alternative: {
                background: 'transparent',
                backgroundHover: vars.colors.backgroundContainerHover,
                backgroundActive: vars.colors.backgroundContainerPressed,
                icon: vars.colors.error,
            },
        },
    },
};

interface BaseNewProps {
    children?: undefined;
    Icon: React.FC<IconProps>;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    dataAttributes?: DataAttributes;
    disabled?: boolean;
    showSpinner?: boolean;
    'aria-label'?: string;
    small?: boolean;
    type?: 'neutral' | 'brand' | 'danger';
    variant?: 'default' | 'solid' | 'soft';
    bleedLeft?: boolean;
    bleedRight?: boolean;
    bleedY?: boolean;
}

type NewProps = BaseNewProps & ExclusifyUnion<HrefProps | ToProps | OnPressProps | MaybeProps>;

const RawIconButton: React.FC<NewProps & {isOverMedia?: boolean}> = ({
    disabled,
    trackingEvent,
    dataAttributes,
    type = 'neutral',
    variant = 'default',
    isOverMedia,
    'aria-label': ariaLabel,
    small,
    Icon,
    bleedLeft,
    bleedRight,
    bleedY,
    ...props
}) => {
    const themeVariant = useThemeVariant();
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
    }, [showSpinner, shouldRenderSpinner]);

    const buttonSize = small ? 'small' : 'default';
    const tokens = iconButtonTokens[type][variant][themeVariant];

    const commonProps = {
        disabled: disabled || showSpinner,
        trackingEvent,
        'aria-label': ariaLabel,
        dataAttributes: {'component-name': 'IconButton', ...dataAttributes},
        className: classNames(styles.buttonContainer[buttonSize], {[styles.disabled]: disabled}),
        style: {
            ...(bleedLeft ? {marginLeft: styles.bleedArea[buttonSize]} : undefined),
            ...(bleedRight ? {marginRight: styles.bleedArea[buttonSize]} : undefined),
            ...(bleedY
                ? {marginTop: styles.bleedArea[buttonSize], marginBottom: styles.bleedArea[buttonSize]}
                : undefined),
            ...applyCssVars({
                [styles.vars.iconColor]: tokens.icon,
                [styles.vars.background]: tokens.background,
                [styles.vars.backgroundHover]: tokens.backgroundHover,
                [styles.vars.backgroundActive]: tokens.backgroundActive,
            }),
        },
    };

    const content = (
        <div
            className={classNames(styles.iconContainer[buttonSize], {
                [styles.isLoading]: showSpinner,
                [styles.overlayContainer]: !disabled && !showSpinner,
            })}
        >
            <div className={styles.overlay} />

            <div aria-hidden={showSpinner ? true : undefined} className={styles.icon}>
                <Icon size={styles.iconSize[buttonSize]} color="currentColor" />
            </div>

            <div
                aria-hidden={showSpinner ? undefined : true}
                className={styles.spinner}
                onTransitionEnd={() => {
                    if (showSpinner !== shouldRenderSpinner) {
                        setShouldRenderSpinner(showSpinner);
                    }
                }}
            >
                {shouldRenderSpinner && (
                    <Spinner size={styles.iconSize[buttonSize]} color="currentColor" delay="0s" />
                )}
            </div>
        </div>
    );

    if (props.href) {
        return (
            <BaseTouchable {...commonProps} href={props.href} newTab={props.newTab}>
                {content}
            </BaseTouchable>
        );
    }
    if (props.to) {
        return (
            <BaseTouchable
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                replace={props.replace}
            >
                {content}
            </BaseTouchable>
        );
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
            >
                {content}
            </BaseTouchable>
        );
    }

    return (
        <BaseTouchable {...commonProps} maybe>
            {content}
        </BaseTouchable>
    );
};

type IconButtonProps = ExclusifyUnion<OldProps | NewProps>;

export const InternalIconButton = (props: IconButtonProps & {isOverMedia?: boolean}): JSX.Element => {
    if (props.Icon) {
        return <RawIconButton {...props} />;
    }

    const {icon, backgroundColor = 'transparent', iconSize, size = ICON_SIZE_1} = props;
    return (
        <RawOldIconButton
            {...props}
            className={classNames(styles.oldIconButtonBase, props.className)}
            style={{...getButtonStyle(icon, size, backgroundColor, iconSize, props.disabled), ...props.style}}
        />
    );
};

const IconButton = (props: IconButtonProps): JSX.Element => {
    return <InternalIconButton {...props} />;
};

// Used internally by Mistica's components to avoid styles collisions
export const BaseIconButton = (props: IconButtonProps): JSX.Element => {
    if (props.Icon) {
        return <RawIconButton {...props} />;
    }

    const {size = ICON_SIZE_1, disabled} = props;
    return (
        <RawOldIconButton
            {...props}
            className={classNames(styles.oldIconButtonBase, props.className)}
            style={{
                height: size,
                width: size,
                cursor: disabled ? 'default' : 'pointer',
                verticalAlign: 'middle',
                textAlign: 'center',
            }}
        />
    );
};

export default IconButton;
