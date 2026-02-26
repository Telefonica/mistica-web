# Mistica Web

React component library for Telefonica's Design System.

**Package manager**: `yarn`

**Tooling**: yarn storybook (components live doc), yarn playroom (prototyping tool)

**Critical rules**:

- NEVER import `@vanilla-extract/css` in `.tsx` files (only in `.css.ts`)
- NEVER import `**/sprinkles.css` in `.tsx` files
- Always namespace React hooks: `React.useState`, `React.useEffect`
- Wrap unit tests with `ThemeContextProvider` + `makeTheme()`
- Prefer semantic queries (`getByRole`, `getByLabelText`) over `getByTestId`

**Conventions**: `type` over `interface`, `export type` for types, `'use client';` for client components
