# Components Reference

All components are imported from `@telefonica/mistica`.

```tsx
import {ButtonPrimary, Stack, Text2, ...} from '@telefonica/mistica';
```

## Buttons

### Button variants

| Component          | Usage                     |
| ------------------ | ------------------------- |
| `ButtonPrimary`    | Primary action            |
| `ButtonSecondary`  | Secondary action          |
| `ButtonDanger`     | Destructive action        |
| `ButtonLink`       | Link-styled button        |
| `ButtonLinkDanger` | Danger link-styled button |

### Button interaction props (mutually exclusive)

- `onPress={() => {}}` -- click handler
- `href="https://..."` -- external link (add `newTab` for target blank)
- `to="/path"` -- client-side navigation (uses configured Link component)
- `submit` -- form submit button (use inside `<Form>`)

### Button common props

- `small` -- smaller size
- `disabled` -- disabled state
- `showSpinner` / `loadingText` -- loading state
- `StartIcon` / `EndIcon` -- icon components
- `trackingEvent` -- analytics event
- `trackEvent` -- default analytics tracking

```tsx
<ButtonPrimary onPress={() => console.log('clicked')}>Action</ButtonPrimary>
<ButtonSecondary href="https://example.com" newTab>Open link</ButtonSecondary>
<ButtonPrimary submit>Submit form</ButtonPrimary>
<ButtonPrimary small StartIcon={IconSearchRegular} onPress={() => {}}>Search</ButtonPrimary>
```

### ButtonGroup

Groups up to 3 buttons (primary + secondary + link):

```tsx
<ButtonGroup
  primaryButton={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}
  secondaryButton={<ButtonSecondary onPress={() => {}}>Secondary</ButtonSecondary>}
  link={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
/>
```

### ButtonLayout

Positions a primary and optional secondary button:

```tsx
<ButtonLayout
  primaryButton={<ButtonPrimary onPress={() => {}}>Continue</ButtonPrimary>}
  secondaryButton={<ButtonSecondary onPress={() => {}}>Cancel</ButtonSecondary>}
/>
```

### IconButton / ToggleIconButton

```tsx
<IconButton
  aria-label="Search"
  onPress={() => {}}
  Icon={IconSearchRegular}
/>

<ToggleIconButton
  checkedProps={{Icon: IconHeartFilled, 'aria-label': 'Remove from favorites'}}
  uncheckedProps={{Icon: IconHeartRegular, 'aria-label': 'Add to favorites'}}
  checked={isFavorite}
  onChange={setIsFavorite}
/>
```

## Text and Titles

