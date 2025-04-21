# Mística CSS

If you can't use the Mística React components in your project, you can still use the Mística CSS to style your
app.

Mística CSS is a set of stylesheets that you can use to style your app with the design tokens of the system.
It includes css custom properties (css variables) for colors, border radius, typography, etc.

## How to use

### 1. Install the package

```bash
yarn add @telefonica/mistica
```

This is the same package which includes the react components, but if you aren't using React, you can just
import the css files in your app.

### 2. Import the css

You need to import the `mistica-common.css` file and at least one skin file.

For example:

```css
@import '@telefonica/mistica/css/mistica-common.css';
@import '@telefonica/mistica/css/movistar.css';
```

There is one css file for each skin (`movistar`, `o2`, `vivo`, `tu`, `telefonica`, etc)

:warning: The css import method will depend on your bundler or tooling. The files are located inside the
`css/` folder in the package (`node_modules/@telefonica/mistica/css/`)

### 3. Setup the mistica skin in your html

```html
<body data-mistica-skin="movistar"></body>
```

## Example

You can run the example in this folder to see how it works:

```bash
yarn dev
```

Take a look at the `index.html` and `styles.css` files.

You can see a deployed version of the example page in
[https://mistica-web.vercel.app/mistica-css](https://mistica-web.vercel.app/mistica-css)

## Dark mode support

By default, color tokens will change folloging the user's system preferences. If you want to force the dark or
light mode, you can add the `data-mistica-color-scheme` attribute:

```html
<body data-mistica-skin="movistar" data-mistica-color-scheme="light"></body>
```

`data-mistica-color-scheme` can be `light`, `dark` or `auto` (default).

## CSS custom properties

You can use the css custom properties in your css files. For example:

```css
.my-component {
  color: var(--mistica-color-textPrimary);
  background: var(--mistica-color-backgroundContainer);
  border: 1px solid var(--mistica-color-border);
  border-radius: var(--mistica-border-radius-container);
}
```

In general, the defined custom properties have the following naming convention:
`--mistica-{category}-{tokenName}`. Categories are `color`, `border-radius`, `font-size`, `font-weight`,
`line-height`.

To see all the available tokens, you can read the
[design tokens definition](https://github.com/Telefonica/mistica-design/blob/production/tokens/movistar.json)
or take a look inside one of the skin css files.

### Color tokens

Naming convention:

- `--mistica-color-{colorName}`

For example:

- `--mistica-color-textPrimary`
- `--mistica-color-backgroundContainer`, etc.

### Border radius tokens

Naming convention:

- `--mistica-border-radius-{radiusName}`

For example:

- `--mistica-border-radius-container`
- `--mistica-border-radius-button`, etc.

### Typography tokens

We define custom properties for `font-size`, `font-weight` and `line-height`. These tokens have the folloging
naming convention:

- `--mistica-font-size-{sizeName}`
- `--mistica-font-weight-{weightName}`
- `--mistica-line-height-{lineHeightName}`

For example:

- `--mistica-font-size-title1`
- `--mistica-font-weight-cardTitle`
- `--mistica-line-height-tabsLabel`, etc.

:warning: `font-size` and `line-height` custom properties are defined in `rem` units, so you should configure
your base font size in the `html` element to make them work properly. See
[fonts doc](https://github.com/Telefonica/mistica-web/blob/master/doc/fonts.md#dynamic-font-sizes)

:warning: some of these tokens have different values depending on the screen size, so usually font-sizes are
bigger in desktop (`@media (min-width: 1024px)`) than in mobile.

## Utility classes

Apart from the css custom properties, we also provide some utility classes that you can use in your html to
build some Mística components.

### Typography

We group the typography styles (`font-size`, `line-height`, `font-weight`) in classes that you can use in your
html.

Naming convention:

- `mistica-text-{sizeName}`

For example:

```html
<h1 class="mistica-text-title2">Title</h1>
```

The available classes are:

Base [text presets](https://mistica-web.vercel.app/?path=/story/components-text--text-components):

- `mistica-text-1`
- `mistica-text-2`
- `mistica-text-3`
- `mistica-text-4`
- `mistica-text-5`
- `mistica-text-6`
- `mistica-text-7`
- `mistica-text-8`
- `mistica-text-9`
- `mistica-text-10`

Title presets:

- `mistica-text-title1`
- `mistica-text-title2`

Others: see the full list in the
[token definition file](https://github.com/Telefonica/mistica-design/blob/production/tokens/movistar.json#L1384).

### Components

Some provided classes can be used to build components like Buttons, Cards, Tags, Accordion, etc. See some
examples in [index.html](./index.html).
