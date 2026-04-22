# Recipe: Form wizard (multi-step form)

A multi-section form spread across steps with validation, a progress stepper, and a funnel navigation bar.
Each step is a separate `Form` so validation runs independently per step.

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
  PhoneNumberField,
  Select,
  DateField,
  Switch,
  DoubleField,
  Title1,
  Text2,
  ButtonPrimary,
  ButtonSecondary,
  IconCloseRegular,
  SuccessFeedbackScreen,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const STEPS = ['Personal', 'Contact', 'Preferences'];

const PersonalStep = () => (
  <Stack space={16}>
    <Title1 as="h2">Personal information</Title1>
    <DoubleField layout="50/50">
      <TextField name="firstName" label="First name" />
      <TextField name="lastName" label="Last name" />
    </DoubleField>
    <DateField name="birthDate" label="Date of birth" />
    <Select
      name="idType"
      label="ID type"
      options={[
        {value: 'dni', text: 'DNI'},
        {value: 'passport', text: 'Passport'},
        {value: 'nie', text: 'NIE'},
      ]}
    />
    <TextField name="idNumber" label="ID number" />
  </Stack>
);

const ContactStep = () => (
  <Stack space={16}>
    <Title1 as="h2">Contact details</Title1>
    <EmailField name="email" label="Email address" />
    <PhoneNumberField name="phone" label="Phone number" />
    <TextField name="address" label="Street address" />
    <DoubleField layout="60/40">
      <TextField name="city" label="City" />
      <TextField name="postcode" label="Postcode" />
    </DoubleField>
  </Stack>
);

const PreferencesStep = () => (
  <Stack space={16}>
    <Title1 as="h2">Communication preferences</Title1>
    <Text2 regular color={skinVars.colors.textSecondary}>
      Choose how you'd like us to contact you.
    </Text2>
    <Switch name="emailUpdates">Email updates and offers</Switch>
    <Switch name="smsAlerts">SMS alerts</Switch>
    <Switch name="thirdParty">Share with partner brands</Switch>
  </Stack>
);

const steps = [PersonalStep, ContactStep, PreferencesStep];

const FormWizardContent = () => {
  const [step, setStep] = React.useState(0);
  const StepComponent = steps[step];

  if (step === STEPS.length) {
    return (
      <SuccessFeedbackScreen
        title="All done!"
        description="Your information has been saved."
        primaryButton={<ButtonPrimary onPress={() => setStep(0)}>Back to home</ButtonPrimary>}
      />
    );
  }

  return (
    <Form onSubmit={() => setStep((s) => s + 1)}>
      <ButtonFixedFooterLayout
        button={<ButtonPrimary submit>{step === STEPS.length - 1 ? 'Submit' : 'Continue'}</ButtonPrimary>}
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
              <StepComponent />
            </Stack>
          </Box>
        </ResponsiveLayout>
      </ButtonFixedFooterLayout>
    </Form>
  );
};

export const FormWizardScreen = () => (
  <ThemeContextProvider theme={theme}>
    <FormWizardContent />
  </ThemeContextProvider>
);
```
