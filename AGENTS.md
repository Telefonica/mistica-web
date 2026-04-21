# Mistica Web — Contributor Guide for AI Agents

React component library for Telefonica's Design System.

**Package manager**: `yarn`  
**Tooling**: `yarn storybook` (live docs), `yarn playroom` (prototyping)

---

## Critical rules (never break these)

- NEVER import `@vanilla-extract/css` in `.tsx` files — only in `.css.ts` files
- NEVER import `**/sprinkles.css` in `.tsx` files
- Always namespace React hooks: `React.useState`, `React.useEffect`, `React.useRef` (never bare)
- Always add `'use client';` as the first line of every `.tsx` component file
- Always wrap unit tests with `ThemeContextProvider` + `makeTheme()`
- Prefer semantic queries (`getByRole`, `getByLabelText`) over `getByTestId` in tests
- Use `type` not `interface` for all TypeScript types
- Use `export type` for type-only exports
- Colors MUST come from `vars.colors.*` (internal) or `skinVars.colors.*` (consumer docs) — never hardcode hex
  or rgb values
- Border radii MUST come from `vars.borderRadii.*` — never hardcode px values for radii

---

## Architecture: how a component is wired

```
src/my-component.tsx         ← component logic + JSX
src/my-component.css.ts      ← vanilla-extract styles (only file that imports @vanilla-extract/css)
src/skins/skin-contract.css  ← design token vars (vars.colors.*, vars.borderRadii.*, etc.)
src/sprinkles.css.ts         ← utility sprinkles (layout/spacing shorthand)
src/__stories__/my-component-story.tsx   ← Storybook story
src/__tests__/my-component-test.tsx      ← Jest unit tests
playroom/snippets.tsx        ← playroom code snippet (add to the exports array)
src/index.tsx                ← public export (add one line here)
```

The import chain is one-directional: `.tsx` → `* from './my-component.css'` (the generated class names). The
`.css.ts` file is the only one that may import from `@vanilla-extract/css` or `sprinkles.css`.

---

## Creating a new component — complete checklist

When asked to create a new component, produce ALL of the following files. Do not skip any.

### 1. `src/my-component.tsx`

```tsx
'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as classes from './my-component.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';

import type {DataAttributes} from './utils/types';

type Props = {
  children?: React.ReactNode;
  // add props here
  dataAttributes?: DataAttributes;
};

const MyComponent = ({children, dataAttributes}: Props): JSX.Element => {
  const {colors} = useTheme();
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

Key rules for the `.tsx` file:

- First line MUST be `'use client';`
- Import React as `import * as React from 'react'` — never named imports for hooks
- Import styles as `import * as classes from './my-component.css'` (no `.ts` extension)
- Use `React.useState`, `React.useEffect`, `React.useRef` — never destructured
- Props type uses `type`, not `interface`
- Always accept `dataAttributes?: DataAttributes` and spread with `getPrefixedDataAttributes`

### 2. `src/my-component.css.ts`

```ts
import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {pxToRem} from './utils/css';

export const container = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
  }),
  {
    background: vars.colors.background,
    borderRadius: vars.borderRadii.container,
    padding: pxToRem(16),
  },
]);

// Variants example
export const variantStyles = styleVariants({
  promo: {background: vars.colors.brand},
  discount: {background: vars.colors.error},
});
```

Key rules:

- `@vanilla-extract/css` is imported HERE (and only here)
- Use `sprinkles({...})` for responsive layout props (display, flex, padding, etc.)
- Use `vars.colors.*` for all color tokens
- Use `vars.borderRadii.*` for all border radius tokens
- Use `pxToRem()` for pixel values
- Use `styleVariants` for prop-driven style variants

### 3. `src/__stories__/my-component-story.tsx`

```tsx
import * as React from 'react';
import {MyComponent, ResponsiveLayout, Box} from '..';

export default {
  title: 'Components/MyComponent',
  argTypes: {
    variant: {
      options: ['promo', 'discount'],
      control: {type: 'select'},
    },
  },
  parameters: {fullScreen: true},
};

type Args = {
  variant: 'promo' | 'discount';
};

export const Default: StoryComponent<Args> = ({variant}) => {
  return (
    <ResponsiveLayout>
      <Box padding={16}>
        <MyComponent variant={variant}>Content</MyComponent>
      </Box>
    </ResponsiveLayout>
  );
};

