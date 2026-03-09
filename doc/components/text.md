---
category: Text
---

# Text

## Text

Foundational typography primitive for custom text rendering when preset components (`Text1`–`Text10`) do not cover the need.

### Usage

#### Use for

- Building custom text compositions that need explicit control of size, line-height, weight, truncation, or
  semantic element (`as`)
- Advanced typography cases that still must integrate with Mística theme variants and accessibility attributes
- Implementing edge cases where preset levels (`Text1`–`Text10`) are not sufficient
- Rendering text with controlled behaviors like multi-line truncation, alignment, transform, and hyphenation

#### Don't use for

- Do not use this primitive by default when a text preset communicates hierarchy correctly
- Do not break typographic consistency by creating arbitrary one-off sizes for standard product copy
- Do not use styling alone to convey structure; keep proper semantic tags for headings and content
- Do not overuse truncation when full content is required for comprehension

## Text1

Small preset text level for compact supporting information and dense UI metadata.

### Usage

#### Use for

- Compact secondary information such as helper labels, table headers, or low-emphasis metadata
- Dense layouts where readability must be preserved without increasing visual weight
- Supporting copy that should remain clearly below body text in hierarchy

#### Don't use for

- Do not use for primary body copy that users must read continuously
- Do not use for headings or key messages that need strong prominence
- Do not rely on this level when accessibility requires larger, easier-to-read copy

## Text2

Low-emphasis preset text level for secondary copy that remains more readable than compact metadata styles.

### Usage

#### Use for

- Secondary explanatory text near controls, cards, and list rows
- Supporting content that should be visible but not dominate the screen
- Lightweight descriptive copy under stronger titles or values

#### Don't use for

- Do not use for the main reading text in long-form content blocks
- Do not use for top-level headings or high-priority messaging
- Do not mix this level inconsistently when adjacent elements require clearer hierarchy separation

## Text3

Baseline preset text level for standard body copy in most product interfaces.

### Usage

#### Use for

- Default body text in forms, cards, dialogs, and content sections
- General-purpose readable copy where no special prominence is required
- Paragraphs and descriptions that users need to read comfortably

#### Don't use for

- Do not use for minor metadata that should be visually quieter
- Do not use for headlines that need stronger visual hierarchy
- Do not mix many body sizes in the same block when one consistent level is enough

## Text4

Emphasized text preset for short content blocks that need more presence than standard body text.

### Usage

#### Use for

- Short prominent descriptions, callouts, or intro copy above regular body text
- Intermediate hierarchy between body copy and section headings
- UI moments where emphasis is needed without using display-level typography

#### Don't use for

- Do not use for long dense paragraphs where a calmer body level improves readability
- Do not use as the main page headline level
- Do not apply this emphasis to every text block, or hierarchy loses meaning

## Text5

High-emphasis text preset for section-leading copy and compact subheading use cases.

### Usage

#### Use for

- Subsection titles and introductory statements above body content
- Prominent supporting copy in cards, banners, and feedback components
- Short textual anchors that need quick scanning in complex layouts

#### Don't use for

- Do not use for long paragraph content
- Do not use as the largest page headline level when stronger hierarchy is required
- Do not skip semantics; if it is a heading, render with an appropriate heading element

## Text6

Heading-oriented preset for strong section titles and key interface messages.

### Usage

#### Use for

- Primary section headings inside pages and major containers
- High-visibility titles in feedback, onboarding, or transactional summaries
- Clear hierarchy breaks before supporting descriptions and actions

#### Don't use for

- Do not use for regular body or helper text
- Do not overuse this level in small components where it competes with surrounding content
- Do not present heading-styled text without corresponding semantic structure

## Text7

Prominent heading preset for high-priority titles that need stronger visual impact than section headings.

### Usage

#### Use for

- High-priority screen titles and standout content headers
- Hero-like title areas that still sit within regular page layouts
- Short textual anchors that must be noticed quickly

#### Don't use for

- Do not use for dense body content or long paragraphs
- Do not use multiple Text7 blocks in the same visual area without clear hierarchy
- Do not use when a lower heading level already solves the hierarchy need

## Text8

Display-oriented preset for large headings in standout surfaces such as hero or campaign blocks.

### Usage

#### Use for

- Large, attention-grabbing headings in hero and promotional contexts
- High-impact title moments where hierarchy must be immediately clear
- Short display copy that benefits from strong typographic presence

#### Don't use for

- Do not use in dense layout areas where large typography reduces readability
- Do not use for long multiline paragraphs
- Do not overuse alongside other display levels in the same section

## Text9

Large display text preset for very prominent titles and high-impact messaging moments.

### Usage

#### Use for

- Very prominent hero or campaign headlines
- Major entry-point titles where visual emphasis is intentionally high
- Short statements designed to be scanned immediately

