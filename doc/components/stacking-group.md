# StackingGroup

Use stacking group to display a compact set of similarly sized items, optionally overlapped, with a `+N`
overflow indicator.

When the number of children exceeds `maxItems`, StackingGroup automatically replaces the last visible slot
with the generated `+N` element. That overflow element inherits the configured `moreItemsStyle` shape and
size, and summarizes the hidden items instead of rendering them individually.

## Usage

### Use for

- Showing small collections of visual items (for example avatars) in a compact horizontal group
- Creating overlapped compositions (`stacked`) to save space while preserving item count awareness
- Limiting visible items with `maxItems` and communicating hidden items through the generated `+N` element
- Keeping overflow styling consistent with the item shape (`circle` or `square`) and size

### Don't use for

- Do not use for content with mixed sizes or complex card layouts; this pattern assumes uniform item sizing
- Do not use when each hidden item must remain individually identifiable or directly actionable
- Do not set `maxItems` so low that the `+N` indicator becomes the dominant content
- Do not rely on overlap when readability is critical; use non-stacked spacing instead

## Accessibility

### Accessibility label

Use clear nearby context (title or label) so users understand what the group represents.

- Ensure each visible item has its own accessible name when items are meaningful (for example, person avatars)
- If the group is decorative only, hide it from assistive technologies at container level

### Content scope

Treat StackingGroup as a compact visual summary, not as the only way to access member information.

- When using `maxItems`, provide another accessible path to hidden members (for example, a full list or
  details view)
- Prefer non-stacked spacing when overlap reduces recognition of faces, logos, or other critical visual cues
