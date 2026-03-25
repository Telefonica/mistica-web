# Patterns and Best Practices

## Critical rules

1. **NEVER hardcode colors.** Always use `skinVars.colors.*` from `@telefonica/mistica`.
2. **NEVER use raw `<div>` for layout.** Use `Box`, `Stack`, `Inline`, `ResponsiveLayout`, `GridLayout`,
   `Grid`.
3. **NEVER set font sizes manually.** Use text components (`Text1`-`Text10`, `Title1`-`Title4`).
4. **NEVER set border radius manually.** Use `skinVars.borderRadii.*` or components that handle it (`Boxed`,
   cards, etc.).
5. **Always wrap your app** with `ThemeContextProvider` and import `@telefonica/mistica/css/mistica.css`.
6. **Always namespace React hooks**: `React.useState`, `React.useEffect`, `React.useRef`, etc.
7. **Add `'use client';`** directive to client components when using Next.js app router.

## Page layout composition

A standard Mistica page follows this structure:

```tsx
// Navigation
<MainNavigationBar ... />

// Header section
<HeaderLayout
  header={<Header pretitle="Section" title="Page Title" description="Description" />}
/>

// Content sections
<ResponsiveLayout>
  <Box paddingY={24}>
    <Stack space={32}>
      {/* Section 1 */}
      <Stack space={16}>
        <Title1 as="h2">Section Title</Title1>
        <Text2 regular as="p">Section description</Text2>
      </Stack>

      {/* Section 2 - List */}
      <Stack space={16}>
        <Title1 as="h2">Another Section</Title1>
        <NegativeBox>
          <RowList>
            <Row title="Item 1" onPress={() => {}} />
            <Row title="Item 2" onPress={() => {}} />
          </RowList>
        </NegativeBox>
      </Stack>
    </Stack>
  </Box>
</ResponsiveLayout>
```

### Vertical rhythm

Follow the 24/32/16 rule:

- **Containers**: 24px top and bottom padding (`<Box paddingY={24}>`)
- **Sections**: 32px space between them (`<Stack space={32}>`)
- **Elements**: 16px space between them (`<Stack space={16}>`)

## Layout dos and don'ts

### DO: Use layout components

```tsx
// Vertical spacing
<Stack space={16}>
  <Text2 regular>First</Text2>
  <Text2 regular>Second</Text2>
</Stack>

// Horizontal spacing
<Inline space={16}>
  <ButtonPrimary onPress={() => {}}>Accept</ButtonPrimary>
  <ButtonSecondary onPress={() => {}}>Cancel</ButtonSecondary>
</Inline>

// Padding
<Box padding={16}>
  <Text2 regular>Padded content</Text2>
</Box>

// Page container
<ResponsiveLayout>
  <Text2 regular>Responsive content</Text2>
</ResponsiveLayout>
```

### DON'T: Use divs for spacing/layout

```tsx
// BAD - raw divs for spacing
<div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
  <div style={{padding: 16}}>
    <span style={{fontSize: 14, color: '#333'}}>Text</span>
  </div>
</div>

// GOOD - Mistica components
<Stack space={16}>
  <Box padding={16}>
    <Text2 regular>Text</Text2>
  </Box>
</Stack>
```

## Color dos and don'ts

### DO: Use design tokens

```tsx
import {skinVars, applyAlpha} from '@telefonica/mistica';

// Direct token usage
<Text2 regular color={skinVars.colors.textSecondary}>Secondary text</Text2>

// In styles (when absolutely needed)
<div style={{backgroundColor: skinVars.colors.backgroundContainer}}>...</div>

// Semi-transparent colors
const overlay = applyAlpha(skinVars.rawColors.backgroundBrand, 0.8);
```

### DON'T: Hardcode colors

```tsx
// BAD - hardcoded colors
<Text2 regular color="#666">Text</Text2>
<div style={{backgroundColor: '#f5f5f5'}}>...</div>
<div style={{color: 'rgb(0, 112, 224)'}}>...</div>

// GOOD - design tokens
<Text2 regular color={skinVars.colors.textSecondary}>Text</Text2>
<Boxed><Text2 regular>Content in container</Text2></Boxed>
```