#### Don't use for

- Do not use in standard content flows where smaller heading levels preserve rhythm
- Do not use for supporting or secondary copy
- Do not combine with long body text in the same block without clear spacing/hierarchy separation

## Text10

Top display typography level for the most prominent titles in exceptional, high-visibility contexts.

### Usage

#### Use for

- Highest-emphasis headings such as flagship hero titles or exceptional campaign moments
- Very short, high-importance statements that need maximum visual prominence
- Landing or cover areas where a single dominant typographic anchor is required

#### Don't use for

- Do not use for regular interface headings or repeated section titles
- Do not use for paragraph content or explanatory text
- Do not apply this level in constrained spaces where it harms readability or layout balance

## Title1

Compact overline-style section title for low-emphasis grouping labels, typically uppercase and secondary in tone.

### Usage

#### Use for

- Labeling functional sub-sections with a subtle heading level above primary content titles
- Categorization headers that should separate blocks without dominating the layout
- Header rows that may include lightweight right-side companion content (for example a small link/value)

#### Don't use for

- Do not use as the main page or section headline when stronger hierarchy is required
- Do not use for long heading text; keep this level short and scannable
- Do not rely on visual style only; keep proper heading semantics via the appropriate heading element

## Title2

Standard section heading level for dividing related content blocks with clear but balanced prominence.

### Usage

#### Use for

- Structuring primary sections inside a page or container
- Creating clear hierarchy above body content, lists, and cards
- Section headers that can optionally include right-aligned supporting content

#### Don't use for

- Do not use when a lower-emphasis label level (Title1) is sufficient
- Do not use as the top-most headline when page-level emphasis is needed
- Do not overload right-side companion content so the title loses clarity

## Title3

High-emphasis section heading for prominent content groupings such as commercial or featured blocks.

### Usage

#### Use for

- Highlighting important section starts where stronger emphasis than Title2 is needed
- Grouping featured or commercial content areas that must stand out in scanning
- Title rows that may include concise right-side supporting content

#### Don't use for

- Do not use repeatedly for every section in dense screens, or hierarchy becomes noisy
- Do not use for minor labels or metadata-level headings
- Do not use as a substitute for the page’s principal heading when a top-level title is required

## Title4

Top title level for primary page or view headings when maximum hierarchy prominence is needed.

### Usage

#### Use for

- Main heading of a page, screen, or major view entry point
- High-visibility title moments that establish immediate context for the whole surface
- Header compositions that may include compact right-aligned complementary information or action text

#### Don't use for

- Do not use for regular subsection titles inside content modules
- Do not place multiple Title4 elements in the same visual scope
- Do not use long multiline copy as a page title when a shorter, clearer heading is possible

## TextLink

Use text link (or hyperlink) to create inline linkable text.

### Usage

#### Use for

- Inline navigation or lightweight contextual actions embedded in text content
- Short, descriptive link copy that clearly communicates destination or result
- Cases where link styling (always-underlined or underline-on-hover) helps preserve reading flow
- Links that should follow form state behavior (for example disabling while a form is sending)

#### Don't use for

- Do not use as the primary call-to-action when a button pattern is more appropriate
- Do not rely on generic text like “click here”; link text should remain meaningful out of context
- Do not fake link semantics with custom roles when native link navigation is available
- Do not place dense clusters of text links where users may struggle to identify the main action

## TextTimer

Use text timer for inline countdowns embedded in sentences or short blocks of copy.

### Usage

#### Use for

- Showing a live countdown inside running text without breaking reading flow
- Compact deadline messaging (for example offers or verification windows) where space is limited
- Countdowns that need flexible unit granularity (from seconds up to days) and optional short/long labels
- Contexts where accessible timer announcements are needed while keeping visual output lightweight

#### Don't use for

- Do not use when the timer must be the primary visual element; use the display `Timer` component instead
- Do not combine too many units/long labels in narrow layouts if it harms readability
- Do not use for static date/time display with no countdown behavior
- Do not depend on inline timer text alone for critical task deadlines without supporting explanatory context

## Timer

Use timer for prominent countdown displays with segmented time units, optionally boxed for stronger visual emphasis.

### Usage

#### Use for

- Highlighting countdowns as a key visual element in a screen or section
- Showing time units in a clear display format (days/hours/minutes/seconds) with configurable min and max
  units
- Promotional, transactional, or time-limited contexts where users must quickly scan remaining time
- Boxed presentation when countdowns need extra contrast or placement over rich backgrounds/images

#### Don't use for

- Do not use for subtle inline references inside paragraph text; use `TextTimer` for that pattern
- Do not display unnecessary units when simpler granularity communicates urgency better
- Do not treat timer styling as decoration without a real time-based behavior
- Do not rely on the visual countdown alone for critical instructions; pair it with explicit contextual
  messaging
