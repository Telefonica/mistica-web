'use client';
import * as React from 'react';
import {useTheme} from '../hooks';

import type {EventFormat} from '../theme';
import type {TrackingEvent} from './types';

// Universal Analytics (legacy)
export const eventCategories = {userInteraction: 'user_interaction'} as const;
export const eventActions = {linkTapped: 'link_tapped'} as const;

// Google analytics 4
export const eventNames = {userInteraction: 'user_interaction'} as const;

const TrackingContext = React.createContext<{eventFormat: EventFormat}>({
    eventFormat: 'universal-analytics',
});

type TrackingConfigProps = {
    children: React.ReactNode;
    eventFormat: EventFormat;
};

export const TrackingConfig = ({children, eventFormat}: TrackingConfigProps): JSX.Element => {
    const value = React.useMemo(() => ({eventFormat}), [eventFormat]);

    return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export const useTrackingConfig = (): {eventFormat: EventFormat} => React.useContext(TrackingContext);

type TrackingComponentType =
    | 'icon'
    | 'row'
    | 'tab'
    | 'accordion'
    | 'card'
    | 'chip'
    | 'link'
    | 'button';

type DefaultTrackingOptions = {
    componentType: TrackingComponentType;
    componentCopy: string;
    trackEvent?: boolean;
};

export const useDefaultTracking = (): ((options: DefaultTrackingOptions) => TrackingEvent | undefined) => {
    const {analytics} = useTheme();
    const {eventFormat} = useTrackingConfig();

    return ({
        componentType,
        componentCopy,
        trackEvent,
    }: DefaultTrackingOptions): TrackingEvent | undefined => {
        const shouldTrackEvent = trackEvent ?? analytics.trackEventsByDefault;
        if (!shouldTrackEvent) {
            return undefined;
        }

        return eventFormat === 'google-analytics-4'
            ? {
                  name: eventNames.userInteraction,
                  component_type: componentType,
                  component_copy: componentCopy,
              }
            : {
                  category: eventCategories.userInteraction,
                  action: `${componentType}_tapped`,
                  label: componentCopy,
              };
    };
};
