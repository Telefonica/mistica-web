# Cards

## DataCard

DataCard presents structured informational content with optional media, hierarchy, actions, and supporting slots in a reusable card surface.

### Usage

#### Use for

- Displaying data-rich summaries that combine title hierarchy, supporting text, and contextual metadata
- Grouping informative content with optional actions (primary, secondary, link) in a single card container
- Building modular content blocks for dashboards, listings, and discovery experiences
- Using optional slots, top actions, and footer areas when extra context or secondary interactions are needed

#### Don't use for

- Do not overload the card with too many simultaneous actions and slots
- Do not use this pattern when a simpler list row or text block better fits the information density
- Do not let decorative assets dominate over the data hierarchy and actionable intent
- Do not create inconsistent card variants in the same collection without clear hierarchy

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "9:10" \| "auto"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary or buttonSecondary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| extraAlignment | `"content" \| "bottom"` | No | - |  |
| footerBackgroundColor | `string` | No | - |  |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| isInverse | `boolean` | No | - | @deprecated use variant="brand" instead |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| size | `"snap" \| "default" \| "display"` | No | default |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
| width | `string \| number` | No | - |  |

## MediaCard

MediaCard combines media and content in one card surface, balancing visual storytelling with clear text hierarchy and actions.

### Usage

#### Use for

- Presenting content where image or video provides key context for the card message
- Building discovery and editorial card collections with consistent media-plus-text structure
- Combining optional top actions, slot content, and CTA buttons in a single modular card pattern
- Adapting composition by media position when visual emphasis should support, not overpower, text hierarchy

#### Don't use for

- Do not use media-heavy cards for dense data-first scenarios better served by informational card patterns
- Do not overload each card with too many competing actions and secondary elements
- Do not rely on decorative media that weakens readability or action clarity
- Do not mix unrelated media positioning strategies in one card set without clear layout rationale

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "7:10" \| "9:10"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| circledImage | `boolean` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| footerBackgroundColor | `string` | No | - |  |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageAlt | `string` | No | - |  |
| imageFit | `"fit" \| "fill" \| "fill-center"` | No | - | Ignored when media position is not 'left' or 'right' |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| media | `RendersElement<Image> \| RendersElement<Video>` | No | - | @deprecated use imageSrc, imageSrcSet, videoSrc and related props |
| mediaAspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "4:3" \| "7:10"` | No | - | Ignored when mediaPosition is 'left' or 'right' |
| mediaPosition | `"top" \| "left" \| "right"` | No | - |  |
| mediaWidth | `string \| number` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| poster | `string` | No | - | @deprecated use imageSrc |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| size | `"snap" \| "default" \| "display"` | No | default |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"media" \| "default" \| "brand" \| "negative" \| "alternative" \| "inverse"` | No | - |  |
| videoAutoPlay | `boolean` | No | - |  |
| videoDataAttributes | `DataAttributes` | No | - |  |
| videoLoop | `boolean` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## CoverCard

CoverCard is a media-first card pattern that combines image or video backgrounds with layered content, actions, and optional footer content.

### Usage

#### Use for

- Highlighting featured content where visual media is the primary entry point
- Combining headline hierarchy, contextual metadata, and actions in a single promotional surface
- Supporting editorial, campaign, or discovery cards that need strong visual impact with clear call-to-action
- Using optional top actions and footer areas when secondary interactions or extra context are needed

#### Don't use for

- Do not use CoverCard for dense informational layouts where media is not the main signal
- Do not overload the card with too many competing actions in top, body, and footer at once
- Do not rely on background imagery alone; ensure text and actions remain legible over media
- Do not use decorative media that conflicts with the card’s content hierarchy or action intent

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "9:10" \| "auto"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| footerBackgroundColor | `string` | No | - |  |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| gradientOverlayColor | `string` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| size | `"snap" \| "default" \| "display"` | No | default |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | - |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `readonly (ReactElement \| CardAction)[]` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
| videoAutoPlay | `boolean` | No | - |  |
| videoDataAttributes | `DataAttributes` | No | - |  |
| videoLoop | `boolean` | No | - |  |
| videoRef | `RefObject<VideoElement>` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## NakedCard

NakedCard is a transparent card surface that inherits the surrounding theme context while keeping card content structure and actions.

### Usage

#### Use for

- Presenting grouped content with card hierarchy but without an emphasized container background
- Integrating card content in already-defined surfaces where extra visual chrome would add noise
- Keeping consistent card anatomy (media/content/actions) while adapting naturally to parent variant context
- Using `size` variants (including `snap`) to fit compact and dense layout scenarios

#### Don't use for

