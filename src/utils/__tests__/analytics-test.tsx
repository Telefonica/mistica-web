import * as React from 'react';
import ThemeContextProvider from '../../theme-context-provider';
import {render, screen} from '@testing-library/react';
import {makeTheme} from '../../__tests__/test-utils';
import {TrackingConfig, useTrackingConfig} from '../analytics';

const PrintEventFormat = ({prefix}: {prefix: string}) => {
    const {eventFormat} = useTrackingConfig();
    return <div>{`${prefix}: ${eventFormat}`}</div>;
};

test('', () => {
    render(
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

    expect(screen.getByText('test1: google-analytics-4')).toBeInTheDocument();
    expect(screen.getByText('test2: universal-analytics')).toBeInTheDocument();
    expect(screen.getByText('test3: google-analytics-4')).toBeInTheDocument();
});
