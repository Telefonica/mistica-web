export type {RendersElement, RendersNullableElement} from './renders-element';

export type {TrackingEvent} from '@tef-novum/webview-bridge';

export type DataAttributes = {[name: string]: string | number | boolean | undefined};

export type IconProps = {
    color?: string;
    size?: string | number;
    className?: string;
    style?: React.CSSProperties;
};

export type ContainerType =
    | 'desktop-small-column'
    | 'desktop-mid-column'
    | 'desktop-wide-column'
    | 'tablet-column'
    | 'mobile-column';
