# Mistica web

![Mistica loves React](./img/mistica-react-logo.svg)

React components library for Telefonica Design System ([Mistica](https://github.com/Telefonica/mistica))

![Node.js CI](https://github.com/Telefonica/mistica-web/workflows/Node.js%20CI/badge.svg)

## Getting started

### Install

1. Create or edit your `.npmrc` file to include the telefonica npm token. This will allow you to install
   packages from the npm `@telefonica` organization:

```
//registry.npmjs.org/:_authToken=864bbe83-5a77-4d21-a87f-f56375f06845
```

2. Install:

```terminal
yarn add @telefonica/mistica
```

### Start using `@telefonica/mistica`

Before using any of our components you have to add `<ThemeContextProvider>` in the root of your React app.
Here is a complete example of a form with two text fields and a submit button:

```javascript
import ReactDOM from 'react-dom';
import React from 'react';
import {
  ThemeContextProvider,
  Form,
  Box,
  Stack,
  FormTextField,
  FormEmailField,
  ButtonLayout,
  ButtonPrimary,
  alert,
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
        <FormTextField name="name" label="Name" />
        <FormEmailField name="email" label="e-mail" />
        <ButtonLayout>
          <ButtonPrimary submit>Send</ButtonPrimary>
        </ButtonLayout>
      </Stack>
    </Box>
  </Form>
);

ReactDOM.render(
  <ThemeContextProvider
    theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
  >
    <App />
  </ThemeContextProvider>,
  document.getElementById('app')
);
```

The `theme` prop in `ThemeContextProvider` is **mandatory**, and you can use it to configure some aspects of
the library. There are multiple settings but the only two mandatory fields are `skin` and `i18n`. Read the
[theme config doc](./doc/theme-config.md) for more info.

## Components

Explore the components in [Mistica storybook](https://mistica-web.now.sh)

Start prototyping interfaces with Mistica components in the
[Mistica playroom](https://mistica-web.now.sh/playroom)

## Limitations

### Negative margin

There is one limitation with the negative margin we use to implement the `ButtonLayout` component. A
horizontal scroll will appear if a negative margin goes beyond the `<body>`. There are 2 available
workarounds:

1. Applying padding to the parent with at least half the spacing value applied to the child:

   ```jsx
   <body>
     <Box paddingX={16}>
       <ButtonLayout>//...</ButtonLayout>
     </Box>
   </body>
   ```

2. Adding `overflow-x: hidden;` to the parent.

## More docs

- [Working with forms](./doc/forms.md)
- [Theme config options](./doc/theme-config.md)
- [Customize media query break points](./doc/media-queries.md)
- [Customize default texts](./doc/texts.md)
- [Analytics](./doc/analytics.md)
- [Style your components](./doc/styles.md)

## Development

- `yarn test`: run tests
- `yarn test-acceptance`: run acceptance tests headless (you need to start storybook first)
- `yarn test-acceptance-ui`: run acceptance tests with ui (you need to start storybook first)
- `yarn lint`: check codestyle
- `yarn ts-check`: check static types
- `yarn build`: build package
- `yarn watch`: build package and watch for changes
- `yarn storybook`: starts storybook
- `yarn playroom`: starts playroom

## More about Mistica

- [Mistica, the Telefonica Design System](https://github.com/Telefonica/mistica)

### Mistica in other platforms

- [Android (WIP)](https://github.com/Telefonica/mistica-android)
- [iOS (WIP)](https://github.com/Telefonica/mistica-ios)
