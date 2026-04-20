# @telefonica/mistica

> React components library for Telefonica Design System (Mistica). Provides UI components, layout primitives,
> form fields, theming, analytics, and more for building web applications following Telefonica's design
> guidelines.

## Documentation location

This file is the main entry point. All docs live at:

- **Installed package**: `node_modules/@telefonica/mistica/doc/`
- **GitHub fallback** (use when node_modules is not available):
  `https://github.com/Telefonica/mistica-web/tree/master/doc`

If you cannot find a documentation file in `node_modules`, fetch the equivalent file from the GitHub
repository at `https://github.com/Telefonica/mistica-web/blob/master/doc/<filename>`.

## Critical Rules

1. **NEVER hardcode colors in app/component UI code.** Always use `skinVars.colors.*` design tokens from
   `@telefonica/mistica`. The exception is skin authoring: when creating or extending a `Skin`, you may use
   built-in palette exports (for example `movistarNewPalette`) or your own custom palette/colors inside the
   skin definition.
2. **Try not to use raw `<div>` for layout.** Use Mistica layout components: `Box`, `Stack`, `Inline`,
   `Align`, `ResponsiveLayout`, `GridLayout`, `Grid`.
3. **NEVER set font sizes manually.** Use text components: `Text1`-`Text10`, `Title1`-`Title4`. If those don't
   cover your necessities you can set custom sizes with `Text` component.
4. **NEVER set border radius manually.** Use `skinVars.borderRadii.*` or Mistica components that handle it
   automatically. If you need to change the default visual styling of components (colors, border radius, etc.)
   and there is no specific prop for it, create or extend a custom skin instead of adding ad hoc style
   overrides.
5. **Always wrap your app** with `<ThemeContextProvider>` and import `@telefonica/mistica/css/mistica.css`.
6. **Always namespace React hooks**: `React.useState`, `React.useEffect`, `React.useRef`.
7. **Add `'use client';`** directive to client components when using Next.js app router.
8. Use `skinVars.rawColors.*` (not `skinVars.colors.*`) when applying alpha with `applyAlpha`.
9. **Always set `font-family` on `body` and use the correct font for the active skin.** Mistica does NOT
   inject a font — without it browsers render text with their default serif font (Times New Roman on desktop).
   Each skin has a designated font; see the [fonts reference](./fonts.md) for `@font-face` setup and the
   per-skin font table.
10. **Always set `body` background color using `skinVars.colors.background`.** Without it the page background
    won't match the theme (especially in dark mode). Do this inside a component rendered under
    `ThemeContextProvider` so `skinVars` resolves to the correct theme values:
    ```tsx
    <style>{`body { background-color: ${skinVars.colors.background}; }`}</style>
    ```

## Install

```
yarn add @telefonica/mistica
```

or

```
npm install @telefonica/mistica
```

## Quick Start

**Two global CSS concerns that Mistica does NOT handle automatically:**

1. **Font family** — without it, browsers fall back to their default serif font (Times New Roman on desktop).
   Each skin has its own font; see [fonts.md](./fonts.md) for the per-skin table and `@font-face` setup.
2. **Body background color** — without it, the page background won't match the active theme (critical in dark
   mode). Set it from inside a component rendered under `ThemeContextProvider` using
   `skinVars.colors.background`.

```tsx
'use client';

import '@telefonica/mistica/css/mistica.css';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Stack,
  Title1,
  Text2,
  ButtonPrimary,
} from '@telefonica/mistica';

const misticaTheme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

// Rendered under ThemeContextProvider so skinVars resolves correctly
const GlobalStyles = () => (
  <style>{`
    body {
      font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif; /* font for Movistar New skin */
      background-color: ${skinVars.colors.background};
    }
  `}</style>
);

const App = () => (
  <ThemeContextProvider theme={misticaTheme}>
    <GlobalStyles />
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Stack space={16}>
          <Title1 as="h1">Hello Mistica</Title1>
          <Text2 regular as="p">
            Build beautiful UIs with design system components.
          </Text2>
          <ButtonPrimary onPress={() => console.log('clicked')}>Get Started</ButtonPrimary>
        </Stack>
      </Box>
    </ResponsiveLayout>
  </ThemeContextProvider>
);
```

