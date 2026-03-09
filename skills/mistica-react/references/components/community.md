# Community

## CommunityAdvancedDataCard

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

## CommunityHighlightedValueBlock

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

## CommunityInformationBlock

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string \| readonly string[]` | No | - |  |
| secondaryValue | `string` | No | - |  |
| title | `string` | No | - |  |
| value | `string` | No | - |  |
| valueColor | `string` | No | vars.colors.textPrimary |  |

## CommunityProgressBlock

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

## CommunityRowBlock

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string` | No | - |  |
| stackingGroup | `RendersNullableElement<StackingGroup>` | No | - |  |
| title | `string` | No | - |  |

## CommunitySimpleBlock

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string` | No | - |  |
| image | `RendersNullableElement<Image>` | No | - |  |
| rightText | `string` | No | - |  |

## CommunityValueBlock

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-label | `string` | No | - |  |
| description | `string \| readonly string[]` | No | - |  |
| title | `string` | No | - |  |
| value | `string` | No | - |  |
| valueColor | `string` | No | vars.colors.textPrimary |  |
