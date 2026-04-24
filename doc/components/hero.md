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

## Accessibility

### Heading hierarchy

Hero heading levels are configurable.

- Title defaults to `h1` (`titleAs`) and supports `h1` to `h6`
- Pretitle is non-heading by default (`span`) and can be configured with `pretitleAs`

If you change defaults:

- If only one heading exists, that heading is announced first
- If both pretitle and title are headings, the one with higher hierarchy is read first
- Do not assign the same heading level to pretitle and title

### Accessibility label

Hero actions should have clear accessible names.

- Assign an accessibility label to each action when visible text is not enough to explain the outcome
- If multiple actions have similar visible text, add contextual labels so screen reader users can distinguish
  them

### Images and videos

#### Images

If the hero includes an image:

- Provide descriptive alt text that explains the image content and purpose

If the image is used as a CoverHero background (`backgroundImage`):

- It is treated as decorative and ignored by screen readers

#### Videos

If the hero includes a video:

- If playback exceeds 5 seconds, provide controls so users can pause/stop playback
- Ensure subtitles are available when the video includes meaningful audio
- Avoid distraction; pause or stop autoplaying media when it is no longer visible

For additional media guidance, see the accessibility sections in Fundamentals, Customization, and Primitives,
and the Meter accessibility guidance in Data visualizations.

### Text limitation

Hero supports visual text truncation (`descriptionLinesMax`, `titleLinesMax`, `pretitleLinesMax`).

- Prefer layouts that expose full text
- If truncation is required, keep complete meaning available to assistive technologies

### Slot

Hero and CoverHero allow custom content through slots (`extra`, `sideExtra`, `headline`). Because these areas
are fully customizable, ensure custom controls, icons, and media preserve accessible names, focus order, and
semantics.
