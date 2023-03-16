import * as React from 'react';
import {MemoryRouter, Route, Routes, Link as ReactRouterLink} from 'react-router-dom';
import Touchable from '../touchable';
import {waitFor, fireEvent, render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import {type ThemeConfig} from '../theme';

const trackingEvent = {
    category: 'test',
    action: 'test',
    label: 'test',
};

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

    const {container} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable to={to}>Test</Touchable>
        </ThemeContextProvider>
    );

    expect(container).toMatchInlineSnapshot(`
        <div>
          <a
            class="touchable_touchable__mhti6u3 touchable_base__mhti6u1 touchable__mhti6u0 sprinkles_cursor_pointer__1y2v1nf9x touchable__mhti6u2 sprinkles_paddingTop_0__1y2v1nf65 sprinkles_paddingBottom_0__1y2v1nf6k sprinkles_paddingLeft_0__1y2v1nf6z sprinkles_paddingRight_0__1y2v1nf7e sprinkles_display_block__1y2v1nf5k sprinkles_border_none__1y2v1nf9o sprinkles_width_100%__1y2v1nf7t sprinkles_color_inherit__1y2v1nf2n sprinkles_background_transparent__1y2v1nf5c sprinkles_overflow_visible__1y2v1nf9z"
            data-component-name="Touchable"
            href="/to"
          >
            Test
          </a>
        </div>
    `);
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
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
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
    const redirectSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

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
    expect(redirectSpy).toHaveBeenCalledTimes(1);
});

test('<a> element is rendered when "href" and "loadOnTop" props are passed', async () => {
    const href = 'href';
    const logEventSpy = jest.fn(() => Promise.resolve());
    const redirectSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

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
    expect(redirectSpy).toHaveBeenCalledWith('href', '_top');
});

test('<a> element is rendered when "href" prop is passed and multiple trackingEvent', async () => {
    const href = 'href';
    const logEventSpy = jest.fn(() => Promise.resolve());
    const redirectSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

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
});

test('<button> element is rendered when "onPress" prop is passed', () => {
    const onPress = () => {};
    const {container} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable onPress={onPress}>Test</Touchable>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();
});

test('<button> element is rendered when "onPress" prop is passed and trackingEvent', async () => {
    const onPressSpy = jest.fn().mockReturnValue(undefined);
    const logEventSpy = jest.fn(() => Promise.resolve());
    const {container} = render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable onPress={onPressSpy} trackingEvent={trackingEvent}>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test'));

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(1);
    });
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
});

test('<button> element is rendered when "onPress" prop is passed and multiple trackingEvent', async () => {
    const onPressSpy = jest.fn().mockReturnValue(undefined);
    const logEventSpy = jest.fn(() => Promise.resolve());
    const {container} = render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable onPress={onPressSpy} trackingEvent={[trackingEvent, trackingEvent]}>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test'));

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(2);
    });
    expect(logEventSpy.mock.calls).toEqual([[trackingEvent], [trackingEvent]]);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
});

test('<a> component has click-like behaviour on "space" key press', async () => {
    const redirectSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    const href = 'href';

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Touchable href={href} newTab trackingEvent={trackingEvent}>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByText(/Test/);

    fireEvent.keyDown(anchor, {key: 'Space', keyCode: 32});

    await waitFor(() => {
        expect(redirectSpy).toHaveBeenCalledTimes(1);
    });
});

test('<Link> component has click-like behaviour on "space" key press', async () => {
    const to = '/to';

    render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Routes>
                    <Route path="/" element={<Touchable to={to}>Test</Touchable>} />
                    <Route path={to} element={<div>test click</div>} />
                </Routes>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'Test'});

    fireEvent.keyDown(anchor, {key: 'Space', keyCode: 32});

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
