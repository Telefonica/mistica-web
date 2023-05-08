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
            class="touchable_base__mhti6u1 touchable__mhti6u0 sprinkles_cursor_pointer__1y2v1nfa5 button_variants_primary__rrbrpnl button_button__rrbrpn2 button__rrbrpn1 sprinkles_paddingTop_0__1y2v1nf6d sprinkles_paddingBottom_0__1y2v1nf6r sprinkles_paddingLeft_0__1y2v1nf75 sprinkles_paddingRight_0__1y2v1nf7j sprinkles_display_inline-block__1y2v1nf5u sprinkles_position_relative__1y2v1nf5l sprinkles_width_auto__1y2v1nf7y sprinkles_borderRadius_var(--borderRadii-button__1vqcj1i5g)__1y2v1nf9v sprinkles_overflow_hidden__1y2v1nfa6 button__rrbrpna sprinkles_color_var(--colors-textButtonPrimary__1vqcj1i1w)__1y2v1nf1w sprinkles_background_var(--colors-buttonPrimaryBackground__1vqcj1io)__1y2v1nf3g"
            data-component-name="ButtonPrimary"
            href="/test"
            role="button"
          >
            <div
              class="button_textContent__rrbrpn9 button__rrbrpn8 sprinkles_display_flex__1y2v1nf5q sprinkles_alignItems_center__1y2v1nf65 sprinkles_justifyContent_center__1y2v1nf5z"
            >
              <div
                class="text_text__splu5g7 text_withWordBreak__splu5g5 text_truncateToOneLine__splu5g9 text_truncate__splu5g8"
                data-component-name="Text3"
                style="--mobileSize__splu5g0: 1.000rem; --mobileLineHeight__splu5g2: 1.500rem; --desktopSize__splu5g1: 1.125rem; --desktopLineHeight__splu5g3: 1.500rem; --lineClamp__splu5g4: 1; font-weight: 500; text-transform: inherit; text-decoration: inherit; overflow-wrap: anywhere;"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="button_loadingFiller__rrbrpn4 button__rrbrpn3 sprinkles_display_block__1y2v1nf5s sprinkles_height_0__1y2v1nf8e sprinkles_overflow_hidden__1y2v1nfa6"
              style="padding-left: 1.250rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="button_loadingContent__rrbrpn7 button__rrbrpn6 sprinkles_display_inline-flex__1y2v1nf5r sprinkles_position_absolute__1y2v1nf5m sprinkles_top_0__1y2v1nfa8 sprinkles_bottom_0__1y2v1nfbe sprinkles_justifyContent_center__1y2v1nf5z sprinkles_alignItems_center__1y2v1nf65"
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
