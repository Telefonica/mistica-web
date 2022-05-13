import * as React from 'react';
import TextLink from '../text-link';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('TextLink can track events', async () => {
    const logEventSpy = jest.fn();
    const customTrackingEvent = {
        category: 'someCategory',
        action: 'someAction',
        label: 'someLabel',
    };

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <TextLink href="#test">link without event</TextLink>
            <TextLink trackingEvent={customTrackingEvent} href="#test">
                link with custom event
            </TextLink>
            <TextLink trackEvent href="#test">
                link with default event
            </TextLink>
        </ThemeContextProvider>
    );

    const linkWithoutEvent = await screen.findByRole('link', {name: 'link without event'});
    const linkWithCustomEvent = await screen.findByRole('link', {name: 'link with custom event'});
    const linkWithDefaultEvent = await screen.findByRole('link', {name: 'link with default event'});

    userEvent.click(linkWithoutEvent);
    expect(logEventSpy).not.toHaveBeenCalled();

    userEvent.click(linkWithCustomEvent);
    expect(logEventSpy).toHaveBeenCalledWith(customTrackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    userEvent.click(linkWithDefaultEvent);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'link_tapped',
        label: 'link with default event',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);
});
