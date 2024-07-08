import * as React from 'react';
import {MemoryRouter, Route, Routes, Link as ReactRouterLink, useLocation} from 'react-router-dom';
import Touchable from '../touchable';
import {waitFor, fireEvent, render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import {type ThemeConfig} from '../theme';
import {SPACE} from '../utils/keys';
import {redirect as redirectSpy} from '../utils/browser';

const trackingEvent = {
    category: 'test',
    action: 'test',
    label: 'test',
};

jest.mock('../utils/browser', () => ({
    ...jest.requireActual('../utils/browser'),
    redirect: jest.fn(),
}));

beforeEach(() => {
    (redirectSpy as any).mockReset();
});

const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;

test('<Link> element is rendered when "to" prop is passed', async () => {
    const to = '/to';

    render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <MemoryRouter>
                <Touchable to={to}>Test</Touchable>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', to);
});

test('<a> element is rendered when "to" prop is used and no Link component injected via ThemeContextProvider', async () => {
    const to = '/to';

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable to={to}>Test</Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', to);
});

test('<Link> element is rendered when "to" prop is passed with tracking', async () => {
    const logEventSpy = jest.fn();

    const to = '/to';

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}, Link})}>
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Touchable to={to} trackingEvent={trackingEvent}>
                                Test
                            </Touchable>
                        }
                    />
                    <Route path={to} element={<div>Target route</div>} />
                </Routes>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    fireEvent.click(anchor);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(1);
    });
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(screen.getByText('Target route')).toBeInTheDocument();
});

test('<Link> element is rendered when "to" prop is passed with multiple tracking events', async () => {
    const logEventSpy = jest.fn();

    const to = '/to';

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}, Link})}>
            <MemoryRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Touchable to={to} trackingEvent={[trackingEvent, trackingEvent]}>
                                Test
                            </Touchable>
                        }
                    />
                    <Route path={to} element={<div>Target route</div>} />
                </Routes>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    fireEvent.click(anchor);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(2);
    });
    expect(logEventSpy.mock.calls).toEqual([[trackingEvent], [trackingEvent]]);
    expect(screen.getByText('Target route')).toBeInTheDocument();
});

test('<a> element is rendered when "fullPageOnWebView" and "to" props are passed, inside App', () => {
    const href = 'href';

    render(
        <ThemeContextProvider theme={makeTheme({platformOverrides: {insideNovumNativeApp: true}})}>
            <Touchable to={href} fullPageOnWebView>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});
    expect(anchor).toHaveAttribute('href', href);
});

test('<Link> element is rendered when "fullPageOnWebView" and "to" props are passed, outside App', () => {
    const href = 'href';

    render(
        <ThemeContextProvider theme={makeTheme({platformOverrides: {insideNovumNativeApp: false}, Link})}>
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Touchable to={href} fullPageOnWebView>
                                Test
                            </Touchable>
                        }
                    />
                </Routes>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', `/${href}`);
});

test('<a> element is rendered when "href" prop is passed', () => {
    const href = 'href';
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable href={href}>Test</Touchable>
        </ThemeContextProvider>
    );
    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', href);
});

test('<a> element is rendered when "href" prop is passed and trackingEvent', async () => {
    const href = 'href';
    const logEventSpy = jest.fn(() => Promise.resolve());

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable
                dataAttributes={{testid: 'touchable-events'}}
                href={href}
                newTab
                trackingEvent={trackingEvent}
            >
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByTestId('touchable-events');
    expect(anchor).toBeInTheDocument();
    fireEvent.click(anchor);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(1);
    });
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(redirectSpy).toHaveBeenCalledWith(href, true, false);
});

test('<a> element is rendered when "href" and "loadOnTop" props are passed', async () => {
    const href = 'href';
    const logEventSpy = jest.fn(() => Promise.resolve());

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable
                dataAttributes={{testid: 'touchable-events'}}
                href={href}
                loadOnTop
                trackingEvent={trackingEvent}
            >
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByTestId('touchable-events');
    expect(anchor).toBeInTheDocument();
    fireEvent.click(anchor);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(1);
    });
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith('href', false, true);
});

test('<a> element is rendered when "href" prop is passed and multiple trackingEvent', async () => {
    const href = 'href';
    const logEventSpy = jest.fn(() => Promise.resolve());

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable
                dataAttributes={{testid: 'touchable-events'}}
                href={href}
                newTab
                trackingEvent={[trackingEvent, trackingEvent]}
            >
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByTestId('touchable-events');
    expect(anchor).toBeInTheDocument();
    fireEvent.click(anchor);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(2);
    });
    expect(logEventSpy.mock.calls).toEqual([[trackingEvent], [trackingEvent]]);
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith('href', true, false);
});

test('<button> element is rendered when "onPress" prop is passed', () => {
    const onPress = () => {};
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable onPress={onPress}>Test</Touchable>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'Test'})).toBeInTheDocument();
});

