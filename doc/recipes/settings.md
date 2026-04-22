# Recipe: Settings screen

A settings page with grouped `RowList` sections, icons, toggles, and navigation rows. `NegativeBox` is
required around `RowList` inside `ResponsiveLayout` for correct hover alignment.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  MainNavigationBar,
  HeaderLayout,
  Header,
  ResponsiveLayout,
  Box,
  Stack,
  NegativeBox,
  RowList,
  Row,
  Switch,
  Circle,
  Title1,
  IconBellRegular,
  IconLockClosedRegular,
  IconUserAccountRegular,
  IconSettingsRegular,
  IconChevronRightRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const SettingsContent = () => {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <Stack space={0}>
      <MainNavigationBar
        sections={['Home', 'Settings'].map((title) => ({title, onPress: () => {}}))}
        selectedIndex={1}
      />
      <HeaderLayout header={<Header title="Settings" />} />
      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={32}>
            <Stack space={16}>
              <Title1 as="h2">Account</Title1>
              <NegativeBox>
                <RowList>
                  <Row
                    asset={
                      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconUserAccountRegular color={skinVars.colors.brand} />
                      </Circle>
                    }
                    title="Profile"
                    description="Name, photo, email"
                    onPress={() => {}}
                    right={<IconChevronRightRegular color={skinVars.colors.neutralMedium} />}
                  />
                  <Row
                    asset={
                      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconLockClosedRegular color={skinVars.colors.brand} />
                      </Circle>
                    }
                    title="Security"
                    description="Password, two-factor auth"
                    onPress={() => {}}
                    right={<IconChevronRightRegular color={skinVars.colors.neutralMedium} />}
                  />
                </RowList>
              </NegativeBox>
            </Stack>

            <Stack space={16}>
              <Title1 as="h2">Preferences</Title1>
              <NegativeBox>
                <RowList>
                  <Row
                    asset={
                      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconBellRegular color={skinVars.colors.brand} />
                      </Circle>
                    }
                    title="Notifications"
                    description="Push, email, SMS"
                    right={
                      <Switch name="notifications" checked={notifications} onChange={setNotifications} />
                    }
                  />
                  <Row
                    asset={
                      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconSettingsRegular color={skinVars.colors.brand} />
                      </Circle>
                    }
                    title="General"
                    description="Language, region"
                    onPress={() => {}}
                    right={<IconChevronRightRegular color={skinVars.colors.neutralMedium} />}
                  />
                </RowList>
              </NegativeBox>
            </Stack>
          </Stack>
        </Box>
      </ResponsiveLayout>
    </Stack>
  );
};

export const SettingsScreen = () => (
  <ThemeContextProvider theme={theme}>
    <SettingsContent />
  </ThemeContextProvider>
);
```
