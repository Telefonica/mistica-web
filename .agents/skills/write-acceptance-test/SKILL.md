---
name: write-acceptance-test
description: >
  Write or repair tests for the mistica-web library source (the @telefonica/mistica package repository) — unit
  tests, Puppeteer-driven acceptance tests against Storybook, screenshot tests, SSR tests, or type tests under
  src/**/__tests__, __acceptance_tests__, __screenshot_tests__, and __type_tests__. This is the
  develop-the-library hat. Do NOT use it for testing an application that merely consumes the published
  @telefonica/mistica package; that downstream case is covered by the mistica-react skill and doc/testing.md.
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
  internal: true
---

# Write tests for the library source

Use this skill when authoring or fixing tests **inside** the `mistica-web` repository. If you are testing a
separate app that consumes the published `@telefonica/mistica` package, this does not apply — use the
`mistica-react` skill, whose documentation covers the consumer testing surface.

## Read first

Read `doc-internal/testing-internals.md` before writing tests. It is the contributor reference for the suites,
the per-concern Jest configuration, and the run commands. It is not shipped to consumers.

## When to apply

- Adding or repairing unit tests (`__tests__/`, `yarn test`).
- Adding or repairing acceptance tests (`__acceptance_tests__/`, `yarn test-acceptance` against a running
  Storybook).
- Updating screenshot tests (`__screenshot_tests__/`) when visual states change.
- Adjusting type tests (`__type_tests__/`); run `yarn build` first so declarations exist.

## Rules

- Wrap every rendered tree in a `ThemeContextProvider` with a theme from `makeTheme()`.
- Prefer semantic queries (`getByRole`, `getByLabelText`) over `getByTestId`.
- Never use mocks outside test files.

## Evaluating skill or package changes

To measure a change to the consumer skill or to the package as it affects generated UIs, follow the A/B
methodology in the root `TESTING-MISTICA-SKILL.md`. That is a contributor methodology and is not part of the
published package.
