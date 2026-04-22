# Skin: Movistar New

The primary Telefónica Spain brand. Preferred over the legacy `movistar` skin for all new projects.

## Setup

```tsx
import {getMovistarNewSkin} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};
```

## Font

**Movistar Sans** — Telefónica's proprietary typeface for this brand.

```css
body {
  font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif;
}
```

See [fonts.md](../fonts.md) for `@font-face` declarations.

## Brand identity

- **Primary brand color**: Deep blue (`skinVars.colors.brand`)
- **Brand gradient**: available via `skinVars.colors.backgroundBrand`
- **Accent**: No secondary accent; rely on `brand`, `brandLow`, and `brandHigh` tokens
- **Style**: Clean, modern, professional

## Key token values (light mode reference)

| Token                                 | Approximate value     | Use                            |
| ------------------------------------- | --------------------- | ------------------------------ |
| `skinVars.colors.brand`               | `#0B2739` (deep blue) | Primary actions, links         |
| `skinVars.colors.brandHigh`           | Darker brand          | Hover states                   |
| `skinVars.colors.brandLow`            | Light blue tint       | Icon backgrounds, subtle fills |
| `skinVars.colors.textPrimary`         | Near black            | Main body text                 |
| `skinVars.colors.textSecondary`       | Mid grey              | Supporting text                |
| `skinVars.colors.background`          | White                 | Page background                |
| `skinVars.colors.backgroundContainer` | Light grey            | Card/container background      |

## Minimal app shell

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Title1,
  Text2,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const GlobalStyles = () => (
  <style>{`body { font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif; background-color: ${skinVars.colors.background}; margin: 0; }`}</style>
);

export const App = () => (
  <ThemeContextProvider theme={theme}>
    <GlobalStyles />
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Title1 as="h1">Hello Movistar</Title1>
        <Text2 regular>Your app content here.</Text2>
      </Box>
    </ResponsiveLayout>
  </ThemeContextProvider>
);
```
