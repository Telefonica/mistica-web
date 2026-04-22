# Recipe: Onboarding / step-by-step flow

A multi-step funnel with a stepper indicator, `FunnelNavigationBar`, and `ButtonFixedFooterLayout`. Each step
is a separate component — swap `currentStep` state to navigate between them.

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
  Title1,
  Text2,
  TextField,
  ButtonPrimary,
  ButtonSecondary,
  IconCloseRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const STEPS = ['Personal', 'Address', 'Confirm'];

const Step0 = () => (
  <Stack space={16}>
    <Title1 as="h2">Personal details</Title1>
    <Text2 regular color={skinVars.colors.textSecondary}>
      Tell us about yourself.
    </Text2>
    <TextField name="firstName" label="First name" />
    <TextField name="lastName" label="Last name" />
  </Stack>
);

const Step1 = () => (
  <Stack space={16}>
    <Title1 as="h2">Your address</Title1>
    <TextField name="street" label="Street" />
    <TextField name="city" label="City" />
  </Stack>
);

const Step2 = () => (
  <Stack space={16}>
    <Title1 as="h2">Confirm your details</Title1>
    <Text2 regular>Review the information above before continuing.</Text2>
  </Stack>
);

const steps = [Step0, Step1, Step2];

const OnboardingContent = () => {
  const [current, setCurrent] = React.useState(0);
  const StepComponent = steps[current];
  const isLast = current === STEPS.length - 1;

  return (
    <ButtonFixedFooterLayout
      button={
        <ButtonPrimary onPress={() => setCurrent((c) => Math.min(c + 1, STEPS.length - 1))}>
          {isLast ? 'Finish' : 'Continue'}
        </ButtonPrimary>
      }
      secondaryButton={
        current > 0 ? (
          <ButtonSecondary onPress={() => setCurrent((c) => c - 1)}>Back</ButtonSecondary>
        ) : undefined
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
            <Stepper currentIndex={current} steps={STEPS} />
            <StepComponent />
          </Stack>
        </Box>
      </ResponsiveLayout>
    </ButtonFixedFooterLayout>
  );
};

export const OnboardingScreen = () => (
  <ThemeContextProvider theme={theme}>
    <OnboardingContent />
  </ThemeContextProvider>
);
```
