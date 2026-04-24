# Text

## Text

Foundational typography primitive for custom text rendering when preset components (`Text1`–`Text10`) do not
cover the need.

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
