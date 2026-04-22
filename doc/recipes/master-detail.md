# Recipe: Master-detail (list + detail)

`MasterDetailLayout` shows a list on the left and detail on the right on desktop. On mobile it renders two
screens — the list first, then the detail when `isOpen` is true.

```tsx
'use client';
import * as React from 'react';
import {
  ThemeContextProvider,
  getMovistarNewSkin,
  skinVars,
  NavigationBar,
  MasterDetailLayout,
  NegativeBox,
  RowList,
  Row,
  Circle,
  Stack,
  Box,
  Title1,
  Title2,
  Text2,
  Text3,
  EmptyState,
  IconChevronRightRegular,
  IconUserAccountRegular,
} from '@telefonica/mistica';

const theme = {
  skin: getMovistarNewSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
};

const contacts = [
  {id: 1, name: 'Ana García', role: 'Account manager', email: 'ana@example.com'},
  {id: 2, name: 'Carlos López', role: 'Support lead', email: 'carlos@example.com'},
  {id: 3, name: 'María Sanz', role: 'Billing specialist', email: 'maria@example.com'},
];

type Contact = (typeof contacts)[0];

const DetailView = ({contact}: {contact: Contact}) => (
  <Box padding={24}>
    <Stack space={16}>
      <Title1>{contact.name}</Title1>
      <Text2 regular color={skinVars.colors.textSecondary}>
        {contact.role}
      </Text2>
      <Text3 regular>{contact.email}</Text3>
    </Stack>
  </Box>
);

const MasterDetailContent = () => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const selected = contacts.find((c) => c.id === selectedId) ?? null;

  return (
    <Stack space={0}>
      <NavigationBar title="Contacts" onBack={selectedId ? () => setSelectedId(null) : undefined} />
      <MasterDetailLayout
        isOpen={!!selectedId}
        master={
          <NegativeBox>
            <RowList>
              {contacts.map((c) => (
                <Row
                  key={c.id}
                  asset={
                    <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                      <IconUserAccountRegular color={skinVars.colors.brand} />
                    </Circle>
                  }
                  title={c.name}
                  description={c.role}
                  onPress={() => setSelectedId(c.id)}
                  right={<IconChevronRightRegular color={skinVars.colors.neutralMedium} />}
                />
              ))}
            </RowList>
          </NegativeBox>
        }
        detail={
          selected ? (
            <DetailView contact={selected} />
          ) : (
            <EmptyState title="Select a contact" description="Choose from the list on the left." />
          )
        }
      />
    </Stack>
  );
};

export const MasterDetailScreen = () => (
  <ThemeContextProvider theme={theme}>
    <MasterDetailContent />
  </ThemeContextProvider>
);
```
