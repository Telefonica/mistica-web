# Fonts

<!-- TOC -->

- [Fonts](#fonts)
  - [Font family](#font-family)
    - [System Fonts (Roboto / San Francisco)](#system-fonts-roboto--san-francisco)
    - [OnAir or Telefonica fonts](#onair-or-telefonica-fonts)
    - [Override brower fonts for some specific html elements](#override-brower-fonts-for-some-specific-html-elements)
  - [Dynamic font sizes](#dynamic-font-sizes)

<!-- /TOC -->

## Font family

Mistica components are optimized to work with iOS/Android system fonts (Roboto and San Francisco), but it can
also work fine with other font families.

### System Fonts (Roboto / San Francisco)

If you use system fonts in your web application we recommend you to setup it as follows:

```css
body {
  font-family: -apple-system, 'Roboto', 'Helvetica', 'Arial', sans-serif;
}
```

And additionaly declare a Roboto font family for desktop browsers. For example:

```css
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'),
    url('/static/fonts/roboto-v18-latin_latin-ext-300.woff2') format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'),
    url('/static/fonts/roboto-v18-latin_latin-ext-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src: local('Roboto Medium'), local('Roboto-Medium'),
    url('/static/fonts/roboto-v18-latin_latin-ext-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url('/static/fonts/roboto-v18-latin_latin-ext-700.woff2') format('woff2');
}
```

This is just an example, you'll need to change the `url()` declarations to point to the fonts served by your
web server. The important part here is to serve different font weights for 300 (light), 400 (regular), 500
(medium) and 700 (bold).

### OnAir or Telefonica fonts

Mistica works fine too with other fonts like OnAir or Telefonica fonts, but these fonts don't have a medium
weight (only light, regular and bold). In these cases, we recomend to use the regular font weight for the 500
`font-weight`. Something like this:

```css
@font-face {
  font-family: 'OnAir';
  font-style: normal;
  font-weight: 300;
  src: url('/static/fonts/OnAir-Light.woff2') format('woff2');
}
@font-face {
  font-family: 'OnAir';
  font-style: normal;
  font-weight: 400;
  src: url('/static/fonts/OnAir-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'OnAir';
  font-style: normal;
  font-weight: 500;
  /* Note we are using OnAir Regular for medium (500) font-weight too: */
  src: url('/static/fonts/OnAir-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'OnAir';
  font-style: normal;
  font-weight: 700;
  src: url('/static/fonts/OnAir-Bold.woff2') format('woff2');
}

body {
  font-family: 'OnAir', 'Helvetica', 'Arial', sans-serif;
}
```

### Override brower fonts for some specific html elements

All the html elements in your page will inherit the body font by default, except if a style sheet sets a
different font family for the element, and most browsers use to set specific font families for some elements
like `input`, `textarea`, `pre`, etc. If you want to avoid that browser behavior, you have different options:

1. Explicitly set the your font family for those elements:

```css
body {
  font-family: -apple-system, 'Roboto', 'Helvetica', 'Arial', sans-serif;
}

input,
textarea,
pre,
code {
  font: inherit;
}
```

2. Apply the font-family with a wildcard selector:

```css
* {
  font-family: -apple-system, 'Roboto', 'Helvetica', 'Arial', sans-serif;
}
```

3. Use a [reset.css](https://meyerweb.com/eric/tools/css/reset/) that does this for you.

We use to recomend option 3.

## Dynamic font sizes

Mistica components support scalling font sizes automatically based on OS or browser accesibility settings. If
you want your web to properly work with dynamic font sizes, we recommend to setup a base font size of 16px or
100% (which is the same as 16px in most browsers):

```css
html {
  font-size: 16px; /* or 100% */
}
```

Also, to make dynamic font sizes work properly in iOS devices you need to include this:

```css
/**
 * To enable Dynamic Type in apple devices:
 * See: https://dev.to/colingourlay/how-to-support-apple-s-dynamic-text-in-your-web-content-with-css-40c0
 */
@supports (font: -apple-system-body) {
  html {
    font: -apple-system-body !important;
  }
}
```
