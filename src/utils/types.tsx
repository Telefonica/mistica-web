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
    // FIXME this should be React.CSSProperties but ts-to-flow is transforming it into React$CSSProperties
    // update this type once ts-to-flow gets fixed
    style?: {[key: string]: string | number | boolean | undefined};
};
