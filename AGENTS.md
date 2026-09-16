# Mística Web

React component library for Telefónica's design system. Package manager: `yarn`.

## Commands

- `yarn storybook` (port 6006) runs the live docs. `yarn playroom` runs the prototyping tool.
- `yarn ts-check`, `yarn lint`, `yarn circular-dependencies`, and `yarn test` must pass. Cycle until all four
  are green: a fix for one check often breaks another.
- `yarn browse <story-id> --click <selector> --measure <selector> --shot <selector>` drives a story in the
  browser that CI uses, and reports runtime errors. Read
  [run-in-browser](./agents/skills/run-in-browser/SKILL.md) before you use it.

## Code

- Import `@vanilla-extract/css` and `sprinkles.css` in `.css.ts` files only. A `.tsx` file imports the
  classes.
- Namespace React hooks: `React.useState`, not `useState`.
- `type` over `interface`, `export type` for types, `'use client';` at the top of a client component.
- Comment only what the code cannot say: a corner case, a non-obvious decision, a workaround. Do not narrate
  the code.
- A todo is one line: `// todo <issue url> <short text>`.
- Unit tests wrap the render in `ThemeContextProvider` with `makeTheme()`, and query by role or label, not by
  test id.

## Keep components simple

Build the most direct solution that meets the spec today. A reviewer rejects each of these unless the PR
states a present-day reason:

- A context between the parts of one component. Pass props, even two levels deep. A context needs user JSX
  between the parts (`Accordion` → `AccordionItem`).
- Recursion when the spec fixes the depth. Render each level explicitly.
- A leaf that decides role, border, or divider from shared state. The parent computes it and passes a prop.
- A validation pass over data that the render already walks. Validate while you render.
- A `utils` module for one caller. Keep the function in the file that uses it.
- A hook, config, or tool that the feature does not need. Ship it in a separate PR.
- Generated assets (icons, tokens, skins) or tooling in a feature PR. One concern per PR.
- Names from the implementation. Name things after the spec: `entries`, `sub menu`.

## Change a component

1. Load the spec with [read-component-specs](./agents/skills/read-component-specs/SKILL.md): the issue, the
   markdown spec, then Figma.
2. Write the code and the unit tests.
3. Update the story. A new prop goes to `args` and `argTypes`. Demo UI uses Mística components, such as
   `Button` and `Text2`, not raw HTML.
4. A new component also gets a playroom snippet.
5. Run the four checks.
6. Before you claim that it works or matches the spec, drive the story with `yarn browse`.

## Pull requests

- Read [CONTRIBUTING](./CONTRIBUTING.md) before you open a PR: title format, `Ref:` line, reviewers, and the
  `AI` label.
- Spec caches and working notes stay a git-ignored cache. Use the tool's own memory when it has one, and also
  write the file so a tool without memory can read it.

Skills live in [agents/skills](./agents/README.md). Every tool-specific path is a symlink into that directory.
