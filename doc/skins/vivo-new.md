# Skin: Vivo New

The Vivo brand skin for Brazil. Preferred over the legacy `vivo` skin for all new projects.

## Setup

```tsx
import {getVivoNewSkin} from '@telefonica/mistica';

const theme = {
  skin: getVivoNewSkin(),
  i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
};
```

## Font

**Vivo Type** — Vivo's proprietary typeface.

```css
body {
  font-family: 'Vivo Type', 'Helvetica', 'Arial', sans-serif;
}
```

See [fonts.md](../fonts.md) for `@font-face` declarations.

## Brand identity

- **Primary brand color**: Vivo violet/purple (`skinVars.colors.brand`)
- **Style**: Bold, energetic, expressive. Strong contrast between brand purple and white.
- **Locale**: Always use `pt-BR` and `phoneNumberFormattingRegionCode: 'BR'`

## Key token values (light mode reference)

| Token                         | Approximate value | Use                    |
| ----------------------------- | ----------------- | ---------------------- |
| `skinVars.colors.brand`       | Vivo violet       | Primary actions, links |
| `skinVars.colors.brandLow`    | Light purple tint | Icon backgrounds       |
| `skinVars.colors.textPrimary` | Dark grey         | Main text              |
| `skinVars.colors.background`  | White             | Page background        |

## Minimal app shell

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getVivoNewSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Title1,
  Text2,
} from '@telefonica/mistica';

const theme = {
  skin: getVivoNewSkin(),
  i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
};

const GlobalStyles = () => (
  <style>{`body { font-family: 'Vivo Type', 'Helvetica', 'Arial', sans-serif; background-color: ${skinVars.colors.background}; margin: 0; }`}</style>
);

export const App = () => (
  <ThemeContextProvider theme={theme}>
    <GlobalStyles />
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Title1 as="h1">Olá Vivo</Title1>
        <Text2 regular>Seu conteúdo aqui.</Text2>
      </Box>
    </ResponsiveLayout>
  </ThemeContextProvider>
);
```
