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
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary to="/test">test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable_touchable__mhti6u1 touchable__mhti6u0 sprinkles_display_block__1y2v1nf4x sprinkles_border_none__1y2v1nf8n sprinkles_cursor_pointer__1y2v1nf8t button light"
            href="/test"
            role="button"
          >
            <div
              class="textContent"
            >
              <div
                class="text_text__splu5g7 text_withWordBreak__splu5g5 text_truncateToOneLine__splu5g9 text_truncate__splu5g8"
                style="--mobileSize__splu5g0: 1.000rem; --mobileLineHeight__splu5g2: 1.500rem; --desktopSize__splu5g1: 1.125rem; --desktopLineHeight__splu5g3: 1.500rem; --lineClamp__splu5g4: 1; margin: 0px; font-weight: 500; text-transform: inherit; text-decoration: inherit; overflow-wrap: anywhere;"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.250rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.250rem; height: 1.250rem;"
              />
            </div>
          </a>
        </DocumentFragment>
    `);
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

    userEvent.click(hrefButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    userEvent.click(toButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    userEvent.click(onPressButton);
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

    userEvent.click(noTrackButton);
    userEvent.click(noTrackLink);
    expect(logEventSpy).not.toHaveBeenCalled();

    userEvent.click(primaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'primary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    userEvent.click(secondaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'secondary_button_tapped',
        label: 'secondary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    userEvent.click(dangerButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'danger_button_tapped',
        label: 'danger',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(3);

    userEvent.click(buttonWithIcon);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'Take a photo',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(4);

    userEvent.click(link);
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
