import * as React from 'react';
import {MemoryRouter, Route, Switch, Link} from 'react-router-dom';
import Touchable from '../touchable';
import {waitFor, fireEvent, render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

const trackingEvent = {
    category: 'test',
    action: 'test',
    label: 'test',
};

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
          <style>
            :root {--colors-appBarBackground__1vqcj1i0:#FFFFFF;--colors-background__1vqcj1i1:#FFFFFF;--colors-backgroundContainer__1vqcj1i2:#FFFFFF;--colors-backgroundBrand__1vqcj1i3:#019DF4;--colors-backgroundOverlay__1vqcj1i4:rgba(49,50,53, 0.6);--colors-backgroundSkeleton__1vqcj1i5:#EEEEEE;--colors-backgroundSkeletonInverse__1vqcj1i6:#008EDD;--colors-navigationBarBackground__1vqcj1i9:#019DF4;--colors-backgroundAlternative__1vqcj1i7:#F6F6F6;--colors-backgroundFeedbackBottom__1vqcj1i8:#019DF4;--colors-skeletonWave__1vqcj1ia:#EEEEEE;--colors-borderLight__1vqcj1ic:#F6F6F6;--colors-border__1vqcj1ib:#DDDDDD;--colors-borderDark__1vqcj1id:#86888C;--colors-borderSelected__1vqcj1ie:#019DF4;--colors-buttonDangerBackground__1vqcj1if:#FF374A;--colors-buttonDangerBackgroundSelected__1vqcj1ig:#D73241;--colors-buttonDangerBackgroundHover__1vqcj1ih:#D73241;--colors-buttonLinkBackgroundSelected__1vqcj1ii:#E6F5FD;--colors-buttonLinkBackgroundSelectedInverse__1vqcj1ij:rgba(255,255,255, 0.2);--colors-buttonPrimaryBackground__1vqcj1ik:#019DF4;--colors-buttonPrimaryBackgroundInverse__1vqcj1il:#FFFFFF;--colors-buttonPrimaryBackgroundSelected__1vqcj1im:#008EDD;--colors-buttonPrimaryBackgroundHover__1vqcj1io:#008EDD;--colors-buttonPrimaryBackgroundSelectedInverse__1vqcj1in:#80CEF9;--colors-buttonSecondaryBackground__1vqcj1ip:#019DF4;--colors-buttonSecondaryBackgroundSelected__1vqcj1iq:#008EDD;--colors-buttonSecondaryBorderInverse__1vqcj1ir:#FFFFFF;--colors-buttonSecondaryBorderSelectedInverse__1vqcj1is:#80CEF9;--colors-textButtonPrimary__1vqcj1i1m:#FFFFFF;--colors-textButtonPrimaryInverse__1vqcj1i1n:#019DF4;--colors-textButtonPrimaryInverseSelected__1vqcj1i1o:#019DF4;--colors-textButtonSecondary__1vqcj1i1p:#019DF4;--colors-textButtonSecondarySelected__1vqcj1i1q:#008EDD;--colors-textButtonSecondaryInverse__1vqcj1i1r:#FFFFFF;--colors-textButtonSecondaryInverseSelected__1vqcj1i1s:#FFFFFF;--colors-textLink__1vqcj1i1t:#019DF4;--colors-textLinkInverse__1vqcj1i1u:#FFFFFF;--colors-textLinkDanger__1vqcj1i1v:#FF374A;--colors-textLinkSnackbar__1vqcj1i1w:#80CEF9;--colors-control__1vqcj1it:#DDDDDD;--colors-controlActivated__1vqcj1iu:#019DF4;--colors-controlError__1vqcj1iv:#FF374A;--colors-loadingBar__1vqcj1iw:#80CEF9;--colors-loadingBarBackground__1vqcj1ix:#008EDD;--colors-toggleAndroidInactive__1vqcj1iy:#EEEEEE;--colors-toggleAndroidBackgroundActive__1vqcj1iz:#B3E1FB;--colors-iosControlKnob__1vqcj1i10:#FFFFFF;--colors-divider__1vqcj1i11:#EEEEEE;--colors-dividerInverse__1vqcj1i12:#008EDD;--colors-navigationBarDivider__1vqcj1i13:#019DF4;--colors-badge__1vqcj1i14:#D73241;--colors-feedbackErrorBackground__1vqcj1i15:#FF374A;--colors-feedbackInfoBackground__1vqcj1i16:#313235;--colors-brand__1vqcj1i17:#019DF4;--colors-brandHigh__1vqcj1i18:#008EDD;--colors-inverse__1vqcj1i19:#FFFFFF;--colors-neutralHigh__1vqcj1i1a:#313235;--colors-neutralMedium__1vqcj1i1c:#86888C;--colors-neutralLow__1vqcj1i1b:#F6F6F6;--colors-promo__1vqcj1i1d:#A13EA1;--colors-highlight__1vqcj1i1f:#E63780;--colors-textPrimary__1vqcj1i1i:#313235;--colors-textPrimaryInverse__1vqcj1i1j:#FFFFFF;--colors-textSecondary__1vqcj1i1k:#86888C;--colors-textSecondaryInverse__1vqcj1i1l:#FFFFFF;--colors-error__1vqcj1i1e:#FF374A;--colors-success__1vqcj1i1g:#5CB615;--colors-warning__1vqcj1i1h:#F28D15;--colors-textNavigationBarPrimary__1vqcj1i1x:#FFFFFF;--colors-textNavigationBarSecondary__1vqcj1i1y:#B3E1FB;--colors-textNavigationSearchBarHint__1vqcj1i1z:#B3E1FB;--colors-textNavigationSearchBarText__1vqcj1i20:#FFFFFF;--colors-textAppBar__1vqcj1i21:#999999;--colors-textAppBarSelected__1vqcj1i22:#019DF4;--colors-successLow__1vqcj1i23:#EFF8E8;--colors-warningLow__1vqcj1i24:#FEF4E8;--colors-errorLow__1vqcj1i25:#FFEBED;--colors-promoLow__1vqcj1i26:#F6ECF6;--colors-brandLow__1vqcj1i27:#E6F5FD;--colors-successHigh__1vqcj1i28:#407F0F;--colors-warningHigh__1vqcj1i29:#6D3F09;--colors-errorHigh__1vqcj1i2a:#B22634;--colors-promoHigh__1vqcj1i2b:#712B71}
          </style>
          <a
            class="touchable"
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
                    <Route path={to} component={() => <div>Target route</div>} />
                </Switch>
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
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Touchable to={to} trackingEvent={[trackingEvent, trackingEvent]}>
                                Test
                            </Touchable>
                        )}
                    />
                    <Route path={to} component={() => <div>Target route</div>} />
                </Switch>
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
                <Switch>
                    <Route exact path="/" render={() => <Touchable to={to}>Test</Touchable>} />
                    <Route path={to} component={() => <div>test click</div>} />
                </Switch>
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
