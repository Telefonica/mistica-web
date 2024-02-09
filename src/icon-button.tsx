import * as React from 'react';
import {BaseTouchable} from './touchable';
import * as styles from './icon-button.css';
import classNames from 'classnames';

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
    onPress: (event: React.MouseEvent<HTMLElement>) => void;
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

interface BaseNewProps {
    children?: undefined;
    Icon: React.FC<IconProps>;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    dataAttributes?: DataAttributes;
    disabled?: boolean;
    loading?: boolean;
    'aria-label': string;
    small?: boolean;
    type?: 'neutral' | 'brand' | 'danger';
    variant?: 'default' | 'solid' | 'soft';
    isOverMedia?: boolean;
    bleedLeft?: boolean;
    bleedRight?: boolean;
    bleedY?: boolean;
}

type NewProps = BaseNewProps & ExclusifyUnion<HrefProps | ToProps | OnPressProps | MaybeProps>;

const RawNewIconButton: React.FC<NewProps> = ({
    disabled,
    trackingEvent,
    dataAttributes,
    type,
    variant,
    isOverMedia,
    'aria-label': ariaLabel,
    loading,
    small,
    Icon,
    bleedLeft,
    bleedRight,
    bleedY,
    ...props
}) => {
    const buttonSize = small ? 'small' : 'default';

    const commonProps = {
        disabled,
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
        },
    };

    const getBackgroundStyles = (): React.CSSProperties => {
        // TODO: get background color using theme variant and type/variant/isOverMedia props
        return {background: 'black'};
    };

    const getIconColor = (): string => {
        // TODO: get icon color using theme variant and type/variant/isOverMedia props
        return 'white';
    };

    // TODO: loading state

    const icon = (
        <div
            className={styles.iconContainer[buttonSize]}
            style={{
                ...getBackgroundStyles(),
            }}
        >
            <Icon size={styles.iconSize[buttonSize]} color={getIconColor()} />
        </div>
    );

    if (props.href) {
        return (
            <BaseTouchable {...commonProps} href={props.href} newTab={props.newTab}>
                {icon}
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
                {icon}
            </BaseTouchable>
        );
    }

    if (props.onPress) {
        return (
            <BaseTouchable {...commonProps} onPress={props.onPress}>
                {icon}
            </BaseTouchable>
        );
    }

    return (
        <BaseTouchable {...commonProps} maybe>
            {icon}
        </BaseTouchable>
    );
};

type IconButtonProps = ExclusifyUnion<OldProps | NewProps>;

const IconButton = (props: IconButtonProps): JSX.Element => {
    if (props.Icon) {
        return <RawNewIconButton {...props} />;
    }

    const {icon, backgroundColor = 'transparent', iconSize, size = ICON_SIZE_1} = props;
    return (
        <RawOldIconButton
            {...props}
            className={classNames(styles.base, props.className)}
            style={{...getButtonStyle(icon, size, backgroundColor, iconSize, props.disabled), ...props.style}}
        />
    );
};

// Used internally by Mistica's components to avoid styles collisions
export const BaseIconButton = (props: IconButtonProps): JSX.Element => {
    if (props.Icon) {
        return <RawNewIconButton {...props} />;
    }

    const {size = ICON_SIZE_1, disabled} = props;
    return (
        <RawOldIconButton
            {...props}
            className={classNames(styles.base, props.className)}
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
