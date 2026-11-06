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

`yarn test` runs the React unit suite with Jest. The next PR in the migration stack moves these tests to
Playwright Test and removes Jest. Browser, screenshot and SSR tests already use Playwright Test directly.
Install Chromium with `yarn playwright install chromium`, or `yarn playwright install --with-deps chromium` on
Linux.

## Acceptance and screenshot tests

```sh
yarn test-acceptance
yarn test-acceptance button-screenshot --workers=1
yarn test-acceptance --headed
```

The runner starts Storybook automatically, or reuses a local instance on port 6006. With `CI=true`, it serves
the static build instead; run `yarn storybook-static` first. `--ui` opens Playwright's test explorer;
`--headed` displays the browser while tests run.

Each page gets an isolated browser context. `openStoryPage` configures the viewport, touch support, user
agent, color scheme and safe area overrides. Queries in `screen` and `within` return Playwright locators. Use
their native methods such as `fill`, `pressSequentially`, `selectOption` and `setInputFiles`.

Screenshot assertions use Playwright's pixel comparison and retain the existing reference filenames. Normal
test runs never create or update reference images. Review differences in `reports/playwright` or open
`yarn playwright show-report reports/playwright-html`.

Generate reference images in the official `mcr.microsoft.com/playwright:v1.64.1-noble` container, matching CI.
Update the container tag and pinned Playwright dependencies together when upgrading Chromium:

```sh
yarn storybook-static
CI=true yarn test-acceptance --update-snapshots
```

The `update_screenshots` workflow runs the same command. Browser or OS upgrades require reviewing the updated
references; do not replace Linux references with screenshots taken on macOS or Windows.

`isRunningAcceptanceTest` returns true when the user agent includes `acceptance-test`. `openStoryPage` adds
this marker automatically.

## Server rendering

`yarn test-ssr` builds the server-rendered examples and compares their appearance before and after hydration.
It also checks browser console output. After `yarn build`, use `NO_BUILD=true yarn test-ssr` to reuse the
compiled library. Hydration baselines are temporary files under `reports`, not committed reference images.

## Accessibility audits

Accessibility audits use `@axe-core/playwright`. Run `yarn audit-accessibility` after building Storybook. The
`label-content-name-mismatch` rule is enabled: visible labels must be included in accessible names, including
in Storybook examples. Keep labels meaningful instead of using `aria-label` as a test selector.

## Questions?

Don't hesistate to ask at
[Mistica Teams Channel](https://teams.microsoft.com/l/channel/19%3ad2e3607a32ec411b8bf492f43cd0fe0c%40thread.tacv2/General?groupId=e265fe99-929f-45d1-8154-699649674a40&tenantId=9744600e-3e04-492e-baa1-25ec245c6f10)