- Do not use NakedCard when strong visual separation from background is required for comprehension
- Do not force explicit card variant styling; NakedCard is designed to inherit context variant
- Do not rely on deprecated small-card patterns when `NakedCard size="snap"` is the intended approach
- Do not overload transparent cards with excessive actions that reduce scanability on busy backgrounds

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "7:10" \| "9:10"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| circledImage | `boolean` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - | @deprecated NakedCards use the context variant because they are transparent |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageAlt | `string` | No | - |  |
| imageFit | `"fit" \| "fill" \| "fill-center"` | No | - | Ignored when media position is not 'left' or 'right' |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| media | `RendersElement<Image> \| RendersElement<Video>` | No | - | @deprecated use imageSrc, imageSrcSet, videoSrc and related props |
| mediaAspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "4:3" \| "7:10"` | No | - | Ignored when mediaPosition is 'left' or 'right' |
| mediaPosition | `"top" \| "left" \| "right"` | No | - |  |
| mediaWidth | `string \| number` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| poster | `string` | No | - | @deprecated use imageSrc |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| size | `"snap" \| "default" \| "display"` | No | default |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"media" \| "default" \| "brand" \| "negative" \| "alternative" \| "inverse"` | No | - | @deprecated NakedCards use the context variant because they are transparent |
| videoAutoPlay | `boolean` | No | - |  |
| videoDataAttributes | `DataAttributes` | No | - |  |
| videoLoop | `boolean` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## HighlightedCard

HighlightedCard is a legacy highlighted media-card pattern; use the equivalent MediaCard layout in new designs.

### Usage

#### Use for

- Maintaining backward-compatible highlighted card layouts in existing screens
- Showing media-supported content where right-positioned visual context improves scanability
- Supporting migration scenarios where legacy highlighted cards are being progressively replaced
- Prefering the equivalent `MediaCard` composition for new product work

#### Don't use for

- Do not create new UI patterns based on this deprecated variant
- Do not mix legacy highlighted cards and modern media card variants without intentional transition strategy
- Do not use highlighted treatment when content does not require visual emphasis
- Do not prioritize legacy convenience over consistent modern card-system usage

> **Deprecated**: use <MediaCard size="default" mediaPosition="right" />

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "7:10" \| "9:10"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| circledImage | `boolean` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| footerBackgroundColor | `string` | No | - |  |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageAlt | `string` | No | - |  |
| imageFit | `"fit" \| "fill" \| "fill-center"` | No | - | Ignored when media position is not 'left' or 'right' |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| imageUrl | `string` | No | - | @deprecated use imageSrc |
| isInverse | `boolean` | No | - | @deprecated use variant="brand" instead |
| loadOnTop | `boolean` | No | - |  |
| media | `RendersElement<Image> \| RendersElement<Video>` | No | - | @deprecated use imageSrc, imageSrcSet, videoSrc and related props |
| mediaAspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "4:3" \| "7:10"` | No | - | Ignored when mediaPosition is 'left' or 'right' |
| mediaWidth | `string \| number` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| poster | `string` | No | - | @deprecated use imageSrc |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"media" \| "default" \| "brand" \| "negative" \| "alternative" \| "inverse"` | No | - |  |
| videoAutoPlay | `boolean` | No | - |  |
| videoDataAttributes | `DataAttributes` | No | - |  |
| videoLoop | `boolean` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## PosterCard

PosterCard is a legacy media-first card kept for backward compatibility; use CoverCard for new designs.

### Usage

#### Use for

- Maintaining existing legacy surfaces that still rely on PosterCard behavior
- Supporting transitional migrations where replacing all legacy poster cards is not yet feasible
- Preserving compatibility in older flows while aligning new work to CoverCard patterns
- Using it temporarily when refactoring deprecated props toward current card APIs

#### Don't use for

- Do not use PosterCard for new product experiences; use CoverCard instead
- Do not introduce new dependencies on deprecated PosterCard-only prop patterns
- Do not mix legacy and modern card variants inconsistently within the same content family
- Do not postpone migration planning when CoverCard already satisfies the target use case

> **Deprecated**: use CoverCard

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `readonly (ReactElement \| CardAction)[]` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "9:10" \| "auto"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| backgroundImage | `string \| { src: string; srcSet?: string \| undefined; } \| { src?: string \| undefined; srcSet: string; }` | No | - | @deprecated use imageSrc or imageSrcSet |
| backgroundVideo | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - | @deprecated use videoSrc |
| backgroundVideoRef | `RefObject<VideoElement>` | No | - | @deprecated use videoRef |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary or buttonSecondary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| isInverse | `boolean` | No | - | @deprecated use variant="brand" instead |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| poster | `string` | No | - | @deprecated use imageSrc |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| size | `"snap" \| "default" \| "display"` | No | default |  |
| slot | `ReactNode` | No | - |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `readonly (ReactElement \| CardAction)[]` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
| videoRef | `RefObject<VideoElement>` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## SnapCard

