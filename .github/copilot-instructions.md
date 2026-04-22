# GitHub Copilot instructions — @telefonica/mistica

This repository is the **Mistica** React component library for Telefónica's Design System.

## If you're contributing to this library

Read [AGENTS.md](../AGENTS.md) — it contains the complete contributor guide with code templates, critical
rules, and verification commands for every task (new component, add prop, check conventions).

**Critical rules (never break these):**

- `'use client';` must be the first line of every `.tsx` component file
- NEVER import `@vanilla-extract/css` in `.tsx` files — only in `.css.ts` files
- NEVER import `**/sprinkles.css` in `.tsx` files
- Always namespace React hooks: `React.useState`, `React.useEffect`, `React.useRef`
- Use `type` not `interface` for TypeScript types; `export type` for type-only exports
- Colors MUST come from `vars.colors.*` — never hardcode hex or rgb values
- Border radii MUST come from `vars.borderRadii.*` — never hardcode px values for radii
- Always wrap unit tests with `ThemeContextProvider` + `makeTheme()`
- Prefer semantic queries (`getByRole`, `getByLabelText`) over `getByTestId` in tests

**Every new component requires 6 files:** `src/component.tsx`, `src/component.css.ts`,
`src/__stories__/component-story.tsx`, `src/__tests__/component-test.tsx`, a snippet in
`playroom/snippets.tsx`, and an export in `src/index.tsx`.

**Verify with:** `yarn ts-check && yarn lint && yarn test`

## If you're building an app that uses Mistica

The package ships LLM docs at `node_modules/@telefonica/mistica/doc/`. Read:

1. `doc/llms.md` — critical rules and component overview (start here)
2. `doc/patterns.md` — page layout patterns and best practices
3. `doc/components.md` — full component catalog with props
4. `doc/layout.md` — layout primitives and page layouts
5. `doc/design-tokens.md` — skinVars colors, radii, spacing

Key consumer rules:

- NEVER hardcode colors — use `skinVars.colors.*` from `@telefonica/mistica`
- NEVER use raw `<div>` for layout — use `Box`, `Stack`, `Inline`, `ResponsiveLayout`
- NEVER set font sizes manually — use `Text1`–`Text10`, `Title1`–`Title4`
- Always wrap your app with `<ThemeContextProvider>` and import `@telefonica/mistica/css/mistica.css`