## Responsive patterns

### Conditional rendering by screen size

```tsx
const {isDesktopOrBigger, isTabletOrSmaller} = useScreenSize();

return (
  <ResponsiveLayout>
    <Box paddingY={24}>
      {isDesktopOrBigger ? (
        <GridLayout template="6+6" left={<LeftContent />} right={<RightContent />} />
      ) : (
        <Stack space={16}>
          <LeftContent />
          <RightContent />
        </Stack>
      )}
    </Box>
  </ResponsiveLayout>
);
```

### Grid templates for desktop/mobile

```tsx
<ResponsiveLayout>
  <GridLayout template="8+4" left={<MainContent />} right={<Sidebar />} />
</ResponsiveLayout>
```

On mobile, GridLayout stacks content vertically automatically.

### Master-detail pattern

```tsx
const [selectedId, setSelectedId] = React.useState(null);

<MasterDetailLayout
  isOpen={!!selectedId}
  master={
    <RowList>
      {items.map((item) => (
        <Row key={item.id} title={item.name} onPress={() => setSelectedId(item.id)} />
      ))}
    </RowList>
  }
  detail={selectedId ? <DetailView id={selectedId} /> : <Text2 regular>Select an item</Text2>}
/>;
```

## Form patterns

### Automatic state management (preferred)

```tsx
<Form initialValues={{email: '', name: ''}} onSubmit={(formData) => api.submit(formData)}>
  <Stack space={16}>
    <TextField name="name" label="Name" />
    <EmailField name="email" label="Email" />
    <PhoneNumberField name="phone" label="Phone" optional />
    <DoubleField>
      <DateField name="startDate" label="Start date" />
      <DateField name="endDate" label="End date" />
    </DoubleField>
    <Select
      name="country"
      label="Country"
      options={[
        {value: 'es', text: 'Spain'},
        {value: 'uk', text: 'United Kingdom'},
      ]}
    />
    <Switch name="newsletter">Receive newsletter</Switch>
    <ButtonLayout
      primaryButton={
        <ButtonPrimary submit loadingText="Sending...">
          Submit
        </ButtonPrimary>
      }
    />
  </Stack>
</Form>
```

### Form with fixed footer

```tsx
<ButtonFixedFooterLayout button={<ButtonPrimary submit>Continue</ButtonPrimary>}>
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Form onSubmit={handleSubmit}>
        <Stack space={16}>
          <TextField name="name" label="Name" />
          <EmailField name="email" label="Email" />
        </Stack>
      </Form>
    </Box>
  </ResponsiveLayout>
</ButtonFixedFooterLayout>
```

## Card patterns

### Asset pattern for cards and rows

The idiomatic way to create card/row assets is `Circle` + icon:

```tsx
<Circle backgroundColor={skinVars.colors.brandLow} size={40}>
  <IconShopRegular color={skinVars.colors.brand} />
</Circle>
```

### Card grid

```tsx
<ResponsiveLayout>
  <Box paddingY={24}>
    <Stack space={16}>
      <Title1 as="h2">Featured</Title1>
      <Carousel
        itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
        items={products.map((p) => (
          <DataCard
            key={p.id}
            asset={
              <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                <IconShopRegular color={skinVars.colors.brand} />
              </Circle>
            }
            title={p.name}
            description={p.description}
            buttonPrimary={
              <ButtonPrimary small onPress={() => navigate(p.url)}>
                View
              </ButtonPrimary>
            }
          />
        ))}
      />
    </Stack>
  </Box>
</ResponsiveLayout>
```

## List patterns

### Unbounded list with NegativeBox

When placing a `RowList` inside a `ResponsiveLayout`, wrap it with `NegativeBox` so hover effects and
alignment are correct:

```tsx
<ResponsiveLayout>
  <Box paddingY={24}>
    <Stack space={16}>
      <Title1>Settings</Title1>
      <NegativeBox>
        <RowList>
          <Row
            asset={
              <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                <IconSettingsRegular color={skinVars.colors.brand} />
              </Circle>
            }
            title="General"
            description="App settings"
            onPress={() => {}}
          />
          <Row
            asset={
              <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                <IconBellRegular color={skinVars.colors.brand} />
              </Circle>
            }
            title="Notifications"
            description="Manage alerts"
            onPress={() => {}}
          />
        </RowList>
      </NegativeBox>
    </Stack>
  </Box>
</ResponsiveLayout>
```

