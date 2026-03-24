# Primitives

## Image

Image displays responsive media with controlled aspect ratio, loading skeleton, and graceful error fallback to keep layouts stable while assets load or fail.

### Usage

#### Use for

- Displaying responsive media in cards, lists, and hero content while preserving intended composition ratios
- Preventing layout jumps with fixed size or aspect-ratio containers during image loading
- Providing resilient experiences with loading and error fallbacks when network or asset quality is variable
- Using circular or rectangular presentation intentionally to match avatar-style vs content-image semantics

#### Don't use for

- Do not omit meaningful alternative text when the image conveys essential information
- Do not rely on unconstrained image sizes that cause reflow or inconsistent cropping across breakpoints
- Do not disable loading/error fallback patterns in contexts where reliability and perceived performance
  matter
- Do not mix arbitrary border radius and fit strategies without clear visual-system rationale

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| src | `string` | Yes | - |  |
| alt | `string` | No |  | defaults to empty string |
| aspectRatio | `number \| "1:1" \| "16:9" \| "7:10" \| "4:3"` | No | 0 | defaults to 0 (original image proportions). If both width and height are given, aspectRatio is ignored. |
| border | `boolean` | No | - |  |
| circular | `boolean` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| errorFallback | `boolean` | No | true |  |
| height | `string \| number` | No | - |  |
| loadingFallback | `boolean` | No | true |  |
| noBorderRadius | `boolean` | No | - |  |
| objectFit | `"contain" \| "cover" \| "fill" \| "none"` | No | - |  |
| objectPosition | `string` | No | - |  |
| onError | `() => void` | No | - |  |
| onLoad | `() => void` | No | - |  |
| srcSet | `string` | No | - |  |
| width | `string \| number` | No | - | defaults to 100% when no width and no height are given |

## Video

Use video for embedded media playback with responsive sizing, poster/error fallbacks, and controllable autoplay/loading behavior.

### Usage

#### Use for

- Showing inline video content in cards, pages, or media sections with fixed dimensions or aspect ratio
- Providing a poster image so layout remains stable while media loads or when playback is stopped
- Delivering multiple video sources/formats for broader playback compatibility
- Scenarios that need controlled playback behavior (manual, when-loaded autoplay, or streaming autoplay)
- Experiences where custom play/pause/stop/load handling is orchestrated from parent logic

#### Don't use for

- Do not rely on autoplay as the only way users can consume important information
- Do not omit fallback strategy (poster/error handling) when video availability is uncertain
- Do not use heavy video assets in contexts where lightweight images communicate the same message
- Do not choose inconsistent aspect ratios across related media blocks if visual rhythm matters
- Do not treat this as background decoration only when no meaningful media interaction/value is provided

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| src | `string \| readonly string[] \| VideoSourceWithType \| readonly VideoSourceWithType[]` | Yes | - | accepts multiple sources |
| aspectRatio | `number \| "1:1" \| "16:9" \| "4:3"` | No | 0 | defaults to 0 (original video proportions). If both width and height are given, aspectRatio is ignored. |
| autoPlay | `boolean \| "streaming" \| "when-loaded"` | No | when-loaded | defaults to when-loaded. If set to true, behaviour is the same as when the value is equal to when-loaded |
| dataAttributes | `DataAttributes` | No | - |  |
| height | `string \| number` | No | - |  |
| loadingTimeout | `number` | No | 10000 | defaults to 10s |
| loop | `boolean` | No | true | defaults to true |
| muted | `boolean` | No | true | defaults to true |
| onError | `() => void` | No | - |  |
| onLoad | `() => void` | No | - |  |
| onPause | `() => void` | No | - |  |
| onPlay | `() => void` | No | - |  |
| poster | `string` | No | - |  |
| preload | `"none" \| "metadata" \| "auto"` | No | none | defaults to none |
| width | `string \| number` | No | - | defaults to 100% when no width and no height are given |

## VideoElement

VideoElement is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## Circle

Circle is a circular container used to frame visual content or compact UI elements with optional background and border styling.

### Usage

#### Use for

- Displaying circular visual elements such as avatars, icons, or decorative media crops
- Framing short content inside a compact round shape when circular emphasis is part of the visual language
- Applying consistent circular backgrounds (solid, image-based, or custom) across related UI blocks
- Adding subtle boundary definition with optional border when contrast is needed

#### Don't use for

