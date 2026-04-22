# Skin: Blau

The Blau brand skin (Germany). A sub-brand of Telefónica Deutschland.

## Setup

```tsx
import {getBlauSkin} from '@telefonica/mistica';

const theme = {
  skin: getBlauSkin(),
  i18n: {locale: 'de-DE', phoneNumberFormattingRegionCode: 'DE'},
};
```

## Font

**Roboto** — uses Google Fonts (shared with legacy Vivo skin).

```css
body {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
}
```

Load via Google Fonts or self-host:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

## Brand identity

- **Primary brand color**: Blau cyan/teal (`skinVars.colors.brand`)
- **Style**: Youthful, affordable, no-frills.
- **Locale**: Always use `de-DE` and `phoneNumberFormattingRegionCode: 'DE'`

## Minimal app shell

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getBlauSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Title1,
  Text2,
} from '@telefonica/mistica';

const theme = {
  skin: getBlauSkin(),
  i18n: {locale: 'de-DE', phoneNumberFormattingRegionCode: 'DE'},
};

const GlobalStyles = () => (
  <style>{`body { font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; background-color: ${skinVars.colors.background}; margin: 0; }`}</style>
);

export const App = () => (
  <ThemeContextProvider theme={theme}>
    <GlobalStyles />
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Title1 as="h1">Hallo Blau</Title1>
        <Text2 regular>Ihr Inhalt hier.</Text2>
      </Box>
    </ResponsiveLayout>
  </ThemeContextProvider>
);
```
