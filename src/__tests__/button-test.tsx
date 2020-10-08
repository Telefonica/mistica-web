import * as React from 'react';
import {ThemeVariant} from '../theme-variant-context';
import {ButtonPrimary, ButtonSecondary} from '../button';
import * as Spinner from '../spinner';
import {render} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {overrideTheme} from './test-utils';

test('fake button', () => {
    const {asFragment} = render(<ButtonPrimary fake>test</ButtonPrimary>);

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            aria-hidden="true"
            class="touchable-0-2-9 button-0-2-1 light-0-2-7 notTouchable-0-2-10"
            role="presentation"
            style="cursor: pointer;"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
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
    const {asFragment} = render(<ButtonPrimary submit>test</ButtonPrimary>);

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="touchable-0-2-9 button-0-2-1 light-0-2-7"
            role="button"
            type="submit"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
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
    const {asFragment} = render(<ButtonPrimary onPress={() => {}}>test</ButtonPrimary>);

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="touchable-0-2-9 button-0-2-1 light-0-2-7"
            role="button"
            type="button"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
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
    const {asFragment} = render(<ButtonPrimary href="/test">test</ButtonPrimary>);

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable-0-2-9 button-0-2-1 light-0-2-7"
            href="/test"
            role="button"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
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
        <ButtonPrimary href="/test" newTab>
            test
        </ButtonPrimary>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable-0-2-9 button-0-2-1 light-0-2-7"
            href="/test"
            rel="noopener noreferrer"
            role="button"
            target="_blank"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
              >
                <div
                  style="display: inline-block; width: 24px; height: 24px;"
                />
              </div>
            </div>
            <span
              class="screenReaderOnly-0-2-11"
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
        <ThemeContextProvider theme={overrideTheme({Link})}>
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
    const {asFragment} = render(<ButtonPrimary to="/test">test</ButtonPrimary>);

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable-0-2-9 button-0-2-1 light-0-2-7"
            href="/test"
            role="button"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
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
        <>
            <ButtonPrimary onPress={() => {}} showSpinner>
                test
            </ButtonPrimary>
            <ButtonSecondary onPress={() => {}} showSpinner>
                test
            </ButtonSecondary>
        </>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="touchable-0-2-9 button-0-2-1 light-0-2-7 isLoading-0-2-6"
            disabled=""
            role="button"
            type="button"
          >
            <div
              class="content-0-2-3"
            >
              <div
                aria-hidden="true"
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                class="loadingContent-0-2-4"
              >
                (Spinner color=currentcolor)
              </div>
            </div>
          </button>
          <button
            class="touchable-0-2-9 button-0-2-12 light-0-2-18 isLoading-0-2-17"
            disabled=""
            role="button"
            type="button"
          >
            <div
              class="content-0-2-14"
            >
              <div
                aria-hidden="true"
                class="textContent-0-2-16"
              >
                test
              </div>
              <div
                class="loadingContent-0-2-15"
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
        <ThemeVariant isInverse>
            <ButtonPrimary href="/test">test</ButtonPrimary>
        </ThemeVariant>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <a
            class="touchable-0-2-9 button-0-2-1 inverse-0-2-8"
            href="/test"
            role="button"
          >
            <div
              class="content-0-2-3"
            >
              <div
                class="textContent-0-2-5"
              >
                test
              </div>
              <div
                aria-hidden="true"
                class="loadingContent-0-2-4"
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
