# Media queries

`@telefonica/mistica` has support for responsive web design. Some components adapt to the viewport size and
change their styles between certain break points.

`@telefonica/mistica` defines some default values for those breakpoints, but you can customize them.

These are the default values:

- `tabletMinWidth`: `768`
- `desktopMinWidth`: `1024`
- `largeDesktopMinWidth`: `1368`
- `desktopOrTabletMinHeight`: `550`

And you can customize them by setting up the `mediaQueries` field in [`theme` prop](./theme-config.md):

```js
<ThemeContextProvider
  theme={{
    skin: 'Movistar',
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    mediaQueries: {
      largeDesktopMinWidth: 1200,
    },
  }}
>
  <App />
</ThemeContextProvider>
```
