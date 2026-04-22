# Recipe: Paywall / upgrade screen

A paywall that presents a premium plan with a `CoverHero`, feature highlights in a `MediaCard` carousel, and a
sticky CTA. Variant sections create visual hierarchy between content blocks.

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
  MediaCard,
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

const features = [
  {
    img: 'https://picsum.photos/seed/a/400/225',
    title: 'Unlimited streaming',
    desc: 'Watch in HD on all your devices.',
  },
  {
    img: 'https://picsum.photos/seed/b/400/225',
    title: 'Offline downloads',
    desc: 'Save content and watch without Wi-Fi.',
  },
  {
    img: 'https://picsum.photos/seed/c/400/225',
    title: 'Family sharing',
    desc: 'Up to 5 simultaneous screens.',
  },
];

const PaywallContent = () => (
  <ButtonFixedFooterLayout
    button={<ButtonPrimary onPress={() => {}}>Start free trial</ButtonPrimary>}
    secondaryButton={<ButtonSecondary onPress={() => {}}>See all plans</ButtonSecondary>}
  >
    <Stack space={0}>
      <CoverHero
        imageSrc="https://picsum.photos/1200/600"
        headline={<Tag type="promo">30 days free</Tag>}
        title="Movistar Plus+"
        description="The best entertainment at the best price."
        button={<ButtonPrimary onPress={() => {}}>Start free trial</ButtonPrimary>}
      />
      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={24}>
            <Title1 as="h2">Everything included</Title1>
            <Carousel
              itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
              withBullets
              items={features.map((f) => (
                <MediaCard
                  key={f.title}
                  media={<img src={f.img} alt={f.title} />}
                  title={f.title}
                  description={f.desc}
                />
              ))}
            />
            <Text2 regular color={skinVars.colors.textSecondary}>
              Cancel anytime. No commitment required.
            </Text2>
          </Stack>
        </Box>
      </ResponsiveLayout>
    </Stack>
  </ButtonFixedFooterLayout>
);

export const PaywallScreen = () => (
  <ThemeContextProvider theme={theme}>
    <PaywallContent />
  </ThemeContextProvider>
);
```
