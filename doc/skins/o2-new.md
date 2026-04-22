# Skin: O2 New

The O2 brand skin. Preferred over the legacy `o2` skin for all new projects.

## Setup

```tsx
import {getO2NewSkin} from '@telefonica/mistica';

const theme = {
  skin: getO2NewSkin(),
  i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'GB'},
};
```

## Font

**On Air** — shared across O2, legacy Movistar, and Esimflag skins.

```css
body {
  font-family: 'On Air', 'Helvetica', 'Arial', sans-serif;
}
```

See [fonts.md](../fonts.md) for `@font-face` declarations.

## Brand identity

- **Primary brand color**: O2 blue (`skinVars.colors.brand`)
- **Style**: Light, fresh, tech-forward. Heavy use of white space.
- **Bubble motif**: O2's visual identity uses circular shapes — pair with `Circle` components.

## Key token values (light mode reference)

| Token                                 | Approximate value | Use                    |
| ------------------------------------- | ----------------- | ---------------------- |
| `skinVars.colors.brand`               | O2 blue           | Primary actions, links |
| `skinVars.colors.brandLow`            | Light blue tint   | Icon backgrounds       |
| `skinVars.colors.textPrimary`         | Dark navy         | Main text              |
| `skinVars.colors.background`          | White             | Page background        |
| `skinVars.colors.backgroundContainer` | Light grey        | Cards                  |

## Minimal app shell

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getO2NewSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Title1,
  Text2,
} from '@telefonica/mistica';

const theme = {
  skin: getO2NewSkin(),
  i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'GB'},
};

const GlobalStyles = () => (
  <style>{`body { font-family: 'On Air', 'Helvetica', 'Arial', sans-serif; background-color: ${skinVars.colors.background}; margin: 0; }`}</style>
);

export const App = () => (
  <ThemeContextProvider theme={theme}>
    <GlobalStyles />
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Title1 as="h1">Hello O2</Title1>
        <Text2 regular>Your app content here.</Text2>
      </Box>
    </ResponsiveLayout>
  </ThemeContextProvider>
);
```
