> **Internal contributor doc.** This file is for people authoring the `@telefonica/mistica` library source. It
> is **NOT** shipped to consumers of the published package and must never be linked from a consumer-facing
> skill or from `doc/`.

# Library architecture

This document describes how the `mistica-web` source is organised so that a contributor can place new code
correctly. For how to _consume_ the published package, see `doc/llms/llms.md` instead — that is the consumer
surface and is irrelevant to authoring tasks.

## Source layout

- `src/` — component sources, organised one folder or file per public component.
- `src/generated/` — generated assets (icons, tokens). Never edit by hand; regenerate instead.
- `src/**/__tests__/`, `__acceptance_tests__/`, `__screenshot_tests__/`, `__type_tests__/` — test suites
  colocated with the code under test. See `doc-internal/testing-internals.md`.
- `src/**/__stories__/`, `__private_stories__/` — Storybook stories that document each component.

## Styling model

Mistica styles are authored with [vanilla-extract](https://vanilla-extract.style/). Two rules are absolute and
enforced in review:

- **Never** import `@vanilla-extract/css` from a `.tsx` file. Style definitions live only in `.css.ts` files.
- **Never** import `**/sprinkles.css` from a `.tsx` file.

Runtime theming is exposed through `skinVars` design tokens. Components must read colours, spacing, and
typography from tokens rather than hardcoding values, so that every brand skin renders correctly from a single
implementation. Token semantics are documented for consumers in `doc/design-tokens.md`.

## Component authoring conventions

- Prefer `type` over `interface`; export public types with `export type`.
- Client components start with the `'use client';` directive.
- Always namespace React hooks: `React.useState`, `React.useEffect`.
- Every new component ships with a Playroom snippet and Storybook stories. When props change, update the
  stories `args` and `argTypes` accordingly.

## Build outputs

The published package is produced by `yarn build` into three trees, all listed in the `package.json` `files`
allowlist:

- `dist/` — CommonJS build (`main`).
- `dist-es/` — ES module build (`module`).
- `css/` — extracted static CSS.

Consumer documentation in `doc/` is also shipped. Contributor material — `.agents/`, `published-skills/`, and
this `doc-internal/` tree — is deliberately excluded from the tarball. See `doc-internal/release-process.md`.
