---
name: author-component
description: >
  Author or modify a component INSIDE the mistica-web library source (the @telefonica/mistica package
  repository). Use when editing files under src/, adding a new component with its stories and Playroom
  snippet, changing component props, or working with vanilla-extract .css.ts styles and skinVars tokens in
  this repository. This is the develop-the-library hat. Do NOT use it when merely consuming the published
  @telefonica/mistica package in a downstream app — that is the mistica-react skill's job.
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
  internal: true
---

# Author a Mistica component

Use this skill when you are working **on** the `mistica-web` source — the repository that builds and publishes
`@telefonica/mistica`. If instead you are building a UI in a separate application that _depends on_ the
published package, stop and use the `mistica-react` skill; nothing here applies to that case.

## When to apply

- Adding a new component under `src/`, or modifying an existing one.
- Changing a component's props, and therefore its Storybook `args` / `argTypes`.
- Editing styles in `.css.ts` files or wiring `skinVars` design tokens.
- Any task that changes the library's published surface.

## Read first

Before writing code, read `doc-internal/architecture.md`. It defines the source layout, the styling model, and
the authoring conventions this skill depends on. That file — and everything under `doc-internal/` — is
contributor-only and is not part of the published package.

## Non-negotiable rules

- Never import `@vanilla-extract/css` or `**/sprinkles.css` from a `.tsx` file; styles live in `.css.ts`.
- Namespace React hooks: `React.useState`, `React.useEffect`.
- Prefer `type` over `interface`; export types with `export type`; mark client components with
  `'use client';`.
- A new component ships with a Playroom snippet and Storybook stories. When props change, update the stories
  accordingly.

## Tests

A component change is not complete without tests. For the suites, Jest configuration, and the
`ThemeContextProvider` + `makeTheme()` requirement, see the `write-acceptance-test` skill and
`doc-internal/testing-internals.md`.
