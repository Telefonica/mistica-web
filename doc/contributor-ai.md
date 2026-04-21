# Contributor guide for AI agents

This document teaches you how to **build and modify components inside this repo**. It complements
`doc/llms.md`, which teaches consumers how to _use_ the library. If you are writing app code that consumes
`@telefonica/mistica`, read `doc/llms.md` instead.

---

## Mental model

Every component is a bundle of up to 6 artefacts:

```
src/ribbon.tsx                       ← JSX + logic
src/ribbon.css.ts                    ← compiled CSS (vanilla-extract)
src/__stories__/ribbon-story.tsx     ← Storybook story
src/__tests__/ribbon-test.tsx        ← Jest unit tests
playroom/snippets.tsx                ← one snippet entry added to the array
src/index.tsx                        ← one export line added here
```

The import chain goes only one way:

```
.tsx  imports class names from  .css.ts
.css.ts  imports tokens from  src/skins/skin-contract.css.ts  (vars.*)
.css.ts  imports utilities from  src/sprinkles.css.ts
```

No other cross-imports are allowed.

---

## File 1: the component `.tsx`

### Minimal correct skeleton

```tsx
'use client';
import * as React from 'react';
import classnames from 'classnames';
import * as classes from './ribbon.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars} from './skins/skin-contract.css';
import {useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';

import type {DataAttributes} from './utils/types';

type Props = {
  children: string;
  variant: 'promo' | 'discount';
  dataAttributes?: DataAttributes;
};

const Ribbon = ({children, variant, dataAttributes}: Props): JSX.Element => {
  const {textPresets} = useTheme();
  const themeVariant = useThemeVariant();

  return (
    <div
      className={classnames(classes.ribbon, classes.variantStyles[variant])}
      {...getPrefixedDataAttributes(dataAttributes, 'Ribbon')}
    >
      {children}
    </div>
  );
};

export default Ribbon;
```

### Hard rules

| Rule                                      | Why                                                               |
| ----------------------------------------- | ----------------------------------------------------------------- |
| `'use client';` is line 1                 | Next.js App Router requires this on every client component        |
| `import * as React from 'react'`          | Hooks must be called as `React.useState`, never destructured      |
| `import * as classes from './ribbon.css'` | No `.ts` extension in the import path                             |
| No `@vanilla-extract/css` here            | It only runs at build time; importing it in tsx breaks at runtime |
| No `sprinkles.css` import                 | Same reason — build-time only                                     |
| `type Props`, not `interface Props`       | Repo convention; `interface` is forbidden by ESLint config        |
| `dataAttributes?: DataAttributes`         | Every component must accept data attributes for test targeting    |

### Common hooks

```tsx
const {colors, textPresets, isDarkMode, locale} = useTheme();
// colors: all skinVars resolved to actual values
// textPresets: font weight/size tokens (use these instead of hardcoding)

const themeVariant = useThemeVariant();
// Returns: 'default' | 'brand' | 'negative' | 'media' | 'alternative'
// Use this to adapt component appearance when inside a branded container

const {isMobile, isTablet, isDesktop} = useScreenSize();
// Use for conditional rendering based on viewport
```

---

## File 2: the CSS module `.css.ts`

### Minimal correct skeleton

```ts
import {style, styleVariants} from '@vanilla-extract/css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {pxToRem} from './utils/css';

// Use sprinkles for layout/spacing (generates responsive utility classes)
export const ribbon = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  }),
  {
    top: 0,
    right: 0,
    padding: `${pxToRem(4)} ${pxToRem(8)}`,
    borderRadius: vars.borderRadii.indicator,
  },
]);

// Use styleVariants for prop-driven variants
export const variantStyles = styleVariants({
  promo: {background: vars.colors.brand, color: vars.colors.textPrimaryNegative},
  discount: {background: vars.colors.error, color: vars.colors.textPrimaryNegative},
});
```

### When to use what

| API                              | Use for                                                                    |
| -------------------------------- | -------------------------------------------------------------------------- |
| `sprinkles({...})`               | Layout props that need to be responsive (display, flex, padding, position) |
| `style({...})`                   | Non-responsive styles (transitions, box-shadow, specific pixel values)     |
| `style([sprinkles(...), {...}])` | Combining both — most common pattern                                       |
| `styleVariants({a: {}, b: {}})`  | Generating a map of class names for prop-driven variants                   |
| `createVar()`                    | When you need a CSS custom property shared between rules                   |

### Token reference (internal use)

