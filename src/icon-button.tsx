import * as React from 'react';
import classnames from 'classnames';
import {BaseTouchable} from './touchable';
import * as styles from './icon-button.css';

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
    'aria-live'?: 'polite' | 'off' | 'assertive';
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
const RawIconButton: React.FC<Props> = (props) => {
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

const IconButton = (props: Props): JSX.Element => {
    const {icon, backgroundColor = 'transparent', iconSize, size = ICON_SIZE_1} = props;
    return (
        <RawIconButton
            {...props}
            className={classnames(styles.base, props.className)}
            style={{...getButtonStyle(icon, size, backgroundColor, iconSize, props.disabled), ...props.style}}
        />
    );
};

// Used internally by Mistica's components to avoid styles collisions
export const BaseIconButton = (props: Props): JSX.Element => {
    const {size = ICON_SIZE_1, disabled} = props;
    return (
        <RawIconButton
            {...props}
            className={classnames(styles.base, props.className)}
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
