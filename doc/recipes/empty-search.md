# Recipe: Empty search / no results

A search field with a conditional `EmptyState` when no results are found. `EmptyState` handles its own layout
— place it directly inside `ResponsiveLayout`.

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
  SearchField,
  EmptyState,
  NegativeBox,
  RowList,
  Row,
  ButtonLink,
  Title1,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const allItems = ['Movistar Fusión', 'Movistar Plus+', 'Movistar Fibra', 'Movistar TV'];

const SearchContent = () => {
  const [query, setQuery] = React.useState('');
  const results = allItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <ResponsiveLayout>
      <Box paddingY={24}>
        <Stack space={24}>
          <Title1 as="h1">Products</Title1>
          <SearchField name="search" label="Search products" value={query} onChangeValue={setQuery} />
          {query.length > 0 && results.length === 0 ? (
            <EmptyState
              title="No results found"
              description={`We couldn't find anything matching "${query}".`}
              button={<ButtonLink onPress={() => setQuery('')}>Clear search</ButtonLink>}
            />
          ) : (
            <NegativeBox>
              <RowList>
                {(query ? results : allItems).map((item) => (
                  <Row key={item} title={item} onPress={() => {}} />
                ))}
              </RowList>
            </NegativeBox>
          )}
        </Stack>
      </Box>
    </ResponsiveLayout>
  );
};

export const EmptySearchScreen = () => (
  <ThemeContextProvider theme={theme}>
    <SearchContent />
  </ThemeContextProvider>
);
```
