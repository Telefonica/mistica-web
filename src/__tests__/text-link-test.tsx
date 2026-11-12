import * as React from 'react';
import TextLink from '../text-link';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';
import {redirect as redirectSpy} from '../utils/browser';

import type {ThemeConfig} from '../theme';

jest.mock('../utils/browser', () => ({
    ...jest.requireActual('../utils/browser'),
    redirect: jest.fn(),
}));

beforeEach(() => {
    (redirectSpy as any).mockReset();
});

const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;

const trackingEvent = {
    category: 'someCategory',
    action: 'someAction',
    label: 'someLabel',
};

test('TextLink can track events', async () => {
    const logEventSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <TextLink href="#test">link without event</TextLink>
            <TextLink trackingEvent={trackingEvent} href="#test">
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
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(linkWithDefaultEvent);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'link_tapped',
        label: 'link with default event',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);
});

test('onNavigate is called before navigation when using "href" prop', async () => {
    const onNavigateSpy = jest.fn();
    const logEventSpy = jest.fn();
    const href = 'https://example.org';

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <TextLink href={href} trackingEvent={trackingEvent} onNavigate={onNavigateSpy}>
                Test
            </TextLink>
        </ThemeContextProvider>
    );

    const link = screen.getByRole('link', {name: 'Test'});
    fireEvent.click(link);

    expect(onNavigateSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).not.toHaveBeenCalled();

    await waitFor(() => {
        expect(redirectSpy).toHaveBeenCalledWith(href, false, false);
    });

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    });
});

test('onNavigate is called during navigation when using "to" prop', async () => {
    const onNavigateSpy = jest.fn();
    const logEventSpy = jest.fn();
    const to = '/example/path';

    const CurrentPath = () => {
        return <div>Current path: {useLocation().pathname}</div>;
    };

    render(
        <ThemeContextProvider theme={makeTheme({Link, analytics: {logEvent: logEventSpy}})}>
            <MemoryRouter>
                <TextLink to={to} trackingEvent={trackingEvent} onNavigate={onNavigateSpy}>
                    Test
                </TextLink>
                <CurrentPath />
            </MemoryRouter>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Current path: /')).toBeInTheDocument();

    const link = screen.getByRole('link', {name: 'Test'});
    fireEvent.click(link);

    expect(screen.getByText(`Current path: ${to}`)).toBeInTheDocument();

    expect(onNavigateSpy).toHaveBeenCalledTimes(1);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    });
});

test('Buttons have the appropiate role', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TextLink to="/to">to</TextLink>
            <TextLink href="/href">href</TextLink>
            <TextLink onPress={() => {}}>onPress</TextLink>

            <TextLink to="/to" role="menuitem">
                to
            </TextLink>
            <TextLink href="/href" role="tab">
                href
            </TextLink>
            <TextLink onPress={() => {}} role="link">
                onPress
            </TextLink>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('link', {name: 'to'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'href'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'onPress'})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', {name: 'to'})).toBeInTheDocument();
    expect(screen.getByRole('tab', {name: 'href'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'onPress'})).toBeInTheDocument();
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

test('TextLink indicates that opens in the same page', async () => {
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
