# Recipe: Error state screen

Use `ErrorFeedbackScreen` for full-page errors and `EmptyState` for in-page empty/error sections.

## Full-page error

`ErrorFeedbackScreen` manages its own layout — do **not** wrap it in `ResponsiveLayout`.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  ErrorFeedbackScreen,
  ButtonPrimary,
  ButtonSecondary,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const ErrorContent = () => (
  <ErrorFeedbackScreen
    title="Something went wrong"
    description="We couldn't load this page. Check your connection and try again."
    primaryButton={<ButtonPrimary onPress={() => window.location.reload()}>Try again</ButtonPrimary>}
    secondaryButton={<ButtonSecondary onPress={() => {}}>Back to home</ButtonSecondary>}
  />
);

export const ErrorScreen = () => (
  <ThemeContextProvider theme={theme}>
    <ErrorContent />
  </ThemeContextProvider>
);
```

## In-page error section

Use `EmptyState` when only part of the page fails to load:

```tsx
import {EmptyState, ButtonLink} from '@telefonica/mistica';

<EmptyState
  title="Failed to load"
  description="We couldn't load this section. Please try again."
  button={<ButtonLink onPress={() => {}}>Retry</ButtonLink>}
/>;
```
