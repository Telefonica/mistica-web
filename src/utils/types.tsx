export type {RendersElement, RendersNullableElement} from './renders-element';

export type TrackingEvent = {
    readonly [key: string]: unknown;
    readonly category: string;
    readonly action: string;
    readonly label?: string;
    readonly value?: number;
};

export type DataAttributes = {[name: string]: string | number | boolean | undefined};

export type IconProps = {
    color?: string;
    size?: string | number;
    className?: string;
    style?: React.CSSProperties;
};
