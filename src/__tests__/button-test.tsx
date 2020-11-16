import * as React from 'react';
import {ThemeVariant} from '../theme-variant-context';
import {ButtonPrimary, ButtonSecondary} from '../button';
import * as Spinner from '../spinner';
import {render} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

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
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
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
            form=""
            role="button"
            type="submit"
          >
            <div
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
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
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
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
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
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
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
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
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
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
              class="content"
            >
              <div
                aria-hidden="true"
                class="textContent"
              >
                test
              </div>
              <div
                class="loadingContent"
              >
                (Spinner color=currentcolor)
              </div>
            </div>
          </button>
          <button
            class="touchable button light isLoading"
            disabled=""
            role="button"
            type="button"
          >
            <div
              class="content"
            >
              <div
                aria-hidden="true"
                class="textContent"
              >
                test
              </div>
              <div
                class="loadingContent"
              >
                (Spinner color=currentcolor)
              </div>
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
              class="content"
            >
              <div
                class="textContent"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
            </div>
          </a>
        </DocumentFragment>
    `);
});
