# Recipe: Checkout / payment

A multi-step checkout: billing details, payment (credit card fields), and a confirmation screen. Uses
`Stepper`, `CreditCardFields`, and finally `SuccessFeedbackScreen`.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  FunnelNavigationBar,
  NavigationBarAction,
  NavigationBarActionGroup,
  ButtonFixedFooterLayout,
  ResponsiveLayout,
  Box,
  Stack,
  Stepper,
  Form,
  TextField,
  EmailField,
  CreditCardFields,
  SuccessFeedbackScreen,
  Title1,
  Text2,
  ButtonPrimary,
  ButtonSecondary,
  IconCloseRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const STEPS = ['Billing', 'Payment', 'Confirm'];

const BillingStep = () => (
  <Stack space={16}>
    <Title1 as="h2">Billing details</Title1>
    <TextField name="name" label="Full name" />
    <EmailField name="email" label="Email" />
    <TextField name="address" label="Address" />
  </Stack>
);

const PaymentStep = () => (
  <Stack space={16}>
    <Title1 as="h2">Payment</Title1>
    <Text2 regular color={skinVars.colors.textSecondary}>
      Your card details are encrypted and secure.
    </Text2>
    <CreditCardFields />
  </Stack>
);

const CheckoutContent = () => {
  const [step, setStep] = React.useState(0);

  if (step === STEPS.length) {
    return (
      <SuccessFeedbackScreen
        title="Order placed!"
        description="You'll receive a confirmation email shortly."
        primaryButton={<ButtonPrimary onPress={() => setStep(0)}>Back to home</ButtonPrimary>}
      />
    );
  }

  return (
    <Form onSubmit={() => setStep((s) => s + 1)}>
      <ButtonFixedFooterLayout
        button={
          <ButtonPrimary submit loadingText="Processing…">
            {step === STEPS.length - 1 ? 'Place order' : 'Continue'}
          </ButtonPrimary>
        }
        secondaryButton={
          step > 0 ? <ButtonSecondary onPress={() => setStep((s) => s - 1)}>Back</ButtonSecondary> : undefined
        }
      >
        <FunnelNavigationBar
          right={
            <NavigationBarActionGroup>
              <NavigationBarAction aria-label="Close" onPress={() => {}}>
                <IconCloseRegular color="currentColor" />
              </NavigationBarAction>
            </NavigationBarActionGroup>
          }
        />
        <ResponsiveLayout>
          <Box paddingY={24}>
            <Stack space={32}>
              <Stepper currentIndex={step} steps={STEPS} />
              {step === 0 && <BillingStep />}
              {step === 1 && <PaymentStep />}
              {step === 2 && (
                <Stack space={16}>
                  <Title1 as="h2">Review your order</Title1>
                  <Text2 regular color={skinVars.colors.textSecondary}>
                    Check everything looks correct before placing your order.
                  </Text2>
                </Stack>
              )}
            </Stack>
          </Box>
        </ResponsiveLayout>
      </ButtonFixedFooterLayout>
    </Form>
  );
};

export const CheckoutScreen = () => (
  <ThemeContextProvider theme={theme}>
    <CheckoutContent />
  </ThemeContextProvider>
);
```
