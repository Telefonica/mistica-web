// @flow
import * as React from 'react';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import Touchable from '../touchable';
import {waitFor, fireEvent, render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {overrideTheme} from './utils';

const trackingEvent = {
    category: 'test',
    action: 'test',
    label: 'test',
};

test('Check "Link" component is rendered when "to" prop is passed without tracking', async () => {
    const to = '/to';

    render(
        <MemoryRouter>
            <Touchable to={to}>Test</Touchable>
        </MemoryRouter>
    );

    const anchor = screen.getByText((text, el) => el.textContent === 'Test', {selector: 'a'});

    expect(anchor).toHaveAttribute('href', to);
});

test('Check "Link" component is rendered when "to" prop is passed with tracking', async () => {
    const logEventSpy = jest.fn();

    const to = '/to';

    render(
        <ThemeContextProvider theme={overrideTheme({analytics: {logEvent: logEventSpy}})}>
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Touchable to={to} trackingEvent={trackingEvent}>
                                Test
                            </Touchable>
                        )}
                    />
                    <Route path={to} component={() => <div>test click</div>} />
                </Switch>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByText((text, el) => el.textContent === 'Test', {selector: 'a'});

    fireEvent.click(anchor);

    await waitFor(() => {
        expect(logEventSpy).toHaveBeenCalledTimes(1);
    });
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(screen.getByText('test click')).toBeInTheDocument();
});

test('Check "a" component is rendered when "fullPageOnWebView" and "to" props are passed, inside App', () => {
    const href = 'href';

    render(
        <ThemeContextProvider theme={overrideTheme({platformOverrides: {insideNovumNativeApp: true}})}>
            <Touchable to={href} fullPageOnWebView>
                Test
            </Touchable>
        </ThemeContextProvider>
    );

    const anchor = screen.getByText((text, el) => el.textContent === 'Test', {selector: 'a'});
    expect(anchor).toHaveAttribute('href', href);
});

test('Check "Link" component is rendered when "fullPageOnWebView" and "to" props are passed, outside App', () => {
    const href = 'href';

    render(
        <ThemeContextProvider theme={overrideTheme({platformOverrides: {insideNovumNativeApp: false}})}>
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Touchable to={href} fullPageOnWebView>
                                Test
                            </Touchable>
                        )}
                    />
                </Switch>
            </MemoryRouter>
        </ThemeContextProvider>
    );

    const anchor = screen.getByText((text, el) => el.textContent === 'Test', {selector: 'a'});

    expect(anchor).toHaveAttribute('href', `/${href}`);
});

test('Check "a" component is rendered when "href" prop is passed', () => {
    const href = 'href';
    render(<Touchable href={href}>Test</Touchable>);
    const anchor = screen.getByText((text, el) => el.textContent === 'Test', {selector: 'a'});

    expect(anchor).toHaveAttribute('href', href);
});

test('Check "a" component is rendered when "href" prop is passed and trackingEvents', async () => {
    const href = 'href';
    const logEventSpy = jest.fn(() => Promise.resolve());
    const redirectSpy = jest.spyOn(window, 'open').mockImplementation(() => {});

    render(
        <ThemeContextProvider theme={overrideTheme({analytics: {logEvent: logEventSpy}})}>
            <Touchable data-testid="touchable-events" href={href} newTab trackingEvent={trackingEvent}>
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

test('Check "button" component is rendered when "onPress" prop is passed', () => {
    const onPress = () => {};
    const {container} = render(<Touchable onPress={onPress}>Test</Touchable>);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();
});

test('Check "button" component is rendered when "onPress" prop is passed and trackingEvents', async () => {
    const onPressSpy = jest.fn().mockReturnValue();
    const logEventSpy = jest.fn(() => Promise.resolve());
    const {container} = render(
        <ThemeContextProvider theme={overrideTheme({analytics: {logEvent: logEventSpy}})}>
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

test('Check "a" component has click-like behaviour on "space" key press', async () => {
    const redirectSpy = jest.spyOn(window, 'open').mockImplementation(() => {});
    const href = 'href';

    render(
        <Touchable href={href} newTab trackingEvent={trackingEvent}>
            Test
        </Touchable>
    );

    const anchor = screen.getByText(/Test/);

    fireEvent.keyDown(anchor, {key: 'Space', keyCode: 32});

    await waitFor(() => {
        expect(redirectSpy).toHaveBeenCalledTimes(1);
    });
});

test('Check "Link" component has click-like behaviour on "space" key press', async () => {
    const to = '/to';

    render(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Switch>
                <Route exact path="/" render={() => <Touchable to={to}>Test</Touchable>} />
                <Route path={to} component={() => <div>test click</div>} />
            </Switch>
        </MemoryRouter>
    );

    const anchor = screen.getByText((text, el) => el.textContent === 'Test', {selector: 'a'});

    fireEvent.keyDown(anchor, {key: 'Space', keyCode: 32});

    await waitFor(() => {
        expect(screen.getByText('test click')).toBeInTheDocument();
    });
});
