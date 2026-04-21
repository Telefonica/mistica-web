---
name: mistica-contributor
description: >-
  Create, modify, and validate components inside the mistica-web repository — Telefonica's React component
  library. Use this skill when working ON the library itself: creating new components, adding props to
  existing ones, writing stories, tests, or playroom snippets. Triggers when the task involves editing files
  in src/, __stories__/, __tests__/, or playroom/ of the mistica-web repository. Do NOT use for building apps
  that consume @telefonica/mistica — use mistica-react skill for that.
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
---

# Mistica Contributor — Working on the Component Library

This skill teaches you how to build and modify components **inside the mistica-web repository**. For consuming
the library in an app, use the `mistica-react` skill instead.

## Before writing any code

Always read `AGENTS.md` and `doc/contributor-ai.md` from the repo root first. They contain the canonical
templates, import rules, and checklists for every file type.

---

## Component anatomy — 6 files per component

Every component is a bundle of exactly these artefacts:

| File                               | Purpose                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| `src/{name}.tsx`                   | Component logic and JSX                                                       |
| `src/{name}.css.ts`                | Vanilla-extract styles (the ONLY file that may import `@vanilla-extract/css`) |
| `src/__stories__/{name}-story.tsx` | Storybook story                                                               |
| `src/__tests__/{name}-test.tsx`    | Jest unit tests                                                               |
| `playroom/snippets.tsx`            | Add one snippet object to the exported array                                  |
| `src/index.tsx`                    | Add one export line                                                           |

---

## Hard rules — never break these

| Rule                      | Detail                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `'use client';`           | First line of every `.tsx` component file                                                              |
| Namespaced hooks          | `React.useState`, `React.useEffect`, `React.useRef` — never destructured                               |
| No vanilla-extract in tsx | `@vanilla-extract/css` is build-time only; importing it in tsx breaks at runtime                       |
| No sprinkles in tsx       | Same reason — `sprinkles.css` import belongs only in `.css.ts`                                         |
| Token colors only         | `vars.colors.*` for colors — never `#hex` or `rgb()`                                                   |
| Token radii only          | `vars.borderRadii.*` — never hardcoded `px` for border-radius                                          |
| `type` not `interface`    | All TypeScript type definitions use `type`                                                             |
| `dataAttributes` prop     | Every component accepts `dataAttributes?: DataAttributes` and spreads with `getPrefixedDataAttributes` |

---

## Task: create a new component

Produce all 6 files. Use these templates exactly.

### `src/{name}.tsx`

```tsx
'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as classes from './{name}.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';

import type {DataAttributes} from './utils/types';

type Props = {
  children?: React.ReactNode;
  // props here
  dataAttributes?: DataAttributes;
};

const MyComponent = ({children, dataAttributes}: Props): JSX.Element => {
  const {textPresets} = useTheme();
  const themeVariant = useThemeVariant();

  return (
    <div
      className={classnames(classes.container)}
      {...getPrefixedDataAttributes(dataAttributes, 'MyComponent')}
    >
      {children}
    </div>
  );
};

export default MyComponent;
```

### `src/{name}.css.ts`

```ts
import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {pxToRem} from './utils/css';

export const container = style([
  sprinkles({display: 'flex', alignItems: 'center'}),
  {
    background: vars.colors.background,
    borderRadius: vars.borderRadii.container,
    padding: pxToRem(16),
  },
]);

// Prop-driven variants
export const variantStyles = styleVariants({
  promo: {background: vars.colors.brand},
  discount: {background: vars.colors.error},
});
```

CSS rules:

- Use `sprinkles({...})` for responsive layout props (display, flex, padding, position)
- Use `style({...})` for non-responsive styles (transitions, box-shadow, exact pixel values)
- Use `style([sprinkles(...), {...}])` to combine both — the most common pattern
- Use `styleVariants` for prop-driven variant maps
- Wrap pixel values in `pxToRem()`

### `src/__stories__/{name}-story.tsx`

```tsx
import * as React from 'react';
import {MyComponent, ResponsiveLayout, Box} from '..';

export default {
  title: 'Components/MyComponent',
  argTypes: {
    variant: {options: ['promo', 'discount'], control: {type: 'select'}},
    disabled: {control: {type: 'boolean'}},
  },
  parameters: {fullScreen: true},
};

type Args = {
  variant: 'promo' | 'discount';
  disabled: boolean;
};

export const Default: StoryComponent<Args> = ({variant, disabled}) => (
  <ResponsiveLayout>
    <Box padding={16}>
      <MyComponent variant={variant} disabled={disabled}>
        Content
      </MyComponent>
    </Box>
  </ResponsiveLayout>
);

Default.storyName = 'MyComponent';
Default.args = {variant: 'promo', disabled: false};
```