Default.storyName = 'MyComponent';
Default.args = {
  variant: 'promo',
};
```

Key rules for stories:

- `StoryComponent<Args>` is a **global type** — do NOT import it; it is declared globally in the storybook
  setup
- Always export a `default` with `title` and `argTypes`
- Named story export (e.g. `Default`) MUST set `.storyName` and `.args`
- Boolean argType control: `{type: 'boolean'}`
- Select argType: `{options: [...], control: {type: 'select'}}`
- Wrap content in `ResponsiveLayout` + `Box` for proper context

### 4. `src/__tests__/my-component-test.tsx`

```tsx
import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import MyComponent from '../my-component';

test('my-component is accessible', () => {
  render(
    <ThemeContextProvider theme={makeTheme()}>
      <MyComponent>Hello</MyComponent>
    </ThemeContextProvider>
  );

  expect(screen.getByRole('region', {name: /hello/i})).toBeInTheDocument();
});

test('renders promo variant', () => {
  render(
    <ThemeContextProvider theme={makeTheme()}>
      <MyComponent variant="promo">Hello</MyComponent>
    </ThemeContextProvider>
  );

  expect(screen.getByTestId('MyComponent')).toBeInTheDocument();
});
```

Key rules for tests:

- Always wrap with `<ThemeContextProvider theme={makeTheme()}>` — tests fail without a theme
- Import `makeTheme` from `'./test-utils'` (not from the main package)
- Prefer `screen.getByRole(...)` and `screen.getByLabelText(...)` over `getByTestId`
- `makeTheme()` accepts optional overrides: `makeTheme({skin: getVivoNewSkin()})`

### 5. Playroom snippet (add to `playroom/snippets.tsx`)

Add an entry to the exported `snippets` array at the bottom of the file:

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

Key rules for snippets:

- Use `setState('key', value)` / `getState('key', defaultValue)` for stateful examples
- The `code` string is raw JSX that Playroom evaluates — no imports needed, all components are global
- Group name should match component name

### 6. Export from `src/index.tsx`

Add one line in the appropriate alphabetical section:

```tsx
export {default as MyComponent} from './my-component';
export type {Props as MyComponentProps} from './my-component'; // only if you export the type
```

---

## Adding a prop to an existing component

When asked to add a prop, update ALL of these locations:

1. **`src/component.tsx`** — add to the `Props` type and implement the logic
2. **`src/component.css.ts`** — add new style rules if needed
3. **`src/__stories__/component-story.tsx`** — add to `argTypes` AND to `Default.args`
4. **`playroom/snippets.tsx`** — update the component snippet to show the new prop

Story argType shapes:

```tsx
// Boolean prop
myProp: {control: {type: 'boolean'}},

// Union string prop
myProp: {options: ['a', 'b', 'c'], control: {type: 'select'}},

// Number prop
myProp: {control: {type: 'number'}},
```

---

## Design token quick reference (internal — use inside this repo)

```ts
// Colors
vars.colors.background;
vars.colors.backgroundContainer;
vars.colors.brand;
vars.colors.textPrimary;
vars.colors.textPrimaryNegative;
vars.colors.textSecondary;
vars.colors.error;
vars.colors.badge;
vars.colors.borderLow;
vars.colors.border;

// Border radii
vars.borderRadii.button;
vars.borderRadii.input;
vars.borderRadii.container;
vars.borderRadii.chip;
vars.borderRadii.sheet;
vars.borderRadii.avatar;
vars.borderRadii.indicator;
vars.borderRadii.tag;
vars.borderRadii.popup;
```

For consumer-facing app code (outside this repo), use `skinVars.colors.*` instead.

---

## Hooks quick reference

| Hook                | When to use                                                  |
| ------------------- | ------------------------------------------------------------ |
| `useTheme()`        | Access `colors`, `textPresets`, `locale`, `isDarkMode`       |
| `useThemeVariant()` | Know if component is inside a brand/negative/media container |
| `useScreenSize()`   | Responsive logic (isMobile, isTablet, isDesktop)             |
| `useDialog()`       | Programmatic dialog/confirm/alert                            |
| `useSnackbar()`     | Programmatic snackbar notifications                          |

---

## GitHub conventions

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing.
- Always add the `AI` label to PRs where code was written by an AI agent.

---

## Verification checklist before submitting

Run these commands to verify your changes:

```bash
yarn ts-check          # TypeScript must pass with no errors
yarn lint              # ESLint must pass
yarn test              # Unit tests must pass
```
