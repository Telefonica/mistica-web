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

    const linkWithoutEvent = await screen.findByRole('link', {name: /link without event/});
    const linkWithCustomEvent = await screen.findByRole('link', {name: /link with custom event/});
    const linkWithDefaultEvent = await screen.findByRole('link', {name: /link with default event/});

    await userEvent.click(linkWithoutEvent);
    expect(logEventSpy).not.toHaveBeenCalled();

    await userEvent.click(linkWithCustomEvent);
    expect(logEventSpy).toHaveBeenCalledWith(customTrackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(linkWithDefaultEvent);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'link_tapped',
        label: 'link with default event',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);
});

test('TextLink indicates that opens in a new tab', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TextLink newTab href="/test">
                my link
            </TextLink>
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'my link Se abre en ventana nueva'});

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target');
});

test('TextkLink indicates that opens in the same page', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TextLink href="#test">my link</TextLink>
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'my link Página actual'});

    expect(link).toBeInTheDocument();
});

test('TextLink allows customizing the aria-label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TextLink aria-label="custom label" href="#test">
                my link
            </TextLink>
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'custom label'});

    expect(link).toBeInTheDocument();
});
