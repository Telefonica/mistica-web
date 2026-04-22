# Recipe: Dashboard / home screen

A content-rich home screen with navigation, a stats grid, a card carousel, and a settings row list.

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
  GridLayout,
  Carousel,
  NegativeBox,
  RowList,
  Row,
  DataCard,
  Boxed,
  Circle,
  Title1,
  Title2,
  Text2,
  Text3,
  Badge,
  IconBellRegular,
  IconUserAccountRegular,
  IconChevronRightRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const stats = [
  {label: 'Data used', value: '12.4 GB', sub: 'of 20 GB'},
  {label: 'Days left', value: '18', sub: 'in current period'},
  {label: 'Calls', value: 'Unlimited', sub: 'remaining'},
  {label: 'SMS', value: '47', sub: 'sent this month'},
];

const DashboardContent = () => {
  const [section, setSection] = React.useState(0);

  return (
    <Stack space={0}>
      <MainNavigationBar
        sections={['Home', 'Products', 'Support'].map((title, index) => ({
          title,
          onPress: () => setSection(index),
        }))}
        selectedIndex={section}
        right={
          <Badge value={3}>
            <IconBellRegular color="currentColor" />
          </Badge>
        }
      />
      <HeaderLayout
        header={<Header pretitle="Good morning" title="Eduardo" description="Here's your account summary" />}
      />
      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={32}>
            {/* Stats grid */}
            <Stack space={16}>
              <Title1 as="h2">Usage this month</Title1>
              <GridLayout
                template="6+6"
                left={
                  <Stack space={16}>
                    {stats.slice(0, 2).map((s) => (
                      <Boxed key={s.label}>
                        <Box padding={16}>
                          <Stack space={4}>
                            <Text3 regular color={skinVars.colors.textSecondary}>
                              {s.label}
                            </Text3>
                            <Title2 as="p">{s.value}</Title2>
                            <Text2 regular color={skinVars.colors.textSecondary}>
                              {s.sub}
                            </Text2>
                          </Stack>
                        </Box>
                      </Boxed>
                    ))}
                  </Stack>
                }
                right={
                  <Stack space={16}>
                    {stats.slice(2).map((s) => (
                      <Boxed key={s.label}>
                        <Box padding={16}>
                          <Stack space={4}>
                            <Text3 regular color={skinVars.colors.textSecondary}>
                              {s.label}
                            </Text3>
                            <Title2 as="p">{s.value}</Title2>
                            <Text2 regular color={skinVars.colors.textSecondary}>
                              {s.sub}
                            </Text2>
                          </Stack>
                        </Box>
                      </Boxed>
                    ))}
                  </Stack>
                }
              />
            </Stack>

            {/* Recommended plans carousel */}
            <Stack space={16}>
              <Title1 as="h2">Recommended for you</Title1>
              <Carousel
                itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
                items={['Fusión Basic', 'Fusión Plus', 'Fusión Total'].map((name, i) => (
                  <DataCard
                    key={i}
                    title={name}
                    description="Bundle plan with fiber and mobile"
                    buttonPrimary={
                      <Text2 regular color={skinVars.colors.brand} as="span">
                        View plan
                      </Text2>
                    }
                    onPress={() => {}}
                  />
                ))}
              />
            </Stack>

            {/* Quick actions */}
            <Stack space={16}>
              <Title1 as="h2">Quick actions</Title1>
              <NegativeBox>
                <RowList>
                  <Row
                    asset={
                      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconUserAccountRegular color={skinVars.colors.brand} />
                      </Circle>
                    }
                    title="My account"
                    description="Profile, billing, settings"
                    onPress={() => {}}
                    right={<IconChevronRightRegular color={skinVars.colors.neutralMedium} />}
                  />
                  <Row
                    asset={
                      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconBellRegular color={skinVars.colors.brand} />
                      </Circle>
                    }
                    title="Notifications"
                    description="3 unread alerts"
                    onPress={() => {}}
                    right={<Badge value={3} />}
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

export const DashboardScreen = () => (
  <ThemeContextProvider theme={theme}>
    <DashboardContent />
  </ThemeContextProvider>
);
```
