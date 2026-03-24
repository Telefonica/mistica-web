# Community

## AdvancedDataCard

AdvancedDataCard is an extended data card that combines structured content (title hierarchy, description) with composable extra blocks, optional footer actions, and touchable behavior in a single card surface.

### Usage

#### Use for

- Displaying data-rich summaries that need composable extra content blocks (value blocks, progress blocks, etc.)
- Building modular cards that combine text hierarchy with structured data visualizations
- Presenting detailed information with optional footer actions (buttons, images, links)

#### Don't use for

- Simple data presentations where a standard DataCard is sufficient
- Layouts that don't require composable extra blocks — prefer DataCard instead
- Non-card contexts where a list row or standalone block is more appropriate

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `readonly (ReactElement \| CardAction)[]` | No | - |  |
| aria-label | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `readonly RendersNullableElement<AllowedExtra>[]` | No | - |  |
| extraDividerPadding | `8 \| 16 \| 24` | No | 24 |  |
| footerImage | `RendersNullableElement<Image>` | No | - |  |
| footerText | `string` | No | - |  |
| footerTextLinesMax | `number` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `RendersNullableElement<Tag>` | No | - |  |
| href | `string` | No | - |  |
| newTab | `boolean` | No | - |  |
| noExtraDivider | `boolean` | No | false |  |
| onClose | `() => void` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| role | `string` | No | - |  |
| stackingGroup | `RendersNullableElement<StackingGroup>` | No | - |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | h3 |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |

## HighlightedValueBlock

HighlightedValueBlock displays prominent numeric or text values with optional headline, pretitle, strikethrough pricing, and supporting descriptions. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Highlighting key values (prices, scores, quantities) with large typography emphasis
- Showing price comparisons with strikethrough values and promotional headlines
- Displaying multiple heading-value pairs with supporting descriptions

#### Don't use for

- Simple single-line value display — use ValueBlock instead
- Content that doesn't need visual emphasis on numeric values

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string \| readonly string[]` | No | - |  |
| headings | `readonly Heading[]` | No | - |  |
| headline | `RendersNullableElement<Tag>` | No | - |  |
| pretitle | `string` | No | - |  |
| strikedValue | `string` | No | - |  |
| title | `string` | No | - |  |

## InformationBlock

InformationBlock presents a title and description alongside a right-aligned value with optional secondary strikethrough value. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing labeled data with a corresponding value (e.g., plan details with pricing)
- Displaying value comparisons with a secondary strikethrough value

#### Don't use for

- Standalone information display outside of a card context
- Complex data that requires more than a single value pair

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string \| readonly string[]` | No | - |  |
| secondaryValue | `string` | No | - |  |
| title | `string` | No | - |  |
| value | `string` | No | - |  |
| valueColor | `string` | No | vars.colors.textPrimary |  |

## ProgressBlock

ProgressBlock combines a title, progress bar, heading value, and optional description in a single block. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing progress toward a goal with a visual progress bar and numeric value
- Displaying consumption or usage metrics with contextual descriptions

#### Don't use for

- Standalone progress indicators outside of a card — use ProgressBar directly
- Simple percentage display without supporting context

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| heading | `{ value: string; valueColor?: string \| undefined; text: string; }` | Yes | - |  |
| aria-label | `string` | No | - |  |
| description | `string` | No | - |  |
| progressPercent | `number` | No | - |  |
| reverse | `boolean` | No | - |  |
| stackingGroup | `RendersNullableElement<StackingGroup>` | No | - |  |
| title | `string` | No | - |  |

## RowBlock

RowBlock displays a title with either a right-aligned description or a stacking group in a horizontal row layout. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Displaying key-value pairs in a horizontal layout within a card
- Showing a label with a right-aligned stacking group (e.g., avatars, icons)

#### Don't use for

- Complex multi-line content — use InformationBlock or other blocks instead
- Standalone rows outside of a card context — use Row or BoxedRow instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string` | No | - |  |
| stackingGroup | `RendersNullableElement<StackingGroup>` | No | - |  |
| title | `string` | No | - |  |

## SimpleBlock

SimpleBlock displays an image alongside a description with an optional right-aligned text. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing a small image with a text description inside a card
- Displaying brand logos or icons with accompanying labels

#### Don't use for

- Image-heavy layouts — use MediaCard or CoverCard instead
- Content without an image — use RowBlock instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string` | No | - |  |
| image | `RendersNullableElement<Image>` | No | - |  |
| rightText | `string` | No | - |  |

## ValueBlock

ValueBlock displays a title with a large prominent value and optional description lines. Designed to be used as an extra block inside AdvancedDataCard.

### Usage

#### Use for

- Showing a single key metric or value with a label and optional description
- Displaying currency amounts, scores, or quantities with emphasis

#### Don't use for

- Multiple values with comparison — use HighlightedValueBlock instead
- Values that need a progress indicator — use ProgressBlock instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string \| readonly string[]` | No | - |  |
| title | `string` | No | - |  |
| value | `string` | No | - |  |
| valueColor | `string` | No | vars.colors.textPrimary |  |
