---
name: Drawer
description:
  'The drawer component is only meant for web implementations. When designing for native we recommend to use a
  modal view.'
---

## Usage

### Use for

- Presenting secondary tasks or supporting flows without leaving the current page context
- Showing focused dialog-like content with optional title, description, and action area
- Handling web overlay interactions that need dismiss by close button, overlay tap, or ESC when appropriate
- Keeping primary/secondary/link actions anchored at the bottom for clear decision completion

### Don't use for

- Do not use Drawer for core page journeys that deserve full-page navigation
- Do not overload the panel with long, multi-step flows that exceed a focused side-surface interaction
- Do not remove clear dismissal affordances when the flow is intended to be dismissible
- Do not add manual separators inside title/action boundaries; Drawer already manages contextual dividers on
  scroll
