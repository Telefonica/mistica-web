import * as React from 'react';
import ThemeContextProvider from '../../theme-context-provider';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ButtonPrimary} from '../../button';
import TextLink from '../../text-link';
import {makeTheme} from '../../__tests__/test-utils';
import {TrackingConfig, useTrackingConfig} from '../analytics';

const PrintEventFormat = ({prefix}: {prefix: string}) => {
    const {eventFormat} = useTrackingConfig();
    return <div>{`${prefix}: ${eventFormat}`}</div>;
};

test('TrackingConfig context providers', () => {
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

test.each([
    {Component: ButtonPrimary, componentType: 'primary_button'},
    {Component: TextLink, componentType: 'link'},
])('the theme enables default tracking for $componentType', async ({Component, componentType}) => {
    const logEvent = jest.fn();
    const customEvent = {name: 'custom_event'};

    render(
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent, eventFormat: 'google-analytics-4', trackEventsByDefault: true},
            })}
        >
            <Component to="#test">Default tracking</Component>
            <Component to="#test" trackEvent={false}>
                Disabled tracking
            </Component>
            <Component to="#test" trackEvent={false} trackingEvent={customEvent}>
                Custom tracking
            </Component>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('link', {name: 'Default tracking'}));
    await userEvent.click(screen.getByRole('link', {name: 'Disabled tracking'}));
    await userEvent.click(screen.getByRole('link', {name: 'Custom tracking'}));

    expect(logEvent.mock.calls).toEqual([
        [{name: 'user_interaction', component_type: componentType, component_copy: 'Default tracking'}],
        [customEvent],
    ]);
});