### Boxed list (no NegativeBox needed)

```tsx
<BoxedRowList>
  <BoxedRow title="Option A" onPress={() => {}} />
  <BoxedRow title="Option B" onPress={() => {}} />
</BoxedRowList>
```

## Variant sections

Use `variant` on `ResponsiveLayout` to create colored sections. Components inside adapt automatically:

```tsx
{
  /* Default section */
}
<ResponsiveLayout>
  <Box paddingY={24}>
    <Text2 regular>Default background</Text2>
  </Box>
</ResponsiveLayout>;

{
  /* Brand section */
}
<ResponsiveLayout variant="brand" fullWidth>
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Stack space={16}>
        <Title1>Brand Section</Title1>
        <Text2 regular>Colors adapt automatically</Text2>
        <ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>
      </Stack>
    </Box>
  </ResponsiveLayout>
</ResponsiveLayout>;

{
  /* Alternative section */
}
<ResponsiveLayout variant="alternative" fullWidth>
  <ResponsiveLayout>
    <Box paddingY={24}>
      <Text2 regular>Alternative background</Text2>
    </Box>
  </ResponsiveLayout>
</ResponsiveLayout>;
```

## Boxed containers

Use `Boxed` for card-like containers without card semantics:

```tsx
<Boxed>
  <Box padding={16}>
    <Stack space={16}>
      <Title3>Container Title</Title3>
      <Text2 regular>Container content</Text2>
    </Stack>
  </Box>
</Boxed>
```

## Skeleton loading patterns

Replace content with matching skeleton shapes while loading:

```tsx
const {data, isLoading} = useFetch('/api/data');

if (isLoading) {
  return (
    <Stack space={16}>
      <SkeletonLine width="40%" />
      <SkeletonText />
      <Inline space={16}>
        <SkeletonCircle size={40} />
        <SkeletonLine width="60%" />
      </Inline>
    </Stack>
  );
}

return (
  <Stack space={16}>
    <Title1>{data.title}</Title1>
    <Text2 regular>{data.description}</Text2>
    <Inline space={16}>
      <Avatar size={40} src={data.avatar} />
      <Text2 regular>{data.author}</Text2>
    </Inline>
  </Stack>
);
```

## Funnel / step-by-step flow

```tsx
<FunnelNavigationBar
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction aria-label="Close" onPress={handleClose}>
        <IconCloseRegular color="currentColor" />
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>
<Stepper currentIndex={currentStep} steps={['Personal', 'Address', 'Payment', 'Confirm']} />
<ResponsiveLayout>
  <Box paddingY={24}>
    {currentStep === 0 && <PersonalInfoForm />}
    {currentStep === 1 && <AddressForm />}
    {currentStep === 2 && <PaymentForm />}
    {currentStep === 3 && <ConfirmationScreen />}
  </Box>
</ResponsiveLayout>
```

## Next.js integration

### Link configuration

```tsx
import Link from 'next/link';

const theme = {
  skin: getMovistarSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
  Link: {type: 'Next14', Component: Link},
};
```

### React Router integration

```tsx
import {Link} from 'react-router-dom';

const theme = {
  skin: getMovistarSkin(),
  i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
  Link: {type: 'ReactRouter6', Component: Link},
};
```

After configuring, use the `to` prop on touchable components for client-side navigation:

```tsx
<ButtonPrimary to="/dashboard">Go to dashboard</ButtonPrimary>
<Row title="Profile" to="/profile" />
<TextLink to="/settings">Settings</TextLink>
```

## Dark mode

Mistica supports dark mode out of the box via `colorScheme` in theme config:

- `'auto'` (default) -- follows OS/browser preference
- `'light'` -- force light mode
- `'dark'` -- force dark mode

All `skinVars.colors.*` tokens automatically resolve to their dark mode values. No additional code is needed.