```ts
// Backgrounds
vars.colors.background;
vars.colors.backgroundContainer;
vars.colors.backgroundContainerAlternative;
vars.colors.backgroundBrand;
vars.colors.brand;

// Text
vars.colors.textPrimary;
vars.colors.textSecondary;
vars.colors.textPrimaryNegative; // white text on dark backgrounds
vars.colors.textBrand;

// Status
vars.colors.error;
vars.colors.success;
vars.colors.warning;

// Borders
vars.colors.border;
vars.colors.borderLow;
vars.colors.borderHigh;

// Badge
vars.colors.badge;

// Border radii
vars.borderRadii.button;
vars.borderRadii.input;
vars.borderRadii.container;
vars.borderRadii.chip;
vars.borderRadii.sheet;
vars.borderRadii.avatar;
vars.borderRadii.indicator; // small dots, small pills
vars.borderRadii.tag;
vars.borderRadii.popup;
```

---

## File 3: the Storybook story `-story.tsx`

### Minimal correct skeleton

```tsx
import * as React from 'react';
import {Ribbon, ResponsiveLayout, Box} from '..';

export default {
  title: 'Components/Ribbon',
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
      <Box padding={16} style={{position: 'relative', width: 200, height: 200}}>
        <Ribbon variant={variant}>NEW</Ribbon>
      </Box>
    </ResponsiveLayout>
  );
};

Default.storyName = 'Ribbon';
Default.args = {
  variant: 'promo',
};
```

### Critical: `StoryComponent<Args>` is a global type

Do NOT write `import type {StoryComponent} from '...'` — it does not exist as a named export. `StoryComponent`
is declared as a global in `.storybook/types.d.ts`. Just use it directly.

### argType control shapes

```tsx
// Boolean toggle
myProp: {control: {type: 'boolean'}},

// String union (dropdown)
myProp: {options: ['a', 'b', 'c'], control: {type: 'select'}},

// Number input
myProp: {control: {type: 'number'}},

// Text input (default for strings)
myProp: {control: {type: 'text'}},
```

### Mandatory fields on every story export

- `Default.storyName = 'ComponentName';` — sets the label shown in Storybook sidebar
- `Default.args = {...};` — sets the default control values

---

## File 4: the unit test `-test.tsx`

### Minimal correct skeleton

```tsx
import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import Ribbon from '../ribbon';

test('ribbon renders its label', () => {
  render(
    <ThemeContextProvider theme={makeTheme()}>
      <Ribbon variant="promo">NEW</Ribbon>
    </ThemeContextProvider>
  );

  expect(screen.getByText('NEW')).toBeInTheDocument();
});

test('ribbon is present in the DOM', () => {
  render(
    <ThemeContextProvider theme={makeTheme()}>
      <Ribbon variant="discount" dataAttributes={{testid: 'ribbon'}}>
        OFFER
      </Ribbon>
    </ThemeContextProvider>
  );

  expect(screen.getByTestId('ribbon')).toBeInTheDocument();
});
```

### Rules

- `ThemeContextProvider` + `makeTheme()` wrap is **mandatory** — hooks like `useTheme()` crash without a
  provider
- `makeTheme()` from `'./test-utils'` (not from the main package) — accepts optional overrides
- Prefer `getByRole` → `getByLabelText` → `getByText` → `getByTestId` (in that priority order)
- For user interaction tests, use `userEvent` from `@testing-library/user-event` (async)
- For keyboard/mouse events that don't need full simulation, `fireEvent` is acceptable

### makeTheme overrides

```tsx
makeTheme(); // Movistar ES locale (default)
makeTheme({skin: getVivoNewSkin()}); // Different skin
makeTheme({i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'US'}});
makeTheme({platformOverrides: {platform: 'ios'}});
```

---

## File 5: the playroom snippet

Open `playroom/snippets.tsx`. Add a new const near the bottom (before the `snippets` array export):

```tsx
const ribbonSnippet = {
  name: 'Ribbon',
  group: 'Ribbon',
  code: `
<Box style={{position: 'relative', display: 'inline-block', width: 200, height: 200}}>
  <Ribbon variant="promo">NEW</Ribbon>
</Box>`,
};
```

Then add `ribbonSnippet` to the `snippets` array.

### Playroom context

- All Mistica components are globally available — no imports needed in the `code` string
- Use `setState('key', value)` and `getState('key', defaultValue)` for stateful examples:

```tsx
code: `
<>
  <ButtonPrimary onPress={() => setState('open', true)}>Open</ButtonPrimary>
  {getState('open', false) && (
    <Ribbon variant="promo">NEW</Ribbon>
  )}
</>`,
```

---

## File 6: export from `src/index.tsx`

Find the alphabetically correct position and add:

```tsx
export {default as Ribbon} from './ribbon';
export type {Props as RibbonProps} from './ribbon'; // only if Props is needed by consumers
```

---

## Verification

After creating or modifying files, run:

```bash
yarn ts-check   # must produce zero errors
yarn lint       # must produce zero errors
yarn test       # all tests must pass
```
