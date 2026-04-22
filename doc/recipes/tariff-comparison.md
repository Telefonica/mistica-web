# Recipe: Tariff / plan comparison

A carousel of `DataCard`s representing plans or tariffs. Tags highlight recommended or promotional options.
`ButtonFixedFooterLayout` keeps the CTA visible without scrolling.

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
  Carousel,
  DataCard,
  Tag,
  Title1,
  Text2,
  ButtonPrimary,
  ButtonSecondary,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const tariffs = [
  {id: 'basic', name: 'Basic', gb: 5, price: '€9.99/mo', recommended: false},
  {id: 'standard', name: 'Standard', gb: 20, price: '€19.99/mo', recommended: true},
  {id: 'unlimited', name: 'Unlimited', gb: null, price: '€34.99/mo', recommended: false},
];

const TariffContent = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <ButtonFixedFooterLayout
      button={
        <ButtonPrimary disabled={!selected} onPress={() => {}}>
          Continue with {tariffs.find((t) => t.id === selected)?.name ?? '…'}
        </ButtonPrimary>
      }
      secondaryButton={<ButtonSecondary onPress={() => {}}>Compare all plans</ButtonSecondary>}
    >
      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={24}>
            <Stack space={8}>
              <Title1 as="h1">Choose your plan</Title1>
              <Text2 regular color={skinVars.colors.textSecondary}>
                All plans include unlimited calls.
              </Text2>
            </Stack>
            <Carousel
              itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
              withBullets
              items={tariffs.map((t) => (
                <DataCard
                  key={t.id}
                  headline={t.recommended ? <Tag type="promo">Recommended</Tag> : undefined}
                  title={t.name}
                  subtitle={t.gb ? `${t.gb} GB data` : 'Unlimited data'}
                  description={t.price}
                  onPress={() => setSelected(t.id)}
                  isHighlighted={selected === t.id}
                />
              ))}
            />
          </Stack>
        </Box>
      </ResponsiveLayout>
    </ButtonFixedFooterLayout>
  );
};

export const TariffComparisonScreen = () => (
  <ThemeContextProvider theme={theme}>
    <TariffContent />
  </ThemeContextProvider>
);
```
