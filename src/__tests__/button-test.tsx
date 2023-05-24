import * as React from 'react';
import {ButtonDanger, ButtonLink, ButtonPrimary, ButtonSecondary} from '../button';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import IconPhotoCameraRegular from '../generated/mistica-icons/icon-photo-camera-regular';

import type {TouchableElement} from '../touchable';

test('button is accesible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}} loadingText="Hello2">
                Hello
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'Hello'})).toBeInTheDocument();
});

test('"to" uses a Link Component', () => {
    const Link = () => '(Link Component)' as any;

    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <ButtonPrimary to="/test">test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          (Link Component)
        </DocumentFragment>
    `);
});

test('<a> is rendered when using "to" prop', () => {
    const to = '/test';
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary to={to}>test</ButtonPrimary>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('button', {name: 'test'});

    expect(anchor).toHaveAttribute('href', to);
});

test('buttons can track events', async () => {
    const logEventSpy = jest.fn();
    const trackingEvent = {
        category: 'someCategory',
        action: 'someAction',
        label: 'someLabel',
    };

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <ButtonPrimary trackingEvent={trackingEvent} href="#test">
                button with href
            </ButtonPrimary>
            <ButtonPrimary trackingEvent={trackingEvent} to="#test">
                button with to
            </ButtonPrimary>
            <ButtonPrimary trackingEvent={trackingEvent} onPress={() => {}}>
                button with onPress
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    const hrefButton = await screen.findByRole('button', {name: 'button with href'});
    const toButton = await screen.findByRole('button', {name: 'button with to'});
    const onPressButton = await screen.findByRole('button', {name: 'button with onPress'});

    await userEvent.click(hrefButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(toButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    await userEvent.click(onPressButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(3);
});

test('buttons track default events', async () => {
    const logEventSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <ButtonPrimary href="#test">no track</ButtonPrimary>
            <ButtonPrimary trackEvent href="#test">
                primary
            </ButtonPrimary>
            <ButtonSecondary trackEvent to="#test">
                secondary
            </ButtonSecondary>
            <ButtonDanger trackEvent onPress={() => {}}>
                danger
            </ButtonDanger>
            <ButtonPrimary trackEvent onPress={() => {}}>
                <IconPhotoCameraRegular color="currentColor" />
                Take a photo
            </ButtonPrimary>
            <ButtonLink href="#">no track link</ButtonLink>
            <ButtonLink trackEvent href="#">
                link
            </ButtonLink>
        </ThemeContextProvider>
    );

    const noTrackButton = await screen.findByRole('button', {name: 'no track'});
    const primaryButton = await screen.findByRole('button', {name: 'primary'});
    const secondaryButton = await screen.findByRole('button', {name: 'secondary'});
    const dangerButton = await screen.findByRole('button', {name: 'danger'});
    const buttonWithIcon = await screen.findByRole('button', {name: 'Take a photo'});
    const noTrackLink = await screen.findByRole('link', {name: 'no track link'});
    const link = await screen.findByRole('link', {name: 'link'});

    await userEvent.click(noTrackButton);
    await userEvent.click(noTrackLink);
    expect(logEventSpy).not.toHaveBeenCalled();

    await userEvent.click(primaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'primary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(secondaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'secondary_button_tapped',
        label: 'secondary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    await userEvent.click(dangerButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'danger_button_tapped',
        label: 'danger',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(3);

    await userEvent.click(buttonWithIcon);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'Take a photo',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(4);

    await userEvent.click(link);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'link_tapped',
        label: 'link',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(5);
});

test('Button ref', () => {
    const TestComponent = () => {
        const refOnPress = React.useRef<TouchableElement>(null);
        const refHref = React.useRef<TouchableElement>(null);
        const refTo = React.useRef<TouchableElement>(null);

        React.useEffect(() => {
            expect(refOnPress.current?.tagName).toBe('BUTTON');
            expect(refOnPress.current?.textContent).toBe('onPress');

            expect(refHref.current?.tagName).toBe('A');
            expect(refHref.current?.textContent).toBe('href');

            expect(refTo.current?.tagName).toBe('A');
            expect(refTo.current?.textContent).toBe('to');
        });

        return (
            <ThemeContextProvider theme={makeTheme()}>
                <ButtonPrimary ref={refOnPress} onPress={() => {}}>
                    onPress
                </ButtonPrimary>

                <ButtonSecondary ref={refHref} href="/">
                    href
                </ButtonSecondary>

                <ButtonDanger ref={refTo} to="/">
                    to
                </ButtonDanger>
            </ThemeContextProvider>
        );
    };

    render(<TestComponent />);
});
