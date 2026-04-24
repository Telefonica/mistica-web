# Tabs

Use tabs to switch between related sections within the same context, with one active tab at a time.

## Usage

### Use for

- Organizing peer sections of content that belong to the same page or task context
- Allowing quick switching between views while keeping the user in place
- Short tab labels (with optional icons) that remain scannable in horizontal navigation
- Accessible tab interfaces with clear tablist, tab, and tabpanel relationships and keyboard arrow navigation

### Don't use for

- Do not use tabs for primary app/site navigation between unrelated destinations
- Do not use when users need to compare multiple sections side by side; tabs hide non-selected content
- Do not create too many tabs with long labels that cause poor discoverability and scrolling overhead
- Do not break tab-to-panel semantics when providing custom panel rendering

## Accessibility

### Accessibility label

Give the tab list a clear accessible name with `aria-label` or `aria-labelledby`.

- Keep tab labels short, distinct, and task-oriented
- If icons are used, do not rely on icon-only meaning; keep clear text labels

### Content scope

Keep panel content focused on one topic per tab.

- Do not place unrelated controls in the tab strip
