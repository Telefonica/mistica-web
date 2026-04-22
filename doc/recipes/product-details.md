# Recipe: Product details page

A full product page with a `CoverHero` at the top, a carousel of related products, and a fixed CTA footer.
`CoverHero` manages its own layout — place it at the page level, not inside `ResponsiveLayout`.

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
  CoverHero,
  Carousel,
  DataCard,
  Tag,
  Title1,
  Title2,
  Text2,
  Text3,
  ButtonPrimary,
  ButtonSecondary,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const related = [
  {id: 1, name: 'Plan Basic', price: '€9.99/mo', gb: 5},
  {id: 2, name: 'Plan Plus', price: '€24.99/mo', gb: 50},
  {id: 3, name: 'Plan Pro', price: '€39.99/mo', gb: 100},
];

const ProductContent = () => (
  <ButtonFixedFooterLayout
    button={<ButtonPrimary onPress={() => {}}>Add to cart</ButtonPrimary>}
    secondaryButton={<ButtonSecondary onPress={() => {}}>Save for later</ButtonSecondary>}
  >
    <Stack space={0}>
      <CoverHero
        imageSrc="https://picsum.photos/1200/600"
        headline={<Tag type="promo">New</Tag>}
        title="Movistar Fusión Total"
        description="Fiber, mobile, TV and more in one plan."
        button={<ButtonPrimary onPress={() => {}}>Add to cart</ButtonPrimary>}
      />
      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={32}>
            <Stack space={16}>
              <Title1 as="h2">What's included</Title1>
              <Text2 regular color={skinVars.colors.textSecondary}>
                Everything you need in a single subscription.
              </Text2>
            </Stack>

            <Stack space={16}>
              <Title2 as="h3">You might also like</Title2>
              <Carousel
                itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
                withBullets
                items={related.map((p) => (
                  <DataCard
                    key={p.id}
                    title={p.name}
                    subtitle={`${p.gb} GB data`}
                    description={p.price}
                    buttonPrimary={
                      <ButtonPrimary small onPress={() => {}}>
                        View plan
                      </ButtonPrimary>
                    }
                  />
                ))}
              />
            </Stack>
          </Stack>
        </Box>
      </ResponsiveLayout>
    </Stack>
  </ButtonFixedFooterLayout>
);

export const ProductDetailsScreen = () => (
  <ThemeContextProvider theme={theme}>
    <ProductContent />
  </ThemeContextProvider>
);
```
