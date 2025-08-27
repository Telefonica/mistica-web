## Migration Guide for the New Cards Ecosystem (Starting from Mistica 16.xx.xx)

The changes introduced in this version are backwards compatible; however, several components and props have
been deprecated. To ensure your code remains compatible with future major updates, please update your
implementation to replace the deprecated components and props as outlined below. This will prepare your
codebase for the eventual removal of these deprecated features.

### Card Components

- The `PosterCard` component has been deprecated. Use `<CoverCard size="default" />`.
- The `DisplayMediaCard` component has been deprecated. Use `<CoverCard size="display" />`.
- The `SmallNakedCard` component has been deprecated. Use `<NakedCard size="snap" />`.
- The `SnapCard` component has been deprecated. Use `<DataCard size="snap" />`.
- The `DisplayDataCard` component has been deprecated. Use `<DataCard size="display" />`.
- The `HighlightCard` component has been deprecated. Use `<MediaCard mediaPosition="right" />`.

### Card Props

- The `poster` prop has been deprecated. Use `imageSrc`. The `imageSrc` will be used as the poster when a
  video is provided.
- The `media` prop has been deprecated. Use `imageSrc`, `imageSrcSet`, or `videoSrc` and related props like
  `mediaAspectRatio`.
- The `extra` prop has been deprecated. Use `slot`.
- The `actions` prop has been deprecated. Use `topActions`.
- The `button` prop has been deprecated. Use `buttonPrimary`.
- The `secondaryButton` prop has been deprecated. Use `buttonSecondary`.
- The `isInverse` prop has been deprecated. Use `variant`.

### Behavior changes

- A card with onPress and buttons will show the Footer, containing the buttons, even if it was set to `false`
  via props.
- Cards now accept 3 kind of buttons: `buttonPrimary`, `buttonSecondary`, and `buttonLink`. You must use at
  most 2 buttons at the same time.
- Deprecated cards have a default `slotAlignment` of `bottom`. New cards have a default `slotAlignment` of
  `content`. If you want to keep the previous behavior, you must set `slotAlignment="bottom"` explicitly.

## Migration Guide from mistica 12.x to mistica 13.x

- First of all, we recommend to run the [`theme-colors-codemod.js`](../codemods/theme-colors-codemod.js). This
  codemod will replace all the usages of mistica colors from `Theme` (`useTheme`) with the css variables
  defined in `skinVars.colors`.
  - If you aren't familiar with codemods, take a look at
    [jscodeshift doc](https://github.com/facebook/jscodeshift)
  - To run the codemod execute:
    ```sh
    npx jscodeshift -t codemods/theme-colors-codemod.js <path-to-your-code>
    ```
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
