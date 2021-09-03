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
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    newTab?: boolean;
    'aria-label'?: string;
}

interface HrefProps extends CommonProps {
    href: string;
    to?: undefined;
    onPress?: undefined;
}

interface ToProps extends CommonProps {
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
}

interface OnPressProps extends CommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void;
    href?: undefined;
    to?: undefined;
}

interface MaybeProps extends CommonProps {
    onPress?: undefined;
    href?: undefined;
    to?: undefined;
}

type Props = HrefProps | ToProps | OnPressProps | MaybeProps;

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
        ...getPrefixedDataAttributes(props.dataAttributes),
    };

    if (props.href) {
        return (
            <Touchable
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
                aria-label={props['aria-label']}
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }
    if (props.to) {
        return (
            <Touchable
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                replace={props.replace}
                aria-label={props['aria-label']}
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }

    if (props.onPress) {
        return (
            <Touchable {...commonProps} onPress={props.onPress} aria-label={props['aria-label']}>
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
