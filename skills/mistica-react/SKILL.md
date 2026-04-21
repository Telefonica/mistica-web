---
name: mistica-react
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

# Mistica React - Telefonica Design System

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

**Before writing any code**, read `node_modules/@telefonica/mistica/doc/llms.md`. That file is the canonical
source of truth and contains critical rules, a quick start guide, component categories, design token overview,
and step-by-step instructions on which documentation files to read and in what order.

> **Fallback**: If `node_modules/@telefonica/mistica/doc/llms.md` is not available, fetch the equivalent file
> from the GitHub repository: `https://github.com/Telefonica/mistica-web/blob/master/doc/llms.md`

Follow every instruction in `llms.md` exactly, including reading all minimum required docs before generating
any code.

---

## Component mapping for complex screens

When building multi-section pages (dashboards, home pages, content feeds, etc.), map each UI zone to the
correct Mistica component. Never build custom alternatives when a Mistica component already handles the
pattern.

| UI zone                                  | Mistica component                           |
| ---------------------------------------- | ------------------------------------------- |
| Top navigation with sections/logo        | `MainNavigationBar`                         |
| Simple back-button bar                   | `NavigationBar`                             |
| Full-bleed hero with image + CTA         | `CoverHero`                                 |
| Hero with media beside text              | `Hero`                                      |
| Auto-advancing hero slideshow            | `Slideshow` with `CoverCard` items          |
| Horizontal scrolling content row         | `Carousel`                                  |
| Cinematic poster tile (dark overlay)     | `CoverCard`                                 |
| Content tile with image + metadata below | `MediaCard`                                 |
| Data tile without image                  | `DataCard`                                  |
| Category / status label                  | `Tag type="promo"` / `"active"` / `"error"` |
| Unread / count indicator                 | `Badge value={n}`                           |
| Empty state with illustration            | `EmptyState`                                |
| Section heading                          | `Title1` or `Title2` as `<h2>`              |
| Body text                                | `Text2 regular` or `Text3 regular`          |
| Small metadata                           | `Text1 regular`                             |

### Carousel API — items array, not children

```tsx
// ✓ Correct
<Carousel
    itemsPerPage={{mobile: 2, tablet: 3, desktop: 4}}
    items={movies.map((m, i) => (
        <CoverCard
            key={i}
            imageSrc={m.posterUrl}
            headline={m.isNew ? <Tag type="promo">NEW</Tag> : undefined}
            title={m.title}
            onPress={() => {}}
            aria-label={`Watch ${m.title}`}
        />
    ))}
/>

// ✗ Wrong — Carousel does not accept children
<Carousel itemsPerPage={3}>
    <CoverCard ... />
</Carousel>
```

### Standard complex page structure

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  MainNavigationBar,
  NavigationBarAction,
  CoverHero,
  Carousel,
  CoverCard,
  Tag,
  ResponsiveLayout,
  Box,
  Stack,
  Title1,
  Text2,
  ButtonPrimary,
  ButtonSecondary,
  EmptyState,
} from '@telefonica/mistica';

// theme MUST be outside the component (stable reference)
const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

// skinVars only resolves inside ThemeContextProvider — split into inner component
const PageContent = () => {
  const [activeSection, setActiveSection] = React.useState(0);
  return (
    <Stack space={0}>
      <MainNavigationBar
        sections={['Home', 'Movies', 'Series'].map((title, index) => ({
          title,
          onPress: () => setActiveSection(index),
        }))}
        selectedIndex={activeSection}
      />
      <CoverHero
        imageSrc="https://picsum.photos/1200/600"
        headline={<Tag type="promo">Featured</Tag>}
        title="Featured Title"
        description="Compelling description."
        button={<ButtonPrimary onPress={() => {}}>Watch now</ButtonPrimary>}
        secondaryButton={<ButtonSecondary onPress={() => {}}>More info</ButtonSecondary>}
      />
      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={32}>
            <Stack space={16}>
              <Title1 as="h2">Trending now</Title1>
              <Carousel
                itemsPerPage={{mobile: 2, tablet: 3, desktop: 4}}
                items={Array.from({length: 6}, (_, i) => (
                  <CoverCard
                    key={i}
                    imageSrc={`https://picsum.photos/seed/${i}/400/600`}
                    title={`Title ${i + 1}`}
                    onPress={() => {}}
                    aria-label={`Watch Title ${i + 1}`}
                  />
                ))}
              />
            </Stack>
          </Stack>
        </Box>
      </ResponsiveLayout>
    </Stack>
  );
};

export const MyPage = () => (
  <ThemeContextProvider theme={theme}>
    <PageContent />
  </ThemeContextProvider>
);
```
