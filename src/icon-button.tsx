import * as React from 'react';
import Touchable from './touchable';

import type {TrackingEvent} from './utils/types';

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
    'data-testid'?: string;
    newTab?: boolean;
}

interface HrefProps extends CommonProps {
    label: string;
    href: string;
    to?: undefined;
    onPress?: undefined;
}
interface ToProps extends CommonProps {
    label: string;
    to: string;
    fullPageOnWebView?: boolean;
    replace?: boolean;
    href?: undefined;
    onPress?: undefined;
}
interface OnPressProps extends CommonProps {
    label: string;
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
    };

    if (props.href) {
        return (
            <Touchable
                data-testid={props['data-testid']}
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
                label={props.label}
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }
    if (props.to) {
        return (
            <Touchable
                data-testid={props['data-testid']}
                {...commonProps}
                to={props.to}
                fullPageOnWebView={props.fullPageOnWebView}
                replace={props.replace}
                label={props.label}
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }

    if (props.onPress) {
        return (
            <Touchable
                data-testid={props['data-testid']}
                {...commonProps}
                onPress={props.onPress}
                label={props.label}
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }

    return (
        <Touchable {...commonProps} maybe data-testid={props['data-testid']}>
            {!icon && React.Children.only(children)}
        </Touchable>
    );
};

export default IconButton;
