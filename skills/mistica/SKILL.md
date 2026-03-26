---
name: mistica
description:
  Build websites and web applications using Telefonica's Mistica design system React components. Use this
  skill when writing React UI code with @telefonica/mistica, creating pages, layouts, forms, or any user
  interface that should follow Telefonica's design guidelines. Triggers on tasks involving Mistica components,
  Telefonica branding, or when the user mentions Mistica.
license: MIT
metadata:
  author: telefonica
  version: '1.0.0'
---

# Mistica Web - Telefonica Design System

Build web interfaces using `@telefonica/mistica`, the React component library for Telefonica's Design System.

## When to Apply

Use this skill when:

- Creating or modifying React components that use `@telefonica/mistica`
- Building pages, layouts, or UIs for Telefonica-branded applications
- The user asks to build a website or web app using Mistica
- Working with Mistica components, design tokens, or skins
- Generating forms, cards, lists, navigation, feedback screens, or any UI pattern

## Setup

Before writing any code, ensure the project has `@telefonica/mistica` installed. If not:

```
npm install @telefonica/mistica
```

## Documentation

All Mistica documentation is available in the installed package. **Before generating any UI code**, read the
relevant documentation files from `node_modules/@telefonica/mistica/doc/`.

### Step 1: Read the main reference

Always start by reading the main LLM documentation file:

```
node_modules/@telefonica/mistica/doc/llms.md
```

This file contains the critical rules, quick start guide, component categories, design token overview, and
links to all other documentation files.

> **Fallback**: If `node_modules/@telefonica/mistica` is not available, read the equivalent files directly
> from the GitHub repository: `https://github.com/Telefonica/mistica-web/blob/master/doc/llms.md`

### Step 2: Read specific docs based on the task

Based on what the user needs, read the appropriate documentation files:

| Task                              | Read this file                                            |
| --------------------------------- | --------------------------------------------------------- |
| **Any UI task** (start here)      | `node_modules/@telefonica/mistica/doc/patterns.md`        |
| **Using specific components**     | `node_modules/@telefonica/mistica/doc/components.md`      |
| **Colors, tokens, theming**       | `node_modules/@telefonica/mistica/doc/design-tokens.md`   |
| **Page layouts**                  | `node_modules/@telefonica/mistica/doc/layout.md`          |
| **Forms**                         | `node_modules/@telefonica/mistica/doc/forms.md`           |
| **Theme configuration**           | `node_modules/@telefonica/mistica/doc/theme-config.md`    |
| **Sheets / bottom sheets**        | `node_modules/@telefonica/mistica/doc/sheet.md`           |
| **Analytics tracking**            | `node_modules/@telefonica/mistica/doc/analytics.md`       |
| **Fonts setup**                   | `node_modules/@telefonica/mistica/doc/fonts.md`           |
| **Custom text tokens**            | `node_modules/@telefonica/mistica/doc/texts.md`           |
| **Testing**                       | `node_modules/@telefonica/mistica/doc/testing.md`         |
| **Migration from older versions** | `node_modules/@telefonica/mistica/doc/migration-guide.md` |
| **Lottie animations**             | `node_modules/@telefonica/mistica/doc/lottie.md`          |

## Critical Rules

These rules MUST be followed in ALL generated code:

1. **NEVER hardcode colors.** Always use `skinVars.colors.*` from `@telefonica/mistica`. For semi-transparent
   colors, use `applyAlpha(skinVars.rawColors.*, alpha)`.

2. **NEVER use raw `<div>` for layout or spacing.** Use Mistica layout components:

   - `Box` for padding
   - `Stack` for vertical spacing
   - `Inline` for horizontal spacing
   - `ResponsiveLayout` for page content containers
   - `GridLayout` for column-based layouts
   - `Grid`/`GridItem` for CSS grid

3. **NEVER set font sizes or font families manually.** Use text components: `Text1`-`Text10` for body text,
   `Title1`-`Title4` for headings.

4. **NEVER set border radius manually.** Use `skinVars.borderRadii.*` or Mistica components that handle it
   (`Boxed`, cards, etc.).

