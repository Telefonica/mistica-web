# Recipe: Skeleton loading states

Replace content with skeleton placeholders that match the shape of the real content while data loads. Mistica
provides `SkeletonLine`, `SkeletonText`, `SkeletonCircle`, `SkeletonRectangle`, `SkeletonRow`.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  ResponsiveLayout,
  Box,
  Stack,
  Inline,
  NegativeBox,
  RowList,
  Row,
  Circle,
  SkeletonLine,
  SkeletonText,
  SkeletonCircle,
  SkeletonRectangle,
  SkeletonRow,
  Title1,
  Text2,
  Avatar,
  IconUserAccountRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

// Skeleton version shown while loading
const PageSkeleton = () => (
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Stack space={32}>
        {/* Hero skeleton */}
        <Stack space={12}>
          <SkeletonLine width="40%" />
          <SkeletonText />
        </Stack>

        {/* List skeleton */}
        <Stack space={0}>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </Stack>

        {/* Media skeleton */}
        <Inline space={16} alignItems="center">
          <SkeletonCircle size={40} />
          <Stack space={8}>
            <SkeletonLine width={120} />
            <SkeletonLine width={80} />
          </Stack>
        </Inline>

        <SkeletonRectangle width="100%" height={200} />
      </Stack>
    </Box>
  </ResponsiveLayout>
);

// Real content shown after data loads
const PageContent = ({data}: {data: {title: string; author: string; avatarSrc: string}}) => (
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Stack space={32}>
        <Stack space={12}>
          <Title1 as="h1">{data.title}</Title1>
          <Text2 regular color={skinVars.colors.textSecondary}>
            Published today
          </Text2>
        </Stack>
        <NegativeBox>
          <RowList>
            <Row title="Section one" description="Details" onPress={() => {}} />
            <Row title="Section two" description="Details" onPress={() => {}} />
          </RowList>
        </NegativeBox>
        <Inline space={16} alignItems="center">
          <Avatar size={40} src={data.avatarSrc} initials="EG" />
          <Stack space={4}>
            <Text2 medium>{data.author}</Text2>
            <Text2 regular color={skinVars.colors.textSecondary}>
              Author
            </Text2>
          </Stack>
        </Inline>
      </Stack>
    </Box>
  </ResponsiveLayout>
);

// Usage pattern
const ExamplePage = () => {
  const [data, setData] = React.useState<null | {
    title: string;
    author: string;
    avatarSrc: string;
  }>(null);

  React.useEffect(() => {
    // Simulate data fetch
    const t = setTimeout(() => setData({title: 'Article title', author: 'Eduardo G.', avatarSrc: ''}), 2000);
    return () => clearTimeout(t);
  }, []);

  return data ? <PageContent data={data} /> : <PageSkeleton />;
};

export const SkeletonLoadingExample = () => (
  <ThemeContextProvider theme={theme}>
    <ExamplePage />
  </ThemeContextProvider>
);
```
