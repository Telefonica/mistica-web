---
name: Row
description:
  'Row is a flexible list item pattern for navigation, selection, and status display with optional leading
  asset and trailing actions.'
---

## Usage

### Use for

- Building scannable list items with clear hierarchy (title, optional supporting text, optional right-side
  info)
- Creating tappable rows for navigation or inline actions with automatic chevron affordance
- Combining content with controls (switch, checkbox, radio, icon action) when a row needs quick state change
- Showing optional badges, detail text, and assets to communicate priority and context

### Don't use for

- Do not mix inconsistent asset styles within the same list group
- Do not overload a single row with too many secondary elements that reduce scanability
- Do not use row-level interaction and control interaction in a confusing way without clear tap targets
- Do not use this pattern for dense tabular data where table semantics fit better
