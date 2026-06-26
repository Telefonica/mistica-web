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

- Read [CONTRIBUTING](./CONTRIBUTING.md) before creating a PR or contributing to Mistica repo.
- Always add the `AI` label to PRs where the code was written by an AI agent.

# Documentation

- **Do NOT read all docs upfront**
- When working on a task, use this map to find and read only the docs relevant to your task:

```
doc
├── analytics.md              # event tracking and analytics props
├── components.md             # component catalog and usage (read .d.ts for props)
├── design-tokens.md          # skinVars tokens, colors, skin/color-scheme rules
├── fonts.md                  # font setup and loading
├── forms.md                  # form example, form fields, validation
├── images
│   └── layout                # layout diagrams and SVG assets referenced by layout.md
├── layout.md                 # Box, Stack, Inline, grid, responsive layout
├── llms
│   ├── agents
│   │   └── figma-verifier.md # Figma verifier agent instructions
│   ├── commits               # commit message guidance
│   ├── figma-mcp.md          # Figma MCP workflow
│   └── llms.md               # main entry point, critical rules, doc index
├── lottie.md                 # optimizing bundle size with Lottie animations
├── migration-guide.md        # migration guide for the new Cards ecosystem (16.x)
├── patterns.md               # page composition patterns and best practices
├── sheet.md                  # Sheet modal component and predefined sheets
├── testing.md                # unit/visual test setup and conventions
├── texts.md                  # customizing default component texts via theme
└── theme-config.md           # ThemeContextProvider and ThemeConfig options
```
