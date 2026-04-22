# Recipe: Login screen

A standard login form with email, password, and a primary CTA. Uses `ButtonFixedFooterLayout` so the button
stays at the bottom on mobile without obscuring the form.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  ButtonFixedFooterLayout,
  ResponsiveLayout,
  Box,
  Stack,
  Title1,
  Text2,
  Form,
  EmailField,
  PasswordField,
  ButtonPrimary,
  TextLink,
  FunnelNavigationBar,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const LoginContent = () => {
  const handleSubmit = (formData: {email: string; password: string}) => {
    console.log('login', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ButtonFixedFooterLayout
        button={
          <ButtonPrimary submit loadingText="Signing in…">
            Sign in
          </ButtonPrimary>
        }
      >
        <FunnelNavigationBar />
        <ResponsiveLayout>
          <Box paddingY={24}>
            <Stack space={24}>
              <Stack space={8}>
                <Title1 as="h1">Welcome back</Title1>
                <Text2 regular color={skinVars.colors.textSecondary} as="p">
                  Sign in to your account
                </Text2>
              </Stack>
              <Stack space={16}>
                <EmailField name="email" label="Email" autoComplete="email" />
                <PasswordField name="password" label="Password" autoComplete="current-password" />
              </Stack>
              <TextLink onPress={() => {}}>Forgot password?</TextLink>
            </Stack>
          </Box>
        </ResponsiveLayout>
      </ButtonFixedFooterLayout>
    </Form>
  );
};

export const LoginScreen = () => (
  <ThemeContextProvider theme={theme}>
    <LoginContent />
  </ThemeContextProvider>
);
```
