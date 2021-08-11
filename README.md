<img alt="Mística for Web" src="https://raw.githubusercontent.com/Telefonica/mistica-web/master/img/mistica-web.svg">
<br>

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
import ReactDOM from 'react-dom';
import React from 'react';
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
        <ButtonLayout>
          <ButtonPrimary submit>Send</ButtonPrimary>
        </ButtonLayout>
      </Stack>
    </Box>
  </Form>
);

ReactDOM.render(
  <ThemeContextProvider
    theme={{skin: getMovistarSkin(), i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
  >
    <App />
  </ThemeContextProvider>,
  document.getElementById('app')
);
```

The `theme` prop in `ThemeContextProvider` is **mandatory**, and you can use it to configure some aspects of
the library. There are multiple settings but the only two mandatory fields are `skin` and `i18n`. Read the
[theme config doc](https://github.com/Telefonica/mistica-web/blob/master/doc/theme-config.md) for more info.

## Components

Explore the components in [Mistica storybook](https://mistica-web.now.sh)

Start prototyping interfaces with Mistica components in the
[Mistica playroom](https://mistica-web.now.sh/playroom)

## More docs

- [Understanding Mistica's layout components](https://github.com/Telefonica/mistica-web/blob/master/doc/layout.md)
- [Working with forms](https://github.com/Telefonica/mistica-web/blob/master/doc/forms.md)
- [Theme config options](https://github.com/Telefonica/mistica-web/blob/master/doc/theme-config.md)
- [Customize media query break points](https://github.com/Telefonica/mistica-web/blob/master/doc/media-queries.md)
- [Customize default texts](https://github.com/Telefonica/mistica-web/blob/master/doc/texts.md)
- [Analytics](https://github.com/Telefonica/mistica-web/blob/master/doc/analytics.md)
- [Style your components](https://github.com/Telefonica/mistica-web/blob/master/doc/styles.md)
- [Fonts](https://github.com/Telefonica/mistica-web/blob/master/doc/fonts.md)
- [Testing notes](https://github.com/Telefonica/mistica-web/blob/master/doc/testing.md)

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

- [Android](https://github.com/Telefonica/mistica-android)
- [iOS](https://github.com/Telefonica/mistica-ios)

## Contributing

See [CONTRIBUTING.md](https://github.com/Telefonica/mistica-web/blob/master/CONTRIBUTING.md)