Deprecated alias of `DataCard` in snap size for compact, actionable data cards.

### Usage

#### Use for

- Keeping legacy implementations stable while migrating to `DataCard size=\"snap\"`
- Compact content cards with clear hierarchy (pretitle/title/subtitle/description) and optional primary action
- Small promotional or informative entry points that open a richer detail view

#### Don't use for

- Do not use in new work; use `DataCard size=\"snap\"` instead
- Do not use when content requires extended reading or many controls; move to a larger card size or another
  layout
- Do not add optional elements just because they are available; keep snap cards concise and scannable

> **Deprecated**: use <Datacard size="snap" /> instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "9:10" \| "auto"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary or buttonSecondary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| extraAlignment | `"content" \| "bottom"` | No | - |  |
| footerBackgroundColor | `string` | No | - |  |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| isInverse | `boolean` | No | - | @deprecated use variant="brand" instead |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
| width | `string \| number` | No | - |  |

## SmallNakedCard

Deprecated alias of `NakedCard` in snap size, for compact transparent cards that inherit the surrounding theme variant.

### Usage

#### Use for

- Maintaining legacy screens that already use this component while migrating to `NakedCard size=\"snap\"`
- Compact, lightweight card entries on transparent backgrounds where the card should inherit the current
  variant context
- Short teaser content that links to a more detailed destination

#### Don't use for

- Do not use in new designs; use `NakedCard size=\"snap\"` instead
- Do not use when you need strong surface/background separation; choose a non-naked card variant
- Do not overload this compact format with long text, dense metadata, or multiple competing actions