test('<button> element is rendered when "onPress" prop is passed and trackingEvent', async () => {
    const onPressSpy = jest.fn().mockReturnValue(undefined);
    const logEventSpy = jest.fn(() => Promise.resolve());
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable onPress={onPressSpy} trackingEvent={trackingEvent}>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Test'}));

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(1);
    });
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
});

test('<button> element is rendered when "onPress" prop is passed and multiple trackingEvent', async () => {
    const onPressSpy = jest.fn().mockReturnValue(undefined);
    const logEventSpy = jest.fn(() => Promise.resolve());
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable onPress={onPressSpy} trackingEvent={[trackingEvent, trackingEvent]}>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'Test'}));

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(2);
    });
    expect(logEventSpy.mock.calls).toEqual([[trackingEvent], [trackingEvent]]);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
});

test('<a> component has click-like behaviour on "space" key press', async () => {
    const href = 'href';

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable href={href} newTab trackingEvent={trackingEvent}>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    fireEvent.keyDown(screen.getByRole('link', {name: /Test/}), {key: SPACE});

    await waitFor(() => {
        expect(redirectSpy).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith('href', true, false);
    });
});

test('<Link> component has click-like behaviour on "space" key press', async () => {
    const to = '/to';

    render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Touchable to={to}>Test</Touchable>} />
                    <Route path={to} element={<div>test click</div>} />
                </Routes>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    fireEvent.keyDown(anchor, {key: SPACE});

    await waitFor(() => {
        expect(screen.getByText('test click')).toBeInTheDocument();
    });
});

const useHrefDecorator = () => {
    return (href: string) => {
        const url = new URL(href, 'https://x');
        const search = new URLSearchParams(url.search);
        search.set('utm_source', 'test');
        return `${url.pathname}?${search.toString()}${url.hash}`;
    };
};

test('"href" gets decorated', () => {
    const href = '/foo/bar/?param=123#hash';
    render(
        <ThemeContextProvider theme={makeTheme({useHrefDecorator})}>
            <Touchable href={href}>Test</Touchable>
        </ThemeContextProvider>
    );
    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', '/foo/bar/?param=123&utm_source=test#hash');
});

test('"to" paths are not decorated', () => {
    const to = '/foo/bar/?param=123#hash';
    render(
        <ThemeContextProvider theme={makeTheme({useHrefDecorator})}>
            <Touchable to={to}>Test</Touchable>
        </ThemeContextProvider>
    );
    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', '/foo/bar/?param=123#hash');
});

test('"to" paths with "fullPageOnWebView" are not decorated', () => {
    const to = '/foo/bar/?param=123#hash';
    render(
        <ThemeContextProvider theme={makeTheme({useHrefDecorator})}>
            <Touchable to={to} fullPageOnWebView>
                Test
            </Touchable>
        </ThemeContextProvider>
    );
    const anchor = screen.getByRole('link', {name: 'Test'});

    expect(anchor).toHaveAttribute('href', '/foo/bar/?param=123#hash');
});

test('onNavigate is called before navigation when using "href" prop', async () => {
    const onNavigateSpy = jest.fn().mockResolvedValue(undefined);
    const logEventSpy = jest.fn();
    const href = 'https://example.org';

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable href={href} trackingEvent={trackingEvent} onNavigate={onNavigateSpy}>
                Test
            </Touchable>
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
    const onNavigateSpy = jest.fn().mockResolvedValue(undefined);
    const logEventSpy = jest.fn();
    const to = '/example/path';

    const CurrentPath = () => {
        return <div>Current path: {useLocation().pathname}</div>;
    };

    render(
        <ThemeContextProvider theme={makeTheme({Link, analytics: {logEvent: logEventSpy}})}>
            <MemoryRouter>
                <Touchable to={to} trackingEvent={trackingEvent} onNavigate={onNavigateSpy}>
                    Test
                </Touchable>
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

test('Touchable has the appropiate role', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable to="/to">to</Touchable>
            <Touchable href="/href">href</Touchable>
            <Touchable onPress={() => {}}>onPress</Touchable>

            <Touchable to="/to" role="menuitem">
                to
            </Touchable>
            <Touchable href="/href" role="tab">
                href
            </Touchable>
            <Touchable onPress={() => {}} role="link">
                onPress
            </Touchable>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('link', {name: 'to'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'href'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'onPress'})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', {name: 'to'})).toBeInTheDocument();
    expect(screen.getByRole('tab', {name: 'href'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'onPress'})).toBeInTheDocument();
});

test('target="_blank" is set with newTab', async () => {
    const url = 'https://example.org';

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable to={url} newTab>
                to link
            </Touchable>
            <Touchable href={url} newTab>
                href link
            </Touchable>
        </ThemeContextProvider>
    );

    const toLink = screen.getByRole('link', {name: /to link/});
    const hrefLink = screen.getByRole('link', {name: /href link/});

    expect(toLink).toHaveAttribute('href', url);
    expect(hrefLink).toHaveAttribute('href', url);

    expect(toLink).toHaveAttribute('target', '_blank');
    expect(hrefLink).toHaveAttribute('target', '_blank');
});