5. **Always wrap the app root** with `<ThemeContextProvider>` and import
   `@telefonica/mistica/css/mistica.css`.

6. **Always namespace React hooks**: write `React.useState`, `React.useEffect`, not bare `useState`.

7. **Add `'use client';`** directive when using Next.js app router.

8. **Use the `to` prop** (not `href`) for client-side navigation after configuring the Link component in
   theme.

9. **Wrap unbounded `RowList`** with `<NegativeBox>` when placed inside `ResponsiveLayout`.

10. **Use `small` prop on buttons** inside cards and `EmptyStateCard`.

11. **Always set `font-family` on `body` using the correct font for the active skin.** Mistica does NOT inject
    a font — without it browsers fall back to their default serif font (Times New Roman on desktop). Each skin
    has a designated font:

    | Skin                         | Font family         |
    | ---------------------------- | ------------------- |
    | `movistar-new` _(preferred)_ | `'Movistar Sans'`   |
    | `movistar` _(legacy)_        | `'On Air'`          |
    | `o2-new`, `o2`               | `'On Air'`          |
    | `vivo-new` _(preferred)_     | `'Vivo Type'`       |
    | `vivo` _(legacy)_            | `'Roboto'`          |
    | `telefonica`, `tu`           | `'Telefonica Sans'` |
    | `blau`                       | `'Roboto'`          |
    | `esimflag`                   | `'On Air'`          |

    Read `node_modules/@telefonica/mistica/doc/fonts.md` for `@font-face` declarations for each font.

12. **Always set `body` background using `skinVars.colors.background`.** Without it the page background won't
    match the theme, especially in dark mode. Set it inside a component rendered under `ThemeContextProvider`:

    ```tsx
    const GlobalStyles = () => <style>{`body { background-color: ${skinVars.colors.background}; }`}</style>;
    ```

13. **Do NOT wrap these components in `ResponsiveLayout`** — they already contain one internally:
    `HeaderLayout`, `MainSectionHeaderLayout`, `Hero`, `CoverHero`, `MasterDetailLayout`,
    `ButtonFixedFooterLayout`, `NavigationBar`, `MainNavigationBar`, `FunnelNavigationBar`, `Tabs`,
    `SuccessFeedbackScreen`, `ErrorFeedbackScreen`, `InfoFeedbackScreen`, `LoadingScreen`,
    `BrandLoadingScreen`. Place them at page level, side by side with `ResponsiveLayout` blocks.

14. **Use carousels only for horizontal content.** `Carousel` and `CenteredCarousel` are horizontal-scroll
    components — always place them **inside** `ResponsiveLayout`. `Slideshow` bleeds full-width automatically
    and should be placed **outside** `ResponsiveLayout`.

## Quick Reference

### Standard page structure

```tsx
<ThemeContextProvider theme={misticaTheme}>
  {/* GlobalStyles: set body font (see rule 11) and background (see rule 12) */}
  <GlobalStyles />
  {/* These components have their own internal ResponsiveLayout — place them at page level */}
  <MainNavigationBar sections={[...]} />
  <HeaderLayout header={<Header title="Page Title" />} />
  {/* Slideshow goes outside ResponsiveLayout — it bleeds full-width automatically */}
  <Slideshow items={[...]} />
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Stack space={32}>
        <Stack space={16}>{/* section elements */}</Stack>
        {/* Carousel and CenteredCarousel go INSIDE ResponsiveLayout */}
        <Carousel itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}} items={[...]} />
      </Stack>
    </Box>
  </ResponsiveLayout>
</ThemeContextProvider>
```

### Vertical rhythm: 24px container padding, 32px between sections, 16px between elements.

### Card asset pattern

```tsx
<Circle backgroundColor={skinVars.colors.brandLow} size={40}>
  <IconShopRegular color={skinVars.colors.brand} />
</Circle>
```

### Color usage

```tsx
import {skinVars, applyAlpha} from '@telefonica/mistica';

skinVars.colors.textPrimary; // text color
skinVars.colors.brand; // brand color
skinVars.colors.backgroundContainer; // container bg
applyAlpha(skinVars.rawColors.brand, 0.5); // semi-transparent
```
