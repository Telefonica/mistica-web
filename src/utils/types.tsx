export type TrackingEvent = {
    readonly [key: string]: unknown;
    readonly category: string;
    readonly action: string;
    readonly label?: string;
    readonly value?: number;
};
