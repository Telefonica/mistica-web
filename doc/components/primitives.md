# Primitives

## Image

Image displays responsive media with controlled aspect ratio, loading skeleton, and graceful error fallback to
keep layouts stable while assets load or fail.

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

## Video

Use video for embedded media playback with responsive sizing, poster/error fallbacks, and controllable
autoplay/loading behavior.

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

Circle is a circular container used to frame visual content or compact UI elements with optional background
and border styling.

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

## Touchable

Touchable is a Mística component used to build consistent and accessible product interfaces.

### Usage

#### Use for

- Applying the documented component pattern in product UI
- Keeping user experience coherent across screens and flows

#### Don't use for

- Do not replace a more suitable semantic component with this one
- Do not customize behavior in ways that conflict with Mística guidance

## Placeholder

Placeholder renders a neutral framed block for temporary visual stand-ins when real media or content is not
yet available.

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

## FadeIn

FadeIn is a lightweight wrapper that animates children from transparent to visible using a configurable fade
transition (`duration` and `delay`).

### Usage

#### Use for

- Revealing newly mounted content without abrupt appearance changes
- Delaying visual entrance of secondary content by setting a custom `delay` (for example `1s`)
- Tuning fade speed with `duration` when adapting motion rhythm to context
- Wrapping any content block that should fade in while preserving existing layout and semantics

#### Don't use for

- Do not use FadeIn as the only indicator of critical state changes; pair with clear text/structure
- Do not apply long or stacked delays that make content feel unresponsive
- Do not use invalid CSS time values for `duration`/`delay`; pass valid values like `0.3s` or `200ms`
- Do not wrap large full-screen transitions that need dedicated navigation/screen transition patterns

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