## Theme Configuration

The `theme` prop in `ThemeContextProvider` is mandatory. Only `skin` and `i18n` are required:

```ts
type ThemeConfig = {
  skin: Skin;
  colorScheme?: 'light' | 'dark' | 'auto'; // default: 'auto'
  i18n: {locale: Locale; phoneNumberFormattingRegionCode: RegionCode};
  platformOverrides?: {platform?: 'ios' | 'android'; insideNovumNativeApp?: boolean; userAgent?: string};
  texts?: Partial<Dictionary>;
  analytics?: {
    logEvent: (event: TrackingEvent) => Promise<void>;
    eventFormat?: 'universal-analytics' | 'google-analytics-4';
  };
  Link?: LinkComponent;
  useHrefDecorator?: () => (href: string) => string;
  preventCopyInFormFields?: boolean;
};
```

Available skins: `getMovistarNewSkin()`, `getVivoNewSkin()`, `getO2NewSkin()`, `getTelefonicaSkin()`,
`getBlauSkin()`, `getTuSkin()`, and others via `getSkinByName()`. Legacy variants without the `New` suffix
also exist (`getMovistarSkin()`, `getVivoSkin()`, `getO2Skin()`); prefer the `New` versions for new projects.
You can also create a custom skin. If you need to customize default component colors, radii, or other visual
tokens beyond the props exposed by a component, prefer extending a skin over overriding component styles.
Built-in palette exports such as `movistarNewPalette`, `o2NewPalette`, `vivoNewPalette`, etc. are available
for skin authoring, and custom skins may also define their own palette colors from scratch.

Built-in Link integrations: `Next12`, `Next13`, `Next14`, `ReactRouter5`, `ReactRouter6`.

The `theme` object should be constant (outside the component) or memoized with `React.useMemo`.

### Next.js optimization

```js
experimental: {
  optimizePackageImports: ['@telefonica/mistica'];
}
```

## Standard Page Layout

```tsx
<MainNavigationBar sections={[...]} selectedIndex={0} />
<HeaderLayout header={<Header pretitle="Section" title="Page Title" description="..." />} />
<ResponsiveLayout>
  <Box paddingY={24}>
    <Stack space={32}>
      {/* Section with 16px element spacing */}
      <Stack space={16}>
        <Title1 as="h2">Section</Title1>
        <Text2 regular as="p">Content</Text2>
      </Stack>
      {/* List section */}
      <Stack space={16}>
        <Title1 as="h2">List</Title1>
        <NegativeBox>
          <RowList>
            <Row title="Item" onPress={() => {}} />
          </RowList>
        </NegativeBox>
      </Stack>
    </Stack>
  </Box>
</ResponsiveLayout>
```

