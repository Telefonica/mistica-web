# Theme config

The `ThemeContextProvider` component receives a `theme` prop where you can customize some aspects of the lib.
The `theme` prop must have the following type:

```ts
type ThemeConfig = {
  skin: Skin;
  colorScheme?: ColorScheme;
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
  Link?: LinkComponent;
  useHrefDecorator: () => (href: string) => string;
};
```

Only `skin` and `i18n` are mandatory.

Here is a description of every attribute:

- `skin`: determines the color set used by the lib. You can use `getMovistarSkin`, `getVivoSkin` to use a
  specific skin or `getSkinByName`.
- `colorScheme`: used to enable/disable the dark mode support. It can be `'light'` (default value, force light
  mode), `'dark'` (force dark mode), or `'auto'` (uses OS/browser settings). We recommend using `'auto'` if
  you want to support dark mode in your app.
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
- `Link?`: the `Link` component you want to use by Touchables that use the prop `to`. By default, the lib uses
  an anchor tag (`<a>`). Use this prop to use the Link component from ReactRouter, Next.js or any other
  library.
- `useHrefDecorator`: it is a React hook that a function that takes a `href` and returns a new `href`. This is
  useful to automatically add parameters to the `href` being used in Touchable components (for example, to add
  a `utm_source` parameter to the `href`).

  ## Create a custom skin

  If your app doesn't follow the branding of mistica builtin skins (Movistar, Vivo, O2, Telefonica, etc.), you
  can still use mistica with your custom skin. Just import the `Skin` type and create a new skin config that
  implements the `Skin` interface (you need to define all the required color constants):

  ```ts
  import type {Skin} from '@telefonica/mistica';

  const skin: Skin = {
    name: "your skin name",
    colors: {
      // define here the required color constants
    },
    darkModeColors: {
      // optionally define here the color constant overrides for dark mode
    }
  }

  <ThemeContextProvider
        theme={{
            skin,
            i18n: {
                locale: 'es-ES',
                phoneNumberFormattingRegionCode: 'ES',
            },
        }}
    >
        <App />
    </ThemeContextProvider>
  ```
