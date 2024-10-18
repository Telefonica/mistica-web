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
            themeVariant === 'media' ? `${type}-media` : `${type}-${backgroundType}-${themeVariant}`;

        const commonProps = {
            disabled: disabled || showSpinner,
            ref,
            trackingEvent,
            role,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            dataAttributes: {'component-name': 'IconButton', testid: 'IconButton', ...dataAttributes},
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
    ExclusifyUnion<IconButtonProps & InternalIconButtonBaseProps>
>((props, ref) => <RawIconButton ref={ref} {...props} />);

export const IconButton = React.forwardRef<TouchableElement, ExclusifyUnion<IconButtonProps>>(
    (props, ref) => <InternalIconButton ref={ref} {...props} />
);

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
            dataAttributes={{
                'component-name': 'ToggleIconButton',
                testid: 'ToggleIconButton',
                ...dataAttributes,
            }}
            onPress={handleChange}
        />
    );
});

export const ToggleIconButton = React.forwardRef<TouchableElement, ToggleIconButtonProps>((props, ref) => {
    return <InternalToggleIconButton ref={ref} {...props} />;
});
