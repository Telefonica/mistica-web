# Testing notes

## Environment variables

Our code uses the NODE_ENV var to define code blocks that should be executed in specific environments, like
`'test'` or `'production'`.

For example:

```js
if (process.env.NODE_ENV !== 'test') {
  // this will only be executed if not inside a test
}
```

Make sure your bundler (webpack, rollup, parcel, etc) makes the correct substitutions and the minifier
effectively removes unused code.

## Unit tests

Unit tests usually don't require CSS because they test component functionality. Some Mistica components have
different layouts in mobile and desktop, and there are cases in which we use CSS styles to achieve this
result. If you are trying to test something that depends on these styles, you can either import `mistica.css`
classes in the HTML content you render in the test or write acceptance/screenshot tests instead.

## Acceptance tests

Browser tests use Jest with Playwright's Chromium. Install the browser once after installing dependencies:

```sh
yarn playwright install chromium
yarn test-acceptance
```

On Linux, use `yarn playwright install --with-deps chromium` to install the system dependencies too.
`yarn test-acceptance --ui` opens a visible browser. Jest options still work, for example
`yarn test-acceptance --runInBand --testPathPattern=button-screenshot`.

The test environment starts Storybook automatically, or reuses a running local Storybook on port 6006. With
`CI=true`, it serves the static build instead; run `yarn storybook-static` first. SSR tests use
`yarn test-ssr` after `yarn compile` and check for console warnings and visual differences between server
rendering and hydration.

Each page gets an isolated browser context. `openStoryPage` configures the viewport, touch support, user
agent, color scheme and safe area overrides. Queries in `screen` and `within` return Playwright locators. Use
their native methods such as `fill`, `pressSequentially`, `selectOption` and `setInputFiles`.

Screenshot assertions still use `jest-image-snapshot`, including the existing filenames and SSIM options.
Generate reference images in the official `mcr.microsoft.com/playwright:v1.64.1-noble` container, matching CI.
Update the container tag and the pinned Playwright dependencies together when upgrading Chromium:

```sh
yarn storybook-static
CI=true yarn test-acceptance -u --ci
```

The `update_screenshots` workflow runs the same command. Browser or OS upgrades require reviewing the updated
references; do not replace Linux references with screenshots taken on macOS or Windows.

To change some behaviors to facilitate acceptance tests (tests that run in a browser), a helper function is
used.

`isRunningAcceptanceTest` returns true if the user agent includes the `'acceptance-test'` string.

To make this work in your test environment, you should add that string to the browser's user agent. For
example in Playwright:

```js
const context = await browser.newContext({userAgent: `${currentUserAgent} acceptance-test`});
```

## Accessibility audits

The Playwright migration preserves the previous axe-core 4.7.2 audit engine. Both the Playwright adapter and
its axe-core dependency are pinned in `package.json`; the browser version is independent of these pins.
Upgrade the audit engine separately and review newly enabled rules before updating its version.

An audit with axe-core 4.14.0 reported 83 `label-content-name-mismatch` violations across 17 existing stories
and their skins. That release enables this previously experimental rule by default. These findings remain
unresolved; retaining the previous engine does not fix them. See the
[4.14 rule documentation](https://dequeuniversity.com/rules/axe/4.14/label-content-name-mismatch) when
addressing the visible labels and accessible names.

## Questions?

Don't hesistate to ask at
[Mistica Teams Channel](https://teams.microsoft.com/l/channel/19%3ad2e3607a32ec411b8bf492f43cd0fe0c%40thread.tacv2/General?groupId=e265fe99-929f-45d1-8154-699649674a40&tenantId=9744600e-3e04-492e-baa1-25ec245c6f10)