> **Deprecated**: use <NakedCard size="snap" /> instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "7:10" \| "9:10"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| circledImage | `boolean` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - | @deprecated NakedCards use the context variant because they are transparent |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageAlt | `string` | No | - |  |
| imageFit | `"fit" \| "fill" \| "fill-center"` | No | - | Ignored when media position is not 'left' or 'right' |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| media | `RendersElement<Image> \| RendersElement<Video>` | No | - | @deprecated use imageSrc, imageSrcSet, videoSrc and related props |
| mediaAspectRatio | `number \| "auto" \| "1:1" \| "16:9" \| "4:3" \| "7:10"` | No | - | Ignored when mediaPosition is 'left' or 'right' |
| mediaPosition | `"top" \| "left" \| "right"` | No | - |  |
| mediaWidth | `string \| number` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| poster | `string` | No | - | @deprecated use imageSrc |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| showFooter | `boolean` | No | - |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"media" \| "default" \| "brand" \| "negative" \| "alternative" \| "inverse"` | No | - | @deprecated NakedCards use the context variant because they are transparent |
| videoAutoPlay | `boolean` | No | - |  |
| videoDataAttributes | `DataAttributes` | No | - |  |
| videoLoop | `boolean` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## DisplayDataCard

DisplayDataCard is the display-sized data card pattern for high-prominence information blocks; prefer the equivalent DataCard size variant in new designs.

### Usage

#### Use for

- Presenting high-visibility data cards that need a larger visual footprint than default card sizes
- Highlighting key informational modules in editorial or promotional layouts
- Maintaining continuity in legacy screens that already use this display-card pattern
- Prefering the display size option in `DataCard` for new implementations

#### Don't use for

- Do not introduce this legacy variant in new component compositions when the modern `DataCard` size option is
  available
- Do not use display-sized cards in dense grids where compact scanning is the priority
- Do not fill large cards with minimal content that weakens visual balance and hierarchy
- Do not mix multiple card sizing paradigms in one section without intentional layout rationale

> **Deprecated**: use <Datacard size="display" /> instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `TopActionsArray` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "9:10" \| "auto"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary or buttonSecondary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| extraAlignment | `"content" \| "bottom"` | No | - |  |
| footerBackgroundColor | `string` | No | - |  |
| footerDivider | `boolean` | No | - |  |
| footerSlot | `ReactNode` | No | - |  |
| footerVariant | `"default" \| "brand" \| "inverse"` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| isInverse | `boolean` | No | - | @deprecated use variant="brand" instead |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| secondaryButton | `RendersNullableElement<Button>` | No | - | @deprecated use buttonSecondary |
| showFooter | `boolean` | No | - |  |
| slot | `ReactNode` | No | - |  |
| slotAlignment | `"content" \| "bottom"` | No | bottom |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `TopActionsArray` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
| width | `string \| number` | No | - |  |

## DisplayMediaCard

DisplayMediaCard is the large-format media card variant for prominent visual modules; prefer equivalent sizing through modern media-card patterns in new designs.

### Usage

#### Use for

- Maintaining legacy large media-card compositions already present in existing product surfaces
- Highlighting high-priority editorial or promotional content with an expanded media footprint
- Preserving visual continuity in sections that depend on this specific display-style card rhythm
- Prefering current card-size and layout variants for new implementations

#### Don't use for

- Do not introduce this legacy variant in new card systems when modern equivalents are available
- Do not use oversized media cards in dense, scan-first grids
- Do not combine multiple display-size card patterns without clear visual hierarchy
- Do not fill large card surfaces with minimal content that reduces design balance

> **Deprecated**: use <CoverCard size="display" />

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| actions | `readonly (ReactElement \| CardAction)[]` | No | - | @deprecated use topActions |
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "9:10" \| "auto"` | No | - |  |
| asset | `ReactNode` | No | - |  |
| backgroundColor | `string` | No | - |  |
| backgroundImage | `string \| { src: string; srcSet?: string \| undefined; } \| { src?: string \| undefined; srcSet: string; }` | No | - | @deprecated use imageSrc or imageSrcSet |
| backgroundVideo | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - | @deprecated use videoSrc |
| backgroundVideoRef | `RefObject<VideoElement>` | No | - | @deprecated use videoRef |
| button | `RendersNullableElement<Button>` | No | - | @deprecated use buttonPrimary or buttonSecondary |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| buttonPrimary | `RendersNullableElement<Button>` | No | - |  |
| buttonSecondary | `RendersNullableElement<Button>` | No | - |  |
| closeButtonLabel | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - | @deprecated use slot |
| fullPageOnWebView | `boolean` | No | - |  |
| headline | `string \| RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| href | `string` | No | - |  |
| imageSrc | `string` | No | - |  |
| imageSrcSet | `string` | No | - |  |
| isInverse | `boolean` | No | - | @deprecated use variant="brand" instead |
| loadOnTop | `boolean` | No | - |  |
| newTab | `boolean` | No | - |  |
| onClose | `() => unknown` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| poster | `string` | No | - | @deprecated use imageSrc |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| replace | `boolean` | No | - |  |
| role | `string` | No | - |  |
| secondaryButton | `RendersNullableElement<Button>` | No | - | @deprecated use buttonSecondary |
| size | `"snap" \| "default" \| "display"` | No | default |  |
| slot | `ReactNode` | No | - |  |
| subtitle | `string` | No | - |  |
| subtitleLinesMax | `number` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| titleLinesMax | `number` | No | - |  |
| to | `string` | No | - |  |
| topActions | `readonly (ReactElement \| CardAction)[]` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
| videoRef | `RefObject<VideoElement>` | No | - |  |
| videoSrc | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| width | `string \| number` | No | - |  |

## EmptyStateCard

EmptyStateCard communicates absence of content in a boxed surface with supportive messaging and optional recovery actions.

### Usage

#### Use for

- Explaining blank or initial states in a clear, calm card format
- Pairing concise title and description with a focused next action
- Using a simple visual cue (icon or image) to reinforce context when no data is available
- Guiding users toward recovery or next steps with small, low-friction actions

#### Don't use for

- Do not use empty-state cards for error-heavy or blocking scenarios that need dedicated feedback patterns
- Do not overload the card with long explanatory copy or multiple competing actions
- Do not use large primary actions in this pattern when compact action treatment is expected
- Do not present decorative visuals without clear supporting message and intent

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| asset | `ReactNode` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| description | `string` | No | - |  |
| imageUrl | `string` | No | - |  |
| secondaryButton | `RendersNullableElement<Button>` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | h3 |  |

## CardActionIconButton

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-current | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| checked | `boolean` | No | - |  |
| checkedProps | `BaseIconButtonAction` | No | - |  |
| defaultChecked | `boolean` | No | - |  |
| disabled | `boolean` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| Icon | `(props: IconProps) => Element` | No | - |  |
| label | `string` | No | - |  |
| newTab | `boolean` | No | - |  |
| onChange | `(checked: boolean) => void \| Promise<void> \| undefined` | No | - |  |
| onPress | `() => void` | No | - |  |
| replace | `boolean` | No | - |  |
| to | `string` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| uncheckedProps | `BaseIconButtonAction` | No | - |  |

## CardActionSpinner

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | - |  |
| color | `string` | No | - |  |
| size | `string \| number` | No | - |  |
| style | `CSSProperties` | No | - |  |
