# Recipe: Confirmation / success screen

Uses `SuccessFeedbackScreen` which manages its own full-page layout — do **not** wrap it in
`ResponsiveLayout`. Place it at the page level.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  ButtonPrimary,
  ButtonSecondary,
  SuccessFeedbackScreen,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const ConfirmationContent = () => (
  <SuccessFeedbackScreen
    title="Order confirmed"
    description="Your order has been placed. You'll receive a confirmation email shortly."
    primaryButton={<ButtonPrimary onPress={() => {}}>Go to my orders</ButtonPrimary>}
    secondaryButton={<ButtonSecondary onPress={() => {}}>Back to home</ButtonSecondary>}
  />
);

export const ConfirmationScreen = () => (
  <ThemeContextProvider theme={theme}>
    <ConfirmationContent />
  </ThemeContextProvider>
);
```

## Error variant

```tsx
import {ErrorFeedbackScreen} from '@telefonica/mistica';

<ErrorFeedbackScreen
  title="Something went wrong"
  description="We couldn't complete your request. Please try again."
  primaryButton={<ButtonPrimary onPress={() => {}}>Try again</ButtonPrimary>}
/>;
```
