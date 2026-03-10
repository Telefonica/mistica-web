---
category: StackingGroup
---

# StackingGroup

Use stacking group to display a compact set of similarly sized items, optionally overlapped, with a `+N` overflow indicator.

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
