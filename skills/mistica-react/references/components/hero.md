# Hero

## Hero

A hero is a promotional section at the top of the page with clear call-to-action focus; use CoverHero instead
when you need media as the background.

### Usage

#### Use for

- Introducing high-priority page narratives with strong visual impact and clear user direction
- Combining media and messaging in a balanced hero composition that adapts across breakpoints
- Placing one primary action (plus optional supporting actions) near the core value proposition
- Supporting campaign and discovery surfaces where top-of-page emphasis is intentional
- Using foreground media composition (not full media background) when content hierarchy must stay clear
- As a slide in a slideshow for presenting multiple content

#### Don't use for

- Do not use hero treatments for low-priority content that does not need top-level emphasis
- Do not overload the hero with excessive text, extra slots, and competing actions
- Do not let media dominate readability; headline and CTA should remain clear and actionable
- Do not mix inconsistent media placement and background variants without clear layout rationale
- Do not use Hero when the section requires image/video as background; use CoverHero instead

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| media | `RendersElement<Image> \| RendersElement<Video>` | Yes | - |  |
| background | `"default" \| "alternative" \| "brand" \| "brand-secondary" \| "none"` | No | default |  |
| button | `RendersNullableElement<Button>` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| desktopMediaPosition | `"left" \| "right"` | No | left |  |
| extra | `ReactNode` | No | - |  |
| headline | `RendersNullableElement<Tag>` | No | - |  |
| height | `string \| number` | No | - |  |
| noPaddingY | `boolean` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| title | `string` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | h1 |  |

## CoverHero

CoverHero is a high-impact hero section that combines strong heading hierarchy, optional media background, and
grouped call-to-action buttons; choose it instead of Hero when media needs to be the section background.

### Usage

#### Use for

- Presenting key page narratives where title, supporting copy, and actions need immediate prominence
- Building campaign or landing headers with optional background image/video and readable foreground content
- Pairing main hero messaging with optional side content for complementary context or utility
- Structuring primary and secondary actions in a consistent hero action group across breakpoints
- Choosing a hero pattern where media must sit behind content as the background layer

#### Don't use for

- Do not use CoverHero for low-priority sections that do not need top-of-page emphasis
- Do not overload the hero with excessive text, multiple side elements, and too many actions at once
- Do not rely on media alone; ensure text hierarchy remains readable over backgrounds
- Do not use centered and side-content compositions together when they create ambiguous visual focus
- Do not use CoverHero when media does not need to be background; use Hero for standard foreground
  compositions

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | `string` | Yes | - |  |
| aria-label | `string` | No | - |  |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "4:3" \| "auto"` | No | auto |  |
| background | `string` | No | - |  |
| backgroundImage | `string` | No | - |  |
| backgroundVideo | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | No | - |  |
| backgroundVideoRef | `RefObject<VideoElement>` | No | - |  |
| button | `RendersNullableElement<Button>` | No | - |  |
| buttonLink | `RendersNullableElement<ButtonLink>` | No | - |  |
| centered | `boolean` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| description | `string` | No | - |  |
| descriptionLinesMax | `number` | No | - |  |
| extra | `ReactNode` | No | - |  |
| headline | `RendersNullableElement<Tag>` | No | - |  |
| minHeight | `string \| number` | No | - |  |
| noPaddingY | `boolean` | No | - |  |
| poster | `string` | No | - |  |
| pretitle | `string` | No | - |  |
| pretitleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | - |  |
| pretitleLinesMax | `number` | No | - |  |
| secondaryButton | `RendersNullableElement<Button>` | No | - |  |
| sideExtra | `ReactNode` | No | - |  |
| titleAs | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "span"` | No | h1 |  |
| titleLinesMax | `number` | No | - |  |
| variant | `"default" \| "brand" \| "negative" \| "alternative" \| "media" \| "inverse"` | No | - |  |
