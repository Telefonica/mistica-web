# Fonts

Mistica does **not** inject a font family automatically. Without explicit setup, browsers fall back to their
default serif font (Times New Roman on desktop). You must declare `@font-face` rules and set `font-family` on
`body`.

## Font per skin

Each skin has a designated font family. Use the correct one for the skin your app is using:

| Skin                         | Getter function        | Font family         |
| ---------------------------- | ---------------------- | ------------------- |
| `movistar-new` _(preferred)_ | `getMovistarNewSkin()` | `'Movistar Sans'`   |
| `movistar` _(legacy)_        | `getMovistarSkin()`    | `'On Air'`          |
| `o2-new` _(preferred)_       | `getO2NewSkin()`       | `'On Air'`          |
| `o2` _(legacy)_              | `getO2Skin()`          | `'On Air'`          |
| `vivo-new` _(preferred)_     | `getVivoNewSkin()`     | `'Vivo Type'`       |
| `vivo` _(legacy)_            | `getVivoSkin()`        | `'Roboto'`          |
| `telefonica`                 | `getTelefonicaSkin()`  | `'Telefonica Sans'` |
| `blau`                       | `getBlauSkin()`        | `'Roboto'`          |
| `tu`                         | `getTuSkin()`          | `'Telefonica Sans'` |
| `esimflag`                   | `getEsimflagSkin()`    | `'On Air'`          |

## Setting font-family

Set the font from inside a component rendered under `ThemeContextProvider`. This keeps font and background
color in sync with the active theme, including in dark mode:

```tsx
import {skinVars} from '@telefonica/mistica';

const GlobalStyles = () => (
  <style>{`
    body {
      font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif;
      background-color: ${skinVars.colors.background};
    }
  `}</style>
);
```

Render `<GlobalStyles />` as a direct child of `ThemeContextProvider`, before the rest of the app.

## @font-face setup

Declare the font weights your app needs. Mistica uses **300 (light), 400 (regular), 500 (medium) and 700
(bold)**. Serve the `.woff2` files from your own static hosting.

### On Air (Movistar, O2, O2 New, Esimflag)

```css
@font-face {
  font-family: 'On Air';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/OnAir-Light.woff2') format('woff2');
}
@font-face {
  font-family: 'On Air';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/OnAir-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'On Air';
  font-style: normal;
  font-weight: 500;
  src: url('/fonts/OnAir-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'On Air';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/OnAir-Bold.woff2') format('woff2');
}

body {
  font-family: 'On Air', 'Helvetica', 'Arial', sans-serif;
}
```

### Movistar Sans (Movistar New)

```css
@font-face {
  font-family: 'Movistar Sans';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/MovistarSans-Light.woff2') format('woff2');
}
@font-face {
  font-family: 'Movistar Sans';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/MovistarSans-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Movistar Sans';
  font-style: normal;
  font-weight: 500;
  src: url('/fonts/MovistarSans-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Movistar Sans';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/MovistarSans-Bold.woff2') format('woff2');
}

body {
  font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif;
}
```

### Vivo Type (Vivo New)

```css
@font-face {
  font-family: 'Vivo Type';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/vivo-type-light.woff2') format('woff2');
}
@font-face {
  font-family: 'Vivo Type';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/vivo-type-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Vivo Type';
  font-style: normal;
  font-weight: 500;
  src: url('/fonts/vivo-type-medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Vivo Type';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/vivo-type-bold.woff2') format('woff2');
}

body {
  font-family: 'Vivo Type', 'Helvetica', 'Arial', sans-serif;
}
```

### Telefonica Sans (Telefonica, Tu)

```css
@font-face {
  font-family: 'Telefonica Sans';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/Telefonica_Sans_Light.woff2') format('woff2');
}
@font-face {
  font-family: 'Telefonica Sans';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/Telefonica_Sans_Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Telefonica Sans';
  font-style: normal;
  font-weight: 500;
  src: url('/fonts/Telefonica_Sans_Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Telefonica Sans';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/Telefonica_Sans_Bold.woff2') format('woff2');
}

body {
  font-family: 'Telefonica Sans', 'Helvetica', 'Arial', sans-serif;
}
```

### Roboto (Vivo, Blau)

Roboto is available via [Google Fonts](https://fonts.google.com/specimen/Roboto) or
[Bunny Fonts](https://fonts.bunny.net/family/roboto) (GDPR-friendly alternative). The weights needed are 300,
400, 500, and 700.

Google Fonts import:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

Or self-hosted `@font-face`:

```css
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src:
    local('Roboto Light'),
    local('Roboto-Light'),
    url('/fonts/roboto-300.woff2') format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src:
    local('Roboto'),
    local('Roboto-Regular'),
    url('/fonts/roboto-400.woff2') format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src:
    local('Roboto Medium'),
    local('Roboto-Medium'),
    url('/fonts/roboto-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src:
    local('Roboto Bold'),
    local('Roboto-Bold'),
    url('/fonts/roboto-700.woff2') format('woff2');
}

body {
  font-family: -apple-system, 'Roboto', 'Helvetica', 'Arial', sans-serif;
}
```

## Body background color

Always set `body` background from inside a component under `ThemeContextProvider` using the
`skinVars.colors.background` token. This ensures the background matches the active theme in both light and
dark mode:

```tsx
const GlobalStyles = () => <style>{`body { background-color: ${skinVars.colors.background}; }`}</style>;
```

## Override browser fonts for form elements

Some browsers apply a different `font-family` to form inputs, textareas, and code elements. Override with:

```css
input,
textarea,
pre,
code {
  font: inherit;
}
```

Or use a CSS reset that handles this, such as
[modern-normalize](https://github.com/sindresorhus/modern-normalize).

## Dynamic font sizes

To support OS/browser accessibility font size settings, set the base size on `html`:

```css
html {
  font-size: 16px; /* or 100% */
}
```

To support Dynamic Type on iOS:

```css
@supports (font: -apple-system-body) {
  html {
    font: -apple-system-body !important;
  }
}
```
