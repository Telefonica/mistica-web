export type TrackingEvent = {
    [key: string]: unknown;
    category: string;
    action: string;
    label?: string;
    value?: number;
};

export interface TrackingProps {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
}
