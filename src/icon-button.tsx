import * as React from 'react';
import Touchable from './touchable';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, TrackingEvent} from './utils/types';

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
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        backgroundColor,
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : '',
        backgroundPosition: '50% 50%',
        backgroundSize: normalizedIconSize,
        backgroundRepeat: 'no-repeat',
        border: 0,
        cursor: disabled ? 'default' : 'pointer',
        height: size,
        width: size,
    };
};

interface CommonProps {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    icon?: string;
    iconSize?: number;
    backgroundColor?: string;
    size?: number | string;
    style?: React.CSSProperties;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    /** @deprecated use dataAttributes */
    'data-testid'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    newTab?: boolean;
}

/** @deprecated */
interface HrefPropsDeprecated extends CommonProps {
    /** @deprecated use aria-label */
    label: string;
    'aria-label'?: undefined;
    href: string;
    to?: undefined;
    onPress?: undefined;
}

interface HrefProps extends CommonProps {
    label?: undefined;
    'aria-label': string;
    href: string;
    to?: undefined;
    onPress?: undefined;
}

/** @deprecated */
interface ToPropsDeprecated extends CommonProps {
    /** @deprecated use aria-label */
    label: string;
    'aria-label'?: undefined;
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
}

interface ToProps extends CommonProps {
    label?: undefined;
    'aria-label': string;
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
}

/** @deprecated */
interface OnPressPropsDeprecated extends CommonProps {
    /** @deprecated use aria-label */
    label: string;
    'aria-label'?: undefined;
    onPress: (event: React.MouseEvent<HTMLElement>) => void;
    href?: undefined;
    to?: undefined;
}

interface OnPressProps extends CommonProps {
    label?: undefined;
    'aria-label': string;
    onPress: (event: React.MouseEvent<HTMLElement>) => void;
    href?: undefined;
    to?: undefined;
}

interface MaybeProps extends CommonProps {
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
}

type Props =
    | HrefProps
    | HrefPropsDeprecated
    | ToProps
    | ToPropsDeprecated
    | OnPressProps
    | OnPressPropsDeprecated
    | MaybeProps;

/*
 * Examples:
 *
 * IconButton with image url:
 *
 *     <IconButton icon="http://my.image.jpg" />
 *
 * IconButton with SVG component as icon. Child ignored if `icon` prop is set. Only one child is accepted!
 *
 *     <IconButton><MySvgIconComponent /></IconButton />
 *
 */
const IconButton: React.FC<Props> = (props) => {
    const {icon, children, backgroundColor = 'transparent', iconSize, size = ICON_SIZE_1} = props;
    const commonProps = {
        className: props.className || '',
        disabled: props.disabled,
        style: {
            ...getButtonStyle(icon, size, backgroundColor, iconSize, props.disabled),
            ...props.style,
        },
        trackingEvent: props.trackingEvent,
        'data-testid': props['data-testid'],
        ...getPrefixedDataAttributes(props.dataAttributes),
    };

    if (props.href) {
        const label = props['aria-label'] ?? props.label;
        return (
            <Touchable {...commonProps} href={props.href} newTab={props.newTab} aria-label={label}>
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }
    if (props.to) {
        const label = props['aria-label'] ?? props.label;
        return (
            <Touchable
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                replace={props.replace}
                aria-label={label}
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }

    if (props.onPress) {
        const label = props['aria-label'] ?? props.label;
        return (
            <Touchable {...commonProps} onPress={props.onPress} aria-label={label}>
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }

    return (
        <Touchable {...commonProps} maybe>
            {!icon && React.Children.only(children)}
        </Touchable>
    );
};

export default IconButton;
