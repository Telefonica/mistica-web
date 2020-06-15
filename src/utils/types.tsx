export type TrackingEvent = {
    [key: string]: unknown;
    category: string;
    action: string;
    label?: string;
    value?: number;
};
