'use client';
import * as React from 'react';
import {BaseTouchable} from './touchable';
import * as styles from './icon-button.css';
import classNames from 'classnames';
import Spinner from './spinner';
import {useThemeVariant} from './theme-variant-context';

import type {TouchableElement, TouchableComponentProps} from './touchable';
import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps, TrackingEvent} from './utils/types';

interface HrefProps {
    href: string;
    newTab?: boolean;
}

interface ToProps {
    to: string;
    newTab?: boolean;
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

interface BaseDeprecatedProps {
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

type DeprecatedProps = BaseDeprecatedProps & ExclusifyUnion<HrefProps | ToProps | OnPressProps | MaybeProps>;

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

/**
 * @deprecated these usages of IconButton will be removed
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
export const RawDeprecatedIconButton = React.forwardRef<TouchableElement, DeprecatedProps>((props, ref) => {
    const {icon, children, ...rest} = props;

    return (
        <BaseTouchable
            ref={ref}
            {...rest}
            maybe
            stopPropagation
            dataAttributes={{'component-name': 'IconButton', ...props.dataAttributes}}
        >
            {!icon && React.Children.only(children)}
        </BaseTouchable>
    );
});

export type IconButtonType = 'neutral' | 'brand' | 'danger';
export type IconButtonBackgroundType = 'transparent' | 'solid' | 'soft';

type AriaProps = ExclusifyUnion<{'aria-label': string} | {'aria-labelledby': string}>;

interface BaseProps {
    children?: undefined;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    dataAttributes?: DataAttributes;
    disabled?: boolean;
    showSpinner?: boolean;
    small?: boolean;
    bleedLeft?: boolean;
    bleedRight?: boolean;
    bleedY?: boolean;
    role?: string;
}

interface IconButtonBaseProps {
    Icon: (props: IconProps) => JSX.Element;
    type?: IconButtonType;
    backgroundType?: IconButtonBackgroundType;
}

interface InternalIconButtonBaseProps {
    hasOverlay?: boolean;
}

export type IconButtonProps = TouchableComponentProps<BaseProps & IconButtonBaseProps & AriaProps>;

export const RawIconButton = React.forwardRef<
    TouchableElement,
    IconButtonProps & InternalIconButtonBaseProps
>(
    (
        {
            disabled,
            trackingEvent,
            role,
            dataAttributes,
            type = 'neutral',
            backgroundType = 'transparent',
            hasOverlay = true,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            small,
            Icon,
            bleedLeft,
            bleedRight,
            bleedY,
            showSpinner: showSpinnerProp,
            ...touchableProps
        },
        ref
    ) => {
        const themeVariant = useThemeVariant();
        const [isOnPressPromiseResolving, setIsOnPressPromiseResolving] = React.useState(false);

        const showSpinner = showSpinnerProp || isOnPressPromiseResolving;

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
        const buttonTokensKey: keyof typeof styles.iconButtonTokens =
            themeVariant === 'overMedia' ? `${type}-media` : `${type}-${backgroundType}-${themeVariant}`;

        const commonProps = {
            disabled: disabled || showSpinner,
            ref,
            trackingEvent,
            role,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            dataAttributes: {'component-name': 'IconButton', ...dataAttributes},
            className: classNames(
                styles.buttonContainer[buttonSize],
                styles.iconButtonTokens[buttonTokensKey],
                styles.minimumInteractiveArea,
                {
                    [styles.disabled]: disabled,
                    [styles.overlayContainer]: !disabled && !showSpinner,
                    [styles.bleedLeft[buttonSize]]: bleedLeft,
                    [styles.bleedRight[buttonSize]]: bleedRight,
                    [styles.bleedY[buttonSize]]: bleedY,
                }
            ),
            resetMargin: !bleedLeft && !bleedRight && !bleedY,
        };

        const content = (
            <div className={classNames(styles.iconContainer[buttonSize], {[styles.isLoading]: showSpinner})}>
                {hasOverlay && <div className={styles.overlay} />}

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

        if (touchableProps.onPress) {
            const originalOnPress = touchableProps.onPress;
            touchableProps.onPress = (e) => {
                const promise = originalOnPress(e);
                if (promise) {
                    setIsOnPressPromiseResolving(true);
                    promise.finally(() => setIsOnPressPromiseResolving(false));
                }
            };
        }

        return (
            <BaseTouchable {...commonProps} {...touchableProps} maybe>
                {content}
            </BaseTouchable>
        );
    }
);

export const InternalIconButton = React.forwardRef<
    TouchableElement,
    ExclusifyUnion<DeprecatedProps | (IconButtonProps & InternalIconButtonBaseProps)>
>((props, ref) => {
    /**
     * The new IconButton requires Icon prop, so if it it's used we render the new version.
     * Otherwise, we render the deprecated one (to avoid breaking changes).
     */
    if (props.Icon) {
        return <RawIconButton ref={ref} {...props} />;
    }

    const {icon, backgroundColor = 'transparent', iconSize, size = ICON_SIZE_1} = props;
    return (
        <RawDeprecatedIconButton
            ref={ref}
            {...props}
            className={classNames(styles.deprecatedIconButtonBase, props.className)}
            style={{...getButtonStyle(icon, size, backgroundColor, iconSize, props.disabled), ...props.style}}
        />
    );
});

export const IconButton = React.forwardRef<
    TouchableElement,
    ExclusifyUnion<DeprecatedProps | IconButtonProps>
>((props, ref) => {
    return <InternalIconButton ref={ref} {...props} />;
});

type ToggleStateProps = {
    Icon: (props: IconProps) => JSX.Element;
    type?: IconButtonType;
    backgroundType?: IconButtonBackgroundType;
} & AriaProps;

interface BaseToggleProps {
    checkedProps: ToggleStateProps;
    uncheckedProps: ToggleStateProps;
    onChange?: (checked: boolean) => void | undefined | Promise<void>;
    checked?: boolean;
    defaultChecked?: boolean;
}

export type ToggleIconButtonProps = BaseProps & BaseToggleProps;

export const InternalToggleIconButton = React.forwardRef<
    TouchableElement,
    ToggleIconButtonProps & InternalIconButtonBaseProps
>(({checked, defaultChecked, checkedProps, uncheckedProps, onChange, dataAttributes, ...props}, ref) => {
    const [checkedState, setCheckedState] = React.useState(!!defaultChecked);

    const handleChange = () => {
        if (checked === undefined) {
            // if onChange is asynchronous, wait until it finishes and change the state if there was no error
            const promise = onChange?.(!checkedState);
            if (promise) {
                return promise.then(() => setCheckedState((checkedState) => !checkedState)).catch(() => {});
            } else {
                setCheckedState((checkedState) => !checkedState);
            }
        } else {
            return onChange?.(!checked);
        }
    };

    return (
        <RawIconButton
            ref={ref}
            {...props}
            {...(checked ?? checkedState ? checkedProps : uncheckedProps)}
            dataAttributes={{'component-name': 'ToggleIconButton', ...dataAttributes}}
            onPress={handleChange}
        />
    );
});

export const ToggleIconButton = React.forwardRef<TouchableElement, ToggleIconButtonProps>((props, ref) => {
    return <InternalToggleIconButton ref={ref} {...props} />;
});
