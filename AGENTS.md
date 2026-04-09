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

**Components**:

- If you create a new component always create a snippet for playroom.
- If you add props to a component always update stories accordingly and add the new props to args and
  argTypes.

---

## GitHub conventions

- PR title follows **conventional commits** format; the scope must be the affected **component name** (e.g.
  `fix(TextField): ...`).
- PR description: concise summary of the problem and fix, ending with `Ref: <TICKET-ID>` (if there's a jira
  ticket).
- Always add reviewers `aweell`, `atabel`, `yceballost` and `Marcosld` to every PR.
- Always add the `AI` label to PRs where the code was written by an AI agent.
