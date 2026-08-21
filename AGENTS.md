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

- If you create a new component always create a snippet for playroom;
- If you add props to a component always update stories accordingly and add the new props to args and
  argTypes;
- storybook should use as much mística components as possible to showcase. i.e:
  - if a button is needed to control/showcase things, use a mística button itself.
  - if a text is needed, use a mística text component instead of a native html element, like
    `<Text2 regular>text</Text2>`
- make sure `yarn ts-check`, `yarn lint` and `yarn circular-dependencies` pass when modifying them. You
  probably need to cycle several time to really make sure you've fixed everything
- Before you claim a component works or matches its spec, drive it in the browser that CI uses:
  `yarn browse <story-id> --click <selector> --measure <selector> --shot <selector>`. It reports runtime
  errors too. Read [agents/skills/run-in-browser](./agents/skills/run-in-browser/SKILL.md) before you use it.

---

## Conventions

- Read [CONTRIBUTING](./CONTRIBUTING.md) before creating a PR or contributing to Mistica repo;
- The skills for agents live in [agents/skills/](./agents/README.md). Every tool-specific path is a symlink
  into that directory;
- Always add the `AI` label to PRs where the code was written by an AI agent.
- AI-derived local context (spec caches, working notes) stays a git-ignored, uncommitted cache: the canonical
  source always lives elsewhere. Prefer the tool's own memory when it has one, and always also write the file,
  so a tool without memory keeps a readable fallback.
