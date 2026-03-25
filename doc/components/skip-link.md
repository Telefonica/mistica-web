# SkipLink

## SkipLink

A skip link allows keyboard and screen reader users to bypass repeated blocks of content and jump directly to
other content of the page.

### Usage

#### Use for

- Letting keyboard users skip repetitive header/navigation blocks and jump to main content quickly
- Providing fast access to key page landmarks such as content, filters, or footer regions
- Improving accessibility in layouts with repeated structural elements across pages
- Supporting assistive-technology workflows that depend on predictable in-page anchor targets

#### Don't use for

- Do not point SkipLink to missing or unstable target ids
- Do not use vague link text that does not clearly describe destination context
- Do not hide critical navigation only inside skip links; they complement, not replace, primary navigation
- Do not add skip links when there is no repeated block to bypass

## SkipLinkNav

SkipLinkNav groups multiple skip links inside a labeled navigation landmark for accessible quick-jump
navigation.

### Usage

#### Use for

- Grouping multiple skip destinations in one dedicated accessibility navigation block
- Providing a clear labeled landmark for assistive technologies to discover skip options
- Organizing skip links consistently when pages contain several major content regions
- Maintaining coherent keyboard-first navigation patterns across complex layouts

#### Don't use for

- Do not use SkipLinkNav for regular site navigation menus
- Do not include redundant skip entries that point to the same destination
- Do not omit descriptive navigation labeling when multiple skip groups exist
- Do not overpopulate skip navigation with low-value destinations

## Accessibility

### Accessibility label

Use clear destination-oriented link text so users understand exactly where focus will move.

- For example, "Skip to main content" or "Skip to filters"
- You can set an accessibility label for each `SkipLink` using `aria-label`; when not provided, the displayed
  link text is used as the accessible name
- For multiple skip links, wrap them in `SkipLinkNav` and set a clear `aria-label`
- When multiple skip links are present, keep their wording distinct

### Skip targets

Keep skip targets stable and meaningful.

- Each `targetId` should point to a real section users expect to reach
- Prioritize high-value destinations (main content, search/filter region, key complementary sections)
