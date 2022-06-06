import * as React from 'react';

import type {EventFormat} from '../theme';

// Universal Analytics (legacy)
export const eventCategories = {userInteraction: 'user_interaction'} as const;
export const eventActions = {linkTapped: 'link_tapped'} as const;

// Google analytics 4
export const eventNames = {userInteraction: 'user_interaction'} as const;

<<<<<<< HEAD
const TrackingContext = React.createContext<{eventFormat: EventFormat}>({
    eventFormat: 'universal-analytics',
});
=======
const TrackingContext = React.createContext<Readonly<{eventFormat?: EventFormat}>>({});
>>>>>>> e3cbef13434af7edb9e629d178a21661017a5026

type TrackingConfigProps = {
    children: React.ReactNode;
    eventFormat: EventFormat;
};

export const TrackingConfig = ({children, eventFormat}: TrackingConfigProps): JSX.Element => {
    const value = React.useMemo(() => ({eventFormat}), [eventFormat]);

    return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export const useTrackingConfig = (): {eventFormat: EventFormat} => React.useContext(TrackingContext);