> 💡 **Centering text uses two complementary props:** > [`<Align x="center">`](./layout.md#align) positions
> the `Text*` / `Title*` element within its parent; `textAlign="center"` (on `Text*`) aligns the content
> _within_ the element. For a short single-line label, `Align` alone is enough. For multi-line text that
> should also have each wrapped line centered, use both. `Title*` does not accept `textAlign`.
>
> ```tsx
> // Single-line label — Align alone
> <Align x="center">
>   <Text4>Sonido</Text4>
> </Align>
>
> // Multi-line description — Align positions the element, textAlign centers the lines
> <Align x="center">
>   <Text2 regular textAlign="center">
>     Movistar te garantiza la mejor calidad de conexión de banda ancha del mercado.
>   </Text2>
> </Align>
> ```

### Text components

`Text1` through `Text10` render text at progressively larger sizes. `Text1`-`Text4` accept a `weight` prop.

Common props: `color`, `truncate`, `textAlign`, `as` (HTML tag), `wordBreak`, `decoration`, `transform`.

```tsx
<Text2 regular>Regular body text</Text2>
<Text2 medium>Medium body text</Text2>
<Text3 light color={skinVars.colors.textSecondary}>Light secondary text</Text3>
<Text5>Large display text</Text5>
```

### Title components

`Title1` through `Title4`. Accept `as` (heading level), `right` (right-side content), `id`.

```tsx
<Title1 as="h1">Page Title</Title1>
<Title2 as="h2" right={<ButtonLink small onPress={() => {}}>See all</ButtonLink>}>Section</Title2>
```

### TextLink

```tsx
<TextLink href="https://example.com">External link</TextLink>
<TextLink to="/page">Internal link</TextLink>
<TextLink onPress={() => {}}>Clickable text</TextLink>
```

## Cards

All cards support touchable props (`onPress`, `href`, `to`), buttons (`buttonPrimary`, `buttonSecondary`,
`buttonLink`), and content props (`headline`, `pretitle`, `title`, `subtitle`, `description`, `slot`).

### DataCard

General-purpose card for data display. Supports `size`: `'default'`, `'snap'`, `'display'`.

```tsx
<DataCard
  asset={
    <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
      <IconShopRegular color={skinVars.colors.brand} />
    </Circle>
  }
  headline={<Tag type="promo">Promo</Tag>}
  title="Card title"
  subtitle="Subtitle"
  description="Description text"
  buttonPrimary={
    <ButtonPrimary small onPress={() => {}}>
      Action
    </ButtonPrimary>
  }
  buttonLink={
    <ButtonLink small onPress={() => {}}>
      Link
    </ButtonLink>
  }
/>
```

### MediaCard

Card with image or video media. Supports `mediaPosition`: `'top'`, `'left'`, `'right'`.

```tsx
<MediaCard
  imageSrc="https://example.com/image.jpg"
  mediaAspectRatio="16:9"
  headline={<Tag type="active">Active</Tag>}
  pretitle="Pretitle"
  title="Media card title"
  description="Description"
  buttonPrimary={
    <ButtonPrimary small onPress={() => {}}>
      Action
    </ButtonPrimary>
  }
/>
```

### CoverCard

Full-bleed image/video background card. Supports `size`: `'default'`, `'display'`.

```tsx
<CoverCard
  imageSrc="https://example.com/cover.jpg"
  headline={<Tag type="promo">Featured</Tag>}
  title="Cover card title"
  description="Description"
  buttonPrimary={
    <ButtonPrimary small onPress={() => {}}>
      Action
    </ButtonPrimary>
  }
/>
```

### NakedCard

Card without container background. Supports `size`: `'default'`, `'snap'`.

```tsx
<NakedCard
  imageSrc="https://example.com/image.jpg"
  mediaAspectRatio="16:9"
  title="Naked card"
  description="Description"
/>
```

### Card in carousels and grids

```tsx
<Carousel
  itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
  items={[
    <DataCard key="1" title="Card 1" description="Desc" />,
    <DataCard key="2" title="Card 2" description="Desc" />,
    <DataCard key="3" title="Card 3" description="Desc" />,
  ]}
/>
```

## Lists

### RowList / Row (unbounded)

```tsx
<RowList>
  <Row
    asset={
      <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
        <IconMobileDeviceRegular color={skinVars.colors.brand} />
      </Circle>
    }
    title="Row title"
    description="Description"
    onPress={() => {}}
  />
  <Row title="Simple row" href="https://example.com" />
  <Row title="Row with badge" badge={3} onPress={() => {}} />
</RowList>
```

### BoxedRowList / BoxedRow (boxed container)

Same API as RowList/Row but rendered inside a boxed container.

```tsx
<BoxedRowList>
  <BoxedRow title="Boxed row" description="In a container" onPress={() => {}} />
</BoxedRowList>
```

### Row variants

Rows support different right-side controls:

```tsx
<Row title="With switch" switch={{defaultValue: false, onChange: (v) => {}}} />
<Row title="With checkbox" checkbox={{defaultValue: false, onChange: (v) => {}}} />
<Row title="With radio" radioValue="option1" /> {/* Inside RadioGroup */}
<Row title="With chevron" onPress={() => {}} /> {/* Auto chevron on press/href/to */}
<Row title="With icon button" iconButton={{Icon: IconTrashCanRegular, onPress: () => {}, 'aria-label': 'Delete'}} />
<Row title="Custom right" right={<Text2 regular color={skinVars.colors.textSecondary}>Detail</Text2>} />
```

### UnorderedList / OrderedList

```tsx
<UnorderedList>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</UnorderedList>
```

## Navigation

### MainNavigationBar

Full app navigation with logo, sections, burger menu on mobile:

```tsx
<MainNavigationBar
  selectedIndex={0}
  sections={[
    {title: 'Home', onPress: () => {}},
    {
      title: 'Products',
      onPress: () => {},
      menu: {
        columns: [{title: 'Category', items: [{title: 'Item 1', onPress: () => {}}]}],
      },
    },
  ]}
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction aria-label="Profile" onPress={() => {}}>
        <Avatar size={32} initials="JD" />
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>
```

### NavigationBar

Simple navigation bar with back button:

```tsx
<NavigationBar
  onBack={() => navigate(-1)}
  title="Page Title"
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction aria-label="Search" onPress={() => {}}>
        <IconSearchRegular color="currentColor" />
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>
```

### FunnelNavigationBar

For step-by-step flows:

```tsx
<FunnelNavigationBar
  right={
    <NavigationBarActionGroup>
      <NavigationBarAction aria-label="Close" onPress={() => {}}>
        <IconCloseRegular color="currentColor" />
      </NavigationBarAction>
    </NavigationBarActionGroup>
  }
/>
```

### Tabs

```tsx
const [selectedIndex, setSelectedIndex] = React.useState(0);

<Tabs
  selectedIndex={selectedIndex}
  onChange={setSelectedIndex}
  tabs={[{text: 'Tab 1'}, {text: 'Tab 2', Icon: IconSettingsRegular}]}
/>;
```

### NavigationBreadcrumbs

```tsx
<NavigationBreadcrumbs
  title="Current Page"
  breadcrumbs={[
    {title: 'Home', url: '/'},
    {title: 'Section', url: '/section'},
  ]}
/>
```

## Headers

### Header + HeaderLayout

```tsx
<HeaderLayout
  variant="brand"
  breadcrumbs={<NavigationBreadcrumbs title="Page" breadcrumbs={[{title: 'Home', url: '/'}]} />}
  header={
    <Header
      headline={<Tag type="promo">New</Tag>}
      pretitle="Section"
      title="Page Title"
      description="Page description text"
    />
  }
  extra={<Placeholder />}
  sideBySideExtraOnDesktop
/>
```

### MainSectionHeader + MainSectionHeaderLayout

```tsx
<MainSectionHeaderLayout>
  <MainSectionHeader
    title="Section Title"
    description="Section description"
    button={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
  />
</MainSectionHeaderLayout>
```

## Feedback

### FeedbackScreen variants

```tsx
<SuccessFeedbackScreen
  title="Payment completed"
  description="Your payment was processed successfully"
  primaryButton={<ButtonPrimary onPress={() => {}}>Continue</ButtonPrimary>}
/>

<ErrorFeedbackScreen
  title="Something went wrong"
  description="Please try again later"
  errorReference="Error: 5001"
  primaryButton={<ButtonPrimary onPress={() => {}}>Retry</ButtonPrimary>}
/>

<InfoFeedbackScreen
  title="Information"
  description="Informational message"
  primaryButton={<ButtonPrimary onPress={() => {}}>Got it</ButtonPrimary>}
/>
```

### Dialogs (imperative)

```tsx
import {alert, confirm, useDialog} from '@telefonica/mistica';

// Simple alert
alert({title: 'Title', message: 'Message', acceptText: 'OK'});

// Confirm dialog
confirm({title: 'Confirm?', message: 'Are you sure?', acceptText: 'Yes', cancelText: 'No'});

// Rich dialog via hook
const {dialog} = useDialog();
dialog({
  title: 'Title',
  subtitle: 'Subtitle',
  message: 'Message',
  extra: <Placeholder />,
  acceptText: 'Accept',
  cancelText: 'Cancel',
});
```

### Snackbar

```tsx
const {openSnackbar} = useSnackbar();

openSnackbar({
  message: 'Item saved',
  type: 'INFORMATIVE',
  buttonText: 'Undo',
  withDismiss: true,
});
```

## Empty states

```tsx
<EmptyState
  largeImageUrl="https://example.com/empty.png"
  title="No results found"
  description="Try a different search term"
  button={<ButtonPrimary onPress={() => {}}>Search again</ButtonPrimary>}
/>

<EmptyStateCard
  asset={<IconBoxLight size="100%" color={skinVars.colors.brand} />}
  title="Empty section"
  description="Nothing here yet"
  button={<ButtonPrimary small onPress={() => {}}>Add item</ButtonPrimary>}
/>
```

## Loading states

### Skeletons

```tsx
<SkeletonLine width="60%" />          {/* Single line placeholder */}
<SkeletonText />                       {/* Multi-line paragraph placeholder */}
<SkeletonCircle size={48} />           {/* Circle placeholder (avatar) */}
<SkeletonRow />                        {/* Circle + line (list item) */}
<SkeletonRectangle width={200} height={150} />  {/* Rectangle placeholder */}
```

### LoadingScreen / BrandLoadingScreen

```tsx
<LoadingScreen />
<BrandLoadingScreen texts={['Loading...', 'Almost there...', 'Ready!']} />
```

### Spinner

```tsx
<Spinner size={24} />
```

## Other components

### Tag

```tsx
<Tag type="promo">Promo</Tag>
<Tag type="success" Icon={IconCheckRegular}>Success</Tag>
<Tag type="error" small>Error</Tag>
```

Types: `'promo'`, `'info'`, `'active'`, `'inactive'`, `'success'`, `'warning'`, `'error'`.

### Chip

```tsx
<Chip onClose={() => {}}>Closeable chip</Chip>
<Chip active>Active toggle</Chip>
<Chip Icon={IconFilterRegular} onPress={() => {}}>Filter</Chip>
```

### Badge

```tsx
<Badge value={3}>
  <IconBellRegular />
</Badge>
```

### Callout

```tsx
<Callout
  title="Important notice"
  description="This is a callout message"
  asset={<IconInfoRegular color={skinVars.colors.brand} />}
  button={
    <ButtonPrimary small onPress={() => {}}>
      Action
    </ButtonPrimary>
  }
  onClose={() => {}}
/>
```

### Hero

```tsx
<Hero
  background="brand"
  media={<Image src="https://example.com/hero.jpg" aspectRatio="16:9" />}
  headline={<Tag type="promo">New</Tag>}
  pretitle="Welcome"
  title="Hero Title"
  description="Hero description"
  button={<ButtonPrimary onPress={() => {}}>Get started</ButtonPrimary>}
  desktopMediaPosition="right"
/>
```

### Carousel / Slideshow

```tsx
<Carousel
  itemsPerPage={{mobile: 1, tablet: 2, desktop: 3}}
  withBullets
  items={cards.map((card, i) => <DataCard key={i} {...card} />)}
/>

<Slideshow
  withBullets
  autoplay={{time: 5000, loop: true}}
  items={slides}
/>
```

### Avatar

```tsx
<Avatar size={64} src="https://example.com/avatar.jpg" />
<Avatar size={40} initials="JD" />
<Badge value={3}><Avatar size={40} initials="ML" /></Badge>
```

### Image / Video

```tsx
<Image src="https://example.com/photo.jpg" aspectRatio="16:9" />
<Image src="https://example.com/avatar.jpg" circular width={100} />
<Video src="https://example.com/video.mp4" aspectRatio="16:9" />
```

### Divider

```tsx
<Divider /> {/* Adapts to current variant context */}
```

### Tooltip / Popover

```tsx
<Tooltip target={<IconButton Icon={IconInfoRegular} aria-label="Info" />}>
  Tooltip content
</Tooltip>

<Popover
  target={<IconButton Icon={IconInfoRegular} aria-label="Info" />}
  title="Title"
  description="Description"
/>
```

### Timer / TextTimer

```tsx
<Timer dateTime={new Date(Date.now() + 3600000)} />
<TextTimer dateTime={new Date(Date.now() + 3600000)}>Time left:</TextTimer>
```

### ProgressBar / Stepper

```tsx
<ProgressBar progressPercent={60} />
<ProgressBarStepped currentStep={2} steps={4} />
<Stepper currentIndex={1} steps={['Cart', 'Shipping', 'Payment', 'Done']} />
```

### Meter / Rating

```tsx
<Meter value={75} max={100} />
<Rating value={4} max={5} />
<InfoRating value={4.5} count={128} />
```

### Timeline

```tsx
<Timeline>
  <TimelineItem title="Step 1" description="Completed" asset="1" status="done" />
  <TimelineItem title="Step 2" description="In progress" asset="2" status="active" />
  <TimelineItem title="Step 3" description="Pending" asset="3" status="inactive" />
</Timeline>
```

### Table

```tsx
<Table
  heading={['Name', 'Email', 'Status']}
  content={[
    ['John Doe', 'john@example.com', <Tag type="active">Active</Tag>],
    ['Jane Smith', 'jane@example.com', <Tag type="inactive">Inactive</Tag>],
  ]}
/>
```

### Grid / GridItem

For CSS Grid layouts (different from `GridLayout`):

```tsx
<Grid columns={3} gap={16}>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem columnSpan={2}>Wide item</GridItem>
</Grid>

<Grid columns={{minSize: 200}} gap={16}>
  {items.map((item) => <GridItem key={item.id}>{item.content}</GridItem>)}
</Grid>
```

### Drawer

```tsx
const [isOpen, setIsOpen] = React.useState(false);

<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Drawer title"
  subtitle="Subtitle"
  description="Description"
  button={<ButtonPrimary onPress={() => setIsOpen(false)}>Action</ButtonPrimary>}
  secondaryButton={<ButtonSecondary onPress={() => setIsOpen(false)}>Cancel</ButtonSecondary>}
>
  <Stack space={16}>
    <Placeholder />
    <Placeholder />
  </Stack>
</Drawer>;
```

### Menu

```tsx
<Menu
  renderTarget={({ref, onPress, isMenuOpen}) => (
    <IconButton ref={ref} onPress={onPress} Icon={IconMoreOptionsRegular} aria-label="Options" />
  )}
  renderMenu={({ref, className}) => (
    <div ref={ref} className={className}>
      <MenuSection>
        <MenuItem label="Edit" onPress={() => {}} />
        <MenuItem label="Share" onPress={() => {}} />
        <MenuItem label="Delete" onPress={() => {}} destructive />
      </MenuSection>
    </div>
  )}
/>
```

## Icons

Mistica ships ~2000 icons following the pattern `Icon{Name}{Variant}`:

- Variants: `Regular`, `Filled`, `Light`
- All accept `size` (number) and `color` (string) props

```tsx
import {IconSearchRegular, IconHeartFilled, IconInfoLight} from '@telefonica/mistica';

<IconSearchRegular size={24} color={skinVars.colors.neutralHigh} />
<IconHeartFilled size={24} color={skinVars.colors.error} />
```

Always use `color="currentColor"` when the icon should inherit color from its parent (e.g. inside buttons or
navigation actions).

## Hooks

| Hook                          | Returns                                                                      | Usage                                      |
| ----------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| `useTheme()`                  | Theme context + `t()` translate function                                     | Access theme config, translate text tokens |
| `useScreenSize()`             | `{isMobile, isTablet, isDesktop, isDesktopOrBigger, isTabletOrSmaller, ...}` | Responsive rendering                       |
| `useDialog()`                 | `{alert, confirm, dialog}`                                                   | Show imperative dialogs                    |
| `useSnackbar()`               | `{openSnackbar}`                                                             | Show snackbar notifications                |
| `useForm()`                   | Form context                                                                 | Advanced form logic                        |
| `useThemeVariant()`           | Current variant string                                                       | Check current variant context              |
| `useIsInViewport({ref})`      | boolean                                                                      | Detect if element is visible               |
| `useElementDimensions({ref})` | `{width, height}`                                                            | Get element dimensions                     |
