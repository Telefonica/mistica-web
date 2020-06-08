# Mistica web

![Mistica loves React](./img/mistica-react-logo.svg)

React components library for Telefonica Design System ([Mistica](https://github.com/Telefonica/mistica))

## Getting started

### Install

1. Create or edit your .npmrc file to include the telefonica npm read token:

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
    theme={{skin: 'Movistar', i18n: {locale: 'es_ES', phoneNumberFormattingRegionCode: 'ES'}}}
  >
    <App />
  </ThemeContextProvider>,
  document.getElementById('app')
);
```

The `theme` prop in `ThemeContextProvider` is **mandatory**, and you can use it to configure some aspects of
the library. There are multiple settings but the only two mandatory fields are `skin` and `i18n`.

- `skin`: determines the color scheme used by the lib. It can be `Movistar`, `O2` or `Vivo`.
- `i18n`: we use this to localize some messages or formatting dates phone numbers, etc.
  - `locale`: a valid locale (language and country codes separated by `'_'`)
  - `phoneNumberFormattingRegionCode`: region code used to format phone numbers.

## Components

Explore the components in [Mistica storybook](https://mistica-web.now.sh)

Start prototyping interfaces with Mistica components in the
[Mistica playroom](https://mistica-web.now.sh/playroom)

## More docs

- [Working with forms](./doc/forms.md)

## Development

- `yarn test`: run tests
- `yarn lint`: check codestyle
- `yarn build`: build package
- `yarn watch`: build package and watch for changes
- `yarn storybook`: starts storybook
- `yarn playroom`: starts playroom

## More about Mistica

- [Mistica, the Telefonica Design System](https://github.com/Telefonica/mistica)

### Mistica in other platforms

- [Android (WIP)](https://github.com/Telefonica/mistica-android)
- [iOS (WIP)](https://github.com/Telefonica/mistica-ios)
