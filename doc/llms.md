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

1. **NEVER hardcode colors.** Always use `skinVars.colors.*` design tokens from `@telefonica/mistica`.
2. **Try not to use raw `<div>` for layout.** Use Mistica layout components: `Box`, `Stack`, `Inline`,
   `Align`, `ResponsiveLayout`, `GridLayout`, `Grid`.
3. **NEVER set font sizes manually.** Use text components: `Text1`-`Text10`, `Title1`-`Title4`.
4. **NEVER set border radius manually.** Use `skinVars.borderRadii.*` or Mistica components that handle it
   automatically.
5. **Always wrap your app** with `<ThemeContextProvider>` and import `@telefonica/mistica/css/mistica.css`.
6. **Always namespace React hooks**: `React.useState`, `React.useEffect`, `React.useRef`.
7. **Add `'use client';`** directive to client components when using Next.js app router.
8. Use `skinVars.rawColors.*` (not `skinVars.colors.*`) when applying alpha with `applyAlpha`.

## Install

```
yarn add @telefonica/mistica
```

or

```
npm install @telefonica/mistica
```

## Quick Start

```tsx
'use client';

import '@telefonica/mistica/css/mistica.css';
import {
  ThemeContextProvider,
  getMovistarSkin,
  ResponsiveLayout,
  Box,
  Stack,
  Title1,
  Text2,
  ButtonPrimary,
} from '@telefonica/mistica';

const misticaTheme = {
  skin: getMovistarSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const App = () => (
  <ThemeContextProvider theme={misticaTheme}>
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

Available skins: `getMovistarSkin()`, `getVivoSkin()`, `getO2Skin()`, `getTelefonicaSkin()`, `getBlauSkin()`,
`getTuSkin()`, and others via `getSkinByName()`. You can also create a custom skin.

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

Vertical rhythm: containers 24px padding, sections 32px spacing, elements 16px spacing.

## Component Categories

### Core Layout Primitives

`Box`, `Stack`, `Inline`, `Align`, `Grid`/`GridItem`, `NegativeBox`, `Divider`, `HorizontalScroll`, `Boxed`,
`Overlay`, `StackingGroup`

### Page Layouts

`ResponsiveLayout`, `HeaderLayout`, `GridLayout`, `MainSectionHeaderLayout`, `MasterDetailLayout`,
`FixedFooterLayout`, `ButtonFixedFooterLayout`, `ButtonLayout`, `DoubleField`

### Buttons

`ButtonPrimary`, `ButtonSecondary`, `ButtonDanger`, `ButtonLink`, `ButtonLinkDanger`, `ButtonGroup`,
`ButtonLayout`, `IconButton`, `ToggleIconButton`

### Text

`Text1`-`Text10`, `Title1`-`Title4`, `TextLink`

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
- **Border radii**: `skinVars.borderRadii.*` (container, button, input, popup, chip, sheet, avatar, tag, etc.)
- **Text presets**: Handled by text components, not accessed directly

## Docs

- [Components reference](./components.md): full component catalog with props and usage examples
- [Design tokens](./design-tokens.md): skinVars colors, rawColors, applyAlpha, border radii, text presets,
  theme variants
- [Patterns and best practices](./patterns.md): page composition, layout dos/don'ts, color rules, responsive
  patterns, form patterns, card patterns, list patterns, skeleton loading, funnel flows, routing integration,
  dark mode
- [Theme configuration](./theme-config.md): full ThemeConfig reference, Link component setup, custom skins
- [Layout](./layout.md): Core layout primitives (Box, Stack, Inline, Align, Grid/GridItem, NegativeBox,
  Divider, HorizontalScroll, Boxed, Overlay, StackingGroup) and page layouts (ResponsiveLayout, HeaderLayout,
  GridLayout, MasterDetailLayout, FixedFooterLayout, ButtonFixedFooterLayout, ButtonLayout, DoubleField),
  vertical rhythm
- [Forms](./forms.md): Form component, all form field types, DoubleField, useForm hook
- [Analytics](./analytics.md): trackingEvent prop, logEvent setup, default tracking, GA4 support,
  TrackingConfig
- [Fonts](./fonts.md): font family setup, system fonts, custom fonts, weight mapping, dynamic font sizes
- [Texts](./texts.md): customizable text tokens, Dictionary type, translate function
- [Sheets](./sheet.md): predefined sheets, SheetRoot, showSheet API, native webview integration, custom sheets
- [Testing](./testing.md): NODE_ENV, unit tests, acceptance tests, isRunningAcceptanceTest
- [Lottie](./lottie.md): optimizing bundle size with lottie-web light build
- [Migration guide](./migration-guide.md): cards ecosystem migration (v16), v12 to v13 migration
