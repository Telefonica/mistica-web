# Mistica Web

React component library for Telefonica's Design System.

## You are developing the library, not consuming it

This repository is the **source** of the `@telefonica/mistica` package. When you work here you are authoring
the library itself. Read the contributor documentation under `doc-internal/`:

- [`doc-internal/architecture.md`](./doc-internal/architecture.md) — source layout, styling model, authoring
  conventions.
- [`doc-internal/testing-internals.md`](./doc-internal/testing-internals.md) — test suites, Jest
  configuration, run commands.
- [`doc-internal/release-process.md`](./doc-internal/release-process.md) — release flow and what ships in the
  tarball.

Do **NOT** follow the consumer guide `doc/llms/llms.md` for authoring tasks. The `doc/` tree and the
`published-skills/mistica-react` skill describe how a downstream app _uses_ the published package; they are
the consumer surface and do not apply when editing this source. The develop-the-library skills live under
`.agents/skills/` and load automatically in this workspace.

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

## Conventions

- Read [CONTRIBUTING](./CONTRIBUTING.md) before creating a PR or contributing to Mistica repo;
- Always add the `AI` label to PRs where the code was written by an AI agent.

# Documentation

- **Do NOT read all docs upfront**
- When working on a task, use this map to find and read only the docs relevant to your task.

For library development (authoring this source), the internal docs are the primary reference:

```
doc-internal
├── architecture.md           # source layout, styling model, authoring conventions
├── release-process.md        # release flow and what ships in the tarball
└── testing-internals.md      # test suites, Jest configuration, run commands
```

The `doc/` tree is the consumer surface (how a downstream app uses the published package):

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
