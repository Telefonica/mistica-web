# @telefonica/mistica

> React components library for Telefonica Design System (Mistica). Provides a comprehensive set of UI components, layout primitives, form fields, theming, analytics integration, and more for building web applications following Telefonica's design guidelines.

## Install

```
yarn add @telefonica/mistica
```

or

```
npm install @telefonica/mistica
```

## Quick start

Before using any component, wrap your React app root with `<ThemeContextProvider>`. You must also import the library CSS.

```js
import '@telefonica/mistica/css/mistica.css';

import {
  ThemeContextProvider,
  Form,
  Box,
  Stack,
  TextField,
  EmailField,
  ButtonLayout,
  ButtonPrimary,
  alert,
  getMovistarSkin,
} from '@telefonica/mistica';

const App = () => (
  <Form
    onSubmit={(formData) =>
      alert({
        title: 'This is your data',
        message: JSON.stringify(formData, null, 2),
      })
    }
  >
    <Box padding={16}>
      <Stack space={16}>
        <TextField name="name" label="Name" />
        <EmailField name="email" label="Email" />
        <ButtonLayout primaryButton={<ButtonPrimary submit>Send</ButtonPrimary>} />
      </Stack>
    </Box>
  </Form>
);

const misticaTheme = {
  skin: getMovistarSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <ThemeContextProvider theme={misticaTheme}>
    <App />
  </ThemeContextProvider>
);
```

## Theme configuration

The `theme` prop in `ThemeContextProvider` is mandatory. The only two required fields are `skin` and `i18n`:

```ts
type ThemeConfig = {
  skin: Skin;
  colorScheme?: 'light' | 'dark' | 'auto'; // default: 'auto'
  i18n: {
    locale: Locale;
    phoneNumberFormattingRegionCode: RegionCode;
  };
  platformOverrides?: {
    platform?: 'ios' | 'android';
    insideNovumNativeApp?: boolean;
    userAgent?: string;
  };
  texts?: Partial<Dictionary>;
  analytics?: {
    logEvent: (event: TrackingEvent) => Promise<void>;
    eventFormat?: 'universal-analytics' | 'google-analytics-4';
  };
  Link?: LinkComponent;
  useHrefDecorator?: () => (href: string) => string;
  preventCopyInFormFields?: boolean;
};
```

Available skins: `getMovistarSkin()`, `getVivoSkin()`, `getO2Skin()`, `getTelefonicaSkin()`, and others via `getSkinByName()`. You can also create a custom skin by implementing the `Skin` type.

Built-in Link integrations: `Next12`, `Next13`, `Next14`, `ReactRouter5`, `ReactRouter6`.

The `theme` object should be constant (declared outside the component) or memoized with `React.useMemo` when dynamic.

## Next.js optimization

For Next.js app router, enable this experimental config to improve tree shaking, reduce bundle size and build time:

```js
experimental: {
  optimizePackageImports: ['@telefonica/mistica'];
}
```

## Layout primitives

- `Box` -- padding container (`padding`, `paddingX`, `paddingY`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`)
- `Stack` -- vertical distribution with `space` prop
- `Inline` -- horizontal distribution with `space` prop (numeric, `'between'`, `'around'`, `'evenly'`)
- `ResponsiveLayout` -- responsive page content container
- `HeaderLayout` -- page header (uses ResponsiveLayout internally, do not wrap in one)
- `GridLayout` -- grid with templates `'6+6'`, `'8+4'`, `'5+4'` (must be inside ResponsiveLayout)
- `MasterDetailLayout` -- sidebar list + detail view pattern
- `NegativeBox` -- allows children to overflow container (useful for non-boxed lists)

Vertical rhythm guidelines: containers have 24px top/bottom padding, sections use 32px spacing, elements use 16px spacing.

## Forms

Use `<Form>` for automatic state handling, validation, loading states, and field disabling during submission.

- Submit buttons must include the `submit` prop
- Form fields are required by default; use `optional` prop to mark as optional
- `onSubmit` receives an object of field name/value pairs and must return a promise
- Fields accept a `validate` prop returning an error string or empty string on success
- `initialValues` prop pre-fills form fields

Available form fields: `TextField`, `CreditCardFields`, `CreditCardNumberField`, `CreditCardExpirationField`, `CvvField`, `DateField`, `DecimalField`, `IntegerField`, `PasswordField`, `EmailField`, `Select`, `PhoneNumberField`, `IbanField`.

Use `DoubleField` to place two fields in the same row. Use `useForm` hook for advanced form logic.

## Analytics

Components like buttons accept a `trackingEvent` prop. Configure tracking via `theme.analytics.logEvent`. Use the `trackEvent` boolean prop for default tracking events. Supports both Universal Analytics and Google Analytics 4 event formats.

Use `TrackingConfig` context provider to set `eventFormat` for a specific subtree.

## Sheets (bottom sheets)

Predefined sheets: `RadioListSheet`, `ActionsListSheet`, `InfoSheet`, `ActionsSheet`.

Setup: wrap your app with `<SheetRoot>`, then call `showSheet()` imperatively from anywhere. For native webview support, pass `nativeImplementation` prop to `SheetRoot`.

Custom sheets: use the `<Sheet>` component directly with any content as children.

## Fonts

Components are optimized for system fonts (Roboto / San Francisco). Works with custom fonts like OnAir or Telefonica fonts. For fonts without medium weight, map regular weight to font-weight 500.

Set base font size to 16px for dynamic font size support. Include `-apple-system-body` for iOS Dynamic Type.

## Customizable texts

Override default component texts via `theme.texts`. Use `textTokens` and the `t()` function from `useTheme()` to access localized text tokens.

## Testing

- Use `NODE_ENV` guards for test-specific code
- Unit tests usually don't need CSS; use acceptance tests for layout-dependent behavior
- Use `isRunningAcceptanceTest` with `'acceptance-test'` in user agent for acceptance test mode

## Community components

Community components live in `src/community/` and are exported via `src/community/index.tsx`. Import from `@telefonica/mistica/community`.

## Docs

- [Theme configuration](./theme-config.md): full ThemeConfig reference, Link component setup, custom skins
- [Layout](./layout.md): Box, Stack, Inline, ResponsiveLayout, HeaderLayout, GridLayout, MasterDetailLayout, NegativeBox, vertical rhythm
- [Forms](./forms.md): Form component, all form field types, DoubleField, useForm hook
- [Analytics](./analytics.md): trackingEvent prop, logEvent setup, default tracking, GA4 support, TrackingConfig
- [Fonts](./fonts.md): font family setup, system fonts, custom fonts, weight mapping, dynamic font sizes
- [Texts](./texts.md): customizable text tokens, Dictionary type, translate function
- [Sheets](./sheet.md): predefined sheets, SheetRoot, showSheet API, native webview integration, custom sheets
- [Testing](./testing.md): NODE_ENV, unit tests, acceptance tests, isRunningAcceptanceTest
- [Lottie](./lottie.md): optimizing bundle size with lottie-web light build
- [Migration guide](./migration-guide.md): cards ecosystem migration (v16), v12 to v13 migration