Vertical rhythm uses 4 levels and is responsive. Default rhythm (mobile / desktop):
level 1 = 24 / 48, level 2 = 40 / 80, level 3 = 16 / 32, level 4 = 16 / 32.
Vivo rhythm overrides these to: level 1 = 80 / 112, level 2 = 80 / 112, level 3 = 24 / 48, level 4 = 8 / 16.
Always apply rhythm via `Stack space={{mobile, desktop}}` and `Box paddingY={{mobile, desktop}}`.
See [patterns.md](./patterns.md#vertical-rhythm) for the full table, usage examples, and rules of thumb.

## Component Categories

### Core Layout Primitives

`Box`, `Stack`, `Inline`, `Align`, `Grid`/`GridItem`, `NegativeBox`, `Divider`, `HorizontalScroll`, `Boxed`,
`Overlay`, `StackingGroup`

### Page Layouts

`ResponsiveLayout`, `HeaderLayout`, `GridLayout`, `MainSectionHeaderLayout`, `MasterDetailLayout`,
`FixedFooterLayout`, `ButtonFixedFooterLayout`, `ButtonLayout`, `DoubleField`

### Buttons

`ButtonPrimary`, `ButtonSecondary`, `ButtonDanger`, `ButtonLink`, `ButtonLinkDanger`, `ButtonGroup`,
`ButtonLayout`, `IconButton`, `ToggleIconButton`, `TextLink`

### Text

`Text1`-`Text10`, `Title1`-`Title4`

### Cards

`DataCard`, `MediaCard`, `CoverCard`, `NakedCard` (each with size variants: `'default'`, `'snap'`,
`'display'`)

### Forms

`Form`, `TextField`, `EmailField`, `PhoneNumberField`, `PasswordField`, `Select`, `DateField`, `IntegerField`,
`DecimalField`, `CreditCardFields`, `IbanField`, `SearchField`, `PinField`, `Switch`, `Checkbox`,
`RadioGroup`/`RadioButton`, `DoubleField`, `Autocomplete`, `FileUpload`

### Lists

`RowList`/`Row`, `BoxedRowList`/`BoxedRow`, `UnorderedList`, `OrderedList`, `ListItem`

### Navigation

`MainNavigationBar`, `NavigationBar`, `FunnelNavigationBar`, `NavigationBarAction`,
`NavigationBarActionGroup`, `Tabs`, `NavigationBreadcrumbs`

### Headers

`Header`, `HeaderLayout`, `MainSectionHeader`, `MainSectionHeaderLayout`

### Feedback

`SuccessFeedbackScreen`, `ErrorFeedbackScreen`, `InfoFeedbackScreen`, `Snackbar` (via `useSnackbar`),
`alert`/`confirm`/`dialog` (via `useDialog`)

### Loading

`SkeletonLine`, `SkeletonText`, `SkeletonCircle`, `SkeletonRow`, `SkeletonRectangle`, `LoadingScreen`,
`BrandLoadingScreen`, `Spinner`, `LoadingBar`

### Data Display

`Tag`, `Badge`, `Chip`, `Avatar`, `Image`, `Video`, `Table`, `Divider`, `Callout`, `ProgressBar`,
`ProgressBarStepped`, `Stepper`, `Meter`, `Rating`, `InfoRating`, `Timer`, `TextTimer`,
`Timeline`/`TimelineItem`, `Counter`

### Containers / Surfaces

`Boxed`, `Carousel`, `CenteredCarousel`, `Slideshow`, `Hero`, `CoverHero`, `EmptyState`, `EmptyStateCard`,
`Accordion`/`AccordionItem`, `BoxedAccordion`/`BoxedAccordionItem`, `Drawer`, `Tooltip`, `Popover`,
`Menu`/`MenuItem`/`MenuSection`, `Sheet`/`SheetRoot`/`showSheet`

### Media

`Circle`, `Square`, `StackingGroup`, `Logo`

### Icons

~2000 icons following the pattern `Icon{Name}{Variant}` where Variant is `Regular`, `Filled`, or `Light`. All
accept `size` and `color` props. Use `color="currentColor"` inside buttons/navigation.

### Hooks

`useTheme`, `useScreenSize`, `useDialog`, `useSnackbar`, `useForm`, `useThemeVariant`, `useIsInViewport`,
`useElementDimensions`, `useWindowSize`, `useTrackingConfig`, `useCarouselContext`

## Design Tokens

All tokens via `skinVars` from `@telefonica/mistica`:

- **Colors**: `skinVars.colors.*` (286 tokens for backgrounds, text, borders, controls, status, tags)
- **Raw colors**: `skinVars.rawColors.*` (same tokens as RGB values, for use with `applyAlpha`)
- **Palettes for skin authoring**: built-in palette exports such as `movistarNewPalette`, `o2NewPalette`,
  `vivoNewPalette`, etc. Use these only when creating/extending a `Skin`, not for styling app components
  directly.
- **Border radii**: `skinVars.borderRadii.*` (container, button, input, popup, chip, sheet, avatar, tag, etc.)
- **Spacing**: `skinVars.spacing.*` (button, card, input, tag, feedback, hero, header, drawer padding tokens)
- **Text presets**: Handled by text components, not accessed directly

## How to use this documentation

Follow these steps before writing any code.

### Step 1: Read the minimum required docs (ALWAYS required)

**You MUST always read these four files before doing anything else**, regardless of the task. They provide the
foundational knowledge needed to use the library correctly:

| File                               | Why it is required                                                  |
| ---------------------------------- | ------------------------------------------------------------------- |
| `doc/patterns.md` (**start here**) | Page composition, layout rules, color rules, and common UI patterns |
| `doc/components.md`                | Full component catalog with props and usage examples                |
| `doc/layout.md`                    | All layout primitives and page layout components                    |
| `doc/design-tokens.md`             | skinVars colors, rawColors, border radii, spacing, text presets     |

Do not skip any of these four files and do not read them partially — **always read each one in full**. They
are the minimum required context for every task.

### Step 2: Read additional docs based on the task

After reading the minimum set, read any further files that apply to your specific task:

| Task                                              | Read this file           |
| ------------------------------------------------- | ------------------------ |
| **Forms**                                         | `doc/forms.md`           |
| **Theme configuration (customize skin)**          | `doc/theme-config.md`    |
| **Sheets / bottom sheets**                        | `doc/sheet.md`           |
| **Analytics tracking**                            | `doc/analytics.md`       |
| **Fonts setup**                                   | `doc/fonts.md`           |
| **Custom text tokens**                            | `doc/texts.md`           |
| **Testing (read if you have to implement tests)** | `doc/testing.md`         |
| **Migrating from older versions**                 | `doc/migration-guide.md` |
| **Optimizing bundle size with lottie**            | `doc/lottie.md`          |

## Docs reference

- [Components reference](./components.md): full component catalog with props and usage examples
- [Design tokens](./design-tokens.md): skinVars colors, rawColors, applyAlpha, border radii, spacing tokens,
  text presets, theme variants
- [Patterns and best practices](./patterns.md): page composition, layout dos/don'ts, color rules, responsive
  patterns, form patterns, card patterns, list patterns, skeleton loading, funnel flows, routing integration,
  dark mode
- [Theme configuration](./theme-config.md): full ThemeConfig reference, Link component setup, custom skins
- [Layout](./layout.md): Core layout primitives (Box, Stack, Inline, Align, Grid/GridItem, NegativeBox,
  Divider, HorizontalScroll, Boxed, Overlay, StackingGroup) and page layouts (ResponsiveLayout, HeaderLayout,
  GridLayout, MasterDetailLayout, FixedFooterLayout, ButtonFixedFooterLayout, ButtonLayout, DoubleField),
  vertical rhythm, and `Inline` alignment/wrapping capabilities
- [Forms](./forms.md): Form component, all form field types, DoubleField, useForm hook
- [Analytics](./analytics.md): trackingEvent prop, logEvent setup, default tracking, GA4 support,
  TrackingConfig
- [Fonts](./fonts.md): font family setup, system fonts, custom fonts, weight mapping, dynamic font sizes
- [Texts](./texts.md): customizable text tokens, Dictionary type, translate function
- [Sheets](./sheet.md): predefined sheets, SheetRoot, showSheet API, native webview integration, custom sheets
- [Testing](./testing.md): NODE_ENV, unit tests, acceptance tests, isRunningAcceptanceTest
- [Lottie](./lottie.md): optimizing bundle size with lottie-web light build
- [Migration guide](./migration-guide.md): cards ecosystem migration (v16), v12 to v13 migration
