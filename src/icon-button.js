// @flow
import * as React from 'react';
import Touchable from './touchable';

import type {CssStyle, TrackingEvent} from './utils/types';

const ICON_SIZE_1 = 24;

const getButtonStyle = (backgroundUrl, size, backgroundColor, iconSize, disabled) => {
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

type CommonProps = {
    children?: React.Node,
    className?: string,
    disabled?: boolean,
    icon?: string,
    iconSize?: number,
    backgroundColor?: string,
    size?: number | string,
    style?: CssStyle,
    label?: string,
    trackingEvent?: TrackingEvent,
    'data-testid'?: string,
    newTab?: boolean,
};

type Props =
    | {
          ...CommonProps,
          label: string,
          href: string,
      }
    | {
          ...CommonProps,
          to: string,
          fullPageOnWebView?: boolean,
          replace?: boolean,
      }
    | {
          ...CommonProps,
          label: string,
          onPress: (SyntheticMouseEvent<HTMLElement>) => void,
      }
    | CommonProps;

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
const IconButton = (props: Props): React.Node => {
    const {icon, children, backgroundColor = 'transparent', iconSize, size = ICON_SIZE_1} = props;
    const commonProps = {
        className: props.className || '',
        disabled: props.disabled,
        style: {
            ...getButtonStyle(icon, size, backgroundColor, iconSize, props.disabled),
            ...props.style,
        },
        trackingEvent: props.trackingEvent || undefined,
        label: props.label || undefined,
    };

    if (props.href) {
        return (
            <Touchable
                data-testid={props['data-testid']}
                {...commonProps}
                href={props.href}
                newTab={props.newTab}
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
            >
                {!icon && React.Children.only(children)}
            </Touchable>
        );
    }

    if (props.onPress) {
        return (
            <Touchable data-testid={props['data-testid']} {...commonProps} onPress={props.onPress}>
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
