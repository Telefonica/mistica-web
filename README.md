![Mistica for Web](img/mistica-web-light.svg#gh-light-mode-only)
![Mistica for Web](img/mistica-web-dark.svg#gh-dark-mode-only)

React components library for Telefonica Design System ([Mistica](https://github.com/Telefonica/mistica))

![Node.js CI](https://github.com/Telefonica/mistica-web/workflows/Node.js%20CI/badge.svg)

## Getting started

### Install

```terminal
yarn add @telefonica/mistica
```

or

```terminal
npm install @telefonica/mistica
```

### Start using `@telefonica/mistica`

Before using any of our components you have to add `<ThemeContextProvider>` in the root of your React app.
Here is a complete example of a form with two text fields and a submit button:

```javascript
import {createRoot} from 'react-dom/client';
// Import Mistica styles. Depending on the bundler you use, you may need to import it in a different way.
import '@telefonica/mistica/css/mistica.css';

// Use mistica components
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

The `theme` prop in `ThemeContextProvider` is **mandatory**, and you can use it to configure some aspects of
the library. There are multiple settings but the only two mandatory fields are `skin` and `i18n`. Read the
[theme config doc](https://github.com/Telefonica/mistica-web/blob/master/doc/theme-config.md) for more info.

:warning: Usually, the `theme` object is constant and won't need to change dynamically in your application, in
that case we recommend to extract it to an external `const` variable outside of the component, this way the
object reference will be the same in every re-render. If for some reason the `theme` must be dynamic in your
app, consider to memoize it (for example, with `React.useMemo` hook).

### Mistica in Next.js app router

If you are using Next.js app router, we highly recommend enabling the following experimental config:

```js
experimental: {
  optimizePackageImports: ['@telefonica/mistica'];
}
```

This will improve the tree shaking of the library, reduce the bundle size and the build time. For more info
read this Next blog post: https://vercel.com/blog/how-we-optimized-package-imports-in-next-js

## Components

Explore the components in [Mistica storybook](https://mistica-web.vercel.app)

Start prototyping interfaces with Mistica components in the
[Mistica playroom](https://mistica-web.vercel.app/playroom)

## More docs

- [Examples](https://github.com/Telefonica/mistica-web/tree/master/examples)
- [Understanding Mistica's layout components](https://github.com/Telefonica/mistica-web/blob/master/doc/layout.md)
- [Working with forms](https://github.com/Telefonica/mistica-web/blob/master/doc/forms.md)
- [Theme config options](https://github.com/Telefonica/mistica-web/blob/master/doc/theme-config.md)
- [Customize default texts](https://github.com/Telefonica/mistica-web/blob/master/doc/texts.md)
- [Analytics](https://github.com/Telefonica/mistica-web/blob/master/doc/analytics.md)
- [Fonts](https://github.com/Telefonica/mistica-web/blob/master/doc/fonts.md)
- [Testing notes](https://github.com/Telefonica/mistica-web/blob/master/doc/testing.md)

## Development

- `yarn test`: run tests
- `yarn test-acceptance`: run acceptance tests headless (you need to start storybook first)
- `yarn test-acceptance --ui`: run acceptance tests with ui (you need to start storybook first)
- `yarn lint`: check codestyle
- `yarn ts-check`: check static types
- `yarn build`: build package
- `yarn storybook`: starts storybook
- `yarn playroom`: starts playroom

## More about Mistica

- [Mistica, the Telefonica Design System](https://github.com/Telefonica/mistica)

### Mistica in other platforms

- [Android](https://github.com/Telefonica/mistica-android)
- [iOS](https://github.com/Telefonica/mistica-ios)

## Contributing

See [CONTRIBUTING.md](https://github.com/Telefonica/mistica-web/blob/master/CONTRIBUTING.md)

### Mistica Community

About [Mistica Community](https://mistica-web.vercel.app/?path=/story/community-welcome--default)

If you are building a Mistica Community component, place it inside the
[`src/community` folder](src/community/) and don't forget to export it in the
[`src/community/index.ts`](src/community/index.tsx) file to make it public.
