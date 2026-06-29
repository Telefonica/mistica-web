> **Internal contributor doc.** This file is for people authoring the `@telefonica/mistica` library source. It
> is **NOT** shipped to consumers of the published package and must never be linked from a consumer-facing
> skill or from `doc/`.

# Testing the library source

This is the contributor view of testing the `mistica-web` source. It is distinct from the consumer-facing
`doc/testing.md`, which explains how an application that _uses_ Mistica sets up its own tests. When authoring
or repairing library tests, follow this document.

## Test suites

Tests are colocated with the code under test, grouped by suite directory:

- `__tests__/` — unit tests, run with Jest (`yarn test`). Wrap every rendered tree in a `ThemeContextProvider`
  with a theme built by `makeTheme()`; a component rendered without a theme will throw. Prefer semantic
  queries (`getByRole`, `getByLabelText`) over `getByTestId`.
- `__acceptance_tests__/` — end-to-end acceptance tests driven by Puppeteer against a running Storybook. Start
  Storybook first, then run `yarn test-acceptance` (add `--ui` for the interactive runner).
- `__screenshot_tests__/` — visual regression tests captured against Storybook stories.
- `__type_tests__/` — static type assertions; these require generated declarations, so run `yarn build` before
  `yarn ts-check`.

## Jest configuration

The repository splits Jest configuration per concern: `jest.unit.config.js`, `jest.acceptance.config.js`,
`jest.ssr.config.js`, all composed from `jest.base.config.js`. The shared environment is set up in
`setup-test-env.tsx`.

## Conventions

- Never use mocks outside test files.
- A new component is not complete until it has unit coverage and, where it has meaningful visual states, a
  screenshot story.

## Evaluating changes to the consumer skill

Changes to the `published-skills/mistica-react` skill — or to anything that influences how an agent generates
Mistica UIs — are evaluated with the A/B methodology in the root `TESTING-MISTICA-SKILL.md`. That methodology
is a contributor tool and is not shipped to consumers.
