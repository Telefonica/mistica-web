import * as React from 'react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import {TrackingConfig, useTrackingConfig} from '../utils/analytics';

const PrintEventFormat = ({prefix}: {prefix: string}) => {
    const {eventFormat} = useTrackingConfig();
    return (
        <div>
            {prefix}: {eventFormat}
        </div>
    );
};
export const Nested = (): JSX.Element => (
    <ThemeContextProvider
        theme={makeTheme({
            analytics: {
                logEvent: () => Promise.resolve(),
                eventFormat: 'google-analytics-4',
            },
        })}
    >
        <PrintEventFormat prefix="test1" />
        <TrackingConfig eventFormat="universal-analytics">
            <PrintEventFormat prefix="test2" />
            <TrackingConfig eventFormat="google-analytics-4">
                <PrintEventFormat prefix="test3" />
            </TrackingConfig>
        </TrackingConfig>
    </ThemeContextProvider>
);
