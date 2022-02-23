import * as React from 'react';
import {ThemeVariant} from '../theme-variant-context';
import {ButtonDanger, ButtonPrimary, ButtonSecondary} from '../button';
import * as Spinner from '../spinner';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import IconPhotoCameraRegular from '../generated/mistica-icons/icon-photo-camera-regular';

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

test('fake button', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary fake>test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            aria-hidden="true"
            class="touchable button light notTouchable"
            role="presentation"
            style="cursor: pointer;"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
              />
            </div>
          </div>
        </DocumentFragment>
    `);
});

test('submit button', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary submit>test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="touchable button light"
            role="button"
            type="submit"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
              />
            </div>
          </button>
        </DocumentFragment>
    `);
});

test('<button> is rendered when using "onPress" prop', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}}>test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="touchable button light"
            role="button"
            type="button"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
              />
            </div>
          </button>
        </DocumentFragment>
    `);
});

test('<a> is rendered when using "href" prop', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary href="/test">test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable button light"
            href="/test"
            role="button"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
              />
            </div>
          </a>
        </DocumentFragment>
    `);
});

test('"href" with "newTab" renders required attributes', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary href="/test" newTab>
                test
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable button light"
            href="/test"
            rel="noopener noreferrer"
            role="button"
            target="_blank"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
              />
            </div>
            <span
              class="screenReaderOnly"
            >
              Se abre en ventana nueva
            </span>
          </a>
        </DocumentFragment>
    `);
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
            class="touchable button light"
            href="/test"
            role="button"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
              />
            </div>
          </a>
        </DocumentFragment>
    `);
});

test('button with spinner', () => {
    jest.spyOn(Spinner, 'default').mockImplementation(({color}) => `(Spinner color=${color})` as any);

    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}} showSpinner>
                test
            </ButtonPrimary>
            <ButtonSecondary onPress={() => {}} showSpinner>
                test
            </ButtonSecondary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="touchable button light isLoading"
            disabled=""
            role="button"
            type="button"
          >
            <div
              aria-hidden="true"
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              class="loadingContent"
            >
              (Spinner color=currentcolor)
            </div>
          </button>
          <button
            class="touchable button light isLoading"
            disabled=""
            role="button"
            type="button"
          >
            <div
              aria-hidden="true"
              class="textContent"
            >
              <div
                class="text text-d6 truncate truncate-d8"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              class="loadingContent"
            >
              (Spinner color=currentcolor)
            </div>
          </button>
        </DocumentFragment>
    `);
});

test('dark theme', () => {
    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <ThemeVariant isInverse>
                <ButtonPrimary href="/test">test</ButtonPrimary>
            </ThemeVariant>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable button inverse"
            href="/test"
            role="button"
          >
            <div
              class="textContent"
            >
              <div
                class="text text-d0 truncate truncate-d2"
              >
                test
              </div>
            </div>
            <div
              aria-hidden="true"
              class="loadingFiller"
              style="padding-left: 1.500rem; padding-right: 37px;"
            />
            <div
              aria-hidden="true"
              class="loadingContent"
            >
              <div
                style="display: inline-block; width: 1.500rem; height: 1.500rem;"
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
        </ThemeContextProvider>
    );

    const noTrackButton = await screen.findByRole('button', {name: 'no track'});
    const primaryButton = await screen.findByRole('button', {name: 'primary'});
    const secondaryButton = await screen.findByRole('button', {name: 'secondary'});
    const dangerButton = await screen.findByRole('button', {name: 'danger'});
    const buttonWithIcon = await screen.findByRole('button', {name: 'Take a photo'});

    userEvent.click(noTrackButton);
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
});
