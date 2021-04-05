# Fonts

## System Fonts

Mistica components are optimized to work with iOS/Android system fonts (Roboto and San Francisco), if you use
system fonts in your web application we recommend you to setup it as follows:

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

## OnAir or Telefonica fonts

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