Story rules:

- `StoryComponent<Args>` is a **global type** — do NOT import it; never add an import for it
- Default export must have `title` and `argTypes`
- Named story export must set `.storyName` and `.args`
- argType shapes: `{type: 'boolean'}`, `{options: [...], control: {type: 'select'}}`, `{type: 'number'}`

### `src/__tests__/{name}-test.tsx`

```tsx
import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import MyComponent from '../my-component';

test('my-component renders label', () => {
  render(
    <ThemeContextProvider theme={makeTheme()}>
      <MyComponent variant="promo">Hello</MyComponent>
    </ThemeContextProvider>
  );
  expect(screen.getByRole('region', {name: /hello/i})).toBeInTheDocument();
});

test('my-component is accessible', () => {
  render(
    <ThemeContextProvider theme={makeTheme()}>
      <MyComponent variant="promo" dataAttributes={{testid: 'my-component'}}>
        Hello
      </MyComponent>
    </ThemeContextProvider>
  );
  expect(screen.getByTestId('my-component')).toBeInTheDocument();
});
```

Test rules:

- `ThemeContextProvider` + `makeTheme()` wrap is **mandatory** — hooks crash without a theme provider
- Import `makeTheme` from `'./test-utils'` (not the main package)
- Query priority: `getByRole` → `getByLabelText` → `getByText` → `getByTestId`
- For interaction, use `userEvent` from `@testing-library/user-event` (async/await)
- `makeTheme` accepts overrides: `makeTheme({skin: getVivoNewSkin()})`,
  `makeTheme({platformOverrides: {platform: 'ios'}})`

### Playroom snippet (add to `playroom/snippets.tsx`)

```tsx
const myComponentSnippet = {
  name: 'MyComponent',
  group: 'MyComponent',
  code: `
<MyComponent variant="promo">
  Label
</MyComponent>`,
};
```

Then add `myComponentSnippet` to the `snippets` array at the bottom of the file.

Snippet rules:

- The `code` string is raw JSX evaluated by Playroom — all Mistica components are global, no imports
- Use `setState('key', value)` / `getState('key', defaultValue)` for stateful examples

### `src/index.tsx` export

Find the alphabetically correct position and add:

```tsx
export {default as MyComponent} from './my-component';
export type {Props as MyComponentProps} from './my-component';
```

---

## Task: add a prop to an existing component

Update ALL of these — never skip any:

1. `src/{component}.tsx` — add to `Props` type, implement logic
2. `src/{component}.css.ts` — add style rules if the prop affects appearance
3. `src/__stories__/{component}-story.tsx` — add to `argTypes` AND to `Default.args`
4. `playroom/snippets.tsx` — update the component's snippet to show the new prop

---

## Task: check conventions on a component

Read the component's `.tsx`, `.css.ts`, story, and test files. Report violations:

```
[RULE] file:line — description — suggested fix
```

Checks to run:

- `'use client';` is line 1 of tsx
- `import * as React from 'react'` (not named imports)
- No `@vanilla-extract/css` in tsx
- No `sprinkles.css` in tsx
- All hook calls use `React.` prefix
- Props use `type`, not `interface`
- `dataAttributes` prop present and spread correctly
- No hardcoded hex or rgb colors
- CSS file uses `vars.colors.*` and `vars.borderRadii.*`
- Story uses `StoryComponent<Args>` (not imported, just used)
- Story sets `.storyName` and `.args`
- Test wraps with `ThemeContextProvider` + `makeTheme`
- Test uses semantic queries as primary (`getByRole`, `getByLabelText`)

---

## Design token reference (internal — use inside this repo)

Use `vars.*` (not `skinVars.*`) inside css.ts files:

```ts
// Colors
vars.colors.background         vars.colors.backgroundContainer
vars.colors.brand              vars.colors.error
vars.colors.textPrimary        vars.colors.textPrimaryNegative
vars.colors.textSecondary      vars.colors.border
vars.colors.borderLow          vars.colors.badge

// Border radii
vars.borderRadii.button        vars.borderRadii.input
vars.borderRadii.container     vars.borderRadii.chip
vars.borderRadii.sheet         vars.borderRadii.avatar
vars.borderRadii.indicator     vars.borderRadii.tag
vars.borderRadii.popup
```

---

## Verification

After any change, run:

```bash
yarn ts-check   # zero TypeScript errors required
yarn lint       # zero ESLint errors required
yarn test       # all unit tests must pass
```
