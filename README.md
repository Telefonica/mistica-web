# Mistica web

React components library for Telefonica design system (Mistica)

## Getting started

Install this library with `yarn add @telefonica/mistica-web`. Before using any of our components you have to add
`<ThemeContextProvider>` to your page (more info below). IE:

```javascript
import React from 'react';
import {ButtonPrimary, ThemeContextProvider} from '@telefonica/mistica-web';

const MyComponent = () => (
  <ThemeContextProvider
    theme={{skin: 'Movistar', i18n: {locale: 'es_ES', phoneNumberFormattingRegionCode: 'ES'}}}
  >
    <ButtonPrimary href="/test">
      test
    </ButtonPrimary>
  </ThemeContextProvider>
);
```

## Components

- ScreenReaderOnly
- Touchable
- Spinner
- FadeIn
- FixedFooterLayout
- ButtonLayout
- ButtonFixedFooterLayout
- Buttons:
  - ButtonPrimary
  - ButtonSecondary
  - ButtonDanger
  - ButtonLink
- IconButton
- Snackbar
- Portal
- LoadingBar
- Feedbacks:
  - Feedback
  - ErrorFeedbackScreen
  - InfoFeedbackScreen
  - SuccessFeedbackScreen
- Popover
- FocusTrap
- Dialogs (_these two are helper functions, not components_):
  - confirm
  - alert
- IcnClose
- FixedToTop
- OverscrollColor
- [Forms and form fields](./doc/forms.md)

See storybook for usage examples

## Context

- **ThemeContextProvider**: This is the most important context provider. It _has to be included in your pages_
  if you want to use any of our components. Its value includes a lot of properties, but the only mandatory one
  is `skin`. It specifies the brand colors to use (Movistar, tuenti, etc...)
- **TopDistanceContext**: This is a provider used along with `<FixToTop>` component.
- **OverscrollColorProvider**: This provider is used along with `<OverscrollColor>` and
  `<ThemeVariantContext>` to allow us to customize the color that shows up when the user overscolls on iOS
  devices.
- **ThemeVariantContext**: This provider is used by some components to determine which theme variant to use.

## JSS

As part of this package we expose some interfaces to style our components. Refer
[here](https://github.com/tef-novum/webapp/blob/master/doc/styling.md) for more info.

## Development

- `yarn test`: run tests
- `yarn lint`: check codestyle
- `yarn build`: build package
- `yarn watch`: build package and watch for changes
- `yarn clean`: remove generated files
