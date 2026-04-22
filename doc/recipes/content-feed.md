# Recipe: Content feed (streaming / media home)

A rich content home page with a `Slideshow` hero, multiple horizontal `Carousel` rows, and a
`MainNavigationBar`. This is the reference pattern for Netflix/streaming-style interfaces.

Key layout rules:

- `Slideshow` goes **outside** `ResponsiveLayout` — it bleeds full-width
- `Carousel` goes **inside** `ResponsiveLayout`
- `MainNavigationBar` goes **outside** `ResponsiveLayout` at the page level

```tsx
'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  Stack,
  MainNavigationBar,
  Slideshow,
  CoverCard,
  Carousel,
  MediaCard,
  ResponsiveLayout,
  Box,
  Tag,
  Title1,
  Badge,
  IconBellRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const featured = [
  {id: 1, img: 'https://picsum.photos/seed/f1/1200/600', title: 'Featured Series 1', isNew: true},
  {id: 2, img: 'https://picsum.photos/seed/f2/1200/600', title: 'Featured Film', isNew: false},
  {id: 3, img: 'https://picsum.photos/seed/f3/1200/600', title: 'Live Event', isNew: true},
];

const trending = Array.from({length: 8}, (_, i) => ({
  id: i + 1,
  img: `https://picsum.photos/seed/t${i}/400/600`,
  title: `Title ${i + 1}`,
}));

const recommended = Array.from({length: 6}, (_, i) => ({
  id: i + 1,
  img: `https://picsum.photos/seed/r${i}/400/225`,
  title: `Film ${i + 1}`,
  desc: 'Drama · 2024',
}));

const ContentFeedPage = () => {
  const [section, setSection] = React.useState(0);

  return (
    <Stack space={0}>
      <MainNavigationBar
        sections={['Home', 'Series', 'Films', 'Live'].map((title, index) => ({
          title,
          onPress: () => setSection(index),
        }))}
        selectedIndex={section}
        right={
          <Badge value={2}>
            <IconBellRegular color="currentColor" />
          </Badge>
        }
      />

      {/* Slideshow is OUTSIDE ResponsiveLayout — full bleed */}
      <Slideshow
        withBullets
        autoplay={{time: 5000, loop: true}}
        items={featured.map((f) => (
          <CoverCard
            key={f.id}
            imageSrc={f.img}
            headline={f.isNew ? <Tag type="promo">New</Tag> : undefined}
            title={f.title}
            onPress={() => {}}
            aria-label={`Watch ${f.title}`}
          />
        ))}
      />

      <ResponsiveLayout>
        <Box paddingY={24}>
          <Stack space={32}>
            {/* Trending row */}
            <Stack space={16}>
              <Title1 as="h2">Trending now</Title1>
              <Carousel
                itemsPerPage={{mobile: 2, tablet: 3, desktop: 4}}
                items={trending.map((t) => (
                  <CoverCard
                    key={t.id}
                    imageSrc={t.img}
                    title={t.title}
                    onPress={() => {}}
                    aria-label={`Watch ${t.title}`}
                  />
                ))}
              />
            </Stack>

            {/* Recommended row */}
            <Stack space={16}>
              <Title1 as="h2">Recommended for you</Title1>
              <Carousel
                itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
                withBullets
                items={recommended.map((r) => (
                  <MediaCard
                    key={r.id}
                    media={<img src={r.img} alt={r.title} />}
                    title={r.title}
                    description={r.desc}
                    onPress={() => {}}
                  />
                ))}
              />
            </Stack>
          </Stack>
        </Box>
      </ResponsiveLayout>
    </Stack>
  );
};

export const ContentFeedScreen = () => (
  <ThemeContextProvider theme={theme}>
    <style>{`
      body {
        font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif;
        background-color: ${skinVars.colors.background};
        margin: 0;
      }
    `}</style>
    <ContentFeedPage />
  </ThemeContextProvider>
);
```