- Do not use Circle as a generic layout wrapper for non-circular compositions
- Do not place long text or complex multi-line content inside a circular frame
- Do not rely on decorative circles alone to communicate critical information
- Do not use low-contrast background and border combinations that reduce legibility

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| background | `string` | No | - |  |
| backgroundColor | `string` | No | - |  |
| backgroundImage | `string` | No | - |  |
| border | `string \| boolean` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
| size | `string \| number` | No | - |  |

## Touchable

Touchable is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| aria-checked | `boolean \| "true" \| "false"` | No | - |  |
| aria-controls | `string` | No | - |  |
| aria-current | `boolean \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" \| "time"` | No | - |  |
| aria-describedby | `string` | No | - |  |
| aria-description | `string` | No | - |  |
| aria-disabled | `boolean` | No | - |  |
| aria-expanded | `boolean \| "true" \| "false"` | No | - |  |
| aria-haspopup | `boolean \| "true" \| "false" \| "menu" \| "dialog"` | No | - |  |
| aria-hidden | `boolean \| "true" \| "false"` | No | - |  |
| aria-label | `string` | No | - |  |
| aria-labelledby | `string` | No | - |  |
| aria-live | `"polite" \| "off" \| "assertive"` | No | - |  |
| aria-selected | `boolean \| "true" \| "false"` | No | - |  |
| as | `"a"` | No | - |  |
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - | "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" |
| disabled | `boolean` | No | - |  |
| formId | `string` | No | - |  |
| fullPageOnWebView | `boolean` | No | - |  |
| href | `string` | No | - |  |
| id | `string` | No | - |  |
| loadOnTop | `boolean` | No | - |  |
| maybe | `true` | No | - |  |
| newTab | `boolean` | No | - |  |
| onNavigate | `() => void \| Promise<void>` | No | - |  |
| onPress | `PressHandler` | No | - |  |
| replace | `boolean` | No | - |  |
| resetMargin | `boolean` | No | true |  |
| role | `string` | No | - | IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate |
| stopPropagation | `boolean` | No | - |  |
| style | `CSSProperties` | No | - |  |
| tabIndex | `number` | No | - |  |
| to | `string \| Location` | No | - |  |
| trackingEvent | `Readonly<LegacyAnalyticsEvent> \| Readonly<FirebaseEvent> \| readonly TrackingEvent[]` | No | - |  |
| type | `"submit"` | No | - |  |

## TouchableElement

TouchableElement is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## Placeholder

Placeholder renders a neutral framed block for temporary visual stand-ins when real media or content is not yet available.

### Usage

#### Use for

- Reserving layout space for pending media or components during design, QA, or prototyping stages
- Visualizing intended content dimensions before final assets are integrated
- Maintaining stable page composition when temporary stand-in blocks are needed
- Communicating “content pending” states in internal previews and non-final environments

#### Don't use for

- Do not use Placeholder as a loading indicator in production flows; use skeleton/loading patterns instead
- Do not present placeholders as final user-facing content in released experiences
- Do not rely on placeholder blocks for critical information hierarchy or interaction affordances
- Do not use generic placeholders when real fallback content can improve clarity and accessibility

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| height | `string \| number` | No | 120 |  |
| width | `string \| number` | No | auto |  |

## FadeIn

Emotional branded animations enhance the brand identity by visually connecting with users. They help convey emotions and reinforce the brand’s values, creating.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No |  |  |
| dataAttributes | `DataAttributes` | No | - |  |
| delay | `string` | No | 0 |  |
| duration | `string` | No | 0.3s |  |

## ScreenReaderOnly

ScreenReaderOnly exposes content to assistive technologies while keeping it visually hidden in the interface.

### Usage

#### Use for

- Providing additional descriptive text for screen reader users when visual UI elements lack explicit labels
- Supplying hidden headings, context, or instructions that improve non-visual navigation
- Adding accessible names for icon-only or highly condensed controls where visible text is intentionally
  omitted
- Preserving semantic structure while keeping visual layouts clean and uncluttered

#### Don't use for

- Do not hide information that sighted users also need to complete the task
- Do not use ScreenReaderOnly to mask missing visible labels when visible clarity is required
- Do not duplicate excessive hidden text that creates noisy or repetitive screen reader output
- Do not rely on hidden-only instructions as the primary UX for critical or high-risk actions

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | - |  |
| dataAttributes | `DataAttributes` | No | - |  |
