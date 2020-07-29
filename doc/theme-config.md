# Theme config

The `ThemeContextProvider` component receives a `theme` prop where you can customize some aspects of the lib.
The `theme` prop must have the following type:

```ts
type ThemeConfig = {
  skin: 'Movistar' | 'O2' | 'Vivo' | 'O2-classic';
  colorOverride?: 'prominent';
  i18n: {
    locale: Locale;
    phoneNumberFormattingRegionCode: RegionCode;
  };
  platformOverrides?: {
    platform?: 'ios' | 'android';
    insideNovumNativeApp?: boolean;
  };
  texts?: ThemeTexts;
  analytics?: {
    logEvent: (event: TrackingEvent) => Promise<void>;
  };
  mediaQueries?: {
    tabletMinWidth: number;
    desktopMinWidth: number;
    largeDesktopMinWidth: number;
    desktopOrTabletMinHeight: number;
  };
};
```

Only `skin` and `i18n` are mandatory.

Here is a description of every attribute:

- `skin`: determines the color scheme used by the lib.
- `colorOverride?`: some skins, like `'Movistar'`, have a different color scheme for some customers (Movistar
  Priority). To enable Movistar Priority color scheme, set `skin` to `'Movistar'` and `colorOverride` to
  `'prominent'`.
- `i18n`: we use this to localize some messages or formatting dates phone numbers, etc.
  - `locale`: a valid locale (language and region codes separated by `'-'`). For example `'es-ES'`.
  - `phoneNumberFormattingRegionCode`: region code used to format phone numbers (for example in
    `FormPhoneNumberField`).
- `platformOverrides?`:
  - `platform?`: the lib applies some style differences depending on the current platform.
    `@telefonica/mistica` will try to automatically detect the platform, but you can manually set this setting
    to `'ios'` or `'android'`
  - `insideNovumNativeApp?:` some components have different behavior if the web is running inside a webview in
    the native Novum App. The lib can autodetect it, but you can force it by setting this to `true`.
- `texts?`: some copies you can customize. See [customizable texts doc](./texts.md).
- `analytics?`: see [analytics docs](./analytics.md).
- `mediaQueries?`: see [media queries doc](./media-queries.md).
