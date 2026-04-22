# Skin: Telefonica

The corporate Telefónica brand skin. Used for internal tools and corporate-facing apps.

## Setup

```tsx
import {getTelefonicaSkin} from '@telefonica/mistica';

const theme = {
  skin: getTelefonicaSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};
```

## Font

**Telefonica Sans** — the corporate Telefónica typeface.

```css
body {
  font-family: 'Telefonica Sans', 'Helvetica', 'Arial', sans-serif;
}
```

See [fonts.md](../fonts.md) for `@font-face` declarations.

## Brand identity

- **Primary brand color**: Telefónica blue (`skinVars.colors.brand`)
- **Style**: Corporate, clean, authoritative. More conservative than consumer brands.
- **Use case**: Internal portals, B2B apps, corporate communications.

## Key token values (light mode reference)

| Token                         | Approximate value | Use             |
| ----------------------------- | ----------------- | --------------- |
| `skinVars.colors.brand`       | Telefónica blue   | Primary actions |
| `skinVars.colors.textPrimary` | Dark              | Main text       |
| `skinVars.colors.background`  | White             | Page background |

## Minimal app shell

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getTelefonicaSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Title1,
  Text2,
} from '@telefonica/mistica';

const theme = {
  skin: getTelefonicaSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const GlobalStyles = () => (
  <style>{`body { font-family: 'Telefonica Sans', 'Helvetica', 'Arial', sans-serif; background-color: ${skinVars.colors.background}; margin: 0; }`}</style>
);

export const App = () => (
  <ThemeContextProvider theme={theme}>
    <GlobalStyles />
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Title1 as="h1">Hello Telefonica</Title1>
        <Text2 regular>Your app content here.</Text2>
      </Box>
    </ResponsiveLayout>
  </ThemeContextProvider>
);
```
