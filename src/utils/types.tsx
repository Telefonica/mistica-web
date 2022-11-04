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
    | 'desktop-medium-column'
    | 'desktop-wide-column'
    | 'tablet-column'
    | 'mobile-column';

type AllKeys<T> = T extends unknown ? keyof T : never;
type Id<T> = T extends infer U ? {[K in keyof U]: U[K]} : never;
type _ExclusifyUnion<T, K extends PropertyKey> = T extends unknown
    ? Id<T & Partial<Record<Exclude<K, keyof T>, never>>>
    : never;

export type ExclusifyUnion<T> = _ExclusifyUnion<T, AllKeys<T>>;
