# Theme config

The `ThemeContextProvider` component receives a `theme` prop where you can customize some aspects of the lib.
The `theme` prop must have the following type:

```ts
type ThemeConfig = {
  skin: Skin;
  i18n: {
    locale: Locale;
    phoneNumberFormattingRegionCode: RegionCode;
  };
  platformOverrides?: {
    platform?: 'ios' | 'android';
    insideNovumNativeApp?: boolean;
    userAgent?: string;
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

- `skin`: determines the color scheme used by the lib. You can use `getMovistarSkin`, `getVivoSkin` to use a
  specific skin or `getSkinByName`.
- `i18n`: we use this to localize some messages or formatting dates phone numbers, etc.
  - `locale`: a valid locale (language and region codes separated by `'-'`). For example `'es-ES'`.
  - `phoneNumberFormattingRegionCode`: region code used to format phone numbers (for example in
    `PhoneNumberField`).
- `platformOverrides?`:
  - `platform?`: the lib applies some style differences depending on the current platform.
    `@telefonica/mistica` will try to automatically detect the platform, but you can manually set this setting
    to `'ios'` or `'android'`
  - `insideNovumNativeApp?:` some components have different behavior if the web is running inside a webview in
    the native Novum App. The lib can autodetect it, but you can force it by setting this to `true`.
  - `userAgent:` **IMPORTANT** In case you are using SSR, you should set this value with the user-agent header
    you receive on every request to your server, otherwise the server-side render won't take the user agent
    into account.
- `texts?`: some copies you can customize. See [customizable texts doc](./texts.md).
- `analytics?`: see [analytics docs](./analytics.md).
- `mediaQueries?`: see [media queries doc](./media-queries.md).
