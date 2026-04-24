# Titles

## Title1

Compact overline-style section title for low-emphasis grouping labels, typically uppercase and secondary in
tone.

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

## Accessibility

### Heading hierarchy

Title heading levels are configurable.

- Set the `as` prop (`h1` to `h6`) based on real page hierarchy instead of relying on visual size alone
- Visual style and semantic level are independent: changing the tag updates accessibility structure without
  requiring visual redesign
- Use one clear top-level heading per view/surface scope when possible, and nest lower levels consistently
  below it

### Accessibility label

Keep title text concise and meaningful so headings work well in assistive-technology heading navigation.

- If right-side companion content is used, ensure it supports (rather than replaces) the meaning of the
  heading
