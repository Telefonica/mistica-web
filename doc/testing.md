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

## Acceptance and screenshot tests

Install Chromium with `yarn playwright install chromium`. Run `yarn test-acceptance` to start Storybook and
run the tests. Use `--headed` to see the browser or `--ui` to open Playwright's test explorer.

`openStoryPage` adds `acceptance-test` to the user agent so `isRunningAcceptanceTest` returns true.

Screenshot differences are saved under `reports/playwright/`. To update the reference images, use the
`update_screenshots` workflow or run the following commands in the Playwright container used by CI.

```sh
yarn storybook-static
CI=true yarn test-acceptance --update-snapshots
```

## Server rendering

`yarn test-ssr` builds the library and checks the server-rendered pages before and after hydration. Run
`NO_BUILD=true yarn test-ssr` to reuse the output of `yarn build`.

## Questions?

Don't hesistate to ask at
[Mistica Teams Channel](https://teams.microsoft.com/l/channel/19%3ad2e3607a32ec411b8bf492f43cd0fe0c%40thread.tacv2/General?groupId=e265fe99-929f-45d1-8154-699649674a40&tenantId=9744600e-3e04-492e-baa1-25ec245c6f10)
