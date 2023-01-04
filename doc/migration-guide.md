## Migration Guide from mistica 2.x to mistica 3.x

- First of all, we recommend to run the [`theme-colors-codemod.js`](../codemods/theme-colors-codemod.js). This
  codemod will replace all the usages of mistica colors from `Theme` (`useTheme`) with the css variables
  defined in `skinVars.colors`.
- `ThemeConfig.colorScheme` is now `'auto'` by default, this means that mistica will automatically detect the
  user's preferred color scheme and apply it. If you want to force a color scheme in your app, you can set it
  to `'light'` or `'dark'` instead.
- If you were using the `borderLight` and/or `borderDark` colors, you'll need to replace them with `borderLow`
  and `borderHigh` respectively.
- If you were applying alpha to mistica colors using some custom function, you'll need to use the new
  `applyAlpha` function from mistica instead.
  - Don't use `applyAlpha` with `skinVars.colors`, use it with `skinVars.rawColors` instead.
- Mistica doesn't ship with builtin jss anymore. If you are using `createUseStyles` in your app, you will need
  to install `jss` and `react-jss` as dependencies of your app.
  - Keep in mind that the `jss` that mistica was using in versions 12 and below had some plugins that you may
    still need in your app if you have decided to keep using `jss`. In that case, take a look at mistica
    [`jss` setup in v12](https://github.com/Telefonica/mistica-web/blob/v12.13.0/src/jss.tsx#L15-L26) because
    you may need some similar setup.
- From version 13, mistica ships with a css file that your app must serve. You can find it in
  `@telefonica/mistica/css/mistica.css`. The way of serve this css may be different depending on your bundler
  setup, but the most common way is importing it like this:
  ```js
  import '@telefonica/mistica/css/mistica.css';
  ```
- If you were using the `extra` prop in `DataCard`, `MediaCard` and/or `SnapCard` components, you may need to
  adjust some paddings, because previous versions of mistica were adding a top padding of 16px.
- Some icons changes:
  - If you were using the `chevron-top-regular` icon, replace the usages with `chevron-up-regular`
  - If you were using the `play` or `pause` icons, replace them with `play-circle` and `pause-circle`
    respectively.
- The `small` prop has been removed from `TextLink`. Wrapping `TextLink` with a `<Text2 regular>` should be
  equivalent in font size, but with a small variation in line height.
